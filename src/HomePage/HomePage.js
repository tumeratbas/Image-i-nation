// src/HomePage/HomePage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../AppBar/Navbar';
import './HomePage.css';
import SearchBar from '../SearchBar/SearchBar';

function HomePage() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  return (
    <div className='box'>
      <div className='greybox' />
      <div className='image'>
        <img className='paint' alt='Paint' src='Paint.png' />
        <div className="big_label">
          <p className="text-wrapper">SEARCH BASED ON YOUR IMAGE-I-NATION</p>
        </div>
        <div className='searchbar'>
          <SearchBar />
        </div>
      </div>
      <div className='altsayfa' />
    </div>
  );
}

export default HomePage;
