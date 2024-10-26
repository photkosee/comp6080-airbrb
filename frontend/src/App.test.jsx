import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import AvailableModal from './components/modals/AvailableModal';
import BookingModal from './components/modals/BookingModal';
import ReviewModal from './components/modals/ReviewModal';
import CustomErrorModal from './components/modals/CustomErrorModal';
import TooltipModal from './components/modals/TooltipModal';
import ConfirmModal from './components/modals/ConfirmModal';

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

// testing the modal for inputting when booking a list and cannot submit with no time
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

// testing the toast message when closing it manually
test('Rendering toast manual close', async () => {
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

  // Message is hidden after clicking
  setTimeout(() => {
    const text = screen.getByText(/Error Message/i);
    expect(text).toBeNull();
  }, 1000);
});

// testing the toast message
test('Rendering toast auto close', async () => {
  render(
    <CustomErrorModal
      error={'Error Message'}
      openError={() => {}}
      setOpenError={() => {}}
    />
  );

  // Message is hidden after waiting for some time
  setTimeout(() => {
    const text = screen.getByText(/Error Message/i);
    expect(text).toBeNull();
  }, 6000);
});

// test for closing a modal and display rating modal
test('Testing closing a rating modal', async () => {
  render(
    <TooltipModal
      openTooltip={true}
      setOpenTooltip={() => {}}
      setTooltipRate={() => {}}
      setOpenRateTooltip={() => {}}
      reviews={[]}
    />
  );

  // check the existance of all star ratings
  const feedback = screen.getByText(/feedback/i);
  expect(feedback).toBeInTheDocument();
  const star0 = screen.getByText(/0 Star/i);
  expect(star0).toBeInTheDocument();
  const star1 = screen.getByText(/1 Star/i);
  expect(star1).toBeInTheDocument();
  const star2 = screen.getByText(/2 Star/i);
  expect(star2).toBeInTheDocument();
  const star3 = screen.getByText(/3 Star/i);
  expect(star3).toBeInTheDocument();
  const star4 = screen.getByText(/4 Star/i);
  expect(star4).toBeInTheDocument();
  const star5 = screen.getByText(/5 Star/i);
  expect(star5).toBeInTheDocument();

  // test closing
  const close = screen.getByTestId('closeTool');
  userEvent.click(close);

  setTimeout(() => {
    const text = screen.getByText(/Star/i);
    expect(text).toBeNull();
  }, 1000);
});

// test for confirm nodal text and button together
test('Testing closing a rating modal', async () => {
  render(
    <ConfirmModal
      message={'Do you want to delete this list'}
      openConfirm={true}
      setOpenConfirm={() => {}}
      confirm={() => {}}
    />
  );

  // check the existance of all star ratings
  const context = screen.getByText(/Do you want to delete this list/i);
  expect(context).toBeInTheDocument();
  const title = screen.getByText(/Please confirm your action/i);
  expect(title).toBeInTheDocument();
  const confirm = screen.getByRole('button', { name: /confirm/i });
  expect(confirm).toBeInTheDocument();
});
