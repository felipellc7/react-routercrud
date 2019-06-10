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
  const [reloadProducts, setReloadProducts] = useState(true);

  useEffect(() => {
    if (reloadProducts) {
      const queryAPI = async () => {
        const result = await axios('http://localhost:4000/restaurant');
        setProducts(result.data);
      }
      queryAPI();
      setReloadProducts(false);
    }
  }, [reloadProducts])

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/products" render={ () => (
                <Products products={products} setReloadProducts={setReloadProducts} />
              )
            } />
          <Route exact path="/new-product" render={ () => (
              <AddProduct setReloadProducts={setReloadProducts} />
            )} />
          <Route exact path="/products/:id" component={Product} />
          <Route exact path="/products/edit/:id" render={ props => {
                const IdProduct = parseInt(props.match.params.id)
                const product = products.filter(product => product.id === IdProduct);
                return(
                <EditProduct product={product[0]} setReloadProducts={setReloadProducts}/>
              )
            }}
            />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
