import React, {useState, useEffect} from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // hydrate on mount
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCart(cart);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}
