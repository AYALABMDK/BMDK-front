import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const FloatingCartIcon = () => {
  const { cartItems, removeFromCart, isDrawerOpen, closeDrawer, openDrawer } =
    useCart();
  const navigate = useNavigate();

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const goToCart = () => {
    closeDrawer();
    navigate("/cart");
  };

  return (
    <>
      {!isDrawerOpen && (
        <IconButton
          color="primary"
          onClick={openDrawer}
          sx={{
            position: "fixed",
            right: 20,
            bottom: 40,
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {/* <Badge badgeContent={totalQuantity} color="secondary">
            <ShoppingCartIcon sx={{ fontSize: 40 }} />
          </Badge> */}
          <Badge
  badgeContent={totalQuantity}
  sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "gray", // צבע רקע של המספר
      color: "white", // צבע הטקסט של המספר
    },
  }}
>
  <ShoppingCartIcon sx={{ fontSize: 40 }} />
</Badge>
        </IconButton>
      )}

      <CartDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        cartItems={cartItems}
        handleRemove={handleRemove}
        goToCart={goToCart}
      />
    </>
  );
};

export default FloatingCartIcon;
