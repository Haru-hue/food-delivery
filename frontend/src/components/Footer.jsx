import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="container mt-4">
            <div className="bg-black max-w-4xl mx-auto rounded-t-full">
                <div className="flex items-center justify-evenly h-16 py-8">
                <div className="flex-shrink-0">
                    <a href="" className="navbar-brand text-white font-bold text-xl">Budo</a>
                </div>
                <div className="hidden md:block text-white">
                    &copy; 2023 <span className="text-orange">Uko Joshua</span> | All Rights Reserved  
                </div>
                <div className="flex items-baseline space-x-2 text-white">
                    <Link to={`https://github.com/Haru-hue`}>
                        <Icon icon="mdi:github"  className="text-3xl"/>
                    </Link>
                    <Link to={`https://www.linkedin.com/in/joshua-uko-a99568167/`}>
                        <Icon icon="mdi:linkedin"  className="text-3xl"/>
                    </Link>
                </div>
                </div> 
            </div>
        </footer>
    )
}

export default Footer