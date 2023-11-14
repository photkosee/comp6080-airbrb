import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography
} from '@mui/material';
import BookingModal from './BookingModal';
import ReviewModal from './ReviewModal';
import TooltipModal from './TooltipModal';
import RatingCommentModal from './RatingCommnetModal';

const ListingView = (props) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [dateMax, setDateMax] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [list, setList] = useState([]);
  const [openReview, setOpenReview] = useState(false);
  const [rate, setRate] = useState(0);
  const [text, setText] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openRateTooltip, setOpenRateTooltip] = useState(false);
  const [tooltipRate, setTooltipRate] = useState(0);
  const { id } = useParams();

  // starting with fetching a list of all bookings and a list of listings
  useEffect(() => {
    getData();
    showBookings();
  }, []);

  // filter those listings that the user booked
  useEffect(() => {
    list.forEach(e => {
      if (
        e.owner === localStorage.getItem('email') &&
        parseInt(e.listingId) === parseInt(id)
      ) {
        setBookingId(e.id);
      }
    })
  }, [list]);

  // event when open a review modal form
  const handleOpenReview = () => {
    setRate(0);
    setText('');
    setOpenReview(true);
  }

  // getting more details of the list with the given id
  const getData = async () => {
    const response = await fetch(
      `http://localhost:5005/listings/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listing) {
      setData(data);
    }
  }

  // getting a list of all bookings
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

  // an event when submit a review form
  const uploadReview = async () => {
    const obj = {
      review: {
        owner: localStorage.getItem('email'),
        comment: text,
        rating: rate,
      }
    };

    const jsonObj = JSON.stringify(obj);

    const response = await fetch(
      `http://localhost:5005/listings/${id}/review/${bookingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: jsonObj,
      });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      getData();
      setOpenReview(false);
      alert('Feedback sent');
    }
  };

  // an event submitting user's booking request
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
      const response = await fetch(
        `http://localhost:5005/bookings/new/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: jsonObj,
        });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        setOpen(false);
      } else {
        getData();
        setOpen(false);
        showBookings();
        alert('Booking success');
      }
    } else {
      alert('Need to provide both start and end dates')
    }
  }

  // calculating the price from the days staying and price per night
  const calculatePrice = (dateMin, dateMax) => {
    return data.listing.price *
      (new Date(dateMax) - new Date(dateMin)) / 86400000;
  }

  // calculating the average rating
  const calculateRating = () => {
    let sum = 0;

    for (const review of data.listing.reviews) {
      sum += parseFloat(review.rating);
    }

    return (data.listing.reviews.length === 0)
      ? 0
      : (sum / data.listing.reviews.length).toFixed(2);
  }

  // an event for opening the booking (pick date) modal
  const handleOpen = () => {
    setDateMin('');
    setDateMax('');
    setOpen(true);
  }

  if (!data || data === null) {
    return <>loading</>;
  } else {
    return (
      <>
        <Navbar
          token={localStorage.getItem('token')}
          setToken={props.setToken}
          page={`/listing/${props.id}`}
        />

        <div className='flex justify-center mt-3 pb-5'>
          <Card sx={{ maxWidth: 300 }}>
            {
              /^data:image\/[a-zA-Z]+;base64,[^\s]+$/.test(data.listing.thumbnail)
                ? <CardMedia
                    component="img"
                    alt="thumbnail"
                    style={{ height: '200px', width: '100%' }}
                    image={data.listing.thumbnail} />
                : <iframe
                    style={{ height: '200px', width: '100%' }}
                    src={data.listing.thumbnail}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write;
                      encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
            }

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.listing.title}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Address: {data.listing.address.street},
                  &nbsp;{data.listing.address.city},
                  &nbsp;{data.listing.address.state},
                  &nbsp;{data.listing.address.postcode},
                  &nbsp;{data.listing.address.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Property Type: {data.listing.metadata.propertyType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bathroom Number: {data.listing.metadata.bathroomNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {
                  (localStorage.getItem('dateMin') && localStorage.getItem('dateMax'))
                    ? <>
                        Total price:&nbsp;
                        {calculatePrice(
                          localStorage.getItem('dateMin'), localStorage.getItem('dateMax')
                        )}
                      </>
                    : <>Price per night: {data.listing.price}</>
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of reviews: {data.listing.reviews.length}
              </Typography>

              <div className='flex flex-col text-sm'>
                <div>
                  Bedrooms:
                </div>
                <div className='flex flex-col flex-wrap'>
                  {
                    data.listing.metadata.bedrooms.map((e, idx) => {
                      return (
                        <div key={idx}>
                          &nbsp;&nbsp;&nbsp;&nbsp;Type: {e.type}, Number of beds: {e.number}
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div
                className='flex items-center justify-center gap-2 text-sm my-2'
                onMouseEnter={() => setOpenTooltip(true)}
              >
                Rating:&nbsp;
                <Rating
                  name="read-rating"
                  value={parseInt(calculateRating())}
                  size="small"
                  precision={0.1}
                  readOnly
                />
                &nbsp;{calculateRating()}
              </div>

              <div className='flex flex-col text-sm'>
                <div>
                  Comments:
                </div>
                <div className='flex flex-col'>
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
              </div>

              {
                localStorage.getItem('token') &&
                <div className='flex w-full justify-center'>
                  <Button onClick={() => handleOpen()}>Book</Button>
                </div>
              }

              {
                list.some(e => e.owner === localStorage.getItem('email') &&
                  parseInt(e.listingId) === parseInt(id)
                ) &&
                <div className='flex w-full justify-center'>
                  <Button onClick={() => handleOpenReview()}>Review</Button>
                </div>
              }
            </CardContent>
          </Card>

          <BookingModal
            open={open}
            setOpen={setOpen}
            setDateMin={setDateMin}
            setDateMax={setDateMax}
            confirmBook={confirmBook}
          />

          <ReviewModal
            openReview={openReview}
            setOpenReview={setOpenReview}
            rate={rate}
            setRate={setRate}
            text={text}
            setText={setText}
            uploadReview={uploadReview}
          />

          <TooltipModal
            openTooltip={openTooltip}
            setOpenTooltip={setOpenTooltip}
            setTooltipRate={setTooltipRate}
            setOpenRateTooltip={setOpenRateTooltip}
            reviews={data.listing.reviews}
          />

          <RatingCommentModal
            openRateTooltip={openRateTooltip}
            setOpenRateTooltip={setOpenRateTooltip}
            reviews={data.listing.reviews}
            tooltipRate={tooltipRate}
          />
        </div>
      </>
    )
  }
}

export default ListingView;
