import axios from 'axios'
import { Header } from '../../components/Header'
import { useState, useEffect } from 'react'

import './OrderPage.css'
import { OrdersGrid } from './OrdersGrid'

export function OrderPage({ cart ,loadCart}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async() =>{
     const response=await axios.get('/api/orders?expand=products');
     setOrders(response.data);
    }
   fetchOrdersData();
  }, []);
  return (
    <>
      <title>ordersPage</title>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />

      </div>
    </>
  )
}