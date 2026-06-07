import { useState } from 'react'
import {formatCurrency} from '../../utils/money'
import './CartItemDetails.css'
import axios from 'axios'

export function CartItemDetails({cartItem,loadCart}) {
const[isUpdateQuantity,setIsUpdateQuantity] = useState(false);
const[quantity,setQuantity] = useState(cartItem.quantity);

  const fetchUpdateQuantity = async () => {
    if(isUpdateQuantity){
      await axios.put(`/api/cart-items/${cartItem.productId}`,{
        quantity:quantity
      });
      await loadCart();
      setIsUpdateQuantity(false);

    }
    else{
      setIsUpdateQuantity(true);
    }
 
    


  }


  const deleteCartItem =async() =>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
    return(
    <>
    <img className="product-image"
      src={cartItem.product.image} />

    <div className="cart-item-details">
      <div className="product-name">
        {cartItem.product.name}

      </div>
      <div className="product-price">
        ${formatCurrency(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        <span>    
        Quantity:{isUpdateQuantity 
          ? 
          <input className="input-text" type="text"
          value={quantity} onChange ={(event) => {
            const quantitySelector =Number(event.target.value);
            setQuantity(quantitySelector);
          }}
          />
          : <span className="quantity-label">{cartItem.quantity}</span>
            }
        </span>
      
        <span className="update-quantity-link link-primary"
        onClick={fetchUpdateQuantity}>
          Update
        </span>
        <span className="delete-quantity-link link-primary"
        onClick={deleteCartItem}>
          Delete
        </span>
      </div>
    </div>        
    </>
    );
}