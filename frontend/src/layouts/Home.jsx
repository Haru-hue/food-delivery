const Home = () => {
    return (
        <main className="container">
            <section className="landing-section container-fluid">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                        <h1>Fastest <span>Delivery</span> & Easy <span>Pickup</span></h1>
                    </div>
                    <div className="col-span-6"></div>
                    <div className="col-span-3">
                        <ul>
                            <li className="d-flex">
                                <div className="icon"></div>
                                <p>
                                    <div className="fw-bold">Fast delivery</div>
                                    Promise to deliver within 30mins
                                </p>
                            </li>
                            <li className="d-flex">
                                <div className="icon"></div>
                                <p>
                                    <div className="fw-bold">Pick up</div>
                                    Pickup delivery at your doorstep
                                </p>
                            </li>
                            <li className="d-flex">
                                <div className="icon"></div>
                                <p>
                                    <div className="fw-bold">Dine in</div>
                                    Enjoy your food fresh crispy and hot 
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="about-section">
                <h2 className="text-center">Your Favourite Food Delivery Partner</h2>
                <div className="row">
                    <div className="col-lg-3">
                        <img src="" alt="" className="img-fluid" />
                        <aside className="fw-bold">Easy to order</aside>
                    </div>
                    <div className="col-lg-3">
                        <img src="" alt="" className="img-fluid" />
                        <aside className="fw-bold">Fastest Delivery</aside>
                    </div>
                    <div className="col-lg-3">
                        <img src="" alt="" className="img-fluid" />
                        <aside className="fw-bold">Best Quality</aside>
                    </div>
                </div>
            </section>
            <section className="category-section">
                <div className="d-flex align-items-center justify-content-between">
                    <h2>Our <span className="text-orange text-3xl">Best Delivered</span> Categories</h2>
                    <p>It’s not just about bringing  you good food from restaurants, we deliver you experience</p>
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
                <h1 className="font-bold">How It Works?</h1>
                <div className="columns-2">
                    <img src="" alt="" />
                    <article>
                        <p className="text-lg font-semibold">We are happy to tell you how to get how get your food to your home</p>
                        <ul>
                            <li className="flex">
                                <div className="workicon"></div>
                                <p>Choose Food & Order</p>
                            </li>
                            <li className="flex">
                                <div className="workicon"></div>
                                <p>Making payments on delivery</p>
                            </li>
                            <li className="flex">
                                <div className="workicon"></div>
                                <p>Orders have been prepared and ready to be delivered</p>
                            </li>
                            <li className="flex">
                                <div className="workicon"></div>
                                <p>The food has arrived, enjoy the meal </p>
                            </li>
                        </ul>
                    </article>
                </div>
            </section>
            <section className="food-banner">
                <div className="grid grid-cols-2">
                    <div>
                        1
                    </div>
                    <div>
                        <div className="grid grid-rows-2">
                            <div className="deal-banner">1</div>
                            <div className="deal-banner">2</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home