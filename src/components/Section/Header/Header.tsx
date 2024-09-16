import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../Loader.svg";
import CustomLink from "../CustomLink/Links";
import { motion } from "framer-motion";
import { Prospectus } from "../../../assets";

// Utility function to avoid repetitive code
const renderMenuItem = (
  label: string,
  link: string,
  onClick: (link: string) => void
) => (
  <MenuItem onClick={() => onClick(link)}>
    <Typography>{label}</Typography>
  </MenuItem>
);

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [academicsMenuOpen, setAcademicsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const academicsAnchorRef: any = useRef<HTMLDivElement>(null);

  const handleLinkClick = (link: string) => {
    window.location.href = link;
  };

  const handleMenuToggle = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleAcademicsMenuToggle = (): void => {
    setAcademicsMenuOpen((prev) => !prev);
  };

  const renderDesktopNav = () => (
    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
      {renderMenuItem("HOME", "/", handleLinkClick)}
      {renderMenuItem("ABOUT US", "/aboutUs", handleLinkClick)}
      <MenuItem ref={academicsAnchorRef} onClick={handleAcademicsMenuToggle}>
        <Typography variant="body2" color="inherit">
          ACADEMICS
        </Typography>
        <ArrowDropDownIcon />
      </MenuItem>
      <Menu
        open={academicsMenuOpen}
        onClose={() => setAcademicsMenuOpen(false)}
        anchorEl={academicsAnchorRef.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {renderMenuItem("PROGRAMS", "/programs", handleLinkClick)}
        {renderMenuItem("RESEARCH", "/research", handleLinkClick)}
        {renderMenuItem("FACULTY", "/faculty", handleLinkClick)}
      </Menu>
      {renderMenuItem("NEET UPDATES", "/neetupdates", handleLinkClick)}
      <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
        <CustomLink href="/apply-and-enroll">
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "black" }}
          >
            APPLY NOW
          </Button>
        </CustomLink>
        <CustomLink href="/user/login">
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "black" }}
          >
            LOGIN
          </Button>
        </CustomLink>
        <Button
          onClick={() => handleLinkClick(Prospectus)}
          variant="outlined"
          size="small"
          sx={{ color: "black", borderColor: "black" }}
        >
          <DownloadIcon style={{ color: "black" }} />
          PROSPECTUS
        </Button>
      </Box>
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer anchor="right" open={menuOpen} onClose={handleMenuToggle}>
      <Box sx={{ width: 250, pt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1 }}>
          <IconButton onClick={handleMenuToggle} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        {renderMenuItem("HOME", "/", handleLinkClick)}
        {renderMenuItem("ABOUT US", "/aboutUs", handleLinkClick)}
        <MenuItem onClick={handleAcademicsMenuToggle}>
          <Typography>ACADEMICS</Typography>
          <ArrowDropDownIcon />
        </MenuItem>
        {academicsMenuOpen && (
          <Box ml={2}>
            {renderMenuItem("PROGRAMS", "/programs", handleLinkClick)}
            {renderMenuItem("RESEARCH", "/research", handleLinkClick)}
            {renderMenuItem("FACULTY", "/faculty", handleLinkClick)}
          </Box>
        )}
        {renderMenuItem("NEET UPDATES", "/neetupdates", handleLinkClick)}
        {renderMenuItem("APPLY NOW", "/apply-and-enroll", handleLinkClick)}
        {renderMenuItem("LOGIN", "/user/login", handleLinkClick)}
        {renderMenuItem(
          "PROSPECTUS",
          "/images/assets/SanakaProspectus.pdf",
          handleLinkClick
        )}
      </Box>
    </Drawer>
  );

  return (
    <Box
      sx={{
        pt: "2vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: { sm: "100%", md: "95%", lg: "1200px" },
        margin: "0 auto",
        pb: "2vh",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <img src={Logo} alt="Logo" style={{ height: isMobile ? 30 : 40 }} />
      </Box>
      {isMobile || isMedium ? (
        <>
          <IconButton onClick={handleMenuToggle} size="small">
            <MenuIcon />
          </IconButton>
          {renderMobileMenu()}
        </>
      ) : (
        renderDesktopNav()
      )}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: isMobile ? 20 : 40,
          right: isMobile ? 20 : 40,
          zIndex: 20,
        }}
      >
        <Stack direction="column" spacing={1} alignItems="center">
          <IconButton
            href="https://wa.me/918420461369"
            target="_blank"
            sx={{
              backgroundColor: "#25D366",
              color: "white",
              // borderRadius: "50%",
              width: isMobile ? 48 : 64,
              height: isMobile ? 48 : 64,
            }}
          >
            <WhatsAppIcon sx={{ fontSize: isMobile ? 28 : 40 }} />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            href="tel:+917477798949"
            size="small"
            sx={{
              color: "white",
              backgroundColor: "#28a745",
              "&:hover": { backgroundColor: "#218838" },
            }}
          >
            IVR 1
          </Button>
          <Button
            variant="outlined"
            startIcon={<PhoneIcon />}
            href="tel:+917063592396"
            size="small"
            sx={{
              color: "white",
              backgroundColor: "#28a745",
              "&:hover": { backgroundColor: "#218838" },
            }}
          >
            IVR 2
          </Button>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default Header;
