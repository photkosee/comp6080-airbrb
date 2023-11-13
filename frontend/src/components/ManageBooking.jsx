import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const ManageBooking = (props) => {
  const [listBooking, setListBooking] = React.useState([]);
  const [sumBooking, setSumBooking] = React.useState(0);
  const { id } = useParams();

  const acceptBooking = async (id) => {
    const response = await fetch(`http://localhost:5005/bookings/accept/${id}`, {
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

  const declineBooking = async (id) => {
    const response = await fetch(`http://localhost:5005/bookings/decline/${id}`, {
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
        if (parseInt(e.listingId) === parseInt(id) && e.status === 'accepted') {
          setSumBooking(prev => prev + (parseInt((new Date(e.dateRange.end) - new Date(e.dateRange.start)) / 86400000)));
        }
      })
    }
  };

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
      setListBooking(tmp);
    }
  };

  useEffect(() => {
    showBookings();
  }, []);

  return (
    <>
      <Navbar token={localStorage.getItem('token')} setToken={props.setToken} page={`/dashboard/${props.id}`} />
      <div className='flex flex-col gap-3 items-center'>
          {
            localStorage.getItem('online')
              ? <div>
                  Up online: {parseInt((new Date() - new Date(localStorage.getItem('online'))) / 86400000)}
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
              if (parseInt(e.listingId) === parseInt(id) && e.status === 'pending') {
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
