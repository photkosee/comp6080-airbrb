import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookingCard from './BookingCard';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// a card containing a list of booking cards
const ListBookingCard = (props) => {
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
      alert(data.error);
    } else {
      props.getBookings();
      alert('Cancel successfully');
    }
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <div className='flex justify-center mb-1'>
          <Typography variant="body2" color="text.secondary">
            Your bookings
          </Typography>
        </div>

        <div className='flex flex-col gap-1'>
          {
            props.listBookings.filter(e =>
              e.owner === localStorage.getItem('email') &&
              e.listingId === props.id &&
              e.status
            ).map((e, idx) => {
              return (
                <>
                  <BookingCard
                    key={idx}
                    owner={e.owner}
                    dateRange={e.dateRange}
                    status={e.status}
                    hasStatus
                  />

                  {
                    e.status === 'pending' &&
                    <Button
                      className="flex gap-1"
                      onClick={() => cancleBooking(e.id)}
                    >
                      <ArrowDropUpIcon fontSize="small" />
                      Cancel booking
                      <HighlightOffIcon fontSize="small" />
                    </Button>
                  }
                </>
              );
            })
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default ListBookingCard;
