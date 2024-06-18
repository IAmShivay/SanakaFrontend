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
            <img src="images/Loader.svg" alt="Logo" style={{ height: '50px', marginBottom: '10px' }} />
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
            Quick Links
          </Typography>
          <Typography variant="body2" gutterBottom>
            About Us
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
            Email: durgapurfoundation.23@gmail.com
          </Typography>
          <Typography variant="body2" gutterBottom>
            Phone: 8017508002
          </Typography>
          <Typography variant="body2" gutterBottom>
            Address: Malandighi, Kanksha, Durgapur-713212, India
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>Follow Us On</Typography>
          <Grid container >
            <Grid item>
              <motion.img src="/icons8-facebook-48.png" alt="Facebook" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
            <Grid item>
              <motion.img src="/icons8-website-48.png" alt="Website" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
            <Grid item>
              <motion.img src="/icons8-whatsapp-96.png" alt="whatsapp" style={{ height: '30px', marginRight: '10px', transition: 'transform 0.3s ease-in-out' }} whileHover={{ scale: 1.1 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <hr/>
      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
          <Typography variant="body2" gutterBottom>© 2024 Durgapur Education Foundation. All rights reserved.</Typography>
        </Grid>
    </motion.div>
  );
};

export default Footer;
