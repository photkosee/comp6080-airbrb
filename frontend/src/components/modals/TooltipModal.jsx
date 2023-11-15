import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

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
          <div className='text-lg font-bold mb-5'>
            Feedback
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => props.setOpenTooltip(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='flex flex-col flex-wrap gap-3 w-full'>
            <div className='flex flex-col items-start'>
              {
                [0, 1, 2, 3, 4, 5].map((num, idx) => {
                  return (
                    <div className='flex flex-wrap gap-5 items-center justify-between w-full' key={idx}>
                      <Button onClick={() => {
                        props.setTooltipRate(num);
                        props.setOpenRateTooltip(true);
                      }}>
                        {num} Star
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
                                parseInt(e.rating) === num).length / props.reviews.length) * 100)
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
