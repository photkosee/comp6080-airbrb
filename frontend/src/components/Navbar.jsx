import { Button } from '@mui/material';
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
      <header className="antialiased">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              {
                props.page.includes('/listing/') &&
                <Button onClick={() => navigate('/')}>
                  Back
                </Button>
              }

              {
                props.page.includes('/dashboard/') &&
                <Button onClick={() => navigate('/dashboard')}>
                  Back
                </Button>
              }
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {
                localStorage.getItem('token') && props.page === '/' &&
                  <>
                    <Button onClick={() => navigate('dashboard')}>
                      Switch to hosting
                    </Button>
                  </>
              }

              {
                localStorage.getItem('token') && props.page === '/dashboard' &&
                  <>
                    <Button onClick={() => navigate('/')}>
                      Switch to traveling
                    </Button>
                  </>
              }

              {
                localStorage.getItem('token')
                  ? <>
                      <Button onClick={logout}>
                        Log out
                      </Button>
                    </>
                  : <>
                      <Button onClick={() => navigate('/login')}>
                        Log in
                      </Button>
                    </>
              }
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
