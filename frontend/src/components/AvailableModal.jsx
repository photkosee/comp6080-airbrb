import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { style } from './ReviewModal';

const AvailableModal = (props) => {
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
        alert('invalid time');
      }
    }

    handleClose();
    const response = await fetch(`http://localhost:5005/listings/publish/${props.listingId}`, {
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
      alert(data.error);
    } else {
      props.setPublished(true);
    }
  }

  // close this modal
  const handleClose = () => {
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
          <div className='text-lg font-bold mb-2'>
            Pick availabiity date range(s)
          </div>

          <form className='flex flex-col gap-2'>
            {
              range.map((input, idx) => {
                return (
                  <div key={idx} className='flex'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={e => {
                          handleOnChangeStart(e, idx);
                        }}
                      />

                      <DatePicker
                        onChange={e => {
                          handleOnChangeEnd(e, idx);
                        }}
                      />
                    </LocalizationProvider>

                    <Button onClick={() => deleteRange(idx)}>Delete</Button>
                  </div>
                )
              })
            }

            <Button onClick={() => add()}>Add more</Button>
            <Button onClick={e => submit(e)}>Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default AvailableModal;
