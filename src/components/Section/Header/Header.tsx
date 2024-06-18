import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../Loader.svg";
import CustomLink from "../CustomLink/Links";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const menuAnchorRef = useRef(null);

  const handleMenuToggle = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleClose = (): void => {
    setMenuOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
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
            <MenuItem onClick={handleClose}>
              <CustomLink href="/aboutUs">About Us</CustomLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CustomLink href="/academics">Academics</CustomLink>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <CustomLink href="/contactUs">Admission</CustomLink>
            </MenuItem> */}
            <MenuItem onClick={handleClose}>
              <CustomLink href="/contactUs">Administration</CustomLink>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexGrow: 1, gap: 2, height: "5vh" }}>
          <MenuItem onClick={handleClose}>
            <CustomLink href="/aboutUs">About Us</CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink href="/academics">
              <Typography variant="body1" color="inherit">
                Academics
              </Typography>
            </CustomLink>
          </MenuItem>
          {/* <MenuItem>
            <CustomLink href="/contactUs">
              <Typography variant="body1" color="inherit">
                Admission
              </Typography>
            </CustomLink>
          </MenuItem> */}
          <MenuItem onClick={handleClose}>
            <CustomLink href="/administration">
              <Typography variant="body1" color="inherit">
                Administration
              </Typography>
            </CustomLink>
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
              <IconButton
                href="https://wa.me/8811048111"
                target="_blank"
                color="primary"
              >
                <WhatsAppIcon />
              </IconButton>
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
            <CustomLink href="/user/register">
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", borderRadius: 0 }}
              >
                Sign Up
              </Button>
            </CustomLink>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
