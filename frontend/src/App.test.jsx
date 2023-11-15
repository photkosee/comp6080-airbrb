// This file can be deleted if you'd like
import React from 'react';
import { render, screen } from '@testing-library/react';
// import App from './App';
// import Login from './components/Login';
// import PageList from './PageList';
// import { Router } from 'react-router-dom';
import AvailableModal from './components/AvailableModal';
import { Button } from '@mui/material';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/o/i); // random letter
//   expect(linkElement).toBeInTheDocument();
// });

test('renders available modal', () => {
  render(
    <AvailableModal
      listingId={''}
      token={localStorage.getItem('token')}
      open={true}
      setOpen={() => {}}
      publish={() => {}}
      setPublished={() => {}}
    />
  );
  const text = screen.getByText(/Pick availabiity date range/i);
  expect(text).toBeInTheDocument();
  const add = screen.getByRole('button', { name: /Add more/i });
  expect(add).toBeInTheDocument();
  const submit = screen.getByRole('button', { name: /Submit/i });
  expect(submit).toBeInTheDocument();
  render(<Button name="Add more" />);
  screen.debug();
});
