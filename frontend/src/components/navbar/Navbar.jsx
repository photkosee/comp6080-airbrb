import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
  const navigate = useNavigate();

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
      alert(data.error);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('dateMin');
      localStorage.removeItem('dateMax');
      props.setToken('');
      navigate('/');
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => navigate('/')}
            >
              AirBrB
            </Typography>

            {
              props.page.includes('/listing/') &&
              <Button color="inherit" onClick={() => navigate('/')}>
                Back
              </Button>
            }

            {
              props.page.includes('/dashboard/') &&
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Back
              </Button>
            }

            {
              localStorage.getItem('token') && props.page === '/' &&
                <>
                  <Button color="inherit" onClick={() => navigate('dashboard')}>
                    Switch to hosting
                  </Button>
                </>
            }

            {
              localStorage.getItem('token') && props.page === '/dashboard' &&
                <>
                  <Button color="inherit" onClick={() => navigate('/')}>
                    Switch to traveling
                  </Button>
                </>
            }

            {
              localStorage.getItem('token')
                ? <>
                    <Button color="inherit" onClick={logout}>
                      Log out
                    </Button>
                  </>
                : <>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                      Log in
                    </Button>
                  </>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
