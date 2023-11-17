import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BookIcon from '@mui/icons-material/Book';

// a card for viewing detailed information of a list
const ListViewCard = (props) => {
  return (
    <Card sx={{ maxWidth: 350 }}>
      {
        /^data:image\/[a-zA-Z]+;base64,[^\s]+$/.test(props.data.listing.thumbnail)
          ? <CardMedia
              component="img"
              alt="thumbnail"
              style={{ height: '200px', width: '100%' }}
              image={props.data.listing.thumbnail} />
          : <iframe
              style={{ height: '200px', width: '100%' }}
              src={props.data.listing.thumbnail}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
      }

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.listing.title}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {props.data.listing.address.street},
            &nbsp;{props.data.listing.address.city},
            &nbsp;{props.data.listing.address.state},
            &nbsp;{props.data.listing.address.postcode},
            &nbsp;{props.data.listing.address.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Property Type: {props.data.listing.metadata.propertyType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of bathrooms: {props.data.listing.metadata.bathroomNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {
            (localStorage.getItem('dateMin') && localStorage.getItem('dateMax'))
              ? <>
                  Total price:&nbsp;
                  {props.calculatePrice(
                    localStorage.getItem('dateMin'), localStorage.getItem('dateMax')
                  )} $
                </>
              : <>Price per night: {props.data.listing.price} $</>
          }
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Bedrooms:
        </Typography>
        {
          props.data.listing.metadata.bedrooms.map((e, idx) => {
            return (
              <Typography variant="body2" color="text.secondary" key={idx}>
                &nbsp;&nbsp;&nbsp;&nbsp;Type: {e.type}, Number of beds: {e.number}
              </Typography>
            )
          })
        }

        {
          localStorage.getItem('token') &&
          <div className="flex w-full justify-center mt-5">
            <Button data-testid="book" className="w-full flex gap-2" onClick={() => props.handleOpen()}>
              Book your stay
              <BookIcon fontSize="small" />
            </Button>
          </div>
        }

        {
          props.listBookings.some(e => e.owner === localStorage.getItem('email') &&
            parseInt(e.listingId) === parseInt(props.id) &&
            e.status === 'accepted'
          ) &&
          <div className="flex w-full justify-center">
            <Button className="w-full flex gap-2" onClick={() => props.handleOpenReview()}>
              Leave your review
              <RateReviewIcon fontSize="small" />
            </Button>
          </div>
        }
      </CardContent>
    </Card>
  );
}

export default ListViewCard;
