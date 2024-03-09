import React from 'react'
import { useState } from 'react';
import Search from './Search';
import Logo from "./Logo"
import NumResult from './NumResult';

  const Navbar = ({children}) => {
    

  return (
    <nav className="nav-bar">
        <Logo />
       
        {children}
      </nav>
  )
}

export default Navbar