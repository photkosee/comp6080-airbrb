import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

const BookingCard = (props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography gutterBottom variant="body5" component="div">
          User: {props.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From: {props.dateRange.start.substring(0, 10)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          To: {props.dateRange.end.substring(0, 10)}
        </Typography>
      </CardContent>
      <CardActions>
        {
          props.hasStatus
            ? <Chip label={props.status} variant="outlined" />
            : <>
                <Button size="small" onClick={props.acceptBooking}>Accept</Button>
                <Button size="small" onClick={props.declineBooking}>Decline</Button>
              </>
        }
      </CardActions>
    </Card>
  );
}

export default BookingCard;
