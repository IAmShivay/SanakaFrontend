import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../Loader.svg";
import CustomLink from "../CustomLink/Links";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const menuAnchorRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMoreToggle = () => {
    setMoreOpen((prev) => !prev);
  };

  const handleClose = () => {
    setMenuOpen(false);
    setMoreOpen(false);
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
          <IconButton ref={menuAnchorRef} onClick={handleMenuToggle}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Menu
            open={menuOpen}
            onClose={handleClose}
            anchorEl={menuAnchorRef.current}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>
              <CustomLink href="/home">About Us</CustomLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CustomLink href="/products">Courses</CustomLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CustomLink href="/contactUs">Admission</CustomLink>
            </MenuItem>
            <MenuItem onClick={handleMoreToggle}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>More</Typography>
                {moreOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Box>
            </MenuItem>
            <Collapse in={moreOpen} timeout="auto" unmountOnExit>
              <Box sx={{ bgcolor: "white", mt: 1 }}>
                <MenuItem onClick={handleClose}>
                  <CustomLink href="/subcategory1">Subcategory 1</CustomLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <CustomLink href="/subcategory2">Subcategory 2</CustomLink>
                </MenuItem>
              </Box>
            </Collapse>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", flexGrow: 1, gap: 2, height: "5vh" }}>
          <MenuItem onClick={handleClose}>
            <CustomLink href="/home">About Us</CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink href="/products">
              <Typography variant="body1" color="inherit">
                Courses
              </Typography>
            </CustomLink>
          </MenuItem>
          <MenuItem>
            <CustomLink href="/contactUs">
              <Typography variant="body1" color="inherit">
                Admission
              </Typography>
            </CustomLink>
          </MenuItem>
          {/* <MenuItem onClick={handleMoreToggle} sx={{ position: "relative" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" color="inherit">
                More
              </Typography>
              {moreOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={moreOpen} timeout="auto" unmountOnExit>
      <Box
        sx={{
          position: 'relative',
          mt: 1,
        }}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: 0, // Aligns the subcategories right under the parent
            left: 0,
            width: 'max-content',
            bgcolor: 'white',
            zIndex: 1,
          }}
        >
          <Box onClick={handleClose} >
            <Typography variant="body1">Subcategory 1</Typography>
          </Box>
          <Box onClick={handleClose}>
            <Typography variant="body1">Subcategory 2</Typography>
          </Box>
        </Paper>
      </Box>
    </Collapse>
          </MenuItem> */}
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <CustomLink href="/aboutUs">
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: 0 }}
              >
                Contact
              </Button>
            </CustomLink>
            <CustomLink href="/hiiUs">
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
