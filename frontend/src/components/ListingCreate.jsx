import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ListingCreate = (props) => {
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [bathroomNumber, setBathroomNumber] = React.useState('');
  const [propertyBedrooms, setPropertyBedrooms] = React.useState('');
  const [bedNumber, setBedNumber] = React.useState('');
  const [propertyAmenities, setpropertyAmenities] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

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

  const create = async () => {
    const metadata = {
      propertyType,
      bathroomNumber,
      propertyBedrooms,
      bedNumber,
      propertyAmenities
    }

    const address = {
      street,
      city,
      state,
      postcode,
      country
    }

    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      body: JSON.stringify({
        title, address, price, thumbnail, metadata
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listingId) {
      props.getList();
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Create New Listing Now!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a New Listing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            street
              <input type="text" value={street} onChange={e => setStreet(e.target.value)} /><br />
            city
              <input type="text" value={city} onChange={e => setCity(e.target.value)} /><br />
            state
              <input type="text" value={state} onChange={e => setState(e.target.value)} /><br />
            postcode
              <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} /><br />
            country
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} /><br />
            Thumbnail
              <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} /><br />
            Price
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} /><br />
            Property Type
              <input type="text" value={propertyType} onChange={e => setPropertyType(e.target.value)} /><br />
            Number of Bathrooms
              <input type="text" value={bathroomNumber} onChange={e => setBathroomNumber(e.target.value)} /><br />
            Property of bedrooms
              <input type="text" value={propertyBedrooms} onChange={e => setPropertyBedrooms(e.target.value)} /><br />
            Number of beds
              <input type="text" value={bedNumber} onChange={e => setBedNumber(e.target.value)} /><br />
            Property of Amenities
              <input type="text" value={propertyAmenities} onChange={e => setpropertyAmenities(e.target.value)} /><br />
            <button
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => {
                create();
                handleClose();
              }}
            >
              Create
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default ListingCreate
