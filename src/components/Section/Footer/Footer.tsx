import React from 'react';
import { Typography, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: '#E5E5E5', color: '#000', padding: '30px 20px', marginTop: '20px' }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} style={{ marginBottom: '20px' }}>
          <Grid container direction="column" alignItems="flex-start">
            <img src="/logo.png" alt="Logo" style={{ height: '50px', marginBottom: '10px' }} />
            <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
              Newsletter Signup
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sign up for our newsletter to stay updated with our latest offers and news.
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ width: '100%', height: '100%' }}
                  inputProps={{ style: { fontSize: '0.875rem', padding: '5px' } }} // Adjust font size and padding
                />
              </Grid>
              <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    height: '100%' // Ensure the button height matches the input field
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
            Support
          </Typography>
          <Typography variant="body2" gutterBottom>
            Customer Service
          </Typography>
          <Typography variant="body2" gutterBottom>
            Returns
          </Typography>
          <Typography variant="body2" gutterBottom>
            Shipping
          </Typography>
          <Typography variant="body2" gutterBottom>
            FAQs
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
            Contact
          </Typography>
          <Typography variant="body2" gutterBottom>
            Email: info@bata.com
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: 123-456-7890
          </Typography>
          <Typography variant="body2" gutterBottom>
            Address: 123 Street, City, Country
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>Download Our App</Typography>
          <motion.img src="/appstore.png" alt="App Store" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
          <motion.img src="/playstore.png" alt="Play Store" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>Follow Us On</Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <motion.img src="/facebook.png" alt="Facebook" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
            <Grid item>
              <motion.img src="/twitter.png" alt="Twitter" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
            <Grid item>
              <motion.img src="/instagram.png" alt="Instagram" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>© 2024 Your Company. All rights reserved.</Typography>
          <Grid container justifyContent="center">
            <Grid item>
              <motion.img src="/visa.png" alt="Visa" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
            <Grid item>
              <motion.img src="/rupay.png" alt="Rupay" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default Footer;
