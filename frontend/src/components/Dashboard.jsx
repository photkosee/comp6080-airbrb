import React, { useState, useEffect } from 'react';
import ListingCreate from './ListingCreate';
import { Navbar } from './Navbar';
import HostCard from './HostCard';

const Dashboard = (props) => {
  const [list, setList] = useState([]);

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
      alert(data.error);
    } else if (data.listing) {
      const newList = data.listing;
      newList.id = id;
      setList((prevList) => [...prevList, newList]);
    }
  }

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
      alert(data.error);
    } else if (data.listings) {
      data.listings.forEach((list) => {
        getData(list.id);
      });
    }
  }

  return (
    <>
      <Navbar
        token={localStorage.getItem('token')}
        setToken={props.setToken}
        page="/dashboard"
      />

      <div className='flex flex-col gap-4'>
        <ListingCreate
          token={localStorage.getItem('token')}
          setToken={props.setToken}
          getList={getList}
        />

        <div className='flex flex-wrap gap-2 justify-center'>
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
    </>
  )
}

export default Dashboard;
