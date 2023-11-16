import React, { useState, useEffect } from 'react';

import ListingCreate from '../modals/ListingCreateModal';
import { Navbar } from '../navbar/Navbar';
import HostCard from '../cards/HostCard';
import ChartCard from '../cards/ChartCard';
import CustomErrorModal from '../modals/CustomErrorModal';

// a page for hosting and managing users' lists
const Dashboard = (props) => {
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState('');
  const [list, setList] = useState([]);
  const [profitData, setProfitData] = useState(Array(31).fill(0));

  // start with fetching all the listings
  useEffect(() => {
    getList();
  }, []);

  // get more details of the listing with the given id
  const getData = async (id) => {
    const response = await fetch(`http://localhost:5005/listings/${id}`, {
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
    } else if (data.listing) {
      const newList = data.listing;
      newList.id = id;
      setList((prevList) => [...prevList, newList]);
    }
  }

  // calculating profits earning each day for the past 30 days
  const calculatePastProfit = (listId, bookings, listPrice) => {
    const tmp = Array(31).fill(0);
    bookings.filter(e =>
      listId.includes(parseInt(e.listingId)) &&
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
          tmp[i] += parseInt(listPrice[listId.indexOf(parseInt(e.listingId))]);
        }
      }
    });

    setProfitData(tmp);
  }

  // getting a list of all bookings
  const getBookings = async (list) => {
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
      calculatePastProfit(
        list.filter(e => e.owner === localStorage.getItem('email')).map(e => e.id),
        data.bookings,
        list.filter(e => e.owner === localStorage.getItem('email')).map(e => e.price),
      );
    }
  };

  // get all the listings
  const getList = async () => {
    setList([]);
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setOpenError(true);
    } else if (data.listings) {
      data.listings.forEach((list) => {
        getData(list.id);
      });
      getBookings(data.listings);
    }
  }

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page="/dashboard"
      />

      <div className='flex flex-col gap-4 mt-16 mb-5 pt-5 w-full h-full relative'>
        <ListingCreate
          token={localStorage.getItem('token')}
          setToken={props.setToken}
          getList={getList}
        />

        <div className='flex flex-wrap gap-2 justify-center'>
          <ChartCard profitData={profitData} />

          {
            list.map((item, idx) => {
              if (item.owner !== localStorage.getItem('email')) {
                return null;
              } else {
                return (
                  <HostCard
                    key={idx}
                    item={item}
                    getList={getList}
                    token={localStorage.getItem('token')}
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

export default Dashboard;
