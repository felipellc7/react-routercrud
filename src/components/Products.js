import React from 'react';
import ProductList from './Product';

const Products = ({products}) => {
  return (
    <div>
      <h1 className="text-center">Products</h1>
      <ul className="list-group mt-5">
        { products.map( product => (
          <ProductList
            key={product.id}
            product={product}
          />
        )) }
      </ul>
    </div>
  )
}

export default Products;
