import Home from './layouts/Home'
import Menu from './layouts/Menu'
import './App.scss'
import Cart from './layouts/Cart'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router basename='/'>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} exact/>
            <Route path="/menu" element={<Menu/>} exact/>
            <Route path="/cart" element={<Cart/>} exact/>
          </Routes>
    </Router>
  )
}

export default App
