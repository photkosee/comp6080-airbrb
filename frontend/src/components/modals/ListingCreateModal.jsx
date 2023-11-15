import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// converting an image file into date url
export function fileToDataUrl (file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
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

const ListingCreateModal = (props) => {
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathroomNumber, setBathroomNumber] = useState(0);
  const [propertyAmenities, setpropertyAmenities] = useState('');
  const [open, setOpen] = useState(false);
  const [bed, setBed] = useState([
    { type: '', number: 0 }
  ]);

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
    setOpen(true);
    setBed([
      { type: '', number: 0 }
    ]);
  }

  // upload image (thumbnail)
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

  // creating the new list
  const create = async (e) => {
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
    if (thumbnail && thumbnail !== null && thumbnail !== '') {
      imgVideo = thumbnail;
    } else {
      imgVideo = video;
    }

    e.preventDefault();
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
      alert(data.error);
    } else if (data.listingId) {
      props.getList();
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Host a new list</Button>

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
            <IconButton onClick={() => props.setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

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
              <label htmlFor="video" className="label-tw">
                Video Thumbnail
              </label>
              <input
                type="text"
                name="video"
                id="video"
                className="input-tw"
                placeholder='e.g. https://www.youtube.com/...'
                onChange={e => setVideo(e.target.value)}
              />
            </div>

            <div className='flex items-center gap-2'>
              <TextField
                label="Price per night ($)"
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

            <Button onClick={(e) => create(e)}>
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default ListingCreateModal;
