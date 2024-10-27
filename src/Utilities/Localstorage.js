const getStoredCart =()=>{
    const storedCartString =localStorage.getItem('cart');
    if(storedCartString){
        return JSON.parse(storedCartString)

    }
    return [];
}


const saveCartToLS =cart=>{
    const cartStringfied =JSON.stringify(cart);
    localStorage.setItem('cart', cartStringfied)
}

const addToLS = id=>{
    const cart =getStoredCart()
    cart.push(id)
    saveCartToLS(cart)
}

const removeFromLS=id=>{
    const cart =getStoredCart()
    const remaining =cart.filter(idx => idx !== id)
    saveCartToLS(remaining)
}

export {addToLS, getStoredCart, removeFromLS}