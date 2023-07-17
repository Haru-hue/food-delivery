import * as assets from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faBagShopping,
  faUtensils,
  faMoneyBillTransfer,
  faCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { OrderConfirmed } from "../utils";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const localReference = localStorage.getItem("reference");
  const arrow = <FontAwesomeIcon icon={faArrowRight} />;
  const location = useLocation()
  const onDelivery = location.state?.onDelivery

  return (
    <main className="container py-10">
     {localReference || onDelivery ? <OrderConfirmed /> : null}

      <section className="landing-section container-fluid">
        <div className="grid grid-cols-12 gap-4 justify-items-center">
          <div className="col-span-5">
            <div className="relative">
              <div className="absolute -top-6 left-2 transform -translate-x-1/2 w-48 h-48 rounded-full bg-orange opacity-5"></div>
              <h1 className="text-7xl title-font w-[450px] leading-[5.5rem] ms-7 z-10">
                Fastest <span className="text-orange">Delivery</span> & Easy{" "}
                <span className="text-orange">Pickup</span>
              </h1>
            </div>
          </div>
          <div className="col-span-4">
            <img src={assets.homepage} alt="" className="max-w-md" />
          </div>
          <div className="col-span-3">
            <ul className="space-y-10 flex flex-col">
              <li className="flex d-flex gap-5">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                  <FontAwesomeIcon icon={faBicycle} className="text-2xl" />
                </span>
                <span>
                  <div className="font-bold text-lg">Fast delivery</div>
                  <p className="text-md w-3/4">
                    Promise to deliver within 30mins
                  </p>
                </span>
              </li>
              <li className="flex d-flex gap-5">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                  <FontAwesomeIcon icon={faBagShopping} className="text-2xl" />
                </span>
                <span>
                  <div className="font-bold text-lg">Pick up</div>
                  <p className="text-md w-3/4">
                    Pickup delivery at your doorstep
                  </p>
                </span>
              </li>
              <li className="flex d-flex gap-5">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-300 shadow">
                  <FontAwesomeIcon icon={faUtensils} className="text-2xl" />
                </span>
                <span>
                  <div className="font-bold text-lg">Dine in</div>
                  <p className="text-md w-3/4">
                    Enjoy your food fresh crispy and hot
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="about-section pb-4">
        <div className="text-center text-5xl w-[300px] title-font">
          <span className="inline-block w-32"></span>
        </div>
        <div className="text-center">
          <span className="inline-block w-500 title-font text-5xl leading-[3.5rem]">
            Your Favourite Food Delivery Partner
          </span>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="flex flex-col items-center">
              <img
                src={assets.order}
                alt=""
                className="w-96 h-96 object-contain"
              />
              <aside className="font-bold text-2xl">Easy to order</aside>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col items-center">
              <img
                src={assets.delivery}
                alt=""
                className="w-96 h-96 object-contain"
              />
              <aside className="font-bold text-2xl">Fastest Delivery</aside>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col items-center">
              <img
                src={assets.quality}
                alt=""
                className="w-96 h-96 object-contain"
              />
              <aside className="font-black text-2xl">Best Quality</aside>
            </div>
          </div>
        </div>
      </section>
      <section className="category-section py-16">
        <div className="flex items-center justify-evenly">
          <div className="relative">
            <div className="absolute -top-10 left-2 transform -translate-x-1/2 w-28 h-28 rounded-full bg-orange opacity-5"></div>
            <h1 className="text-5xl title-font w-[450px] leading-tight">
              Our <span className="text-orange">Best Delivered</span> Categories
            </h1>
          </div>
          <p className="w-1/5">
            It’s not just about bringing you good food from restaurants, we
            deliver you experience
          </p>
        </div>
        <div className="grid grid-cols-12 pt-8">
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={assets.jrice} className="w-3/4" />
              <aside className="font-bold text-lg">Value Meals</aside>
            </div>
            <Link to={`/menu`}>
              <p className="text-orange text-2xl font-bold pt-4">
                Order Now {arrow}
              </p>
            </Link>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={assets.chic} className="w-3/4" />
              <aside className="font-bold text-lg">Combo Meals</aside>
            </div>
            <Link to={`/menu`}>
              <p className="text-orange text-2xl font-bold pt-4">
                Order Now {arrow}
              </p>
            </Link>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <img src={assets.snack} className="w-3/4" />
              <aside className="font-bold text-lg">Sweets and Snacks </aside>
            </div>
            <Link to={`/menu`}>
              <p className="text-orange text-2xl font-bold pt-4">
                Order Now {arrow}
              </p>
            </Link>
          </div>
        </div>
      </section>
      <section className="work-section">
        <h1 className="font-bold title-font text-5xl text-center py-10">
          How It Works?
        </h1>
        <div className="columns-2 gap-10">
          <img src={assets.worker} alt="" className="w-3/4 ml-auto" />
          <article>
            <p className="text-3xl font-semibold w-3/5 leading-snug">
              We are happy to tell you how to get how get your food to your home
            </p>
            <ul className="pt-10 text-xl space-y-16">
              <li className="flex space-x-5 items-center">
                <div className="w-16 h-16 bg-orange-lighter inline-flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faBicycle}
                    className=" text-white text-3xl"
                  />
                </div>
                <p className="text-2xl">Choose Food & Order</p>
              </li>
              <li className="flex space-x-5 items-center">
                <div className="w-16 h-16 bg-orange-lighter inline-flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faMoneyBillTransfer}
                    className=" text-white text-3xl"
                  />
                </div>
                <p className="text-2xl">Making payments on delivery</p>
              </li>
              <li className="flex space-x-5 items-center">
                <div className="w-16 h-16 bg-orange-lighter inline-flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faBicycle}
                    className=" text-white text-3xl"
                  />
                </div>
                <p className="text-2xl w-1/2">
                  Orders have been prepared and ready to be delivered
                </p>
              </li>
              <li className="flex space-x-5 items-center">
                <div className="w-16 h-16 bg-orange-lighter inline-flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className=" text-white text-3xl"
                  />
                </div>
                <p className="text-2xl w-2/5">
                  The food has arrived, enjoy the meal{" "}
                </p>
              </li>
            </ul>
          </article>
        </div>
      </section>
      <section className="food-banner pt-24">
        <div className="grid grid-cols-2 gap-6">
          <div
            className="w-[35rem] h-[32rem] ml-auto bg-gradient-to-b from-black via-black to-transparent bg-cover bg-center rounded-xl flex flex-col py-14 px-10 justify-between"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${assets.shawarma})`,
            }}
          >
            <h1 className="title-font text-white text-5xl w-1/2 leading-tight">
              25% Discount
            </h1>
            <span className="title-font text-white space-y-2">
              <p className="text-xl">Hotline</p>
              <h1 className="text-4xl">07059230778</h1>
            </span>
          </div>
          <div>
            <div className="grid grid-rows-2 gap-8">
              <div className="bg-brown rounded-lg h-60 overflow-hidden">
                <div className="bg-lime w-28 h-28 rounded-full flex items-center justify-center m-6">
                  <span className="title-font font-bold text-3xl transform rotate-[-25deg]">
                    ₦800
                  </span>
                </div>
                <div className="bg-brown-dark w-72 h-72 rounded-full -mt-80 ml-auto -mr-12"></div>
                <span className="title-font text-white space-y-2 flex flex-col items-end pr-10 -mt-28 space-x-3">
                  <p className="text-xl">Save</p>
                  <h1 className="text-4xl text-lime">20%</h1>
                </span>
                <img src={assets.shaw} className="w-2/5 ml-44 -mt-20" />
              </div>
              <div className="bg-yellow-400 bg-opacity-50 rounded-lg h-60 overflow-hidden">
                <div className="bg-orange w-28 h-28 rounded-full flex items-center justify-center ml-auto mr-10 mt-4">
                  <span className="title-font font-bold text-3xl text-center text-white">
                    ₦100 Off
                  </span>
                </div>
                <img
                  src={assets.fanta}
                  alt=""
                  className="w-3/4 mx-auto -mt-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
