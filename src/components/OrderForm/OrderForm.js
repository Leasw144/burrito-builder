import React, { Component } from 'react';
import { postOrders } from '../../apiCalls.js'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange(e) {
    const foundIng = this.state.ingredients.find(ingredient => ingredient === e.target.name)

    if (!foundIng) {
      this.setState({ ingredients: [...this.state.ingredients, e.target.name]})
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handleSubmit = async () => {
    console.log('name', this.state.name === '')
    console.log('ingredients', this.state.ingredients === [])

    if(this.state.name.length === 0 || this.state.ingredients.length === 0) {
      console.log('condition met')
      return false
    } else {
      await postOrders(this.state.name, this.state.ingredients)
      this.clearInputs()
    }
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button type='button' key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
