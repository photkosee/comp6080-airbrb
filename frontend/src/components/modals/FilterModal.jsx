import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton, InputLabel, NativeSelect, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';

// a modal for selecting filters
const FilterModal = (props) => {
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
            Select fiter(s)
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => props.setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='flex flex-col flex-wrap gap-2 w-full'>
            <div className="relative flex flex-col items-center gap-1">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={e => {
                    props.setDateMin(e.$d);
                    localStorage.setItem('dateMin', e.$d);
                  }}
                  label="Check in"
                />

                <DatePicker
                  onChange={e => {
                    props.setDateMax(e.$d);
                    localStorage.setItem('dateMax', e.$d);
                  }}
                  label="Check out"
                />
              </LocalizationProvider>
            </div>

            <TextField
              label="Number of beds"
              variant="outlined"
              type="number"
              size="small"
              value={props.bedroomNumber}
              onChange={e => props.setBedroomNumber(e.target.value)}
            />

            <div className="relative flex items-center gap-1">
              <TextField
                label="Min Price ($)"
                variant="outlined"
                value={props.priceMin}
                type="number"
                size="small"
                onChange={e => props.setPriceMin(e.target.value)}
              />

              <TextField
                label="Max Price ($)"
                variant="outlined"
                type="number"
                size="small"
                value={props.priceMax}
                onChange={e => props.setPriceMax(e.target.value)}
              />
            </div>

            <InputLabel id="demo-simple-select-label">
              Sort by ratings
            </InputLabel>
            <NativeSelect
              onChange={props.handleSort}
              value={props.sort}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >
              <option value={0}>&nbsp;None</option>
              <option value={10}>&nbsp;Highest - Lowest</option>
              <option value={20}>&nbsp;Lowest - Highest</option>
            </NativeSelect>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default FilterModal;
