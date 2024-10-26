import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

// a booking card with user name, date rangr, and status
const BookingCard = (props) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <Typography gutterBottom variant="body5" component="div" className='break-all'>
          User: {props.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.dateRange.start.substring(0, 10)} : {props.dateRange.end.substring(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        <div className='flex justify-between gap-1'>
          {
            props.hasStatus
              ? <Chip label={props.status} variant="outlined" />
              : <>
                  <Button size="small" className="flex-1 gap-1"
                    onClick={props.acceptBooking}
                  >
                    Accept
                    <ThumbUpAltIcon fontSize="small" className="mb-1" />
                  </Button>

                  <Button size="small" className="flex-1 gap-1"
                    onClick={props.declineBooking}
                  >
                    Decline
                    <ThumbDownAltIcon fontSize="small" className="mb-1" />
                  </Button>
                </>
          }
        </div>
      </CardActions>
    </Card>
  );
}

export default BookingCard;
