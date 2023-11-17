import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import TooltipModal from '../modals/TooltipModal';
import RatingCommentModal from '../modals/RatingCommnetModal';

// a card containing a list of review cards
const ListReviewCard = (props) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openRateTooltip, setOpenRateTooltip] = useState(false);
  const [target, setTarget] = useState(null);
  const [tooltipRate, setTooltipRate] = useState(0);

  // set current target for a tooltip
  const handleHover = (e) => {
    setTarget(e.currentTarget);
    setOpenTooltip(true);
  }

  return (
    <Card sx={{ maxWidth: 350, maxHeight: 350, overflow: 'auto' }}>
      <CardContent>
        <div
          className='flex flex-wrap items-center justify-center gap-2 text-sm my-2'
          role='button'
          onMouseEnter={e => handleHover(e)}
          onMouseLeave={() => setOpenTooltip(false)}
        >
          Rating:
          <Rating
            name="read-rating"
            value={parseFloat(props.calculateRating())}
            size="small"
            precision={0.1}
            readOnly
          />
          {props.calculateRating()}

          <TooltipModal
            openTooltip={openTooltip}
            setOpenTooltip={setOpenTooltip}
            setTooltipRate={setTooltipRate}
            setOpenRateTooltip={setOpenRateTooltip}
            reviews={props.data.listing.reviews}
            target={target}
          />

          <RatingCommentModal
            openRateTooltip={openRateTooltip}
            setOpenRateTooltip={setOpenRateTooltip}
            reviews={props.data.listing.reviews}
            tooltipRate={tooltipRate}
            setOpenTooltip={setOpenTooltip}
          />
        </div>

        <div className='flex justify-center mb-1'>
          <Typography variant="body2" color="text.secondary">
            Number of reviews: {props.data.listing.reviews.length}
          </Typography>
        </div>

        <div className='flex flex-col gap-1'>
          {
            props.data.listing.reviews.map((e, idx) => {
              return (
                <Card key={idx} role="button" sx={{ maxWidth: 200 }}>
                  <Typography variant="body5" component="div" className='px-2 break-all'>
                    {e.owner}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className='px-2 break-all'>
                    {e.comment}
                  </Typography>

                  <Rating
                    name="read-rating"
                    value={parseInt(e.rating)}
                    size="small"
                    precision={0.1}
                    readOnly
                    className='p-1'
                  />
                </Card>
              );
            })
          }
        </div>
      </CardContent>
    </Card>
  );
}

export default ListReviewCard;
