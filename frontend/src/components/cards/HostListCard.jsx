import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import CustomErrorModal from '../modals/CustomErrorModal';
import ConfirmModal from '../modals/ConfirmModal';
import { Rating } from '@mui/material';
import TooltipModal from '../modals/TooltipModal';
import RatingCommentModal from '../modals/RatingCommnetModal';

// a card of list containing sufficient information for hosting page
const HostListCard = (props) => {
  const [openError, setOpenError] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [error, setError] = useState('');
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

  // calculate average rating
  const calculateRating = (reviews) => {
    let sum = 0;

    for (const review of reviews) {
      sum += parseFloat(review.rating);
    }

    return (reviews.length === 0) ? 0 : sum / reviews.length;
  }

  // an event deleting this listing
  const deleteList = async () => {
    const response = await fetch(
      `http://localhost:5005/listings/${props.item.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      setOpenConfirm(false);
      setError('');
      setOpenError(true);
      props.getList();
    }
  };

  // unpublish this listing
  const unpublish = async () => {
    const response = await fetch(
      `http://localhost:5005/listings/unpublish/${props.item.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      setError('');
      setOpenError(true);
      props.setPublished(false);
      props.getList();
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 350 }}>
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
          <Typography gutterBottom variant="body1" component="div">
            Address: {props.item.address.street},
              &nbsp;{props.item.address.city},
              &nbsp;{props.item.address.state},
              &nbsp;{props.item.address.postcode},
              &nbsp;{props.item.address.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Property Type: {props.item.metadata.propertyType}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Number of bathrooms: {props.item.metadata.bathroomNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price per night: {props.item.price} $
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Bedrooms:
          </Typography>
          {
            props.item.metadata.bedrooms.map((e, idx) => {
              return (
                <Typography variant="body2" color="text.secondary" key={idx}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  Type: {e.type}, Number of beds: {e.number}
                </Typography>
              )
            })
          }

          <div
            className='flex justify-center mt-2 items-center gap-2'
            onMouseEnter={e => handleHover(e)}
            onMouseLeave={() => setOpenTooltip(false)}
          >
            <div className='text-sm text-gray-600'>
              {props.item.reviews.length} Total Reviews:
            </div>

            <Rating
              name="read-rating"
              value={parseFloat((calculateRating(props.item.reviews)).toFixed(2))}
              size="small"
              precision={0.1}
              readOnly
            />

            <div className='text-sm text-gray-600'>
              {parseFloat((calculateRating(props.item.reviews)).toFixed(2))}
            </div>

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
        </CardContent>

        <CardActions>
          <div className="flex flex-col gap-1 w-full justify-center items-center">
            <div className="flex justify-between w-full gap-1">
              <Button data-testid="host-edit" size="small" className="flex-1 gap-1" onClick={
                () => navigate(`/edit/${props.item.id}`)
              }>
                Edit
                <ModeEditIcon fontSize="small" />
              </Button>
              <Button data-testid="host-delete" size="small" className="flex-1 gap-1"
                onClick={() => setOpenConfirm(true)}
              >
                Delete
                <DeleteForeverIcon fontSize="small" />
              </Button>

              {
                props.published
                  ? <Button data-testid="host-card-unpublish" size="small" className="flex-1 gap-1"
                      onClick={unpublish}
                    >
                      Unpublish
                      <PublicOffIcon fontSize="small" />
                    </Button>
                  : <Button data-testid="host-card-publish" size="small" className="flex-1 gap-1" onClick={
                      () => props.setOpenPublish(true)
                    }>
                      Publish
                      <PublicIcon fontSize="small" />
                    </Button>
              }
            </div>

            <div className="flex justify-center w-full">
              <Button size="small" className="w-full" onClick={() => {
                localStorage.setItem('postedOn', props.item.postedOn);
                localStorage.setItem('price', props.item.price);
                navigate(`/dashboard/${props.item.id}`);
              }}>
                Manage Bookings
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>

      <ConfirmModal
        message={'Do you want to delete this list'}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        confirm={deleteList}
      />

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default HostListCard;
