import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function HostCard (props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Property Type: {props.item.metadata.propertyType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bed Number: {props.item.metadata.bedNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bathroom Number: {props.item.metadata.bathroomNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'no svg'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review Number: {props.item.reviews.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {props.item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
        <Button size="small">Publish</Button>
      </CardActions>
    </Card>
  );
}
