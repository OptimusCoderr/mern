// import React from 'react'
// import { Link } from 'react-router-dom'
// import { HiMiniBars3 } from "react-icons/hi2";
// import { IoSearchOutline } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";
// import { GiShoppingCart } from "react-icons/gi";

// const Navbar = () => {
//   return (
//     <header className='max-w-screen-2xl mx-auto px-4 py-6'>
//       <nav className="flex justify-between items-center">
//         {/*left side*/}
//         <div className='flex items-center md:gap-16 gap-4'>
//           <Link to = "/">
//           <HiMiniBars3 className='size-6'/>
//           </Link>


//           {/* Search input */}
//           <div className='relative sm:72 w-40 space-x-2'>
//           <IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
//           <input type="text" placeholder="Search" 
//           className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"/>
//           </div>

          
//         </div>

//         {/*right side*/}
//         <div className='relative flex items-center md:space-x-3 space-x-2'>
//         <FaUserCircle className='size-6'/>

//         <button className='hidden sm:block'>
//         <CiHeart className='size-6'/>
//         </button>

//         <Link to = "/cart">
//         <GiShoppingCart className='bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm'/>
//         <span className='text-sm font-semibold sm:ml-1'>0</span>
//         </Link>

//         </div>
//       </nav>
//     </header>
//   )
// }
// //1:16:43

// export default Navbar



import React from 'react';
import { Link } from 'react-router-dom';
import { HiMiniBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import './Navbar.css'; // Import the CSS file
import avatarImg from "../assets/avatar.png"
import {useState} from "react";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon


const navigation = [
  {name: "Dashboard", href:"/dashboard"},
  {name: "Orders", href:"/orders"},
  {name: "Cart page", href:"/cart"},
  {name: "Check out", href:"/checkout"},

]

const Navbar = () => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const {currentUser, logout} =  useAuth()
  const handleLogOut = () => {
    logout()
  }

  const cartItems = useSelector(state => state.cart.cartItems)
  console.log(cartItems)



  return (
    <header className="navbar">
      <nav className="navbar-container">
        
        {/* Left Side */}
        <div className="navbar-left">
          <Link to="/">
            <HiMiniBars3 className="icon" />
          </Link>

          {/* Search Input */}
          <div className="search-container">
            <IoSearchOutline className="search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          {/* Setting Current user functionality */}
          <div className="user-container" style={{ position: 'relative' }}>
            {
              currentUser   ? 
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="avatar-button">
                  <img 
                    src={avatarImg} 
                    alt="" 
                    className={`avatar-image ${currentUser   ? 'avatar-ring' : ""}`} 
                  />
                </button>

                {/* Show Dropdowns */}
                {
                  isDropdownOpen && (
                    <div className="dropdown">
                      <ul>
                        {
                          navigation.map((item) => (
                            <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                              <Link to={item.href}>
                                {item.name}
                              </Link>
                            </li>
                          ))
                        }
                        <li>
                          <button className='logout-button' onClick={handleLogOut}>
                            <FaSignOutAlt className="logout-icon" /> Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )
                }
                
              </> : 
              <Link to="/login" className="login-icon">
                <FaUser Circle className="icon" />
              </Link>
            }
          </div>

          <button className="hidden sm:block">
            <CiHeart className="icon" />
          </button>

         

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                      <BsCart4 className='' />
                      {
                          cartItems.length > 0 ?  <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span> :  <span className="text-sm font-semibold sm:ml-1">0</span>
                      }
                      
                      
          </Link>

            
      
        </div>
      </nav>
    </header>
  );
};

export default Navbar;