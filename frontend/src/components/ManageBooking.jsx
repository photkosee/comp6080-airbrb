import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const ManageBooking = (props) => {
  const [listBooking, setListBooking] = React.useState([]);

  const { id } = useParams();

  const acceptBooking = async (id) => {
    const response = await fetch(`http://localhost:5005/bookings/accept/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
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
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      showBookings();
    }
  };

  const showBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
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
      <Navbar token={props.token} setToken={props.setToken} page={`/dashboard/${props.id}`} />
      <div className='flex flex-col gap-3 items-center'>
          <div>
            Up online: {localStorage.getItem('online')}
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
