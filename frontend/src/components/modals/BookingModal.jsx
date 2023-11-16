import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';

// a modal picking stay range when booking
const BookingModal = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-5'>
            Book your stay
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => props.setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='flex flex-col flex-wrap gap-2 w-full'>
            <div className="relative flex flex-col items-center gap-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={e => {
                    props.setDateMin(e.$d);
                    localStorage.setItem('dateMin', e.$d);
                  }}
                  label='Check in'
                />

                <DatePicker
                  onChange={e => {
                    props.setDateMax(e.$d);
                    localStorage.setItem('dateMax', e.$d);
                  }}
                  label='Check out'
                />
              </LocalizationProvider>
              <Button onClick={() => { props.confirmBook() }}>
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default BookingModal;
