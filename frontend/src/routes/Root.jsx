import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import React from "react"

const Root = () => {
    return (
        <div class="flex flex-col h-screen justify-between">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Root