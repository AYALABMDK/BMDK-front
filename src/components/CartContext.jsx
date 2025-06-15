import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    console.log("Load from localStorage:", stored);
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
        localStorage.removeItem("cart");
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("Saved to localStorage:", cartItems);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item) => {
    const updated = [...cartItems, item];
    setCartItems(updated);
    setIsDrawerOpen(true);
  };
  const updateQuantity = (index, newQuantity) => {
  setCartItems((prevItems) => {
    const items = [...prevItems];
    items[index].quantity = newQuantity;
    items[index].total = newQuantity * (items[index].price || (items[index].size === "גדול" ? items[index].bigBookPrice : items[index].smallBookPrice));
    return items;
  });
};
const updateSize = (index, newSize) => {
  setCartItems((prevItems) => {
    const items = [...prevItems];
    items[index].size = newSize;
    const price =
      newSize === "גדול" ? items[index].bigBookPrice : items[index].smallBookPrice;
    items[index].price = price;
    items[index].total = price * items[index].quantity;
    return items;
  });
};



  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        updateQuantity,
        updateSize
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
