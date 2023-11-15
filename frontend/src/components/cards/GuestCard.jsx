import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const GuestCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{ width: 350 }}
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

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of total reviews: {props.item.reviews.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {(props.item.rating).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default GuestCard;
