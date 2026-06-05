import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Header } from '../components/Header'
import { Link } from 'react-router-dom'
import './TrackingPage.css'



export function TrackingPage({cart}) {

const {orderId,productId} =useParams();
const[order,setOrder] = useState(null);

 useEffect(()=>{
     const fetchTrackingOrder =async()=>{
     const response= await axios.get(`/api/orders/${orderId}?expand=products`)
     
       setOrder(response.data);
     }
     fetchTrackingOrder();
    
},[orderId]);

 if(!order){
        return null;
      }

      const orderProduct =order.products.find((orderProduct) =>{
        return orderProduct.productId === productId ;
      })

      const totalDeliveryTimeMs =orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
 
      const timePassedMs = dayjs().valueOf() -order.orderTimeMs;
  
      let deliveryProgress =(timePassedMs / totalDeliveryTimeMs) * 100;
      if(deliveryProgress > 100){
        deliveryProgress =100;
      }
     /*  let isPreparing=false;
       let isShipped=false;
       let isDelivered=false;
      if(deliveryProgress < 33){
       isPreparing = true; ;
      }

      if(deliveryProgress >= 33 && deliveryProgress < 100){
        isShipped = true ;
      }

      if(deliveryProgress === 100){
        isDelivered = true;
      }
*/ 
    const isPreparing =deliveryProgress < 33;
    const isShipped =deliveryProgress >= 33 && deliveryProgress < 100;
    const isDelivered =deliveryProgress === 100;
    
  return (
    <>
      <title>Tracking</title>
      <Header cart={cart}/>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
           {deliveryProgress === 100 ? 'Delivered on ' : 'Arriving on ' }
             , {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity:{orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing &&'current-status'}`}>

              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${deliveryProgress}%` }}></div>
          </div>
        </div>
      </div>
    </>

  )
}