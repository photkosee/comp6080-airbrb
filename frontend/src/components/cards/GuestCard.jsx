import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Chip, Rating } from '@mui/material';

const GuestCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{ width: 300 }}
        onClick={() => navigate(`/listing/${props.item.id}`)}
        role="button"
      >
        {
          /^data:image\/[a-zA-Z]+;base64,[^\s]+$/.test(props.item.thumbnail)
            ? <CardMedia
                component="img"
                alt="thumbnail"
                style={{ height: '200px', width: '100%' }}
                image={props.item.thumbnail} />
            : <iframe
                style={{ height: '200px', width: '100%' }}
                src={props.item.thumbnail}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
        }

        <CardContent className="relative">
          <Typography gutterBottom variant="h5" component="div" className="px-1">
            {props.item.title}
          </Typography>
          <Typography gutterBottom variant="body5" component="div" className="px-1">
            {props.item.address.city}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="px-1">
            Price per night: {props.item.price} $
          </Typography>
          <Typography variant="body2" color="text.secondary" className="px-1">
            Number of reviews: {props.item.reviews.length}
          </Typography>

          <Rating
            name="read-rating"
            value={parseFloat((props.item.rating).toFixed(2))}
            size="small"
            precision={0.1}
            readOnly
          />

          {
            props.bookingIds.includes(parseInt(props.item.id)) &&
            <Chip label="booked" variant="outlined" className="absolute bottom-3 right-3" />
          }

          {
            props.item.owner === localStorage.getItem('email') &&
            <Chip label="owner" variant="outlined" className="absolute bottom-3 right-3" />
          }
        </CardContent>
      </Card>
    </>
  );
}

export default GuestCard;
