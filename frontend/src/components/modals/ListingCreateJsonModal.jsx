import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { style } from './ReviewModal';

const ListingCreateJsonModal = (props) => {
  // a promise to read the uploaded file
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const result = JSON.parse(e.target.result);
          resolve(result);
        } catch (parseError) {
          reject(parseError);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  // creating the new list
  const create = async (jsonObj) => {
    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      body: jsonObj,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listingId) {
      props.getList();
      props.setOpen(false);
      props.setAllOpen(false);
    }
  };

  // read the file when a user uploaded and create the list accordingly
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const jsonObj = await readFile(file);
        create(jsonObj);
      } catch (error) {
        alert('error json file')
      }
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-lg font-bold mb-5'>
            Upload your JSON file
          </div>

          <Box className='absolute top-2 right-2'>
            <IconButton onClick={() => props.setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <input type="file" className="input-tw"
                accept=".json,application/json"
                onChange={handleFileUpload}
              />
            </div>

            <Button onClick={(e) => create(e)}>
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default ListingCreateJsonModal;
