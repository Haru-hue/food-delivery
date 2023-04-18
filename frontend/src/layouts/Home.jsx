import homepage from '../assets/homepage.png'
import order from '../assets/order.jpg'
import quality from '../assets/quality.jpg'
import delivery from '../assets/delivery.jpg'
import worker from '../assets/worker.png'
import shawarma from '../assets/shawarma.jpg'
import shaw from '../assets/shaw-1.png'
import fanta from '../assets/fanta.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faBagShopping, faUtensils, faMoneyBillTransfer, faCheck } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    return (
        <main className="container py-10">
            <section className="landing-section container-fluid">
                <div className="grid grid-cols-12 gap-4 justify-items-center">
                    <div className="col-span-5">
                        <h1 className='text-7xl title-font w-[450px] leading-[5.5rem] ms-7'>
                            Fastest <span className='text-orange'>Delivery</span> & Easy <span className='text-orange'>Pickup</span>
                        </h1>
                    </div>
                    <div className="col-span-4">
                        <img src={homepage} alt="" className='max-w-md'/>
                    </div>
                    <div className="col-span-3">
                        <ul className='space-y-10 flex flex-col'>
                            <li className="flex d-flex gap-5">
                                <FontAwesomeIcon icon={faBicycle}/>
                                <p>
                                    <div className="fw-bold">Fast delivery</div>
                                    Promise to deliver within 30mins
                                </p>
                            </li>
                            <li className="flex d-flex gap-5">
                                <FontAwesomeIcon icon={faBagShopping} />
                                <p>
                                    <div className="fw-bold">Pick up</div>
                                    Pickup delivery at your doorstep
                                </p>
                            </li>
                            <li className="flex d-flex gap-5">
                                <FontAwesomeIcon icon={faUtensils} />
                                <p>
                                    <div className="fw-bold">Dine in</div>
                                    Enjoy your food fresh crispy and hot 
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="about-section pb-4">
                <div className="text-center text-5xl w-[300px] title-font">
                    <span className="inline-block w-32"></span>
                </div>
                <div class="text-center">
                    <span class="inline-block w-500 title-font text-5xl leading-[3.5rem]">Your Favourite Food Delivery Partner</span>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <img src={order} alt="" className="w-96 h-96 object-contain"/>
                            <aside className='font-bold text-2xl'>Easy to order</aside>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col items-center"> 
                            <img src={delivery} alt="" className="w-96 h-96 object-contain"/>
                            <aside className='font-bold text-2xl'>Fastest Delivery</aside>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <img src={quality} alt="" className='w-96 h-96 object-contain'/>
                            <aside className='font-black text-2xl'>Best Quality</aside>
                        </div>
                    </div>
                </div>

            </section>
            <section className="category-section pt-10">
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl title-font w-[450px] leading-[3.5rem]'>
                        Our <span className="text-orange">Best Delivered</span> Categories
                    </h1>
                    <p className='w-[45 0px] pr-10'>It’s not just about bringing  you good food from restaurants, we deliver you experience</p>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-4 flex justify-center">
                        <p className="text-orange">Order Now</p>
                    </div>
                    <div className="col-span-4 flex justify-center">
                        <p className="text-orange">Order Now</p>
                    </div>
                    <div className="col-span-4 flex justify-center">
                        <p className="text-orange">Order Now</p>
                    </div>
                </div>
            </section>
            <section className="work-section">
                <h1 className="font-bold title-font text-5xl text-center py-6">How It Works?</h1>
                <div className="columns-2 gap-4">
                    <img src={worker} alt="" className='w-1/2 ml-auto'/>
                    <article>
                        <p className="text-2xl font-semibold w-[375px]">We are happy to tell you how to get how get your food to your home</p>
                        <ul className='pt-10 text-xl space-y-10'>
                            <li className="flex space-x-5">
                                <div className="workicon"><FontAwesomeIcon icon={faBicycle}/></div>
                                <p>Choose Food & Order</p>
                            </li>
                            <li className="flex space-x-5">
                                <div className="workicon"><FontAwesomeIcon icon={faMoneyBillTransfer}/></div>
                                <p>Making payments on delivery</p>
                            </li>
                            <li className="flex space-x-5">
                                <div className="workicon"><FontAwesomeIcon icon={faBicycle}/></div>
                                <p>Orders have been prepared and ready to be delivered</p>
                            </li>
                            <li className="flex space-x-5">
                                <div className="workicon"><FontAwesomeIcon icon={faCheck}/></div>
                                <p>The food has arrived, enjoy the meal </p>
                            </li>
                        </ul>
                    </article>
                </div>
            </section>
            <section className="food-banner pt-24">
                <div className="grid grid-cols-2 gap-6">
                    <div className='w-[35rem] h-[38rem] ml-auto bg-cover bg-center rounded-xl' style={{ backgroundImage: `url(${shawarma})` }}>
                        1
                    </div>
                    <div>
                        <div className="grid grid-rows-2 gap-8">
                            <div className="bg-[#612C20] rounded-lg h-72 overflow-hidden">
                                <div className="bg-[#FED054] w-32 h-32 rounded-full flex items-center justify-center m-6">
                                    <span className='title-font font-bold text-3xl transform rotate-[-25deg]'>₦800</span>
                                </div>
                                <img src={shaw} className='w-[45%] ml-52 mt-[-10rem]'/>
                            </div>
                            <div className="bg-yellow-400 bg-opacity-50 rounded-lg h-72 overflow-hidden">
                                <img src={fanta} alt="" className='w-3/4 mx-auto mt-[-8rem]'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home