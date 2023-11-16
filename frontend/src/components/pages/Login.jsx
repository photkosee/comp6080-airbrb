import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomErrorModal from '../modals/CustomErrorModal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material';

// a login page
const Login = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // logging in event
  const login = async () => {
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);
      props.setToken(data.token);
      navigate('/');
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col items-center justify-center px-6 py-8
            mx-auto md:h-screen lg:py-0"
        >
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0
              sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1
                className="text-xl font-bold leading-tight tracking-tight text-gray-900
                  md:text-2xl dark:text-white"
              >
                Sign in to your account
              </h1>

              <form className="space-y-4 md:space-y-6 flex flex-col" action="#">
                <TextField
                  label="Email"
                  data-testid="login-email"
                  variant="outlined"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  type='email'
                />

                <FormControl sx={{ width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <OutlinedInput
                    id="login-password"
                    data-testid="login-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(prev => !prev)}
                          onMouseDown={e => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <Button
                  data-testid="login-submit"
                  onClick={e => {
                    e.preventDefault();
                    login();
                  }}
                  disabled={!email || !password}
                >
                  Sign in
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account yet?&nbsp;
                  <a
                    href="#"
                    data-testid="login-register"
                    className="font-medium text-primary-600 hover:underline
                      dark:text-primary-500"
                    onClick={() => navigate('/register')}
                  >Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default Login;
