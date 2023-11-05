import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

  const create = async (e) => {
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

    e.preventDefault();
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
    e.target.reset();
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
          <div className='text-lg font-bold mb-2'>
            Create a new list
          </div>
          <form className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white">Title</label>
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
            </div>
            <div className='flex justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <label htmlFor="street" className="block text-sm font-medium text-gray-900 dark:text-white">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="city" className="block text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <label htmlFor="state" className="block text-sm font-medium text-gray-900 dark:text-white">State</label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-900 dark:text-white">Postcode</label>
                <input
                  type="number"
                  name="postcode"
                  id="postcode"
                  placeholder="postcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor="country" className="block text-sm font-medium text-gray-900 dark:text-white">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-900 dark:text-white">Thumbnail</label>
              <input
                type="img"
                name="thumbnail"
                id="thumbnail"
                placeholder="thumbnail"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={thumbnail}
                onChange={e => setThumbnail(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor="price" className="block text-sm font-medium text-gray-900 dark:text-white">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-900 dark:text-white">Property Type</label>
              <input
                type="text"
                name="propertyType"
                id="propertyType"
                placeholder="property type"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
              />
            </div>
            <div className='flex justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <label htmlFor="propertyBedrooms" className="block text-sm font-medium text-gray-900 dark:text-white">Property of Bedrooms</label>
                <input
                  type="text"
                  name="propertyBedrooms"
                  id="propertyBedrooms"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={propertyBedrooms}
                  onChange={e => setPropertyBedrooms(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-900 dark:text-white">Number of Bathrooms</label>
                <input
                  type="number"
                  name="bedNumber"
                  id="bedNumber"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={bedNumber}
                  onChange={e => setBedNumber(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-between gap-2'>
              <div className='flex items-center gap-2'>
                <label htmlFor="bathroomNumber" className="block text-sm font-medium text-gray-900 dark:text-white">Number of Bathrooms</label>
                <input
                  type="number"
                  name="bathroomNumber"
                  id="bathroomNumber"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={bathroomNumber}
                  onChange={e => setBathroomNumber(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor="propertyAmenities" className="block text-sm font-medium text-gray-900 dark:text-white">Property of Amentities</label>
                <input
                  type="text"
                  name="propertyAmenities"
                  id="propertyAmenities"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={propertyAmenities}
                  onChange={e => setpropertyAmenities(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={(e) => {
                create(e);
                handleClose();
              }}
            >
              Create
            </button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ListingCreate
