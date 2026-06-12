import {formatCurrency} from '../../utils/money'
import dayjs from 'dayjs'
import axios from 'axios'

export function DeliveryOptions({deliveryOptions, cartItem,loadCart}) {
  return(
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {

        let priceInfo = 'FREE SHIPPING';
        if (deliveryOption.priceCents > 0) {
          priceInfo = `${formatCurrency(deliveryOption.priceCents)}-Shipping`;
        }
  
        const updatedDeliveryOptions= async() =>{
          await axios.put(`/api/cart-items/${cartItem.productId}`,{
            deliveryOptionId:deliveryOption.id
          })
          await loadCart();
        }

        
        return (
          <div key={deliveryOption.id}
            className="delivery-option"
            onClick={updatedDeliveryOptions}>
            <input type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              onChange ={() =>{}}
              name={`delivery-option-${cartItem.productId}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
              </div>
              <div className="delivery-option-price">
                {priceInfo}
              </div>
            </div>
          </div>
        )
      })}



    </div>

  )

}