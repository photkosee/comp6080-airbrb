import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/material/DateRangePicker';
import { Button } from '@mui/material';

const AvailableModal = (props) => {
  const [range, setRange] = useState([
    { start: '', end: '' }
  ]);

  const handleOnChange = (e, idx) => {
    const data = [...range];
    data[idx][e.target.name] = e.target.value;
    setRange(data);
  }

  const add = () => {
    const newRange = { start: '', end: '' };
    setRange([...range, newRange]);
  }

  const deleteRange = (idx) => {
    const data = [...range];
    data.splice(idx, 1);
    setRange(data);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(range);
  }

  const handleClose = () => {
    props.setOpen(false);
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
                    <DateRangePicker
                      localeText={{ start: 'Start date', end: 'End date' }}
                      onChange={e => handleOnChange(e, idx)}
                    />
                    <Button onClick={() => deleteRange(idx)}>Delete</Button>
                  </div>
                )
              })
            }
            <Button onClick={add}>Add more</Button>
            <Button onClick={e => submit(e)}>Submit</Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default AvailableModal;
