// Banner.jsx
import React from 'react';
import './Banner.css'; // Import the CSS file
import bannerImg from '../../assets/banner.png';

const Banner = () => {
  return (
    <div className='banner-container'>
        <div className='banner-text'>
            <h1 className='banner-title'>New Releases This Week</h1>
            <p className='banner-description'>
                Check out the latest releases from your favorite Books.
                From heart dumping thrillers to captivating memories
            </p>
            <button className="btn-primary">
                Subscribe
            </button>
        </div>
        
        <div className='banner-image'>
            <img src={bannerImg} alt='Banner' />
        </div>
    </div>
  );
}

export default Banner;