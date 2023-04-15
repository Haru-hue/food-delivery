import axios from 'axios';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  const deleteCartItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const handleClick = (id) => {
    if (!cartItems.includes(id)) {
      const updatedCart = [...cartItems, id];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      console.log(`Added item with id ${id} to the cart.`);
    } else {
      console.log(`Item with id ${id} has already been added to the cart.`);
    }
  };

  useEffect(() => {
    async function getMenu() {
      try {
        const response = await axios.get('http://localhost:5000/menu');
        setMenu(response.data.allProducts);
      } catch (err) {
        console.log(err);
      }
    }
    getMenu();
  }, []);

  const displayMenu = menu.map((item) => {
    return (
      <div className="rounded-lg overflow-hidden w-100 menu-card h-auto" key={item._id}>
        <div className="m-4 flex justify-center">
          <img src={item.image.url} alt="" className="rounded-lg object-cover w-500 h-40" />
        </div>
        <div className="p-4 flex items-center flex-col">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at orci eget nisl condimentum rhoncus.
            Praesent ac mauris mauris.
          </p>
          <div className="flex justify-between">
            <h1 className="font-bold">{item.price}</h1>
            <button
              className="bg-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleClick(item._id)}
            >
              <Icon icon="material-symbols:add-rounded" color="white" />
            </button>
            <button
              className="bg-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => deleteCartItem(item._id)}
            >
              <Icon icon="material:delete" color="white" />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="container">
      <div className="grid grid-cols-3 gap-3 px-48">{displayMenu}</div>
    </main>
  );
};

export { cartItems, deleteCartItem };
