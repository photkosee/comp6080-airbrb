import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListingEdit from '../modals/ListingEditModal';
import AvailableModal from '../modals/AvailableModal';
import { useNavigate } from 'react-router-dom';

const HostCard = (props) => {
  const [published, setPublished] = useState(props.item.published);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const navigate = useNavigate();

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
      alert(data.error);
    } else {
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
      alert(data.error);
    } else {
      setPublished(false);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
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
            Bathroom Number: {props.item.metadata.bathroomNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price per night: {props.item.price}
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
        </CardContent>

        <CardActions>
          <div className='flex flex-col gap-2 w-full justify-center items-center'>
            <div className='flex gap-1'>
              <Button size="small" onClick={() => setOpenEdit(true)}>Edit</Button>
              <Button size="small" onClick={deleteList}>Delete</Button>

              {
                published
                  ? <Button size="small" onClick={unpublish}>Unpublish</Button>
                  : <Button size="small" onClick={() => setOpenPublish(true)}>
                      Publish
                    </Button>
              }
            </div>

            <div className='flex justify-center'>
              <Button size="small" onClick={() => {
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

      <ListingEdit
        token={localStorage.getItem('token')}
        listingId={props.item.id}
        open={openEdit}
        setOpen={setOpenEdit}
        getList={props.getList}
      />

      <AvailableModal
        listingId={props.item.id}
        token={localStorage.getItem('token')}
        open={openPublish}
        setOpen={setOpenPublish}
        publish={openPublish}
        setPublished={setPublished}
      />
    </>
  );
}

export default HostCard;
