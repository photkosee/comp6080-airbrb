import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookingCard from './BookingCard';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomErrorModal from '../modals/CustomErrorModal';
import ConfirmModal from '../modals/ConfirmModal';

// a card containing a list of booking cards
const ListBookingCard = (props) => {
  const [openError, setOpenError] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');

  // cancel a pending booking with given id
  const cancleBooking = async (bId) => {
    const response = await fetch(`http://localhost:5005/bookings/${bId}`, {
      method: 'Delete',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      setOpenConfirm(false);
      setError('');
      setOpenError(true);
      props.getBookings();
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 250, maxHeight: 350, overflow: 'auto' }}>
        <CardContent>
          <div className="flex justify-center mb-1">
            <Typography variant="body2" color="text.secondary">
              Your bookings
            </Typography>
          </div>

          <div className="flex flex-col gap-3">
            {
              props.listBookings.filter(e =>
                e.owner === localStorage.getItem('email') &&
                e.listingId === props.id &&
                e.status
              ).map((e, idx) => {
                return (
                  <div key={idx} className="flex flex-col">
                    <BookingCard
                      owner={e.owner}
                      dateRange={e.dateRange}
                      status={e.status}
                      hasStatus
                    />

                    {
                      e.status === 'pending' &&
                      <Button
                        className="flex gap-1"
                        onClick={() => {
                          setBookingId(e.id);
                          setOpenConfirm(true);
                        }}
                      >
                        <ArrowDropUpIcon fontSize="small" />
                        Cancel booking
                        <HighlightOffIcon fontSize="small" />
                      </Button>
                    }
                  </div>
                );
              })
            }
          </div>
        </CardContent>
      </Card>

      <ConfirmModal
        message={'Do you want to delete this booking'}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        confirm={() => cancleBooking(bookingId)}
      />

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default ListBookingCard;
