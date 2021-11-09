import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'
import { useState } from 'react';

function App() {

  const [product, setProduct] = useState({
    name: "product",
    price: 10,
    productBy: "Sagar"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }

    const headers = {
      "Content-Type": "application/json"
    }

    return fetch('http://localhost:4000/payments', {
      method: "POSt",
      headers,
      body: JSON.stringify(body)
    }).then((response) => {
      console.log(response)
      // const { status } = response,

    }).catch(err => console.log(err))
  }


  return (
    <div className="App">
      <header className="App-header">
       
        <StripeCheckout
          stripeKey='pk_test_51JtbWMSEkB7TvcpfnbUULCb7e8rrHPWpSF32fBd0XpGqPwpkpmEJ6krLsSMV1YGH9WFWmav3tUMESFgteyPpO06900c4ZaCTcz'
          token={makePayment}
          amount={product.price * 100}
          name="buy"
        >
          <button className="btn-large blue">
            buy react {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
