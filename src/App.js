import { useState , useEffect } from "react";
import Cart from "./Components/Cart/Cart";
import "./index.css"
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import {commerce} from "./lib/Commerse"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [products, setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  const fetchProduct = async ()=>{
    const {data} =await commerce.products.list();
    setProducts(data);
  } 

  const fetchCart= async ()=>{
    const data = await commerce.cart.retrieve();
    setCart(data);
  }
  const addToCart=async (productId,quantity)=>{
    const data = await commerce.cart.add(productId,quantity);
    setCart(data.cart);
  }

  useEffect(()=>{
    fetchProduct();
    fetchCart();
  },[])

  console.log(cart);
  return (
    <div className="app" >
    <Router >
      <div>
      <Navbar cart={cart}/>
      <Switch>
        <Route exact path="/">
          <Products  products={products} addToCart={addToCart}/>
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} />
        </Route>

      </Switch>
     
    </div>
    </Router>
    </div>
  );
}

export default App;
