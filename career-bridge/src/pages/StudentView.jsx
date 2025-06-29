import React from 'react'
import { Hero } from '../components/Hero'
import Navbar from '../components/Navbar'
import { JobFilter } from '../components/JobFilter'
import '../styles/StudentView.css'

export const StudentView = () => {
  return(
    <>
       <Navbar />
       <Hero />
       <JobFilter />
       <button className='filters-btn'>Apply Filters</button>
    </>
  )
}
