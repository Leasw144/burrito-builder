export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        if(response.ok) {
          return response.json() 
        } else {
          throw response
        }
      })
}

export const postOrders = (name, ingredients) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      ingredients: ingredients,
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response;
      }
    })
}
