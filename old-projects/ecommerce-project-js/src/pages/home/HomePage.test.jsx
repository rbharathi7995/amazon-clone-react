import React from 'react';
import axios from 'axios'
import { MemoryRouter } from 'react-router';
import { it ,expect, describe, vi, beforeEach} from 'vitest'
import { render,screen,within } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import { HomePage } from './HomePage'
import userEvent from '@testing-library/user-event';

vi.mock('axios');
describe('Home Page Component',() => {
    
    let loadCart;
    let user;
    beforeEach(() => {
        loadCart=vi.fn();
        axios.get.mockImplementation(async (urlPath)=> { //here we are using async because this should retuen a promise (refer Homepage.jsx)
            if(urlPath === '/api/products'){
                return{
                 data:[
                 {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
             },
                {
                    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image: "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: {
                    stars: 4,
                    count: 127
                    },
                    priceCents: 2095,
                    keywords: ["sports", "basketballs"]
                }
                 ]

                }
                
            }
        })
           user=userEvent.setup();
    })
    it('displays the products correct',async() => {
        render(
        <MemoryRouter>
           <HomePage cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        )

        
        const productContainer=  await screen.findAllByTestId('product-container');

        expect(productContainer.length).toBe(2);

        expect(
            within(productContainer[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')

        ).toBeInTheDocument();

         expect(
            within(productContainer[1]).getByText('Intermediate Size Basketball')

        ).toBeInTheDocument();

        
        

    })

    it('test if the Add to Cart buttons work', async() => {
        render(
        <MemoryRouter>
           <HomePage cart={[]} loadCart={loadCart} />
        </MemoryRouter>
        )
        const productContainer = await screen.findAllByTestId('product-container');

        const quantitySelector1 = within(productContainer[0])
         .getByTestId('quantity-selector')
        await user.selectOptions(quantitySelector1,'2')

        const firstProduct=within(productContainer[0])
         .getByTestId('add-to-cart-button');
        await user.click(firstProduct);

        const quantitySelector2 = within(productContainer[1])
         .getByTestId('quantity-selector')
        await user.selectOptions(quantitySelector2,'3');

        const secondProduct=within(productContainer[1])
        .getByTestId('add-to-cart-button')
        await user.click(secondProduct);

        expect(axios.post).toHaveBeenNthCalledWith(1,
            '/api/cart-items',
            {
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:2
            }
        )

        expect(axios.post).toHaveBeenNthCalledWith(2,
            '/api/cart-items',
            {
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:3
            }
        )
            expect(loadCart).toHaveBeenCalledTimes(2);
 
        })
     
    })

