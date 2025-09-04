import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [show, setShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Languages'];

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      show ? 'bg-black' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        
        <div className="flex items-center space-x-8">
          <Link to="/home">
            <img 
              className="h-6 md:h-8 cursor-pointer" 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
              alt="Netflix logo"
            />
          </Link>
          
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="text-white hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="lg:hidden">
            <select className="bg-transparent text-white border-none text-sm focus:outline-none cursor-pointer">
              <option value="" className="bg-black">Browse</option>
              {navItems.map((item, index) => (
                <option key={index} value={item.toLowerCase()} className="bg-black">{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {searchOpen && (
              <input
                type="text"
                placeholder="Titles, people, genres"
                className="absolute right-0 top-8 w-64 bg-black/90 border border-gray-600 text-white px-4 py-2 text-sm focus:outline-none focus:border-white transition-all duration-200"
                autoFocus
              />
            )}
          </div>

          {/* <button className="text-white hover:text-gray-300 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0v14z" />
            </svg>
          </button> */}

          
            {/* <button className="text-white hover:text-gray-300 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0v14z" />
              </svg>
            </button> */}
        

          <div className="flex items-center space-x-2 cursor-pointer group">
            <img 
              className="w-8 h-8 rounded" 
              src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" 
              alt="Profile"
            />
            <svg className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;