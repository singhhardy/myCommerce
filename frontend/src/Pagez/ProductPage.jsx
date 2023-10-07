import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner'

function ProductPage() {
    const params = useParams()

    console.log(params.id)

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    
    const productsUrl = `/api/products/${params.id}`;      

    console.log(product.imageUrl)

    useEffect(() => {
        fetch(productsUrl)
          .then(response => response.json())
          .then(data =>  {
            setProduct(data)
            setLoading(false)
          })
          .catch(error => console.error('Error:', error));
      }, []);


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
                        <button className='btn'>Add to Cart</button>
                    </div>
                </div>
            </div>

        )}    
    </>
  )
}

export default ProductPage