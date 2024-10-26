import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Chip, Rating } from '@mui/material';
import TooltipModal from '../modals/TooltipModal';
import RatingCommentModal from '../modals/RatingCommnetModal';

// a card of list containing sufficient information for landing page
const GuestCard = (props) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openRateTooltip, setOpenRateTooltip] = useState(false);
  const [target, setTarget] = useState(null);
  const [tooltipRate, setTooltipRate] = useState(0);
  const navigate = useNavigate();

  // set current target for a tooltip
  const handleHover = (e) => {
    setTarget(e.currentTarget);
    setOpenTooltip(true);
  }

  return (
    <>
      <Card
        data-testid="guest-card"
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

          <div
            onMouseEnter={e => handleHover(e)}
            onMouseLeave={() => setOpenTooltip(false)}
          >
            <Rating
              name="read-rating"
              value={parseFloat((props.item.rating).toFixed(2))}
              size="small"
              precision={0.1}
              readOnly
            />

            <TooltipModal
              openTooltip={openTooltip}
              setOpenTooltip={setOpenTooltip}
              setTooltipRate={setTooltipRate}
              setOpenRateTooltip={setOpenRateTooltip}
              reviews={props.item.reviews}
              target={target}
            />

            <RatingCommentModal
              openRateTooltip={openRateTooltip}
              setOpenRateTooltip={setOpenRateTooltip}
              reviews={props.item.reviews}
              tooltipRate={tooltipRate}
              setOpenTooltip={setOpenTooltip}
            />
          </div>

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
