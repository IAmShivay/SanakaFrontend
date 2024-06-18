// import {
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import { fetchProductList } from "../../../app/products/productSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../store";
// import { AppDispatch } from "../../../store";

// const colors = ["#ff5722", "#2196f3", "#4caf50", "#ffeb3b"]; // Different colors for each card
// const Products = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const {products } = useSelector(
//     (state: RootState) => state.products
//   );
//   useEffect(() => {
//     dispatch(fetchProductList());
//   }, [dispatch]);
//   return (
//     <Box style={{ padding: "20px" }}>
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           style={{
//             marginBottom: "20px",
//             color: "#333",
//             textTransform: "uppercase",
//             fontWeight: "bold",
//             letterSpacing: "2px",
//           }}
//         >
//           Products{" "}
//         </Typography>
//       </motion.div>
//       <Grid container spacing={4} justifyContent="center">
//         {products.map((product, index) => (
//           <Grid item key={product.name}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//               style={{
//                 position: "relative",
//                 overflow: "hidden",
//                 borderRadius: "16px",
//                 width: "250px",
//                 height: "350px",
//               }}
//             >
//               <motion.div
//                 initial={{
//                   clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
//                 }}
//                 whileHover={{
//                   clipPath:
//                     "polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%)",
//                 }}
//                 transition={{ duration: 0.3 }}
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   bottom: 0,
//                   right: 0,
//                   backgroundColor: colors[index % colors.length],
//                   zIndex: 1,
//                   boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)", // Add shadow effect
//                 }}
//               />
//               <Card sx={{ position: "relative", zIndex: 2 }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={product.images[0]?.url}
//                   alt={product.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h5" component="div">
//                     {product.name}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     component="div"
//                     sx={{
//                       color: "#FF8B66",
//                       fontWeight: 500,
//                       fontSize: "1.25rem",
//                       letterSpacing: "0.02em",
//                       fontFamily: "Roboto, sans-serif",
//                       display: "inline-block",
//                       padding: "0.25rem 0.5rem",
//                       borderRadius: "4px",
//                       backgroundColor: "#FFF5F0",
//                     }}
//                   >
//                     ${product.price}
//                   </Typography>

//                   <Typography
//                     gutterBottom
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     {product.description}
//                   </Typography>
//                   <Button
//                     href={""}
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#FF8764",
//                       "&:hover": { backgroundColor: "#FEB17A" },
//                     }}
//                   >
//                     View Product
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Products;
