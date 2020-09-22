import React, { Component } from 'react';
import './App.css';
import { getOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import { postOrders } from '../../apiCalls.js'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount = async () => {
    try {
      const orders = await getOrders()
      console.log('your state', orders.orders)
      this.setState({ orders: orders.orders })
    } catch(error) {
      console.error('Error fetching:', error)
    }
  }
  
  postUserOrder = async (name, ingredients) => {
    if (name === '' || ingredients === []) {
      return false
    } else {
      await postOrders(this.state.name, this.state.ingredients)
        .then(data => this.setState({ orders: [...this.state.orders, data ]}))
    }
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>

        <Orders postOrder={this.postUserOrder} orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
