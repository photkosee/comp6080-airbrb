import React from 'react';

import Box from '@mui/material/Box';
import { Button, Fade, IconButton, Paper, Popper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import StarIcon from '@mui/icons-material/Star';

// a modal viewing overall ratings (statistically)
const TooltipModal = (props) => {
  return (
    <>
      <Popper
        sx={{ m: 1, zIndex: 1 }}
        open={props.openTooltip}
        placement="bottom"
        anchorEl={props.target}
        transition
        onClick={e => e.stopPropagation()}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Box sx={{ maxWidth: 300, p: 2 }}>
                <div className="text-lg font-bold mb-2">
                  Feedback
                </div>

                <div className="text-sm text-gray-400 mb-2">
                  Total rated: {props.reviews.length}
                </div>

                <Box className="absolute top-2 right-2">
                  <IconButton
                    onClick={e => {
                      e.stopPropagation();
                      props.setOpenTooltip(false);
                    }}
                    data-testid="closeTool"
                  >
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
                              onClick={e => {
                                e.stopPropagation();
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
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default TooltipModal;
