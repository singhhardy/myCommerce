import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner'

function ProductPage({userData, loggedIn}) {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    
    const productsUrl = `https://mycommerce-6j7g.onrender.com/api/products/${params.id}`;

    // GET PRODUCTS
    useEffect(() => {
        fetch(productsUrl)
          .then(response => response.json())
          .then(data =>  {
            setProduct(data)
            setLoading(false)
          })
          .catch(error => console.error('Error:', error));
      }, []);

    //   ADD TO CART

    const handleCart = () => {
        
        const cartData = {
            userId: userData._id,
            productId: product._id,
            quantity: 1
        }

        if(loggedIn === true){
            fetch('https://mycommerce-6j7g.onrender.com/api/cart', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartData)
            })
            .then(response => response.json())
            .then(data => {
                navigate('/Cart')
            })
            .catch(error => console.log('Error:', error));    
        } else{
            navigate('/login')
        }
    }

return (
    <>
        {loading ? (<Spinner />) : (
            <div class="container py-5 my-5">
                <div className='row'>
                    <div className='col-md-6'>
                        <img className='w-100 shadow-lg' src={product.imageUrl}  alt={product.title}/>
                    </div>
                    <div className='col-md-6'>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <h3 className='text-primary'>Rs {product.price} /-</h3>
                        <button className='btn' onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            </div>

        )}    
    </>
  )
}

export default ProductPage