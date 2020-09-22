
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from './App'
import { getOrders, postOrders } from '../../apiCalls'
import '@testing-library/jest-dom'
jest.mock('../../apiCalls.js')


describe('App component', () => {
  beforeEach(() => {
    getOrders.mockResolvedValue({
      orders: [
        {
          id: 1,
          name: 'Dat',
          ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
        }
      ]
    })

    postOrders.mockResolvedValue({
      orders: [
        {
          id: 2,
          name: 'Joe',
          ingredients: ['sour cream']
        }
      ]
    }) 
  
    render(<App />)

    
  })
  it('should render the orders already made', async () => {
    
    const newOrder = await waitFor(() => screen.getByText('Dat'))
    expect(newOrder).toBeInTheDocument()
  })
  it('should be able to add an order', async () => {
    const nameInput = screen.getByRole('textbox')
    const sourCreamBtn = screen.getByRole('button', { name: /sour cream/i })
    const submitBtn = screen.getByRole('button', { name: /submit order/i })

    fireEvent.change(nameInput, { target: { value: 'joe'}})
    fireEvent.click(sourCreamBtn)

    const confirmed = await waitFor (() => screen.getByText(/order: sour cream/i))
    
    expect(confirmed).toBeInTheDocument()
    
    // fireEvent.click(submitBtn)

    // const userName = await waitFor (() => screen.getByText('joe'))
    // expect(userName).toBeInTheDocument()

  })
})