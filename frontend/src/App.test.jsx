// This file can be deleted if you'd like
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import AvailableModal from './components/modals/AvailableModal';
import BookingModal from './components/modals/BookingModal';
import ReviewModal from './components/modals/ReviewModal';
import CustomErrorModal from './components/modals/CustomErrorModal';

// testing the modal for inputting the availability when publishing
test('Rendering available modal', async () => {
  render(
    <AvailableModal
      listingId={''}
      open={true}
      setOpen={() => {}}
      publish={() => {}}
      setPublished={() => {}}
    />
  );

  const text = screen.getByText(/Pick available range/i);
  expect(text).toBeInTheDocument();
  const add = screen.getByRole('button', { name: /Add more/i });
  expect(add).toBeInTheDocument();
  const submit = screen.getByRole('button', { name: /Submit/i });
  expect(submit).toBeInTheDocument();
  render(<Button name="Add more" />);
  const deleteButtons = screen.getByRole('button', { name: /Delete/i });
  expect(deleteButtons).toBeInTheDocument();

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

// testing the modal for inputting when booking a list
test('Rendering booking modal', async () => {
  render(
    <BookingModal
      open={true}
      setOpen={() => {}}
      setDateMin={() => {}}
      setDateMax={() => {}}
      confirmBook={() => {}}
    />
  );

  const book = screen.getByText(/Book your stay/i);
  expect(book).toBeInTheDocument();
  const confirm = screen.getByRole('button', { name: /Confirm/i });
  expect(confirm).toBeInTheDocument();
  const dateMin = screen.getByLabelText('Check in');
  const dateMax = screen.getByLabelText('Check out');
  userEvent.type(dateMin, '2023-01-01');
  userEvent.type(dateMax, '2023-01-02');
  userEvent.click(confirm);

  setTimeout(() => {
    const text = screen.getByText(/Confirm/i);
    expect(text).toBeNull();
  }, 1000);
});

// testing the modal for inputting when leaving a review
// (both rating and commenting)
test('Rendering review modal', async () => {
  render(
    <ReviewModal
      openReview={true}
      setOpenReview={() => {}}
      rate={5}
      setRate={() => {}}
      text={''}
      setText={() => {}}
      uploadReview={() => {}}
    />
  );

  const ratingText = screen.getByText(/Rating:/i);
  expect(ratingText).toBeInTheDocument();
  const commentsText = screen.getByText(/Comments:/i);
  expect(commentsText).toBeInTheDocument();
  const send = screen.getByRole('button', { name: /Send/i });
  expect(send).toBeInTheDocument();
  const rating = screen.getByTestId('rating');
  expect(rating).toBeInTheDocument();
  userEvent.click(send);

  setTimeout(() => {
    const text = screen.getByText(/Rating:/i);
    expect(text).toBeNull();
  }, 1000);
});

test('Rendering test modal', async () => {
  render(
    <CustomErrorModal
      error={'Error Message'}
      openError={() => {}}
      setOpenError={() => {}}
    />
  );

  const message = screen.getByText(/Error Message/i);
  expect(message).toBeInTheDocument();
  const alert = screen.getByRole('alert');
  expect(alert).toBeInTheDocument();
  userEvent.click(alert);

  setTimeout(() => {
    const text = screen.getByText(/Error Message/i);
    expect(text).toBeNull();
  }, 1000);
});
