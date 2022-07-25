import { useState, useEffect, useCallback } from 'react';

import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const [productList, setProductList] = useState([]);

  const fetchProducts = useCallback(async() => {
    try {
      const response = await fetch("https://redux-store-97f56-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
      if(!response.ok) {
        throw new Error('Something Went Wrong!')
      }
      const data = await response.json();

      let fetchedProducts = [];

      for(const key in data){
        fetchedProducts.push({id: key, ...data[key]})
      }

      setProductList(fetchedProducts)

    } catch (error) {
      console.log(error.messsage || 'oops!');
    }
  }, [])
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  const products = productList.map(prod => (
    <ProductItem key={prod.id} {...prod}/>
  ))

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products}
      </ul>
    </section>
  );
};

export default Products;
