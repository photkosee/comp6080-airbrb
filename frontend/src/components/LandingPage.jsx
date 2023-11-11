import React, { useEffect } from 'react';

import { Navbar } from './Navbar';
import GuestCard from './GuestCard';

export const LandingPage = (props) => {
  const [list, setList] = React.useState([]);

  const getList = async () => {
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
      setList(data.listings);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Navbar token={props.token} setToken={props.setToken} page='/' />
      <div className='flex flex-wrap gap-2 justify-center'>
        {list.map((item, idx) => {
          return (
            <GuestCard key={idx} item={item} />
          )
        })}
      </div>
    </>
  )
}
