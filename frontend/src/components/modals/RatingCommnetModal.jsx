import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const RatingCommentModal = (props) => {
  return (
    <>
      <Modal
        open={props.openRateTooltip}
        onClose={() => props.setOpenRateTooltip(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-5'>
            View comment(s)
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => props.setOpenRateTooltip(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <div className='flex flex-col flex-wrap gap-3 w-full'>
            {
              props.reviews.filter(e => parseInt(e.rating) === props.tooltipRate).length > 0
                ? <div>
                    <div className='flex flex-col gap-1'>
                      {
                        props.reviews.filter(e => parseInt(e.rating) === props.tooltipRate)
                          .map((e, idx) => {
                            return (
                              <div key={idx} className='flex flex-wrap'>
                                &nbsp;&nbsp;&nbsp;&nbsp;{e.owner} : {e.comment}
                              </div>
                            )
                          })
                      }
                    </div>
                  </div>
                : <div>No comments</div>
            }
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default RatingCommentModal;
