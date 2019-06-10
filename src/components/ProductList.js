import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const ProductList = ({product, setReloadProducts}) => {

  const deleteProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont able revert this',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtontext: 'Cancel',
      confirmButtonText: 'Yes, delete it!'
    }).then( async result => {
      if (result.value) {
        try {
          const url = `http://localhost:4000/restaurant/${id}`

          const result = await axios.delete(url);

          if (result.status === 200) {
            Swal.fire(
              'Deleted!',
              'Your saucer has been deleted!',
              'success'
            )
          }
          setReloadProducts(true)
        } catch (e) {
          Swal.fire({
            type: 'error',
            title: 'Error, try again!',
            text: 'success'
          })
        }
      }
    })
  }

  return (
    <li data-category={product.category} className="list-group-item d-flex justify-content-between align-items-center">
      <p>
        {product.saucerName}{' '}
        <span className="font-weight-bold">${product.saucerPrice}</span>
      </p>
      <div>
        <Link
          to={`/products/edit/${product.id}`}
          className="btn btn-success mr-2"
        >Edit</Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProduct(product.id)}
        >Delete &times;</button>
      </div>
    </li>
  )
}

export default ProductList;
