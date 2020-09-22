import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import OrderForm from './OrderForm.js'
import { postOrders } from '../../apiCalls.js'
import '@testing-library/jest-dom'
jest.mock('../../apiCalls.js')

describe('OrderForm', () => {
  let ingredientsBtn, sourCream;
  beforeEach(() => {
    render(<OrderForm />)
    ingredientsBtn = screen.getAllByRole('button')
    sourCream = screen.getByRole('button', { name: /sour cream/i })
  })
  it('should render a name input', () => {
    const name = screen.getByRole('textbox')


    expect(name).toBeInTheDocument()
    expect(sourCream).toBeInTheDocument()
  })
  it('should render all 13 buttons which includes one submit', async () => {
    expect(ingredientsBtn.length).toBe(13)
  })
  it('should fire the submitHandler when the submit button has been pressed', () => {
    // const mockedHandleSubmit = jest.fn()
    const mockedPost = postOrders.mockResolvedValue()

    const submit = screen.getByRole('button', { name: /submit order/i })
    fireEvent.click(submit)
    expect(mockedPost.mock.calls.length).toBe(1)
  })
})