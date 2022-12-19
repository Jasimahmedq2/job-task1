import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation()
  return (
    <nav className='flex justify-center items-center'>
      {
        location.pathname === '/login' && <Link to="/" className='text-blue-500'>NEED REGISTER ? CLICK HERE</Link>
      }
      {
        location.pathname === '/' && <Link to="login" className='text-blue-500'>NEED LOGIN ? CLICK HERE</Link>
      }
    </nav>
  );
};

export default Navbar;