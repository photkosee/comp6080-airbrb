import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListingEdit from './ListingEdit';
import AvailableModal from './AvailableModal';

export default function HostCard (props) {
  const [published, setPublished] = React.useState(props.item.published);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPublish, setOpenPublish] = React.useState(false);

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
  }

  // const publish = async () => {
  //   const response = await fetch(`http://localhost:5005/listings/publish/${props.item.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer ${props.token}`
  //     }
  //   });

  //   const data = await response.json();
  //   if (data.error) {
  //     alert(data.error);
  //   } else if (data.ok) {
  //     setPublished(true);
  //   }
  // }

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
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={props.thumbnail} />
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
          <Button size="small" onClick={() => setOpenEdit(true)}>Edit</Button>
          <Button size="small" onClick={deleteList}>Delete</Button>
          {published
            ? <Button size="small" onClick={unpublish}>Unpublish</Button>
            : <Button size="small" onClick={() => setOpenPublish(true)}>Publish</Button>}
        </CardActions>
      </Card>

      <ListingEdit token={props.token} listingId={props.item.id} open={openEdit} setOpen={setOpenEdit} getList={props.getList} />
      <AvailableModal listingId={props.item.id} token={props.token} open={openPublish} setOpen={setOpenPublish} publish={openPublish} setPublished={setPublished} />
    </>
  );
}
