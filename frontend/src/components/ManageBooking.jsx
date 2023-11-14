import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

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

      listBooking.forEach(e => {
        if (
          parseInt(e.listingId) === parseInt(id) &&
          e.status === 'accepted'
        ) {
          setSumBooking(prev =>
            prev + timeDiff(e.dateRange.end, e.dateRange.start)
          );
        }
      });
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
    }
  };

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page={`/dashboard/${props.id}`}
      />

      <div className='flex flex-col gap-3 items-center'>
        {
          localStorage.getItem('online')
            ? <div>
                Up online: {timeDiff(null, localStorage.getItem('online'))}
              </div>
            : <div>
                Currently not publishing
              </div>
        }

        <div>
          Total booked time: {sumBooking} Days
        </div>
        <div>
          Total profits: {sumBooking} Days
        </div>
        <div>
          Requests:
        </div>

        {
          listBooking.map((e, idx) => {
            if (
              parseInt(e.listingId) === parseInt(id) && e.status === 'pending'
            ) {
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
                    {e.status}
                  </div>
                </div>
              )
            }
          })
        }
      </div>
    </>
  )
}

export default ManageBooking;
