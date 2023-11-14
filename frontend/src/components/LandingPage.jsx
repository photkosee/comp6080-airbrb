import React, { useEffect } from 'react';

import { Navbar } from './Navbar';
import GuestCard from './GuestCard';
import { InputLabel, NativeSelect, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export const LandingPage = (props) => {
  const [list, setList] = React.useState([]);
  const [nameSearch, setNameSearch] = React.useState('');
  const [priceMax, setPriceMax] = React.useState('');
  const [priceMin, setPriceMin] = React.useState('');
  const [dateMax, setDateMax] = React.useState('');
  const [dateMin, setDateMin] = React.useState('');
  const [bedroomNumber, setBedroomNumber] = React.useState('');
  const [sort, setSort] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleSort = (e) => {
    setSort(e.target.value);
    let newList = [...list];
    if (parseInt(e.target.value) === 10) {
      newList = [...list].sort((b, a) => a.rating - b.rating);
    } else if (parseInt(e.target.value) === 20) {
      newList = [...list].sort((a, b) => a.rating - b.rating);
    }
    setList(newList);
  }

  const calculateRating = (reviews) => {
    let sum = 0;
    for (const review of reviews) {
      sum += parseFloat(review.rating);
    }
    if (reviews.length === 0) {
      return 0;
    }
    return sum / reviews.length;
  }

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
      newListing.id = id;
      newListing.rating = rating;
      let check = false;
      for (const booking of bookings) {
        if (localStorage.getItem('email') === booking.owner && parseInt(booking.listingId) === parseInt(newListing.id) && (booking.status === 'pending' || booking.status === 'accepted')) {
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
        console.log([...left, ...right]);
        return [...left, ...right];
      })
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 'lg'
  };

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

  const clearFilter = () => {
    setNameSearch('');
    setPriceMax('');
    setPriceMin('');
    setDateMax('');
    setDateMin('');
    setBedroomNumber('');
    localStorage.removeItem('dateMin');
    localStorage.removeItem('dateMax');
  }

  useEffect(() => {
    clearFilter();
    getBookings();
  }, []);

  return (
    <>
      <Navbar token={localStorage.getItem('token')} setToken={props.setToken} page='/' />

      <div className='flex justify-center items-center flex-wrap gap-2 mb-5'>
        <label htmlFor="topbar-search" className="sr-only">Search</label>
        <div className="relative mt-1 lg:w-60 sm:w-40">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/> </svg>
          </div>
          <input type="text" name="search" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
          />
        </div>
        <Button onClick={() => setOpen(true)}>Other filters</Button>
        <Button onClick={() => clearFilter()}>Clear filters</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='flex flex-col flex-wrap gap-2 w-full'>
              <div className="relative flex items-center gap-1">
                Bedrooms:&nbsp;
                <TextField
                  label="Enter Text"
                  variant="outlined"
                  value={bedroomNumber}
                  onChange={e => setBedroomNumber(e.target.value)}
                />
              </div>
              <div className="relative flex items-center gap-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  Check In:&nbsp;
                  <DatePicker
                    onChange={e => {
                      setDateMin(e.$d);
                      localStorage.setItem('dateMin', e.$d);
                    }}
                  />
                  Check Out:&nbsp;
                  <DatePicker
                    onChange={e => {
                      setDateMax(e.$d);
                      localStorage.setItem('dateMax', e.$d);
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="relative flex items-center gap-1">
                Min Price:&nbsp;
                <TextField
                  label="Enter Text"
                  variant="outlined"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                />
                Max Price:&nbsp;
                <TextField
                  label="Enter Text"
                  variant="outlined"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                />
              </div>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <NativeSelect
                onChange={handleSort}
                value={sort}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>&nbsp;None</option>
                <option value={10}>&nbsp;Highest - Lowest</option>
                <option value={20}>&nbsp;Lowest - Highest</option>
              </NativeSelect>
            </div>
          </Box>
        </Modal>
      </div>

      <div className='flex flex-wrap gap-2 justify-center'>
        {list.map((item, idx) => {
          let checkNameSearch = true;
          let checkPrice = true;
          let checkBedNumber = true;
          const publish = item.published;
          let checkDate = true;

          if (nameSearch) {
            checkNameSearch = item.title.toLowerCase().includes(nameSearch.toLowerCase()) || item.address.city.toLowerCase().includes(nameSearch.toLowerCase());
          }

          let priceTop = Infinity;
          let priceBottom = -Infinity;
          if (priceMax) {
            priceTop = priceMax;
          }
          if (priceMin) {
            priceBottom = priceMin;
          }
          checkPrice = parseFloat(item.price) >= parseFloat(priceBottom) && parseFloat(item.price) <= parseFloat(priceTop);

          if (bedroomNumber) {
            checkBedNumber = parseInt(item.metadata.bedNumber) === parseInt(bedroomNumber);
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
              newInterval.start >= interval.start && newInterval.end <= interval.end
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
              newInterval.start >= interval.start && newInterval.end <= interval.end
            );
          }

          if (checkBedNumber && checkDate && checkNameSearch && checkPrice && publish) {
            return (
              <GuestCard key={idx} item={item} />
            )
          } else {
            return null;
          }
        })}
      </div>
    </>
  )
}
