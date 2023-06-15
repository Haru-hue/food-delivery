import axios from "axios";
import ff from "../assets/fast-food.png"
import { useMemo, useState, useLayoutEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

export const line = <div className="w-full border-b border-gray-300"></div>;

const Menu = () => {
  const { state, dispatch } = useContext(AppContext)
  const [menu, setMenu] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [productId, setProductId] = useState('');
  const [allItems, setAllItems] = useState(true)
  const [active, setActive] = useState(false)
  const [sorted, setSorted] = useState('');

  const sortedMenu = useMemo(() => {
    
  })

  async function getMenu() {
    try {
      const response = await axios.get("http://localhost:5000/menu");
      setMenu(response.data.allProducts);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProducts (id) {
    try {
      const response = await axios.get(`http://localhost:5000/vendor/${id}`);
      setMenu(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  async function getVendors() {
    try {
      const response = await axios.get("http://localhost:5000/vendors")
      setVendors(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async (newItem) => {
    const itemOpt = state.cartItems.find((item) => item._id === newItem._id);
  
    if (!itemOpt) {
      // Add the new item to the cart
      const updatedCart = [...state.cartItems, { ...newItem, quantity: 1 }];
      dispatch({ type: 'SET_ITEMS', payload: updatedCart });
    } else {
      // Update the quantity of the existing item
      const updatedCart = state.cartItems.map((item) => {
        if (item._id === newItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      dispatch({ type: 'SET_ITEMS', payload: updatedCart });
    }
  };
  

  useLayoutEffect(() => {
    if (allItems) { // fetch all products when showAllMenu is true
      getMenu();
    } else { // fetch products of selected vendor when showAllMenu is false
      getProducts(productId);
    }
    getVendors();
  }, [allItems, productId])

  const displayMenu = menu.map((item) => {
    return (
      <div
        className="rounded-lg overflow-hidden menu-card h-auto"
        key={item._id}
      >
        <div className="m-4 flex justify-center">
          <img
            src={item.image.url}
            alt=""
            className="rounded-lg object-cover w-500 h-40"
          />
        </div>
        <div className="p-4 flex items-center flex-col">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          {line}
          <div className="py-3 flex items-center">
            <Rating stars={item.meta.ratingsCount} />
            <p className="text-orange font-bold text-lg">
              ({item.meta.reviewsCount})
            </p>
          </div>
          {line}
          <div className="pt-4 flex justify-between w-[300px]">
            <h1 className="font-bold text-lg">
              ₦{item.price.toLocaleString()}.00
            </h1>
            <button
              className="bg-orange hover:bg-blue-700 text-white font-bold rounded p-1"
              onClick={() => handleClick(item)}
            >
              <Icon
                icon="material-symbols:add-rounded"
                color="white"
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </div>
    );
  });

  const handleId = (id) => {
    console.log(id);
    setAllItems(false)
    setProductId(id);
    getProducts(id);
    // setActive(true)
  }

  const allVendors = vendors.map((item) => {
    return (
      <button key={item._id} onClick={() =>{ handleId(item._id)}}>{item.name}</button>
    )
  })

  const handleSelect = (event) => {
    setSelected(event.target.value)
  }

  return (
    <main className="py-2 container">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline space-x-5">
          <h1 className="font-bold text-3xl">Find the best foods</h1>
          <img src={ff} alt=""  className="w-10"/>
        </div>
        <select name="" id="" onChange={handleSelect}>
          <option value="default" selected>Sort by default</option>
          <option value="rating">Sort by rating</option>
          <option value="lowp">Price: Low to High</option>
          <option value="highp">Price: Low to High</option>
        </select>
      </div>
      <div className="flex justify-center space-x-14 py-5">
        <button onClick={() => setAllItems(true)}
          className={`px-10 py-2 ${active ? 'bg-gray-300': ''}`}
        >All</button>
        `{allVendors}
      </div>
      <div className="grid grid-cols-3 gap-3 px-48">{displayMenu}</div>
    </main>
  );
};

export default Menu;
