import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Products() {

    const [products, setProducts] = useState([])
    
    const productsUrl = '/api/products';      

    useEffect(() => {
        fetch(productsUrl)
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error:', error));
      }, []);

  return (
    <>

        {/* .filter(product => product.category === 'mobile') */}

    {products.slice(0, 6)
    .map((product) => (
        <div className='col-lg-4' key={product.key}>
        <div className="card m-2 shadow-lg">
            <Link to={`/Product/${product._id}`}>
            <img className="img-fluid card-img-top" src={product.imageUrl} alt={product.title} />
            </Link>
          <div className="card-body bg-light">
            <h4 className="card-title">{product.title}</h4>
            <div className='d-flex flex-row align-items-center justify-content-between'>
                <p className="card-text fw-bold text-primary">Rs. {product.price}</p>
            </div>
          </div>
        </div>
        </div>
    ))}


    </>
  )
}

export default Products