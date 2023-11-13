import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Input, Modal, Rating, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ListingView = (props) => {
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
        <div className='flex justify-center mt-3'>
          <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              alt="thumbnail"
              width="220"
              image={data.listing.thumbnail} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.listing.title}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Address: {data.listing.address.street}, {data.listing.address.city}, {data.listing.address.state}, {data.listing.address.postcode}, {data.listing.address.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property Type: {data.listing.metadata.propertyType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div>
                  Bedrooms:
                </div>
                <div className='flex flex-col flex-wrap gap-1'>
                  {
                    data.listing.metadata.bedrooms.map((e, idx) => {
                      return (
                        <div key={idx}>
                          &nbsp;&nbsp;&nbsp;&nbsp;Type: {e.type} Number of beds: {e.number}
                        </div>
                      )
                    })
                  }
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bathroom Number: {data.listing.metadata.bathroomNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {
                  (localStorage.getItem('dateMin') && localStorage.getItem('dateMax'))
                    ? <>Total price: {calculatePrice(localStorage.getItem('dateMin'), localStorage.getItem('dateMax'))}</>
                    : <>Price per night: {data.listing.price}</>
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of reviews: {data.listing.reviews.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div className='flex items-center gap-2'>
                  Rating: <Rating name="read-only" value={calculateRating()} size="small" precision={0.1} readOnly /> {calculateRating()}
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div>
                  Comments:
                </div>
                <div className='flex flex-col gap-1'>
                  {
                    data.listing.reviews.map((e, idx) => {
                      return (
                        <div key={idx} className='flex flex-wrap'>
                          &nbsp;&nbsp;&nbsp;&nbsp;{e.owner} : {e.comment}
                        </div>
                      )
                    })
                  }
                </div>
              </Typography>
              {props.token &&
                <div className='flex w-full justify-center'>
                  <Button onClick={() => handleOpen()}>Book</Button>
                </div>
              }
              {list.some(e => e.owner === localStorage.getItem('email') && parseInt(e.listingId) === parseInt(id)) &&
                <div className='flex w-full justify-center'>
                  <Button onClick={() => handleOpenReview()}>Review</Button>
                </div>
              }
            </CardContent>
          </Card>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='flex flex-col flex-wrap gap-2 w-full'>
                <div className="relative flex flex-col items-center gap-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    Check In:&nbsp;
                    <DatePicker
                      onChange={e => {
                        setDateMin(e.$d);
                        localStorage.setItem('dateMin', e.$d);
                      }}
                    />
                    Check Out:&nbsp;
                    <DatePicker
                      onChange={e => {
                        setDateMax(e.$d);
                        localStorage.setItem('dateMax', e.$d);
                      }}
                    />
                  </LocalizationProvider>
                  <Button onClick={() => { confirmBook() }}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal
            open={(openReview)}
            onClose={() => setOpenReview(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className='flex flex-col flex-wrap gap-2 w-full'>
                <Rating name="half-rating" value={parseFloat(rate)} onChange={e => setRate(parseFloat(e.target.value))} precision={0.5} />
                <Input type='text' value={text} onChange={e => setText(e.target.value)} />
                <Button onClick={() => { uploadReview() }}>
                  Send
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </>
    )
  }
}

export default ListingView;
