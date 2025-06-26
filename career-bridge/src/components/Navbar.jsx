import React from 'react'
import { assets } from '../assets/assets'

export const Navbar = () => {
  return (
    <div>
        <div>
            <img src={assets.logo}></img>
            <div>
                <button>Recruiter Login</button>
                <button>Login</button>
            </div>
        </div>
    </div>
  )
}
