import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { style } from './ReviewModal';

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
          <div className='flex flex-col flex-wrap gap-3 w-full'>
            <div className='flex flex-col items-start'>
              {
                [0, 1, 2, 3, 4, 5].map((num, idx) => {
                  return (
                    <div className='flex flex-wrap gap-5 items-center' key={idx}>
                      <Button onClick={() => {
                        props.setTooltipRate(num);
                        props.setOpenRateTooltip(true);
                      }}>
                        {num}
                      </Button>

                      <div>
                        {props.reviews.filter(e => parseInt(e.rating) === num).length}
                        &nbsp;Rated
                      </div>

                      <div>
                        {props.reviews.length === 0
                          ? 0
                          : ((props.reviews.filter(e =>
                              parseInt(e.rating) === num).length / props.reviews.length) *
                                100).toFixed(2)
                        } %
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
  )
}

export default TooltipModal;
