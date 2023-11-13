import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListingEdit from './ListingEdit';
import AvailableModal from './AvailableModal';
import { Box, Modal } from '@mui/material';

export default function HostCard (props) {
  const [published, setPublished] = React.useState(props.item.published);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPublish, setOpenPublish] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [listBooking, setListBooking] = React.useState([]);

  const deleteList = async () => {
    const response = await fetch(`http://localhost:5005/listings/${props.item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.getList();
    }
  };

  const unpublish = async () => {
    const response = await fetch(`http://localhost:5005/listings/unpublish/${props.item.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setPublished(false);
    }
  };

  const acceptBooking = async (id) => {
    const response = await fetch(`http://localhost:5005/bookings/accept/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      showBookings();
    }
  };

  const declineBooking = async (id) => {
    const response = await fetch(`http://localhost:5005/bookings/decline/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      showBookings();
    }
  };

  const showBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const tmp = data.bookings;
      setListBooking(tmp);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 'lg'
  };

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          alt="thumbnail"
          width="220"
          image={props.item.thumbnail} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.item.title}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Address: {props.item.address.street}, {props.item.address.city}, {props.item.address.state}, {props.item.address.postcode}, {props.item.address.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Property Type: {props.item.metadata.propertyType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div>
              Bedrooms:
            </div>
            <div className='flex flex-col flex-wrap gap-1'>
              {
                props.item.metadata.bedrooms.map((e, idx) => {
                  return (
                    <div key={idx}>
                      &nbsp;&nbsp;&nbsp;&nbsp;Type: {e.type} Number of beds: {e.number}
                    </div>
                  )
                })
              }
            </div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bathroom Number: {props.item.metadata.bathroomNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price per night: {props.item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <div className='flex flex-col gap-2 w-full justify-center items-center'>
            <div className='flex gap-1'>
              <Button size="small" onClick={() => setOpenEdit(true)}>Edit</Button>
              <Button size="small" onClick={deleteList}>Delete</Button>
              {published
                ? <Button size="small" onClick={unpublish}>Unpublish</Button>
                : <Button size="small" onClick={() => setOpenPublish(true)}>Publish</Button>}
            </div>
            <div className='flex justify-center'>
              <Button size="small" onClick={() => {
                setOpen(true);
                showBookings();
              }}>
                Manage Bookings
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col gap-3'>
            <div>
              Requests:
            </div>
            {
              listBooking.map((e, idx) => {
                if (parseInt(e.listingId) === parseInt(props.item.id) && e.status === 'pending') {
                  return (
                    <div key={idx} className='flex flex-col gap-1'>
                      <div>
                        Uesr: {e.owner}
                      </div>
                      <div>
                        From: {e.dateRange.start}
                      </div>
                      <div>
                        To: {e.dateRange.end}
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        <Button onClick={() => acceptBooking(e.id)}>
                          Accept
                        </Button>
                        <Button onClick={() => declineBooking(e.id)}>
                          Decline
                        </Button>
                      </div>
                    </div>
                  )
                } else {
                  return null;
                }
              })
            }
          </div>
        </Box>
      </Modal>
      <ListingEdit token={props.token} listingId={props.item.id} open={openEdit} setOpen={setOpenEdit} getList={props.getList} />
      <AvailableModal listingId={props.item.id} token={props.token} open={openPublish} setOpen={setOpenPublish} publish={openPublish} setPublished={setPublished} />
    </>
  );
}
