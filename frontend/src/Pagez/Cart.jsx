import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';

function Cart({ userData }) {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartFetched, setCartFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

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
        if(!data.length) setCartFetched(true)
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
        setCartFetched(true)
      };

      fetchProductData();
    } else {
      if(cartFetched) setIsLoading(false);
    }
  }, [cartData]);

  // Get Total Price

  useEffect(() => {
    // Calculate the total price whenever cartData or products change
    if (cartData.length > 0 && products.length > 0) {
      const totalPrice = cartData.reduce((acc, cartItem, index) => {
        const product = products[index];
        return acc + product.price * cartItem.quantity;
      }, 0);
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cartData, products]);

  // INC & DEC QUANTITY

  const incQuantity = (productId) => {
    const updatedCart = cartData.map(cartItem => {
      if (cartItem.product === productId) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
  
    updateCartQuantity(updatedCart);
  };
  
  const decQuantity = (productId) => {
    const updatedCart = cartData.map(cartItem => {
      if (cartItem.product === productId && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
  
    updateCartQuantity(updatedCart);
  };
      
const updateCartQuantity = (updatedCart) => {
    fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userData._id, updatedCart })
    })
      .then(response => response.json())
      .then(data => {
        // Handle success and update the cartData state
        setCartData(updatedCart);
      })
      .catch(error => console.log('Error updating cart:', error));
  };



  // Remove item from cart
  const removeFromCart = (productId) => {
    // Make a DELETE request to remove the item from the cart
    fetch('/api/cart', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userData._id, productId })
    })
      .then((response) => {
        if (response.status === 200) {
          // If the item was successfully removed from the cart, update the cartData state.
          setCartData(cartData.filter((cartItem) => cartItem.product !== productId));
        }
      })
      .catch((error) => console.log('Error removing item from cart:', error));
  };
    

  return (
<div className='container'>
  {(isLoading && !cartFetched) ? (
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
            <i onClick={() => decQuantity(cartItem.product)} className='fa fa-minus cart-icon'></i>
            <span className='px-4 mx-2 py-2 border'>
              {cartItem.quantity}
            </span>
            <i onClick={() => incQuantity(cartItem.product)} className='fa fa-plus cart-icon'></i>
          </div>

          <button
            onClick={() => removeFromCart(cartItem.product)}
            className='btn-danger  mt-2 p-2 border-0'
          >
            Remove <i className='fa fa-times'></i>
          </button>

        </div>
      </div>
    ))
  ) : (
    <div className='container text-center py-5 my-5'>
      <h1>Your Cart Is Empty</h1>
      <Link to='/Store' className='btn'>Store</Link>
    </div>
  )}

    <hr></hr>

  {cartData.length > 0 && (
    <div className="d-flex flex-column align-items-end justify-content-end my-3">
      <h2>Total : Rs. {totalPrice}</h2>

      <button className='btn'>Checkout <i className='fa fa-arrow-right'></i></button>
    </div>
  )}
</div>


  );
}

export default Cart;
