import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, IconButton, Typography } from '@mui/material';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import StarIcon from '@mui/icons-material/Star';

// a modal viewing overall ratings (statistically)
const TooltipModal = (props) => {
  return (
    <>
      <Modal
        open={props.openTooltip}
        onClose={() => props.setOpenTooltip(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-lg font-bold mb-5">
            Feedback
          </div>

          <Box className="absolute top-2 right-2">
            <IconButton onClick={() => props.setOpenTooltip(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className="flex flex-col flex-wrap gap-3 w-full">
            <div className="flex flex-col items-start">
              {
                [0, 1, 2, 3, 4, 5].map((num, idx) => {
                  return (
                    <div
                      className="flex flex-wrap gap-5 items-center justify-between w-full"
                      key={idx}
                    >
                      <Button
                        onClick={() => {
                          props.setTooltipRate(num);
                          props.setOpenRateTooltip(true);
                        }}
                        className="flex gap-2 items-center justify-center"
                      >
                        {num} Star
                        <StarIcon fontSize="small" className="mb-1" />
                      </Button>

                      <Typography variant="body2" color="text.secondary">
                        {props.reviews.filter(e => parseInt(e.rating) === num).length}
                        &nbsp;Rated
                      </Typography>

                      <div>
                        {props.reviews.length === 0
                          ? <CircularProgressWithLabel value={0} />
                          : <CircularProgressWithLabel
                              value={((props.reviews.filter(e =>
                                parseInt(e.rating) === num).length /
                                  props.reviews.length) * 100)
                              }
                            />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default TooltipModal;
