import React, { useState, useEffect } from 'react';
import './index.css';
import Home from './Pagez/Home';
import Store from './Pagez/Store';
import Login from './Pagez/Login';
import Register from './Pagez/Register';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Profile from './Pagez/Profile';
import ProductPage from './Pagez/ProductPage';
import Cart from './Pagez/Cart';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    
    const getUserData = localStorage.getItem('user')
    if (getUserData) {
      setUserData(JSON.parse(getUserData))
      setLoggedIn(true)
    }

  }, [localStorage.getItem('user')])

  return (
    <>
      <BrowserRouter>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <div className='app'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Cart' element={<Cart userData={userData} />} />
            <Route path='/Login' element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path='/Profile' element={<Profile setLoggedIn={setLoggedIn} userData={userData} />} />
            <Route path='/Product/:id' element={<ProductPage userData={userData} loggedIn={loggedIn} />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
