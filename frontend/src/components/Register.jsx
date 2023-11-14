import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // registering event
  const register = async () => {
    if (password === setConfirmPassword) {
      const response = await fetch('http://localhost:5005/user/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name
        }),
        headers: {
          'Content-type': 'application/json',
        }
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        props.setToken(data.token);
        navigate('/');
      }
    } else {
      alert('Passwords not mathcing')
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up your account
              </h1>

              <form className="space-y-4 md:space-y-6 flex flex-col" action="#">
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  type='email'
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  type='password'
                />

                <TextField
                  label="Confirm your password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  type='password'
                />

                <Button
                  onClick={e => {
                    e.preventDefault();
                    register();
                  }}
                >
                  Register
                </Button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?&nbsp;
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => navigate('/login')}
                  >Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register;
