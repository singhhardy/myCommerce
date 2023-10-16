import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header({loggedIn}) { 
    
  return (
    <>
    <header>
        <div className="header-area">
            <div className="main-header header-sticky">
                <div className="container-fluid">
                    <div className="menu-wrapper">
                        <div className="logo">
                            <a href="/"><img src="assets/img/logo/logo.png" alt="" /></a>
                        </div>
                        <div className="main-menu d-none d-lg-block">
                            <nav>                                                
                                <ul id="navigation">  
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/store">Store</NavLink></li>
                                    {/* <li><a href="">about</a></li> */}
                                    {/* <li className="hot"><a href="#">Latest</a>
                                        <ul className="submenu">
                                            <li><a href=""> Product list</a></li>
                                            <li><a href=""> Product Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="blog.html">Blog</a>
                                        <ul className="submenu">
                                            <li><a href="">Blog</a></li>
                                            <li><a href="">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Pages</a>
                                        <ul className="submenu">
                                            <li><a href="">Login</a></li>
                                            <li><a href="">Cart</a></li>
                                            <li><a href="">Element</a></li>
                                            <li><a href="">Confirmation</a></li>
                                            <li><a href="">Product Checkout</a></li>
                                        </ul>
                                    </li> */}
                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-right">
                            <ul>
                                <li>
                                    <div className="nav-search search-switch">
                                        <span className="flaticon-search"></span>
                                    </div>
                                </li>
                                <li><NavLink to={loggedIn ? '/profile' : '/login'}><span className="flaticon-user"></span></NavLink></li>
                                <li><NavLink href=""><span className="flaticon-shopping-cart"></span></NavLink> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    </>
  )
}

export default Header