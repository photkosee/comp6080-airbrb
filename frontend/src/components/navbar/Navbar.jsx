import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RoofingIcon from '@mui/icons-material/Roofing';
import ReplyIcon from '@mui/icons-material/Reply';
import CustomErrorModal from '../modals/CustomErrorModal';

// a navbar for all pages except login/register
export const Navbar = (props) => {
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');

  // logging out event, clear all localStorage
  const logout = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('dateMin');
      localStorage.removeItem('dateMax');
      props.setToken('');
      navigate('/');
    }
  };

  const style = {
    position: 'fixed',
    flexGrow: 1,
    width: '100%',
    zIndex: 100,
    top: 0
  };

  return (
    <>
      <Box sx={style}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div"
              role="button"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate('/')}
            >
              AirBrB
            </Typography>

            {
              props.page.includes('/listing/') &&
              <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                onClick={() => navigate('/')}
              >
                <ReplyIcon fontSize="small" />
                Back
              </Button>
            }

            {
              props.page.includes('/dashboard/') &&
              <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                onClick={() => navigate('/dashboard')}
              >
                <ReplyIcon fontSize="small" />
                Back
              </Button>
            }

            {
              localStorage.getItem('token') && props.page === '/' &&
                <>
                  <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                    onClick={() => navigate('dashboard')}
                  >
                    <RoofingIcon fontSize="small" />
                    Hosting
                  </Button>
                </>
            }

            {
              localStorage.getItem('token') && props.page === '/dashboard' &&
                <>
                  <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                    onClick={() => navigate('/')}
                  >
                    <TravelExploreIcon fontSize="small" />
                    Traveling
                  </Button>
                </>
            }

            {
              localStorage.getItem('token')
                ? <>
                    <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                      onClick={logout}
                    >
                      Log out
                      <LogoutIcon fontSize="small" />
                    </Button>
                  </>
                : <>
                    <Button color="inherit" className="flex flex-wrap gap-1 items-center"
                      onClick={() => navigate('/login')}
                    >
                      Log in
                      <LoginIcon />
                    </Button>
                  </>
            }
          </Toolbar>
        </AppBar>
      </Box>

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}
