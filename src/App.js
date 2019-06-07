import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Products from './components/Products';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Header from './components/Header';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const queryAPI = async () => {
      const result = await axios('http://localhost:4000/restaurant');
      setProducts(result.data);
    }
    queryAPI();
  }, [])

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/products" render={ () => (
                <Products products={products} />
              )
            } />
          <Route exact path="/new-product" component={AddProduct} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/products/edit/:id" component={EditProduct} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
