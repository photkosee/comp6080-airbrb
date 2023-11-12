import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function GuestCard (props) {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: 345 }} onClick={() => navigate(`/listing/${props.item.id}`)}>
        <CardMedia
          component="img"
          alt="thumbnail"
          width="220"
          image={props.item.thumbnail} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of total reviews: {props.item.reviews.length}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
