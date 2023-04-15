import axios from 'axios';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { line } from './Menu';

const Cart = ({ cartItems, deleteCartItem, totalItems, setTotalItems }) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
// initialize totalItems to the length of cartItems

useEffect(() => {
  const filteredItems = cartItems.filter((item) => item !== null);
  const fetchProducts = async () => {
    try {
      const promises = filteredItems.map((id) =>
        axios.get(`http://localhost:5000/product/${id}`)
      );
      const responses = await Promise.all(promises);
      const fetchedProducts = responses.map((response) => ({
        ...response.data,
        count: 1, // initialize count to 1
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();

  const totalCount = filteredItems.reduce((acc, item) => acc + item.count, 0);
  setTotalItems(totalCount);

}, [cartItems]);

useEffect(() => {
  setTotalItems(cartItems.reduce((acc, item) => acc + item.count, 0));
}, []);

  const updatePrice = (_id, updatedPrice, count) => {
    setProducts((prevProducts) => {
      const updatedItems = prevProducts.map((item) => {
        if (item._id === _id) {
          return { ...item, totalPrice: updatedPrice, count };
        }
        return item;
      });
      console.log(updatedItems);
      const newTotalPrice = updatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalPrice(newTotalPrice);

      // calculate the total count of items in the cart and update the state
      const newTotalItems = updatedItems.reduce((acc, item) => acc + item.count, 0);
      setTotalItems(newTotalItems);

      return updatedItems;
    });
  };

  const itemsInCart = products.map((item) => {
    if (!item) {
      return null;
    }
    return (
      <CartItem
        key={item._id}
        id={item._id}
        name={item.name}
        image={item.image?.url}
        price={item.price}
        totalPrice={item.totalPrice}
        count={item.count}
        setCount={(count) => updatePrice(item._id, item.price * count, count)}
        updatePrice={updatePrice}
        onDelete={() => {
          deleteCartItem(item._id);
          setTotalItems((prevTotalItems) => prevTotalItems - 1); // update the total count when an item is deleted
        }}
      />
    );
  });

  return (
    <main className='container'>
      <h1 className='text-center'>
        Your <span className='text-orange'>Cart ({totalItems})</span>
      </h1>
      {line}
      {itemsInCart}
      {line}
      <div className='flex justify-between'>
        <p className='font-bold'>Total</p>
        <p className='font-bold text-4xl'>
          <span className='text-xl text-orange'>₦</span>
          {totalPrice.toLocaleString()}.00
        </p>
      </div>
    </main>
  );
};

export default Cart;