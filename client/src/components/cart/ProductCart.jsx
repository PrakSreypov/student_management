import React from 'react';
import styles from './styles.module.css';
import Iphone from '../../assets/images/vite.config.jpeg';

const ProductCart = ({
  ProductName,
  Description,
  Price,
  Image
}) => {
  return (
    <div className={styles.container}>
      <img src={Image} alt="" />
      <p>{ProductName}</p>
      <p>{Description}</p>
      <p>{Price}$</p>
    </div>
  )
}

export default ProductCart
