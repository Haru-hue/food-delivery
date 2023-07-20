import axios from "axios";
import ff from "../assets/fast-food.png";
import { useMemo, useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import Rating from "../components/Rating";
import { AppContext, url } from "../utils/Context";
import { useDocumentTitle } from "../utils";

export const line = <div className="w-full border-b border-gray-300"></div>;

const Menu = () => {
  const { state, dispatch } = useContext(AppContext);
  const [menu, setMenu] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [productId, setProductId] = useState("");
  const [allItems, setAllItems] = useState(true);
  const [active, setActive] = useState(null);
  const [sortOption, setSortOption] = useState("default");

  const handleSelect = (event) => {
    setSortOption(event.target.value);
  };

  const sortedMenuItems = useMemo(() => {
    if (sortOption === "default") {
      return menu;
    } else if (sortOption === "rating") {
      return [...menu].sort(
        (a, b) => b.meta.ratingsCount - a.meta.ratingsCount
      );
    } else if (sortOption === "lowp") {
      return [...menu].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highp") {
      return [...menu].sort((a, b) => b.price - a.price);
    }
  }, [menu, sortOption]);

  async function getMenu() {
    try {
      const response = await axios.get(`${url}/menu`);
      setMenu(response.data.allProducts);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProducts(id) {
    try {
      const response = await axios.get(`${url}/vendor/${id}`);
      setMenu(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getVendors() {
    try {
      const response = await axios.get(`${url}/vendors`);
      setVendors(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = async (newItem) => {
    const itemOpt = state.cartItems?.find((item) => item._id === newItem._id);
    if (!itemOpt) {
      // Add the new item to the cart
      const updatedCart = [...state.cartItems, { ...newItem, quantity: 1 }];
      dispatch({ type: "SET_ITEMS", payload: updatedCart });
    } else {
      // Update the quantity of the existing item
      const updatedCart = state.cartItems.map((item) => {
        if (item._id === newItem._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      dispatch({ type: "SET_ITEMS", payload: updatedCart });
    }
  };

  useEffect(() => {
    if (allItems) {
      // fetch all products when showAllMenu is true
      getMenu();
    } else {
      // fetch products of selected vendor when showAllMenu is false
      getProducts(productId);
    }
    getVendors();
  }, [allItems, productId]);

  const displayMenu = sortedMenuItems.map((item) => {
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
          <div className="pt-4 flex justify-between lg:w-[200px] 2xl:w-[300px]">
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
    setAllItems(false);
    setProductId(id);
    getProducts(id);
    setActive(id);
  };

  const allVendors = vendors.map((item) => {
    return (
      <button
        key={item._id}
        onClick={() => {
          handleId(item._id);
        }}
        className={`${
          item._id === active && !allItems ? "bg-orange text-white" : ""
        } lg:px-10 rounded-full`}
      >
        {item.name}
      </button>
    );
  });

  return (
    <main className="py-2 container">
      {useDocumentTitle('Menu')}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline space-x-5">
          <h1 className="font-bold text-3xl max-md:hidden">Find the best foods</h1>
          <img src={ff} alt="" className="w-10" />
        </div>
        <select
          className="select-custom bg-gray-300 max-md:p-2 max-md:m-2 p-4 rounded-md"
          onChange={handleSelect}
          value={sortOption}
        >
          <option value="default">Sort by default</option>
          <option value="rating">Sort by rating</option>
          <option value="lowp">Price: Low to High</option>
          <option value="highp">Price: High to Low</option>
        </select>
      </div>
      <div className="flex items-center justify-center max-md:flex-wrap max-md:space-y-4 md:space-x-14 py-5">
        <button
          onClick={() => setAllItems(true)}
          className={`px-10 ${
            allItems ? "bg-orange text-white" : ""
          } rounded-full`}
        >
          All
        </button>
        
        {allVendors}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 px-3 gap-10 2xl:px-48">{displayMenu}</div>
    </main>
  );
};

export default Menu;
