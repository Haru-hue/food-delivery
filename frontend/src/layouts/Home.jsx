const Home = () => {
    return (
        <main className="container">
            <section className="landing-section container-fluid">
                <div className="grid grid-cols-3">
                    <div className="col-lg-3">
                        <h1>Fastest <span>Delivery</span> & Easy <span>Pickup</span></h1>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-3">
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
            </section>
        </main>
    )
}

export default Home