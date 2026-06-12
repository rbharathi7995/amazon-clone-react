import React from 'react';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import { NavLink } from 'react-router'
import './Header.css'
import { useState } from 'react'
import { useNavigate,useSearchParams} from 'react-router'

export function Header({cart}) {

  const navigate=useNavigate();

  //the reason behind of using useSearchParams is
  //useState(search || '') → Search works and the input remembers the value from the URL after refresh.
  const [searchParams] =useSearchParams();
  const search = searchParams.get('searchInfo')
 
  const [searchInfo,setSearchInfo] = useState(search || '');

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
    return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={LogoWhite} />
            <img className="mobile-logo"
              src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search"
           value={searchInfo} onChange ={(event) => {
            setSearchInfo(event.target.value);
          }}
          />

          <button className="search-button"
          onClick={() => {
            console.log(searchInfo);
            navigate(`/?searchInfo=${searchInfo}`);
          }}
          
          >
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  )
}