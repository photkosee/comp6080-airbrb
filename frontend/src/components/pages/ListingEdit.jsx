import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Navbar } from '../navbar/Navbar';
import { Box, Button, Card, TextField } from '@mui/material';
import CustomErrorModal from '../modals/CustomErrorModal';
import { fileToDataUrl } from '../modals/ListingCreateModal';

// a page edting a list
const ListingEdit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [video, setVideo] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bathroomNumber, setBathroomNumber] = useState('');
  const [propertyAmenities, setpropertyAmenities] = useState('');
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

  // dowloading an image
  const handleThumbnail = (e) => {
    if (e.target.files[0]) {
      fileToDataUrl(e.target.files[0]).then((data) => {
        setThumbnail(data);
      });
    } else {
      setThumbnail('');
    }
  }

  // check whether all required inputs are assigned
  const validateInput = () => {
    return !propertyType || bathroomNumber === '' || !title ||
      bed.some(obj => Object.values(obj).some(value => value === '')) ||
      !street || !city || !state || !postcode || !country ||
      !price || (!thumbnail && !video);
  }

  // editing event
  const edit = async (e) => {
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

    const response = await fetch(
      `http://localhost:5005/listings/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title, address, price, imgVideo, metadata
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
    } else {
      setError('');
      setOpenError(true);
      navigate('/dashboard');
    }
  }

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page={`/edit/${props.id}`}
      />

      <div className='flex flex-wrap gap-5 justify-center mt-16 pb-5 pt-5'>
        <Box className="px-3">
          <div className='text-lg font-bold mb-5'>
            Edit this list
          </div>

          <form className='flex flex-col gap-2'>
            <TextField
              data-testid="edit-title"
              label="Title"
              variant="outlined"
              size="small"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="edit-street"
                label="Street"
                variant="outlined"
                size="small"
                value={street}
                onChange={e => setStreet(e.target.value)}
                required
              />

              <TextField
                data-testid="edit-city"
                label="City"
                variant="outlined"
                size="small"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="edit-state"
                label="State"
                variant="outlined"
                size="small"
                value={state}
                onChange={e => setState(e.target.value)}
                required
              />

              <TextField
                data-testid="edit-postcode"
                label="Postcode"
                variant="outlined"
                size="small"
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                required
              />
            </div>

            <TextField
              data-testid="edit-country"
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
                  data-testid="edit-thumbnail-image"
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
                  data-testid="edit-thumbnail-video"
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

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="edit-price"
                label="Price/night ($)"
                variant="outlined"
                size="small"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
                type='number'
              />

              <TextField
                data-testid="edit-property"
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
                          data-testid="edit-bed-type"
                          label="Type"
                          variant="outlined"
                          size="small"
                          value={bed[idx].type}
                          onChange={e => handleOnChangeTypeBed(e, idx)}
                          required
                        />

                        <TextField
                          data-testid="edit-bed-number"
                          label="# of beds"
                          variant="outlined"
                          size="small"
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
              </div>

              <Button onClick={() => moreBedRoom()}>Add more beds</Button>
            </div>

            <div className='flex justify-between gap-2'>
              <TextField
                data-testid="edit-bathroom-number"
                label="Number of bathrooms"
                variant="outlined"
                size="small"
                value={bathroomNumber}
                onChange={e => setBathroomNumber(e.target.value)}
                required
                type='number'
              />

              <TextField
                data-testid="edit-amentities"
                label="Amentities"
                variant="outlined"
                size="small"
                value={propertyAmenities}
                onChange={e => setpropertyAmenities(e.target.value)}
              />
            </div>

            <Button data-testid="edit-submit" onClick={(e) => edit(e)} disabled={validateInput()}>
              Confirm
            </Button>
          </form>
        </Box>

        <CustomErrorModal
          error={error}
          openError={openError}
          setOpenError={setOpenError}
        />
      </div>
    </>
  );
}

export default ListingEdit;
