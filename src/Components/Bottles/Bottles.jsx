import { useEffect } from "react";
import { useState } from "react";
import './Bottles.css'
import Bottle from "../Bottle/Bottle";
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/Localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] =useState([]);
    const [cart, setCart] =useState([]);

  useEffect(()=>{
    fetch('bottles.json')
    .then(res => res.json())
    .then(data => setBottles(data))
  },[])

  useEffect(()=>{
    console.log('called the effect', bottles.length)
    if(bottles.length > 0){
        const storedCart =getStoredCart()
        console.log(storedCart)

        const saveCart =[]
        for(const id of storedCart ){
            console.log(id)
            const bottle =bottles.find(bottle=>bottle.id === id)
            if(bottle){
                saveCart.push(bottle)
            }
        }
        console.log('savedcart', saveCart)
        setCart(saveCart);

    }
    
  },[bottles])

  const handleAddToCart=bottle=>{
    console.log(bottle)
    const newCart =[...cart, bottle]
    setCart(newCart);
    addToLS(bottle.id)
  }

  const handleRemoveFromCart =id=>{
    removeFromLS(id)
  }

    return (
        <div>
            <h3>Bottles Here: {bottles.length}</h3>
            <Cart cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            ></Cart>
         <div className="bottles-container">
         {
            bottles.map(bottle=><Bottle key={bottle.id} bottle={bottle}
            handleAddToCart= {handleAddToCart}
            
            >

            </Bottle>)
         }
         </div>

        </div>
    );
};

export default Bottles;