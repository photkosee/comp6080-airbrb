import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      localStorage.setItem('token', '');
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
                props.page === '/' &&
                <form>
                  <label htmlFor="topbar-search" className="sr-only">Search</label>
                </form>
              }
              {
                props.page.includes('/listing/') &&
                <Button onClick={() => navigate('/')}>
                  Back
                </Button>
              }
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {
                props.token && props.page === '/' &&
                  <>
                    <Button
                      onClick={() => navigate('dashboard')}
                    >
                      Switch to hosting
                    </Button>
                  </>
              }

              {
                props.token && props.page === '/dashboard' &&
                  <>
                    <Button
                      onClick={() => navigate('/')}
                    >
                      Switch to traveling
                    </Button>
                  </>
              }

              {
                props.token
                  ? <>
                  <Button
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </>
                  : <>
                  <Button
                    onClick={() => navigate('/login')}
                  >
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
