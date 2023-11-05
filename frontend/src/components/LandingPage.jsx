import React from 'react';

import { Navbar } from './Navbar';

export const LandingPage = (props) => {
  return (
    <>
      <Navbar token={props.token} setToken={props.setToken} page='/' />
    </>
  )
}
