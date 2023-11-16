import React from 'react';

import { Alert, Snackbar } from '@mui/material';

// a cutom error modal showing custom error message
const CustomErrorModal = (props) => {
  return (
    <>
      <Snackbar
        open={props.openError}
        autoHideDuration={5000}
        onClose={() => props.setOpenError(false)}
      >
        <Alert
          onClose={() => props.setOpenError(false)}
          severity={props.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {props.error ? props.error : 'success'}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomErrorModal;
