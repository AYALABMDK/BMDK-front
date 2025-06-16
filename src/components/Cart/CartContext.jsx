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

  const addToCart = (newItem) => {
    const quantity = Number(newItem.quantity) || 1;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.signsTopic === newItem.signsTopic && item.size === newItem.size
      );

      const price =
        newItem.size === "גדול" ? newItem.bigBookPrice : newItem.smallBookPrice;

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = { ...updatedItems[existingIndex] };
        existingItem.quantity += quantity;
        existingItem.price = price;
        existingItem.total = existingItem.quantity * price;
        updatedItems[existingIndex] = existingItem;
        return updatedItems;
      } else {
        const total = quantity * price;
        return [...prevItems, { ...newItem, quantity, price, total }];
      }
    });

    setIsDrawerOpen(true);
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const updateQuantity = (index, newQuantity) => {
    const qty = Number(newQuantity) || 1;

    setCartItems((prevItems) => {
      const items = [...prevItems];
      items[index].quantity = qty;
      items[index].total =
        qty *
        (items[index].price ||
          (items[index].size === "גדול"
            ? items[index].bigBookPrice
            : items[index].smallBookPrice));
      return items;
    });
  };

  const updateSize = (index, newSize) => {
    setCartItems((prevItems) => {
      const items = [...prevItems];
      items[index].size = newSize;
      const price =
        newSize === "גדול"
          ? items[index].bigBookPrice
          : items[index].smallBookPrice;
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
        updateSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
