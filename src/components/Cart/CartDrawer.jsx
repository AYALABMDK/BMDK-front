// import {
//   Drawer,
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import { useCart } from "./CartContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CartDrawer = ({ open, onClose, handleRemove, goToCart }) => {
//   const { cartItems, updateQuantity, updateSize } = useCart();
//   const [editingIndex, setEditingIndex] = useState(null);
//   const navigate = useNavigate();

//   const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);

//   const handleQuantityChange = (e, index) => {
//     const newQty = Math.max(1, parseInt(e.target.value) || 1);
//     updateQuantity(index, newQty);
//   };

//   const handleEdit = (index) => {
//     setEditingIndex(index);
//   };

//   const handleSizeChange = (e, index) => {
//     const newSize = e.target.value;
//     updateSize(index, newSize);
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: { zIndex: 1401 },
//       }}
//     >
//       <Box
//         sx={{
//           width: 320,
//           height: "100%",
//           p: 2,
//           direction: "rtl",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1,
//           }}
//         >
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             textAlign="center"
//             sx={{ width: "100%", mb: 1 }}
//           >
//             סל קניות
//           </Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider />

//         <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 1 }}>
//           <List>
//             {cartItems.length === 0 ? (
//               <Typography align="center" sx={{ mt: 2 }}>
//                 הסל ריק.
//               </Typography>
//             ) : (
//               cartItems.map((item, index) => {
//                 const isBook = item.size !== undefined;

//                 return (
//                   <ListItem
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       alignItems: "stretch",
//                       justifyContent: "space-between",
//                       mb: 2,
//                       p: 1,
//                       gap: 1,
//                       border: "1px solid #e0e0e0",
//                       borderRadius: "8px",
//                     }}
//                   >
//                     {/* איקונים בצד שמאל */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 1,
//                         pr: 1,
//                         pl: 1,
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                         }}
//                       >
//                         <IconButton onClick={() => handleEdit(index)}>
//                           <EditIcon />
//                         </IconButton>
//                         <Typography variant="caption" color="text.secondary">
//                           עריכה
//                         </Typography>
//                       </Box>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                         }}
//                       >
//                         <IconButton onClick={() => handleRemove(index)}>
//                           <DeleteIcon />
//                         </IconButton>
//                         <Typography variant="caption" color="text.secondary">
//                           מחיקה
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider orientation="vertical" flexItem />

//                     {/* תוכן המוצר בצד ימין */}
//                     <Box sx={{ flex: 1 }}>
//                       <ListItemText
//                         primary={
//                           <>
//                             <Typography variant="subtitle1" fontWeight="bold" textAlign={"center"}>
//                               {isBook ? " ספר " : " סרטון "}
//                               {isBook ? item.signsTopic : item.title}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" textAlign={"center"}>
//                               {isBook ? item.signs : item.signsTopic}
//                             </Typography>
//                           </>

//                         }
//                         secondary={
//                           editingIndex === index ? (
//                             <>
//                               <TextField
//                                 label="כמות"
//                                 type="number"
//                                 size="small"
//                                 value={item.quantity}
//                                 onChange={(e) =>
//                                   handleQuantityChange(e, index)
//                                 }
//                                 inputProps={{ min: 1 }}
//                                 sx={{ width: 80, mb: 1 }}
//                               />
//                               {isBook && (
//                                 <FormControl size="small" sx={{ minWidth: 90 }}>
//                                   <InputLabel id={`size-label-${index}`}>
//                                     גודל
//                                   </InputLabel>
//                                   <Select
//                                     labelId={`size-label-${index}`}
//                                     value={item.size}
//                                     label="גודל"
//                                     onChange={(e) =>
//                                       handleSizeChange(e, index)
//                                     }
//                                   >
//                                     <MenuItem value="קטן">קטן</MenuItem>
//                                     <MenuItem value="גדול">גדול</MenuItem>
//                                   </Select>
//                                 </FormControl>
//                               )}
//                               <Box sx={{ mt: 1 }}>
//                                 <Button onClick={() => setEditingIndex(null)}>
//                                   סיום עריכה
//                                 </Button>
//                               </Box>
//                             </>
//                           ) : (
//                             <>
//                               {isBook && (
//                                 <Typography variant="body2">
//                                   גודל: {item.size}
//                                 </Typography>
//                               )}
//                               <Typography variant="body2">
//                                 ₪{item.price} × יחידות {item.quantity}
//                               </Typography>
//                               <Typography variant="body2">
//                                 סה"כ: ₪{item.price * item.quantity}
//                               </Typography>
//                             </>
//                           )
//                         }
//                       />
//                     </Box>
//                   </ListItem>
//                 );
//               })
//             )}
//           </List>
//         </Box>

//         {cartItems.length > 0 && (
//           <>
//             <Divider sx={{ my: 2 }} />
//             <Typography align="center" fontWeight="bold">
//               סה"כ לתשלום: ₪{total}
//             </Typography>

//             <Box
//               sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   onClose();
//                   navigate("/checkout");
//                 }}
//               >
//                 לתשלום
//               </Button>
//               <Button variant="outlined" onClick={goToCart}>
//                 מעבר לסל
//               </Button>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Drawer>
//   );
// };

// export default CartDrawer;
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useCart } from "./CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartDrawer = ({ open, onClose, handleRemove, goToCart }) => {
  const { cartItems, updateQuantity, updateSize } = useCart();
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);

  const handleQuantityChange = (e, index) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    updateQuantity(index, newQty);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = () => {
    setEditingIndex(null);
  };

  const handleSizeChange = (e, index) => {
    const newSize = e.target.value;
    updateSize(index, newSize);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { zIndex: 1401 },
      }}
    >
      <Box
        sx={{
          width: 320,
          height: "100%",
          p: 2,
          direction: "rtl",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ width: "100%", mb: 1 ,mr: 3 }}
           
          >
            סל קניות
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 1 }}>
          <List>
            {cartItems.length === 0 ? (
              <Typography align="center" sx={{ mt: 2 }}>
                הסל ריק.
              </Typography>
            ) : (
              cartItems.map((item, index) => {
                const isBook = item.size !== undefined;
                const isEditing = editingIndex === index;

                return (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "stretch",
                      justifyContent: "space-between",
                      mb: 2,
                      p: 1,
                      gap: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  >
                    {/* איקונים בצד שמאל */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        pr: 1,
                        pl: 0.3,
                      }}
                    >
                      <Tooltip title={isEditing ? "שמירה" : "עריכה"}>
                        <IconButton
                          onClick={() =>
                            isEditing ? handleSave() : handleEdit(index)
                          }
                          sx={{
                            "&:hover": { color: "#252e49" },
                          }}
                        >
                          {isEditing ? <SaveIcon /> : <EditIcon />}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="מחיקה">
                        <IconButton
                          onClick={() => handleRemove(index)}
                          sx={{
                            "&:hover": { color: "#252e49" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    {/* תוכן המוצר בצד ימין */}
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              textAlign={"center"}
                            >
                              {isBook ? " ספר " : " סרטון "}
                              {isBook ? item.signsTopic : item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              textAlign={"center"}
                              sx={{ mb: 2 }}
                            >
                              {isBook ? item.signs : item.signsTopic}
                            </Typography>
                          </>
                        }
                        secondary={
                          isEditing ? (
                            <>
                              <TextField
                                label="כמות"
                                type="number"
                                size="small"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(e, index)}
                                inputProps={{ min: 1 }}
                                sx={{ width: 80, mb: 1 }}
                              />
                              {isBook && (
                                <FormControl size="small" sx={{ minWidth: 90 }}>
                                  <InputLabel id={`size-label-${index}`}>
                                    גודל
                                  </InputLabel>
                                  <Select
                                    labelId={`size-label-${index}`}
                                    value={item.size}
                                    label="גודל"
                                    onChange={(e) => handleSizeChange(e, index)}
                                  >
                                    <MenuItem value="קטן">קטן</MenuItem>
                                    <MenuItem value="גדול">גדול</MenuItem>
                                  </Select>
                                </FormControl>
                              )}
                            </>
                          ) : (
                            <>
                              {isBook && (
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <Box component="span" fontWeight="bold" >
                                    גודל: {" "}
                                  </Box>
                                  {item.size}
                                </Typography>
                              )}
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                <Box component="span" fontWeight="bold">
                                  יחידות: {" "}
                                </Box>
                                {item.quantity} × ₪{item.price}
                              </Typography>
                              <Typography variant="body2">
                                <Box component="span" fontWeight="bold">
                                  סה"כ: {" "}
                                </Box>
                                ₪{item.price * item.quantity}
                              </Typography>
                            </>
                          )
                        }
                      />
                    </Box>
                  </ListItem>
                );
              })
            )}
          </List>
        </Box>

        {cartItems.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography align="center" fontWeight="bold">
              סה"כ לתשלום: ₪{total}
            </Typography>

            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
              >
                לתשלום
              </Button>
              <Button variant="outlined" onClick={goToCart}>
                מעבר לסל
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
