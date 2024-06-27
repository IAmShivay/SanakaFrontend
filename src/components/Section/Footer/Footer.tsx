import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const SocialIcon: React.FC<{ src: string; alt: string; href: string }> = ({
    src,
    alt,
    href,
  }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          height: isMobile ? "24px" : "30px",
          marginRight: "10px",
        }}
      />
    </motion.a>
  );

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        backgroundColor: "#E5E5E5",
        color: "#000",
        py: { xs: 4, md: 6 },
        mt: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box mb={2}>
              <img
                src="images/Loader.png"
                alt="Logo"
                style={{ height: isMobile ? "40px" : "50px" }}
              />
            </Box>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              fontWeight="bold"
            >
              Newsletter Signup
            </Typography>
            <Typography variant="body2" gutterBottom>
              Sign up for our newsletter to stay updated with our latest offers
              and news.
            </Typography>
            <Box display="flex" mt={2}>
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                }}
              >
                SignUp
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              fontWeight="bold"
            >
              Quick Links
            </Typography>
            <Link to="/aboutUs" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="body2" gutterBottom> About Us</Typography>
            </Link>
            <Link to="/faq" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="body2" gutterBottom> FAQs</Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              fontWeight="bold"
            >
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

        <Box mt={4}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            gutterBottom
            fontWeight="bold"
          >
            Follow Us On
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <SocialIcon
              src="/icons8-facebook-48.png"
              alt="Facebook"
              href="https://www.facebook.com/MBBSNURSINGadmission"
            />
            <SocialIcon
              src="/icons8-website-48.png"
              alt="Website"
              href="https://www.sanakamedical.com"
            />
            <SocialIcon
              src="/icons8-whatsapp-96.png"
              alt="WhatsApp"
              href="https://wa.me/+918017508002"
            />
            <SocialIcon
              src="/icons8-youtube-96.png"
              alt="YouTube"
              href="https://www.youtube.com/watch?v=JOYQ1yJsde8"
            />
          </Box>
        </Box>

        <Box mt={4} pt={2} borderTop={1} borderColor="grey.300" textAlign="center">
          <Typography variant="body2">
            © 2024 Durgapur Education Foundation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
