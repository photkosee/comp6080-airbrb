import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton, Input, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

// style for MUI box
export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 390,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 'lg',
  maxHeight: '100vh',
  overflowY: 'auto'
};

// a modal for leaving users' feedback and rating
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
          <div className="text-lg font-bold mb-5">
            Leave your Feedback
          </div>

          <Box className="absolute top-2 right-2">
            <IconButton onClick={() => props.setOpenReview(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className="flex flex-col flex-wrap gap-2 w-full">
            Rating:
            <Rating
              name="half-rating"
              value={parseFloat(props.rate)}
              onChange={e => props.setRate(parseFloat(e.target.value))}
              precision={1}
              data-testid="rating"
            />

            Comments:
            <Input
              type="text"
              value={props.text}
              onChange={e => props.setText(e.target.value)}
            />

            <Button onClick={() => { props.uploadReview() }} className="flex gap-2">
              Send
              <SendIcon fontSize="small" />
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ReviewModal;
