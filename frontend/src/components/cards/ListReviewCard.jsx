import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';

// a card containing a list of review cards
const ListReviewCard = (props) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardContent>
        <div
          className='flex flex-wrap items-center justify-center gap-2 text-sm my-2'
          role='button'
          onMouseEnter={() => props.setOpenTooltip(true)}
          onClick={() => props.setOpenTooltip(true)}
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
                <Card key={idx} onClick={() => props.setOpenTooltip(true)} role="button">
                  <Typography variant="body5" component="div" className='px-2'>
                    {e.owner}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className='px-2'>
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
