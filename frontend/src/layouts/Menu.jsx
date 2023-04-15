import axios from 'axios'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import Rating from '../components/Rating';

export const line = (
  <div class="w-full border-b border-gray-300"></div>
)

const Menu = ({handleClick}) => {
    const [menu, setMenu] = useState([])
    async function getMenu () {
        try {
            const response = await axios.get('http://localhost:5000/menu')
            setMenu(response.data.allProducts)
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getMenu()
    }, [])

  const displayMenu = menu.map((item) => {
    return (
      <div className="rounded-lg overflow-hidden w-100 menu-card h-auto" key={item._id}>
        <div className="m-4 flex justify-center">
          <img src={item.image.url} alt="" className="rounded-lg object-cover w-500 h-40" />
        </div>
        <div className="p-4 flex items-center flex-col">
          <h2 className="text-xl font-bold mb-2">{item.name}</h2>
          {line}
          <div className="py-3 flex items-center">
            <Rating stars={item.meta.ratingsCount} />
            <p className="text-orange font-bold text-lg">({item.meta.reviewsCount})</p>
          </div>
          {line}
          <div className="pt-4 flex w-[300px] justify-between">
            <h1 className="font-bold text-lg">₦{item.price.toLocaleString()}.00</h1>
            <button
              className="bg-orange hover:bg-blue-700 text-white font-bold rounded p-1"
              onClick={() => handleClick(item._id)}
            >
              <Icon icon="material-symbols:add-rounded" color="white" className='text-2xl'/>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="container py-2">
      <div className="grid grid-cols-3 gap-3 px-48">{displayMenu}</div>
    </main>
  );
};

export default Menu;