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
              <form>
                <label htmlFor="topbar-search" className="sr-only">Search</label>
                <div className="relative mt-1 lg:w-60 sm:w-40">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/> </svg>
                  </div>
                  <input type="text" name="search" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                </div>
              </form>
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
