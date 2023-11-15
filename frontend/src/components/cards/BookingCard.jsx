import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const BookingCard = (props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography gutterBottom variant="body5" component="div">
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
                    <ThumbUpAltIcon fontSize="small" />
                  </Button>

                  <Button size="small" className="flex-1 gap-1"
                    onClick={props.declineBooking}
                  >
                    Decline
                    <ThumbDownAltIcon fontSize="small" />
                  </Button>
                </>
          }
        </div>
      </CardActions>
    </Card>
  );
}

export default BookingCard;
