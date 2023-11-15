import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import BookingCard from '../cards/BookingCard';

const ManageBooking = (props) => {
  const [listBooking, setListBooking] = useState([]);
  const [sumBooking, setSumBooking] = useState(0);
  const { id } = useParams();

  // start with fetching a list of all bookings
  useEffect(() => {
    showBookings();
  }, []);

  // calculating the difference between the start and end date in days
  // using current date if no end dates provided
  const timeDiff = (end, start) => {
    if (end) {
      return parseInt((new Date(end) - new Date(start)) / 86400000);
    } else {
      return parseInt((new Date() - new Date(start)) / 86400000);
    }
  }

  // accepting the booking request with the given id
  const acceptBooking = async (id) => {
    const response = await fetch(
      `http://localhost:5005/bookings/accept/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      showBookings();
    }
  };

  // declining the booking request with the given id
  const declineBooking = async (id) => {
    const response = await fetch(
      `http://localhost:5005/bookings/decline/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      showBookings();
    }
  };

  // get a list of all bookings
  const showBookings = async () => {
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
    } else {
      const tmp = data.bookings;
      setListBooking(tmp.filter(e => e.listingId === id));
      setSumBooking(0);
      tmp.filter(e => e.listingId === id).forEach(e => {
        if (
          parseInt(e.listingId) === parseInt(id) &&
          e.status === 'accepted' &&
          new Date(e.dateRange.start).getFullYear() === new Date().getFullYear()
        ) {
          setSumBooking(prev =>
            prev + timeDiff(e.dateRange.end, e.dateRange.start)
          );
        }
      });
    }
  };

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page={`/dashboard/${props.id}`}
      />

      <div className='flex flex-col gap-3 items-center pt-5 mb-5'>
        {
          localStorage.getItem('postedOn') !== 'null'
            ? <div>
                Up online: {timeDiff(null, localStorage.getItem('postedOn'))}
              </div>
            : <div>
                Currently not publishing
              </div>
        }

        <div>
          Total booked time this year: {sumBooking} Days
        </div>
        <div>
          Total profits this year: {sumBooking * localStorage.getItem('price')} $
        </div>

        <div className='h-full w-full flex flex-wrap justify-center gap-3'>
          {
            listBooking.map((e, idx) => {
              if (
                parseInt(e.listingId) === parseInt(id) && e.status === 'pending'
              ) {
                return (
                  <BookingCard
                    key={idx}
                    owner={e.owner}
                    dateRange={e.dateRange}
                    acceptBooking={() => acceptBooking(e.id)}
                    declineBooking={() => declineBooking(e.id)}
                    hasStatus={false}
                  />
                )
              } else {
                return (
                  <BookingCard
                    key={idx}
                    owner={e.owner}
                    dateRange={e.dateRange}
                    status={e.status}
                    hasStatus={true}
                  />
                )
              }
            })
          }
        </div>
      </div>
    </>
  );
}

export default ManageBooking;
