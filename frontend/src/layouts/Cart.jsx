import axios from 'axios';
import { useEffect, useState } from 'react';
import { cartItems } from './Menu';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = cartItems.map(id => axios.get(`http://localhost:5000/product/${id}`));
        const responses = await Promise.all(promises);
        const fetchedProducts = responses.map(response => response.data);
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const itemsInCart = products.map((item) => {
    return (
      <CartItem key={item._id} name={item.name}  
      image={item.image?.url} price={item.price}
      onDelete={() => deleteCartItem(item._id)}/>
    )
  })

  return (
    <main className='container'>
      <h1 className='text-center'>Your <span className="text-orange">Cart ({products.length})</span></h1>
      {itemsInCart}
    </main>
  );
};

export default Cart;
