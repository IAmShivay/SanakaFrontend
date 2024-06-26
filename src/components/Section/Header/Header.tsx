import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../Loader.svg";
import CustomLink from "../CustomLink/Links";
import TabWithPopup from "../../PopupForm/PopupForm";
import { FormData } from "../../Home/Home";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [formFilled, setFormFilled] = useState(false);
  const [academicsMenuOpen, setAcademicsMenuOpen] = useState(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const menuAnchorRef = useRef(null);
  const academicsAnchorRef = useRef(null);

  useEffect(() => {
    const storedFormFilled = localStorage.getItem("formFilled");
    if (storedFormFilled === "true") {
      setFormFilled(true);
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (!formFilled) {
      setIsOpen(true);
    }
  }, [formFilled]);

  const handleSubmit = (formData: FormData) => {
    const hasContent =
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phoneNumber.trim() !== "";

    if (hasContent) {
      setFormFilled(true);
      localStorage.setItem("formFilled", "true");
      setIsOpen(false);
    } else {
      alert("Form is not filled out completely. Please fill it out.");
    }
  };

  const handleFormChange = useCallback(
    (data: { name: string; email: string }) => {
      setFormFilled(data.name !== "" && data.email !== "");
    },
    []
  );

  const handleLinkClick = (link: string) => {
    const storedFormFilled = localStorage.getItem("formFilled");
    if (storedFormFilled === "true") {
      window.location.href = link;
    } else {
      handleOpen();
    }
  };

  const handleMenuToggle = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleClose = (): void => {
    setMenuOpen(false);
  };

  const handleAcademicsMenuToggle = (): void => {
    setAcademicsMenuOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        width: { md: "80vh", lg: "90%" },

      }}
    >
      <Box>
        <img src={Logo} alt="Logo" style={{ height: 40 }} />
      </Box>
      {isSm || isMd ? (
        <>
          <Button ref={menuAnchorRef} onClick={handleMenuToggle}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
          <Menu
            open={menuOpen}
            onClose={handleClose}
            anchorEl={menuAnchorRef.current}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleLinkClick("/")}>
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("/aboutUs")}>
              <Typography>About Us</Typography>
            </MenuItem>
            <MenuItem
              ref={academicsAnchorRef}
              onClick={handleAcademicsMenuToggle}
            >
              <ArrowDropDownIcon />
              <Typography>Academics</Typography>
            </MenuItem>
            <Menu
              open={academicsMenuOpen}
              onClose={() => setAcademicsMenuOpen(false)}
              anchorEl={academicsAnchorRef.current}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => handleLinkClick("/programs")}>
                <Typography>Programs</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleLinkClick("/research")}>
                <Typography>Research</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleLinkClick("/faculty")}>
                <Typography>Faculty</Typography>
              </MenuItem>
            </Menu>
            <MenuItem onClick={() => handleLinkClick("/contactUs")}>
              <Typography>Administration</Typography>
            </MenuItem>
          </Menu>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "fixed", bottom: 40, right: 40, zIndex: 20 }}
          >
            <Stack direction="column" spacing={2} alignItems="center">
              <IconButton
                href="https://wa.me/918420461369"
                target="_blank"
                sx={{
                  backgroundColor: "#25D366",
                  color: "white",
                  borderRadius: "50%",
                  width: 64,
                  height: 64,
                }}
              >
                <WhatsAppIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href="tel:+918017508002"
                sx={{
                  color: "white", // Text color
                  backgroundColor: "#28a745", // Background color for call button
                  "&:hover": {
                    backgroundColor: "#218838", // Darker background on hover
                  },
                }}
              >
                IVR 1
              </Button>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href="tel:+917477798949"
                sx={{
                  color: "white", // Text color
                  backgroundColor: "#28a745", // Background color for call button
                  "&:hover": {
                    backgroundColor: "#218838", // Darker background on hover
                  },
                }}
              >
                IVR 2
              </Button>
            </Stack>
          </motion.div>
        </>
      ) : (
        <Box sx={{ display: "flex", flexGrow: 1, gap: 2, height: "5vh" }}>
          <MenuItem onClick={() => handleLinkClick("/")}>
            <Typography variant="body1" color="inherit">
              Home
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLinkClick("/aboutUs")}>
            <Typography variant="body1" color="inherit">
              About Us
            </Typography>
          </MenuItem>
          <MenuItem
            ref={academicsAnchorRef}
            onClick={handleAcademicsMenuToggle}
          >
            <ArrowDropDownIcon />
            <Typography variant="body1" color="inherit">
              Academics
            </Typography>
          </MenuItem>
          <Menu
            open={academicsMenuOpen}
            onClose={() => setAcademicsMenuOpen(false)}
            anchorEl={academicsAnchorRef.current}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={() => handleLinkClick("/programs")}>
              <Typography variant="body1" color="inherit">
                Programs
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("/research")}>
              <Typography variant="body1" color="inherit">
                Research
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleLinkClick("/faculty")}>
              <Typography variant="body1" color="inherit">
                Faculty
              </Typography>
            </MenuItem>
          </Menu>
          <MenuItem onClick={() => handleLinkClick("/contactUs")}>
            <Typography variant="body1" color="inherit">
              Administration
            </Typography>
          </MenuItem>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CustomLink href="/contactUs">
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: 0 }}
              >
                Contact
              </Button>
            </CustomLink>
            <Box sx={{ display: "flex", gap: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ position: "fixed", bottom: 20, right: 20, zIndex: 10 }}
              >
                <IconButton
                  href="https://wa.me/8811048111"
                  target="_blank"
                  sx={{
                    backgroundColor: "#25D366",
                    color: "white",
                    borderRadius: "50%",
                    width: 64,
                    height: 64,
                  }}
                >
                  <WhatsAppIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </motion.div>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href="tel:+08017508002"
              >
                IVR 1
              </Button>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href="tel:+8918857722"
              >
                IVR 2
              </Button>
            </Box>
            <CustomLink href="/user/login">
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", borderRadius: 0 }}
              >
                Login
              </Button>
            </CustomLink>
            <CustomLink  >
              <Button 
              onClick={() => handleLinkClick("/images/sanakaProspectus.pdf")}
                variant="outlined"
                sx={{
                  marginLeft: 2,
                  backgroundColor: "white",
                  borderRadius: 0,
                }}
              >
                Download Prospectus
              </Button>
            </CustomLink>
          </Box>
        </Box>
      )}
      <TabWithPopup
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formFilled={formFilled}
        onFormChange={handleFormChange}
      />
    </Box>
  );
};

export default Header;
