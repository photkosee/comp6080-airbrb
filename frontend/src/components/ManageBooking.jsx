import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Input, Modal, Rating, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ManageBooking = (props) => {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [dateMax, setDateMax] = React.useState('');
  const [dateMin, setDateMin] = React.useState('');
  const [list, setList] = React.useState([]);
  const [openReview, setOpenReview] = React.useState(false);
  const [rate, setRate] = React.useState(0);
  const [text, setText] = React.useState('');
  const [bookingId, setBookingId] = React.useState('');
  const { id } = useParams();

  const handleOpenReview = () => {
    setRate(0);
    setText('');
    setOpenReview(true);
  }

  const getData = async () => {
    const response = await fetch(`http://localhost:5005/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listing) {
      setData(data);
    }
  }

  const showBookings = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch('http://localhost:5005/bookings', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else if (data.bookings) {
        const tmp = data.bookings;
        setList(tmp);
      }
    }
  };

  const uploadReview = async () => {
    const obj = {
      review: {
        owner: localStorage.getItem('email'),
        comment: text,
        rating: rate,
      }
    };
    const jsonObj = JSON.stringify(obj);
    console.log(jsonObj);
    const response = await fetch(`http://localhost:5005/listings/${id}/review/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: jsonObj,
    });

    console.log('1');

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getData();
      alert('Feedback sent');
      setOpenReview(false);
    }
  };

  useEffect(() => {
    getData();
    showBookings();
  }, []);

  useEffect(() => {
    list.forEach(e => {
      if (e.owner === localStorage.getItem('email') && parseInt(e.listingId) === parseInt(id)) {
        setBookingId(e.id);
      }
    })
  }, [list]);

  const confirmBook = async () => {
    if (dateMin && dateMax) {
      const obj = {
        dateRange: {
          start: dateMin,
          end: dateMax,
        },
        totalPrice: calculatePrice(dateMin, dateMax),
      };
      const jsonObj = JSON.stringify(obj);
      const response = await fetch(`http://localhost:5005/bookings/new/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`
        },
        body: jsonObj,
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        setOpen(false);
      } else {
        setOpen(false);
        alert('Booking success');
      }
    } else {
      alert('Need to provide both start and end dates')
    }
  }

  const calculatePrice = (dateMin, dateMax) => {
    return data.listing.price * (new Date(dateMax) - new Date(dateMin)) / 86400000;
  }

  const calculateRating = () => {
    let sum = 0;
    for (const review of data.listing.reviews) {
      sum += parseFloat(review.rating);
    }
    if (data.listing.reviews.length === 0) {
      return 0;
    }
    return sum / data.listing.reviews.length;
  }

  const handleOpen = () => {
    setDateMin('');
    setDateMax('');
    setOpen(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 'lg'
  };

  if (!data || data === null) {
    return <>loading</>;
  } else {
    return (
      <>
        <Navbar token={props.token} setToken={props.setToken} page={`/listing/${props.id}`} />
        <div className='flex flex-col gap-3 justify-center'>
            <div>
              Requests:
            </div>
            {
              listBooking.map((e, idx) => {
                if (parseInt(e.listingId) === parseInt(props.item.id) && e.status === 'pending') {
                  return (
                    <div key={idx} className='flex flex-col gap-1'>
                      <div>
                        Uesr: {e.owner}
                      </div>
                      <div>
                        From: {e.dateRange.start}
                      </div>
                      <div>
                        To: {e.dateRange.end}
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        <Button onClick={() => acceptBooking(e.id)}>
                          Accept
                        </Button>
                        <Button onClick={() => declineBooking(e.id)}>
                          Decline
                        </Button>
                      </div>
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }
          </div>
      </>
    )
  }
}

export default ManageBooking;
