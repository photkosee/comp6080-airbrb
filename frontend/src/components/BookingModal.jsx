import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { style } from './ReviewModal';

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
          <div className='flex flex-col flex-wrap gap-2 w-full'>
            <div className="relative flex flex-col items-center gap-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                Check In:&nbsp;
                <DatePicker
                  onChange={e => {
                    props.setDateMin(e.$d);
                    localStorage.setItem('dateMin', e.$d);
                  }}
                  label='dateMin'
                />
                Check Out:&nbsp;
                <DatePicker
                  onChange={e => {
                    props.setDateMax(e.$d);
                    localStorage.setItem('dateMax', e.$d);
                  }}
                  label='dateMax'
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
  )
}

export default BookingModal;
