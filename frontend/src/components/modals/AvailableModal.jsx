import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';
import CustomErrorModal from './CustomErrorModal';

// a modal selecting available date range before submitting
const AvailableModal = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [range, setRange] = useState([
    { start: '', end: '' }
  ]);

  // set the start date accordingly
  const handleOnChangeStart = (e, idx) => {
    const data = [...range];
    data[idx].start = e.$d;
    setRange(data);
  }

  // set the end date accordingly
  const handleOnChangeEnd = (e, idx) => {
    const data = [...range];
    data[idx].end = e.$d;
    setRange(data);
  }

  // add new input boxes for new available dates
  const add = () => {
    const newRange = { start: '', end: '' };
    setRange([...range, newRange]);
  }

  // delete the input boxes
  const deleteRange = (idx) => {
    const data = [...range];
    data.splice(idx, 1);
    setRange(data);
  }

  // publishing the list
  const submit = async (e) => {
    e.preventDefault();

    for (const date of range) {
      const start = new Date(date.start);
      const end = new Date(date.end);

      if (end.getTime() < start.getTime()) {
        setError('invalid time');
        setOpenError(true);
      }
    }

    handleClose();
    const response = await fetch(
      `http://localhost:5005/listings/publish/${props.listingId}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          availability: range
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
      props.setPublished(true);
    }
  }

  // close this modal
  const handleClose = () => {
    setRange([{ start: '', end: '' }]);
    props.setOpen(false);
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-5'>
            Pick available range(s)
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form className='flex flex-col gap-3'>
            {
              range.map((input, idx) => {
                return (
                  <div key={idx} className='flex flex-col gap-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        data-testid="publish-in"
                        onChange={e => {
                          handleOnChangeStart(e, idx);
                        }}
                        label='Check in'
                      />

                      <DatePicker
                        data-testid="publish-out"
                        onChange={e => {
                          handleOnChangeEnd(e, idx);
                        }}
                        label='Check out'
                      />
                    </LocalizationProvider>

                    <Button onClick={() => deleteRange(idx)}>Delete</Button>
                  </div>
                )
              })
            }

            <Button onClick={() => add()}>Add more</Button>
            <Button
              onClick={e => submit(e)}
              data-testid="publish-submit"
              disabled={
                range.some(obj => Object.values(obj).some(value => value === ''))
              }
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default AvailableModal;
