import React, { useState } from "react";
import ProductCart from "../../components/cart/ProductCart";
import Iphone from "../../assets/images/vite.config.jpeg";
import { Button } from "antd";

const HomePage = () => {
  const [state, setState] = useState({
    valueCount: 0,
    currentValue: 1,
  });

  const decrease = () => {
    setState({
      ...state,
      valueCount: state.valueCount - state.currentValue,
    });
  };

  const increase = () => {
    setState({
      ...state,
      valueCount: state.valueCount + state.currentValue,
    });
  };

  const changeCurrentValue = (e) => {
    setState({
      ...state,
      currentValue: Number(e.target.value),
    });
  };

  const dataProduct = [
    {
      id: 1,
      product_name: "Iphone 11",
      des: "Iphone 11",
      price: 10,
    },
    {
      id: 1,
      product_name: "Iphone 12",
      des: "Iphone 11",
      price: 10,
    },
    {
      id: 1,
      product_name: "Iphone 13",
      des: "Iphone 11",
      price: 10,
    },
  ];

  const [list, setList] = useState(dataProduct);

  return (
    <>
      {/* <h1>Value Count: {state.valueCount}</h1> */}
      {/* <h1>Current value: {state.currentValue}</h1> */}
      {/* <h1>Current Value: {state.currentValue}</h1>
      <input type="number" onChange={changeCurrentValue} value={state.currentValue}/>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button> */}

      {/* <ProductCart ProductName='Women Shoes' Price={20} Image={Iphone}/>
      <ProductCart ProductName='Men Shoes' Price='10'/> */}

      {list.map((item, index) => (
        <ProductCart key={index} ProductName={item.product_name} Price={item.price} Description={item.des} />
      ))}

      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dash">Primary</Button>
    </>
  );
};

export default HomePage;
