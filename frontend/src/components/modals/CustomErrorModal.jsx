import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { style } from './ReviewModal';

// a cutom error modal showing custom error message
const CustomErrorModal = (props) => {
  return (
    <>
      <Modal
        open={props.openError}
        onClose={() => props.setOpenError(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-lg font-bold mb-5">
            {props.error ? 'Error' : 'Success'}
          </div>

          <Box className="absolute top-2 right-2">
            <IconButton onClick={() => props.setOpenError(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className="flex flex-col flex-wrap gap-2 w-full">
            <Typography variant="body2" color="text.secondary">
              {props.error}
            </Typography>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CustomErrorModal;
