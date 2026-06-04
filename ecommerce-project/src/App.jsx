import axios from 'axios'
import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrderPage } from './pages/orders/OrderPage'
import { TrackingPage } from './pages/TrackingPage'
import {Page404} from './pages/Page404'

function App() {

  const[cart,setCart] = useState([]);
  useEffect(() => {
   const fetchAppData =async() =>{
    const response=await axios.get('/api/cart-items?expand=product')
    setCart(response.data);
   }
   fetchAppData();
  }, []);
  return(

    
    <Routes>

      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrderPage cart={cart}/>} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
   
    
  )
}

export default App
