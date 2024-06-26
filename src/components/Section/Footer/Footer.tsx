import { Typography, Grid, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));

  const getWidth = () => {
    if (isLgUp) return '98%';
    if (isMdUp) return '78vh';
    if (isXsUp) return '95%';
    return '100%'; // Fallback for smaller devices
  };

  const getHeight = () => {
    if (isLgUp) return '100%';
    if (isMdUp) return '100%';
    if (isXsUp) return '100%';
    return '100vh'; // Fallback for smaller devices
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: "#E5E5E5",
        color: "#000",
        padding: "30px 20px",
        marginTop: "20px",
        width: getWidth(),
        height: getHeight(),
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} style={{ marginBottom: "20px" }}>
          <Grid container direction="column" alignItems="flex-start">
            <img
              src="images/Loader.png"
              alt="Logo"
              style={{ height: "50px", marginBottom: "10px" }}
            />
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Newsletter Signup
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sign up for our newsletter to stay updated with our latest offers
              and news.
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <TextField
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ width: "100%", marginTop: "10px" }}
                  inputProps={{ style: { fontSize: "0.875rem", padding: "5px" } }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "6px 12px",
                    fontSize: "0.875rem",
                    textTransform: "none",
                    height: "100%", // Ensure the button height matches the input field
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Link
              to="/aboutUs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About Us
            </Link>
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Link
              to="/faq"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              FAQs
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            Contact
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: contact@sanakamedical.com
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: 84204 61369
          </Typography>
          <Typography variant="body2" gutterBottom>
            Address: Malandighi, Kanksha, Durgapur-713212, India
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            Follow Us On
          </Typography>
          <Grid container>
            <Grid item>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <motion.img
                  src="/icons8-facebook-48.png"
                  alt="Facebook"
                  style={{
                    height: "30px",
                    marginRight: "10px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              </a>
            </Grid>
            <Grid item>
              <a href="https://www.website.com" target="_blank" rel="noopener noreferrer">
                <motion.img
                  src="/icons8-website-48.png"
                  alt="Website"
                  style={{
                    height: "30px",
                    marginRight: "10px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              </a>
            </Grid>
            <Grid item>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                <motion.img
                  src="/icons8-whatsapp-96.png"
                  alt="WhatsApp"
                  style={{
                    height: "30px",
                    marginRight: "10px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  whileHover={{ scale: 1.1 }}
                />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Grid container style={{ marginTop: "20px", textAlign: "center" }}>
        <Grid item xs={12} md={12}>
          <Typography variant="body2" gutterBottom>
            © 2024 Durgapur Education Foundation. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Footer;
