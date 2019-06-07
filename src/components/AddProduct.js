import React, { useState } from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom';


const AddProduct = ({history}) => {
  const [saucerName, setSaucerName] = useState('');
  const [saucerPrice, setSaucerPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);

  const readRadioValue = e => {
    setCategory(e.target.value)
  }

  const addProduct = async e => {
    e.preventDefault();
    if (saucerName === '' || saucerPrice === '' || category === '') {
      setError(true);
      return;
    }
    setError(false);
    try {
      const result = await axios.post('http://localhost:4000/restaurant', {
        saucerName,
        saucerPrice,
        category
      })
      console.log(result);
      if (result.status === 201) {
        Swal.fire(
          'Ok',
          'Product save successfully!',
          'success'
        )
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        type: 'error',
        title: 'Error, try again!',
        text: 'success'
      })
    }
    history.push('/products');
  }

  return (
    <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Add New Saucer</h1>
            {error ? <Error message="All fields are required!" /> : null}
            <form
                className="mt-5"
                onSubmit={addProduct}
            >
                <div className="form-group">
                    <label>Saucer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Saucer Name"
                        onChange={e => setSaucerName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Saucer Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Saucer Price"
                        onChange={e => setSaucerPrice(e.target.value)}
                    />
                </div>

                <legend className="text-center">Category:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value="main"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Main
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value="dessert"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Dessert
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value="drink"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Drink
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value="salad"
                        onChange={readRadioValue}
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Add Product" />
            </form>
        </div>
  )
}

export default withRouter(AddProduct);
