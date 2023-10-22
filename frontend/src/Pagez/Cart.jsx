import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';

function Cart({ userData }) {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setCartData(data);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      const fetchProductData = async () => {
        const productData = [];

        for (const cartItem of cartData) {
          const response = await fetch(`/api/products/${cartItem.product}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const product = await response.json();
          productData.push(product);
        }

        setProducts(productData);
        setIsLoading(false);
      };

      fetchProductData();
    } else {
      setIsLoading(false);
    }
  }, [cartData]);

  const incQuantity = () => {

  };

  const decQuantity = () => {
    
  };

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner />
      ) : cartData.length > 0 ? (
        cartData.map((cartItem, index) => (
          <div className='row mt-3 border p-2 rounded-2 shadow-sm' key={cartItem.product}>
            <div className='col-md-4'>
              {products[index] ? (
                <Link to={`/Product/${products[index]._id}`}>
                    <img src={products[index].imageUrl} className='img-fluid rounded-2 w-50' alt='img' />
                </Link>
              ) : (
                <Spinner />
              )}
            </div>
            <div className='col-md-8 d-flex flex-column align-items-end justify-content-center'>
              <h6>{products[index] ? products[index].title : 'Loading...'}</h6>
              <p>{products[index] ? `Rs. ${products[index].price}` : 'Loading...'}</p>

              <div className='d-flex align-items-center justify-content-center'>
                <i onClick={decQuantity} className='fa fa-minus cart-icon'></i>
                <span className='px-4 mx-2 py-2 border'>
                  {cartItem.quantity}
                </span>
                <i onClick={incQuantity} className='fa fa-plus cart-icon'></i>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='container text-center py-5 my-5'>
          <h1>Your Cart Is Empty</h1>
          <Link to='/Store' className='btn'>Store</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
