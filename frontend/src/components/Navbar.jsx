import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const Navbar = ({ totalItems, cartItems }) => {
    return (
        <header className="container mb-4">
            <nav class="bg-black max-w-4xl mx-auto rounded-b-full">
                <div class="flex items-center justify-evenly h-16 py-8">
                    <div class="flex-shrink-0">
                        <a href="" className="navbar-brand text-white font-bold text-xl">Budo</a>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <Link to='/'>
                                <div class="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">Home</div>
                            </Link>
                            <Link to='/menu'>
                                <div class="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">Menu</div>
                            </Link>
                            <div class="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-md font-medium">Vendors</div>
                        </div>
                    </div>
                    <div className="flex items-baseline space-x-2 text-white">
                        <Icon icon="ic:round-search"  className="text-3xl"/>
                        <Link to='/cart'>
                            <div class="relative inline-block">
                                <Icon icon="la:shopping-bag" className="text-3xl" />
                                <div class="absolute top-[-6px] right-[-5px] h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">{totalItems}{cartItems.length}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div> 
            </nav>
        </header>
    )
}

export default Navbar