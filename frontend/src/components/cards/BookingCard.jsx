import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BookingCard = (props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          User: {props.owner}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From: {props.dateRange.start}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          To: {props.dateRange.end}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.acceptBooking}>Accept</Button>
        <Button size="small" onClick={props.declineBooking}>Decline</Button>
      </CardActions>
    </Card>
  );
}

export default BookingCard;