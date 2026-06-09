
import React from 'react'
import axios from 'axios'
import { MemoryRouter,useLocation  } from 'react-router'
import {it ,expect, describe, beforeEach, vi} from 'vitest'
import { render,screen, within } from '@testing-library/react'
import { PaymentSummary } from './PaymentSummary'
import userEvent from '@testing-library/user-event'

vi.mock('axios');
describe('Payment Summary Component',() => {
    let loadCart;
    let paymentSummary;
    let user;
    beforeEach(() => {
        paymentSummary=
        {
        "totalItems": 2,
        "productCostCents": 3185,
        "shippingCostCents": 0,
        "totalCostBeforeTaxCents": 3185,
        "taxCents": 319,
        "totalCostCents": 3504
        }
        
        loadCart =vi.fn();
        user = userEvent.setup();
    });
    it('displays the  details correctly',() => {
        render(
        <MemoryRouter>
            <PaymentSummary paymentSummary={paymentSummary} 
            loadCart={loadCart} />
        </MemoryRouter>
        );

 
      expect(
        screen.getByText('Items (2):')
      ).toBeInTheDocument();

      expect(
        screen.getByText('Total before tax:')
      ).toBeInTheDocument();

      //this is the one of the method to check the text 
      //within()+getByText()+toBeInTheDocument()
      expect(
        within(screen.getByTestId('payment-summary-shipping-cost'))
      .getByText('$0.00')
      ).toBeInTheDocument();

     //getByTestId() + toHaveTextContent()
    // (toHaveTextContent() checks the text inside an element

      expect(
        screen.getByTestId('payment-summary-total-before-tax')
      ).toHaveTextContent('$31.85');

      expect(
        screen.getByTestId('payment-summary-tax')
      ).toHaveTextContent('$3.19');

          expect(
        screen.getByTestId('payment-summary-total')
      ).toHaveTextContent('$35.04');  

      })

      it('place an order ',async() => {
        function Location(){
          const location = useLocation();
          return(
            <div data-testid = "url-path">
              {location.pathname}
             </div>
          )
        }
        render(
        <MemoryRouter>
            <PaymentSummary paymentSummary={paymentSummary} 
            loadCart={loadCart} />
            <Location />
        </MemoryRouter>
        )
        
       
        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        expect(
          screen.getByTestId('url-path')
          ).toHaveTextContent('/orders');

      })

    })





