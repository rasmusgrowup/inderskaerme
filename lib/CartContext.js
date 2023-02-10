import React, {useState, useEffect} from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // hydrate on mount
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(cart);
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}
