import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Card, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { style } from './ReviewModal';
import ListingCreateJsonModal from './ListingCreateJsonModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomErrorModal from './CustomErrorModal';

// converting an image file into date url
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const valid = validFileTypes.find(type => type === file.type);

  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });

  reader.readAsDataURL(file);

  return dataUrlPromise;
}

// a modal for inputting information when creating a list
const ListingCreateModal = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [video, setVideo] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathroomNumber, setBathroomNumber] = useState(0);
  const [propertyAmenities, setpropertyAmenities] = useState('');
  const [open, setOpen] = useState(false);
  const [openCreateJson, setOpenCreateJson] = useState(false);
  const [bed, setBed] = useState([
    { type: '', number: 1 }
  ]);

  // add more input boxes for more bedrooms
  const moreBedRoom = () => {
    const newBed = { type: '', number: 1 };
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

  // open the creating list modal and clear all previous datas
  const handleOpen = () => {
    setTitle('');
    setStreet('');
    setCity('');
    setState('');
    setPostcode('');
    setCountry('');
    setPrice('');
    setThumbnail(null);
    setVideo('');
    setPropertyType('');
    setBathroomNumber(0);
    setpropertyAmenities('');
    setBed([
      { type: '', number: 1 }
    ]);
    setOpen(true);
  }

  // upload image (thumbnail)
  const handleThumbnail = (e) => {
    fileToDataUrl(e.target.files[0]).then((data) => {
      setThumbnail(data);
    });
  }

  // check whether all required inputs are assigned
  const validateInput = () => {
    return !propertyType || bathroomNumber === '' || !title ||
      bed.some(obj => Object.values(obj).some(value => value === '')) ||
      !street || !city || !state || !postcode || !country ||
      !price || (!thumbnail && !video);
  }

  // creating the new list
  const create = async (e) => {
    e.preventDefault();

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

    let imgVideo = '';
    if (thumbnail) {
      imgVideo = thumbnail;
    } else {
      imgVideo = video;
    }

    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      body: JSON.stringify({
        title, address, price, thumbnail: imgVideo, metadata
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else if (data.listingId) {
      props.getList();
      setOpen(false);
      setError('');
      setOpenError(true);
    }
  }

  return (
    <>
      <Button data-testid="create-host" onClick={handleOpen} className="flex gap-2">
        Host a new list
        <AddCircleOutlineIcon fontSize="small" />
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-5'>
            Create a new list
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form className='flex flex-col gap-2'>
            <TextField
              label="Title"
              data-testid="create-title"
              variant="outlined"
              size="small"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <div className='flex justify-between gap-2'>
              <TextField
                label="Street"
                size="small"
                data-testid="create-street"
                variant="outlined"
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
              />

              <TextField
                label="City"
                data-testid="create-city"
                size="small"
                variant="outlined"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="create-state"
                label="State"
                size="small"
                variant="outlined"
                value={state}
                onChange={e => setState(e.target.value)}
                required
              />

              <TextField
                data-testid="create-postcode"
                label="Postcode"
                variant="outlined"
                size="small"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                required
              />
            </div>

            <TextField
              data-testid="create-country"
              label="Country"
              variant="outlined"
              size="small"
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />

            <Card className='p-2 mb-1'>
              <div className='flex flex-col'>
                <label htmlFor="thumbnail" className="label-tw">
                  Thumbnail image *
                </label>
                <input
                  data-testid="create-thumbnail-image"
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  className="input-tw"
                  onChange={e => handleThumbnail(e)}
                  disabled={video}
                />
              </div>

              <div className='flex justify-center mt-2 text-sm text-gray-400'>
                OR
              </div>

              <div className='flex flex-col'>
                <label htmlFor="video" className="label-tw">
                  Video Thumbnail *
                </label>
                <input
                  data-testid="create-thumbnail-video"
                  type="text"
                  name="video"
                  id="video"
                  className="input-tw"
                  placeholder='e.g. https://www.youtube.com/...'
                  onChange={e => setVideo(e.target.value)}
                  disabled={thumbnail}
                />
              </div>
            </Card>

            <div className='flex items-center gap-2'>
              <TextField
                data-testid="create-price"
                label="Price/night ($)"
                variant="outlined"
                size="small"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                type="number"
              />

              <TextField
                data-testid="create-property"
                label="Property type"
                variant="outlined"
                size="small"
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
                required
              />
            </div>

            <div className='flex flex-col'>
              <div className='mb-1'>Bedrooms:</div>
              <div className='flex flex-col gap-2'>
                {
                  bed.map((input, idx) => {
                    return (
                      <div key={idx} className='flex gap-2'>
                        <TextField
                          data-testid="create-bed-type"
                          label="Type"
                          variant="outlined"
                          size="small"
                          value={bed[idx].type}
                          onChange={e => handleOnChangeTypeBed(e, idx)}
                          required
                        />

                        <TextField
                          data-testid="create-bed-number"
                          label="# of beds"
                          variant="outlined"
                          size="small"
                          value={bed[idx].number}
                          onChange={e => handleOnChangeNumBed(e, idx)}
                          required
                          type="number"
                        />

                        <Button onClick={() => deleteBed(idx)}>Delete</Button>
                      </div>
                    )
                  })
                }
              </div>

              <Button onClick={() => moreBedRoom()}>Add more beds</Button>
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="create-bathroom-number"
                label="Number of bathrooms"
                variant="outlined"
                size="small"
                value={bathroomNumber}
                onChange={e => setBathroomNumber(e.target.value)}
                required
                type="number"
              />

              <TextField
                data-testid="create-amentities"
                label="Amentities"
                variant="outlined"
                size="small"
                value={propertyAmenities}
                onChange={e => setpropertyAmenities(e.target.value)}
              />
            </div>

            <Button data-testid="create-submit" onClick={(e) => create(e)} disabled={validateInput()}>
              Create
            </Button>
            <Button onClick={() => setOpenCreateJson(true)}>
              or Create with a JSON file
            </Button>
          </form>
        </Box>
      </Modal>

      <ListingCreateJsonModal
        getList={() => props.getList()}
        open={openCreateJson}
        setOpen={setOpenCreateJson}
        setAllOpen={setOpen}
      />

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default ListingCreateModal;
