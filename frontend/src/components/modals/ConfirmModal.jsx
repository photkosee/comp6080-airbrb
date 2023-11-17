import React from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';

// a modal confirming an action before taken
const ConfirmModal = (props) => {
  return (
    <>
      <Modal
        open={props.openConfirm}
        onClose={() => props.setOpenConfirm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-lg font-bold mb-5">
            Please confirm your action
          </div>

          <Box className="absolute top-2 right-2">
            <IconButton onClick={() => props.setOpenConfirm(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className="flex flex-col flex-wrap gap-2 w-full">
            <div className="relative flex flex-col items-start gap-5">
              <Typography variant="body2" color="text.secondary">
                {props.message}
              </Typography>

              <Button data-testid="confirm" className="w-full" onClick={() => props.confirm()}>
                Confirm
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ConfirmModal;
