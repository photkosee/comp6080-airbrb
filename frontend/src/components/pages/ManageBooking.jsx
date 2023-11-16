import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Navbar } from '../navbar/Navbar';
import BookingCard from '../cards/BookingCard';
import TotalProfitCard from '../cards/TotalProfitCard';
import ChartCard from '../cards/ChartCard';
import CustomErrorModal from '../modals/CustomErrorModal';

// a page for managing booking requests of a list
const ManageBooking = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [listBooking, setListBooking] = useState([]);
  const [sumBooking, setSumBooking] = useState(0);
  const [profitData, setProfitData] = useState(Array(31).fill(0));
  const { id } = useParams();

  // start with fetching a list of all bookings
  useEffect(() => {
    showBookings();
  }, []);

  // calculating the difference between the start and end date in days
  // using current date if no end dates provided
  const timeDiff = (end, start) => {
    if (end) {
      return parseInt((new Date(end) - new Date(start)) / 86400000);
    } else {
      return parseInt((new Date() - new Date(start)) / 86400000);
    }
  }

  // accepting the booking request with the given id
  const acceptBooking = async (id) => {
    const response = await fetch(
      `http://localhost:5005/bookings/accept/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      setError('');
      setOpenError(true);
      showBookings();
    }
  };

  // declining the booking request with the given id
  const declineBooking = async (id) => {
    const response = await fetch(
      `http://localhost:5005/bookings/decline/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      setError('');
      setOpenError(true);
      showBookings();
    }
  };

  // calculating profits earning each day for the past 30 days
  const calculatePastProfit = (list) => {
    const tmp = Array(31).fill(0);

    list.filter(e =>
      e.listingId === id &&
      e.status === 'accepted'
    ).forEach(e => {
      const startDate = e.dateRange.start;
      const endDate = e.dateRange.end;

      for (let i = 0; i <= 30; i++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i + 1);

        if (
          new Date(startDate) <= currentDate &&
          currentDate <= new Date(endDate)
        ) {
          tmp[i] += parseInt(localStorage.getItem('price'));
        }
      }
    });

    setProfitData(tmp);
  }

  // showing a list of all bookings
  const showBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else {
      const tmp = data.bookings;
      setListBooking(tmp.filter(e => e.listingId === id));
      setSumBooking(0);

      calculatePastProfit(tmp);
      tmp.filter(e => e.listingId === id).forEach(e => {
        if (
          parseInt(e.listingId) === parseInt(id) &&
          e.status === 'accepted' &&
          new Date(e.dateRange.start).getFullYear() === new Date().getFullYear()
        ) {
          setSumBooking(prev =>
            prev + timeDiff(e.dateRange.end, e.dateRange.start)
          );
        }
      });
    }
  };

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page={`/dashboard/${props.id}`}
      />

      <div className='flex flex-col gap-5 items-center pt-5 mt-16 mb-5'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>
          <TotalProfitCard timeDiff={timeDiff} sumBooking={sumBooking} />
          <ChartCard profitData={profitData} />
        </div>

        <div className='h-full w-full flex flex-wrap justify-center gap-3'>
          {
            listBooking.map((e, idx) => {
              if (
                parseInt(e.listingId) === parseInt(id) && e.status === 'pending'
              ) {
                return (
                  <BookingCard
                    key={idx}
                    owner={e.owner}
                    dateRange={e.dateRange}
                    acceptBooking={() => acceptBooking(e.id)}
                    declineBooking={() => declineBooking(e.id)}
                  />
                )
              } else {
                return (
                  <BookingCard
                    key={idx}
                    owner={e.owner}
                    dateRange={e.dateRange}
                    status={e.status}
                    hasStatus
                  />
                )
              }
            })
          }
        </div>
      </div>

      <CustomErrorModal
        error={error}
        openError={openError}
        setOpenError={setOpenError}
      />
    </>
  );
}

export default ManageBooking;
