import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Input, Rating } from '@mui/material';

// style for MUI box
export const style = {
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

const ReviewModal = (props) => {
  return (
    <>
      <Modal
        open={props.openReview}
        onClose={() => props.setOpenReview(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col flex-wrap gap-2 w-full'>
            <Rating
              name="half-rating"
              value={parseFloat(props.rate)}
              onChange={e => props.setRate(parseFloat(e.target.value))}
              precision={1}
            />

            <Input
              type='text'
              value={props.text}
              onChange={e => props.setText(e.target.value)}
            />

            <Button onClick={() => { props.uploadReview() }}>
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ReviewModal;
