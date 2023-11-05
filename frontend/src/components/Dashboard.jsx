import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import ListingCreate from './ListingCreate';
import { Navbar } from './Navbar';
import HostCard from './HostCard';

const Dashboard = (props) => {
  // const [title, setTitle] = React.useState('');
  // const navigate = useNavigate();
  const [list, setList] = React.useState([]);

  const getData = async (id) => {
    const response = await fetch(`http://localhost:5005/listings/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.listing) {
      console.log(data.listing);
      setList((prevList) => [...prevList, data.listing]);
    }
  }

  const getList = async () => {
    setList([]);
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
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

  useEffect(() => {
    getList();
  }, [])

  return (
    <>
      <Navbar token={props.token} setToken={props.setToken} page="/dashboard" />
      <ListingCreate token={props.token} setToken={props.setToken} getList={getList} />
      <div className='flex flex-wrap gap-2 justify-center'>
        {list.map((item, idx) => {
          return (
            <HostCard key={idx} item={item} />
          )
        })}
      </div>
    </>
  )
}

export default Dashboard;
