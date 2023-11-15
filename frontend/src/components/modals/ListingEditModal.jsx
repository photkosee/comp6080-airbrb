import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { fileToDataUrl } from './ListingCreateModal';
import { Button, TextField } from '@mui/material';

const ListingEditModal = (props) => {
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathroomNumber, setBathroomNumber] = useState('');
  const [propertyAmenities, setpropertyAmenities] = useState('');
  const [bed, setBed] = useState([
    { type: '', number: 0 }
  ]);

  // close the editing modal
  const handleClose = () => {
    props.setOpen(false);
  }

  // add more input boxes for more bedrooms
  const moreBedRoom = () => {
    const newBed = { type: '', number: 0 };
    setBed([...bed, newBed]);
  }

  // change number of bed accordingly
  const handleOnChangeNumBed = (e, idx) => {
    const data = [...bed];
    data[idx].number = e.target.value;
    setBed(data);
  }

  // change type of bed accordingly
  const handleOnChangeTypeBed = (e, idx) => {
    const data = [...bed];
    data[idx].type = e.target.value;
    setBed(data);
  }

  // delete an input boxes for beds
  const deleteBed = (idx) => {
    const data = [...bed];
    data.splice(idx, 1);
    setBed(data);
  }

  // dowloading an image
  const handleThumbnail = (e) => {
    fileToDataUrl(e.target.files[0]).then((data) => {
      setThumbnail(data);
    });
  }

  // style for MUI box
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 'lg',
    maxHeight: '100vh',
    overflowY: 'auto'
  };

  // editing event
  const edit = async (e) => {
    const metadata = {
      propertyType,
      bathroomNumber,
      bedrooms: bed,
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
    const response = await fetch(
      `http://localhost:5005/listings/${props.listingId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title, address, price, thumbnail, metadata
        }),
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

  return (
    <>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-2'>
            Edit a list
          </div>

          <form className='flex flex-col gap-2'>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <div className='flex justify-between gap-2'>
              <TextField
                label="Street"
                variant="outlined"
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
              />

              <TextField
                label="City"
                variant="outlined"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                label="State"
                variant="outlined"
                value={state}
                onChange={e => setState(e.target.value)}
                required
              />

              <TextField
                label="Postcode"
                variant="outlined"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                required
              />
            </div>

            <TextField
              label="Country"
              variant="outlined"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />

            <div className='flex items-center gap-2'>
              <label htmlFor="thumbnail" className="label-tw">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="input-tw"
                onChange={e => handleThumbnail(e)}
              />
            </div>

            <div className='flex items-center gap-2'>
              <TextField
                label="Price per night"
                variant="outlined"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                type='number'
              />

              <TextField
                label="Property type"
                variant="outlined"
                value={country}
                onChange={e => setPropertyType(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <div>Bedrooms:</div>

              {
                bed.map((input, idx) => {
                  return (
                    <div key={idx} className='flex gap-2'>
                      <TextField
                        label="Type of bed"
                        variant="outlined"
                        value={bed[idx].type}
                        onChange={e => handleOnChangeTypeBed(e, idx)}
                        required
                      />

                      <TextField
                        label="Number of beds"
                        variant="outlined"
                        value={bed[idx].number}
                        onChange={e => handleOnChangeNumBed(e, idx)}
                        required
                        type='number'
                      />

                      <Button onClick={() => deleteBed(idx)}>Delete</Button>
                    </div>
                  )
                })
              }

              <Button onClick={() => moreBedRoom()}>Add more beds</Button>
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                label="Number of bathrooms"
                variant="outlined"
                value={bathroomNumber}
                onChange={e => setBathroomNumber(e.target.value)}
                required
                type='number'
              />

              <TextField
                label="Property of Amentities"
                variant="outlined"
                value={propertyAmenities}
                onChange={e => setpropertyAmenities(e.target.value)}
                required
              />
            </div>

            <Button onClick={(e) => edit(e)}>
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ListingEditModal;