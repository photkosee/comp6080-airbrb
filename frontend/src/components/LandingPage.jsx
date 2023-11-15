import React, { useState, useEffect } from 'react';

import { Navbar } from './Navbar';
import GuestCard from './GuestCard';
import Button from '@mui/material/Button';
import FilterModal from './FilterModal';

export const LandingPage = (props) => {
  const [list, setList] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [dateMax, setDateMax] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [bedroomNumber, setBedroomNumber] = useState('');
  const [sort, setSort] = useState(0);
  const [open, setOpen] = useState(false);

  // start with clearing all filtering and getting a list of all bookings
  // for ordering
  useEffect(() => {
    clearFilter();

    if (localStorage.getItem('token')) {
      getBookings();
    } else {
      getList([]);
    }
  }, []);

  // sort by rating
  const handleSort = (value) => {
    setSort(value);
    let newList = [...list];

    if (parseInt(value) === 10) {
      newList = [...list].sort((b, a) => a.rating - b.rating);
      setList(newList);
    } else if (parseInt(value) === 20) {
      newList = [...list].sort((a, b) => a.rating - b.rating);
      setList(newList);
    } else if (parseInt(value) === 0) {
      setList((prevList) => {
        const left = [];
        const right = [];

        for (const listing of prevList) {
          if (listing.book === false) {
            right.push(listing);
          } else {
            left.push(listing);
          }
        }

        left.sort((a, b) => a.title.localeCompare(b.title));
        right.sort((a, b) => a.title.localeCompare(b.title));

        return [...left, ...right];
      });
    }
  }

  // calculate average rating
  const calculateRating = (reviews) => {
    let sum = 0;

    for (const review of reviews) {
      sum += parseFloat(review.rating);
    }

    return (reviews.length === 0) ? 0 : sum / reviews.length;
  }

  // get listing detailed and determing whether the user has booked the list
  // for ordering
  const getData = async (id, bookings) => {
    const response = await fetch(`http://localhost:5005/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listing) {
      const rating = calculateRating(data.listing.reviews);
      const newListing = data.listing;
      let check = false;

      newListing.id = id;
      newListing.rating = rating;
      for (const booking of bookings) {
        if (
          localStorage.getItem('email') === booking.owner &&
          parseInt(booking.listingId) === parseInt(newListing.id) &&
          (booking.status === 'pending' || booking.status === 'accepted')
        ) {
          check = true;
        }
      }

      newListing.book = check;
      setList((prevList) => {
        const left = [];
        const right = [];

        for (const listing of prevList) {
          if (listing.book === false) {
            right.push(listing);
          } else {
            left.push(listing);
          }
        }

        if (newListing.book) {
          left.push(newListing);
        } else {
          right.push(newListing);
        }

        left.sort((a, b) => a.title.localeCompare(b.title));
        right.sort((a, b) => a.title.localeCompare(b.title));

        return [...left, ...right];
      });
    }
  }

  // fetch all listings, return true if it fits the filter
  const getList = async (bookings) => {
    setList([]);
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else if (data.listings) {
      data.listings.forEach((list) => {
        getData(list.id, bookings);
      });
    }
  }

  // getting a list of all bookings
  const getBookings = async () => {
    const response = await fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      getList(data.bookings);
    }
  }

  // filtering listings accordingly
  const applyFilter = (item) => {
    let checkNameSearch = true;
    let checkPrice = true;
    let checkBedNumber = true;
    const publish = item.published;
    let checkDate = true;

    if (nameSearch) {
      checkNameSearch =
        item.title.toLowerCase().includes(nameSearch.toLowerCase()) ||
        item.address.city.toLowerCase().includes(nameSearch.toLowerCase());
    }

    let priceTop = Infinity;
    let priceBottom = -Infinity;

    if (priceMax) {
      priceTop = priceMax;
    }

    if (priceMin) {
      priceBottom = priceMin;
    }

    checkPrice = parseFloat(item.price) >= parseFloat(priceBottom) &&
      parseFloat(item.price) <= parseFloat(priceTop);

    if (bedroomNumber) {
      const countBed = item.metadata.bedrooms.reduce((prevValue, curr) => {
        return prevValue + parseInt(curr.number);
      }, 0);

      checkBedNumber = countBed === parseInt(bedroomNumber);
    }

    if (dateMin && dateMax) {
      const listInterval = [];
      const dateTop = new Date(dateMin);
      const dateBottom = new Date(dateMax);
      const newInterval = {
        start: dateTop,
        end: dateBottom,
      };

      for (const interval of item.availability) {
        listInterval.push({
          start: new Date(interval.start),
          end: new Date(interval.end)
        });
      }

      checkDate = listInterval.some(interval =>
        newInterval.start >= interval.start &&
        newInterval.end <= interval.end
      );
    } else if (dateMin || dateMax) {
      const listInterval = [];
      let dateTop = new Date();

      if (dateMin) {
        dateTop = new Date(dateMin);
      } else {
        dateTop = new Date(dateMax);
      }

      const newInterval = {
        start: dateTop,
        end: dateTop,
      };

      for (const interval of item.availability) {
        listInterval.push({
          start: new Date(interval.start),
          end: new Date(interval.end)
        });
      }

      checkDate = listInterval.some(interval =>
        newInterval.start >= interval.start &&
        newInterval.end <= interval.end
      );
    }

    return checkBedNumber && checkDate &&
      checkNameSearch && checkPrice && publish;
  }

  // clear all filtered
  const clearFilter = () => {
    setNameSearch('');
    setPriceMax('');
    setPriceMin('');
    setDateMax('');
    setDateMin('');
    setBedroomNumber('');
    handleSort(0);
    localStorage.removeItem('dateMin');
    localStorage.removeItem('dateMax');
  }

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken} page='/'
      />

      <div className='flex justify-center items-center flex-wrap gap-2 mb-5'>
        <label htmlFor="topbar-search" className="sr-only">Search</label>
        <div className="relative mt-1 lg:w-60 sm:w-40">
          <div
            className="flex absolute inset-y-0 left-0 items-center
              pl-3 pointer-events-none"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="text"
            name="search"
            id="topbar-search"
            className="bg-gray-50 border border-gray-300 text-gray-900
              sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500
              block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
              dark:focus:border-primary-500"
            placeholder="Search for titles or cities"
            value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
          />
        </div>

        <Button onClick={() => setOpen(true)}>Other filters</Button>
        <Button onClick={() => clearFilter()}>Clear filters</Button>

        <FilterModal
          open={open}
          setOpen={setOpen}
          bedroomNumber={bedroomNumber}
          setBedroomNumber={setBedroomNumber}
          setDateMin={setDateMin}
          setDateMax={setDateMax}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          sort={sort}
          handleSort={e => handleSort(e.target.value)}
        />
      </div>

      <div className='flex flex-wrap gap-2 justify-center'>
        {
          list.map((item, idx) => {
            if (applyFilter(item)) {
              return (
              <GuestCard key={idx} item={item} />
              )
            } else {
              return null;
            }
          })
        }
      </div>
    </>
  )
}
