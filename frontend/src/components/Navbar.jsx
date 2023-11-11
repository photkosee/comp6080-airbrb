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
            </div>

            <div className="flex items-center lg:order-2">
              {
                props.token && props.page === '/' &&
                  <>
                    <button
                      type="button"
                      className="sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      onClick={() => navigate('dashboard')}
                    >
                      Switch to hosting
                    </button>
                  </>
              }

              {
                props.token && props.page === '/dashboard' &&
                  <>
                    <button
                      type="button"
                      className="sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      onClick={() => navigate('/')}
                    >
                      Switch to traveling
                    </button>
                  </>
              }

              {
                props.token
                  ? <>
                  <button
                    type="button"
                    className="sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </>
                  : <>
                  <button
                    type="button"
                    className="sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    onClick={() => navigate('/login')}
                  >
                    Log in
                  </button>
                </>
              }
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
