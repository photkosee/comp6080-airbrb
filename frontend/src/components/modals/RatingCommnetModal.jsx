import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { style } from './ReviewModal';
import CloseIcon from '@mui/icons-material/Close';
import { Card, IconButton, Rating, Typography } from '@mui/material';

// a modal for viewing users' feedback and rating
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
                              <Card key={idx}>
                                <Typography variant="body5" component="div" className='px-2'>
                                  {e.owner}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='px-2'>
                                  {e.comment}
                                </Typography>

                                <Rating
                                  name="read-rating"
                                  value={parseInt(e.rating)}
                                  size="small"
                                  precision={0.1}
                                  readOnly
                                  className='p-1'
                                />
                              </Card>
                            );
                          })
                      }
                    </div>
                  </div>
                : <div>No reviews</div>
            }
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default RatingCommentModal;
