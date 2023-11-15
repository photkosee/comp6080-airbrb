// This file can be deleted if you'd like
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvailableModal from './components/AvailableModal';
import { Button } from '@mui/material';

test('renders available modal', async () => {
  render(
    <AvailableModal
      listingId={''}
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
  const deleteButtons = screen.getAllByText(/delete/i);
  expect(text).toBeInTheDocument();

  const addButton = screen.getByText('Add more');
  userEvent.click(addButton);
  setTimeout(() => {
    expect(deleteButtons.length).toBeGreaterThan(1);
  }, 1000);
  userEvent.click(addButton);
  setTimeout(() => {
    expect(deleteButtons.length).toBeGreaterThan(2);
  }, 1000);

  setTimeout(() => {
    const deleteButton = screen.getByText('delete');
    userEvent.click(deleteButton);
    setTimeout(() => {
      const deletedButton = screen.queryByText('delete');
      expect(deletedButton).toBeNull();
    }, 1000);
  }, 1000);
});
