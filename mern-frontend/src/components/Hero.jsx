import React from 'react'
import '../styles/Hero.css'

export const Hero = () => {
  return(
    <div className='hero-container'>
        <div className='hero-content'>
            <h1 className="hero-title">Welcome to CareerBridge</h1>
            <p className="hero-description">
                Your gateway to limitless career opportunities. Discover jobs, connect with recruiters, and build your future!
            </p>
        </div>
        <input type='text' placeholder='Search for jobs' className='job-search'></input>
        <br></br>
        <input type='text' placeholder='Location' className='location-search'></input>
        <br></br>
        <button className='search-btn'>Search</button>
    </div>
  )
}
