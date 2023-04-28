import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[56rem]">
            <div className="bg-black mx-auto rounded-t-full">
                <div className="flex items-center justify-evenly h-16 py-8">
                <div className="flex-shrink-0">
                    <a href="" className="navbar-brand text-white font-bold text-xl">Budo</a>
                </div>
                <div className="hidden md:block text-white">
                    &copy; 2023 <span className="text-orange">Uko Joshua</span> | All Rights Reserved  
                </div>
                <div className="flex items-baseline space-x-2 text-white">
                    <Icon icon="ic:round-search"  className="text-3xl"/>
                </div>
                </div> 
            </div>
        </footer>
    )
}

export default Footer