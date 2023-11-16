import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Navbar } from '../navbar/Navbar';
import { CircularProgress } from '@mui/material';
import BookingModal from '../modals/BookingModal';
import ReviewModal from '../modals/ReviewModal';
import TooltipModal from '../modals/TooltipModal';
import RatingCommentModal from '../modals/RatingCommnetModal';
import ListBookingCard from '../cards/ListBookingCard';
import ListReviewCard from '../cards/ListReviewCard';
import ListViewCard from '../cards/ListViewCard';
import CustomErrorModal from '../modals/CustomErrorModal';

// a page viewing a list in more details
const ListingView = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [dateMax, setDateMax] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [listBookings, setListBookings] = useState([]);
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
    getBookings();
  }, []);

  // filter those listings that the user booked
  useEffect(() => {
    listBookings.forEach(e => {
      if (
        e.owner === localStorage.getItem('email') &&
        parseInt(e.listingId) === parseInt(id)
      ) {
        setBookingId(e.id);
      }
    })
  }, [listBookings]);

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
      setError(data.error);
      setOpenError(true);
    } else if (data.listing) {
      setData(data);
    }
  }

  // getting a list of all bookings
  const getBookings = async () => {
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
        setError(data.error);
        setOpenError(true);
      } else if (data.bookings) {
        const tmp = data.bookings;
        setListBookings(tmp);
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
      setError(data.error);
      setOpenError(true);
    } else {
      getData();
      setOpenReview(false);
      setError('');
      setOpenError(true);
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
        setOpen(false);
        setError(data.error);
        setOpenError(true);
      } else {
        getData();
        setOpen(false);
        setError('');
        setOpenError(true);
        getBookings();
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
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <>
        <Navbar
          token={localStorage.getItem('token')}
          setToken={props.setToken}
          page={`/listing/${props.id}`}
        />

        <div className='flex flex-wrap gap-5 justify-center mt-3 pb-5 pt-5'>
          <ListViewCard
            data={data}
            calculatePrice={calculatePrice}
            handleOpen={handleOpen}
            listBookings={listBookings}
            handleOpenReview={handleOpenReview}
            id={id}
          />

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

          <ListReviewCard
            setOpenTooltip={setOpenTooltip}
            calculateRating={calculateRating}
            data={data}
          />

          {
            localStorage.getItem('token') &&
            <ListBookingCard
              getBookings={getBookings}
              id={id}
              listBookings={listBookings}
            />
          }
        </div>

        <CustomErrorModal
          error={error}
          openError={openError}
          setOpenError={setOpenError}
        />
      </>
    );
  }
}

export default ListingView;
