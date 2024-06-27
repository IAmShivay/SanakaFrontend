import React, { useState, useCallback, useEffect, useRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { keyframes } from "@emotion/react";
import TabWithPopup from "../PopupForm/PopupForm";
import { FormData } from "../Home/Home";
import ConfirmationPopup from "./ConfirmationPopup";
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

interface NotificationItem {
  message: string;
  link?: string;
}

interface NotificationBarProps {
  duration?: number;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ duration = 40 }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation popup

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
      setShowConfirmation(true); // Show the confirmation popup
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
  const demoItems: NotificationItem[] = [
    {
      message: "MBBS admission open for session 2024-2025",
      link: "/features/dark-mode",
    },
    {
      message: "Scholarship,Loan & Student Credit Card Facility Available",
      link: "/summer-sale",
    },
    {
      message: "25% Scholarship Available",
      link: "/webinars/react-best-practices",
    },
  ];

  useEffect(() => {
    const element = notificationRef.current;
    if (!element) return;

    const animationDuration = element.offsetWidth / 60;
    element.style.animationDuration = `${animationDuration}s`;

    const timer = setTimeout(() => {}, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "80vh", lg: "100%" },
        overflow: "hidden",
        backgroundColor: "#0035b3",
        color: "white",
        padding: "10px 0",
        position: "relative",
        top: 0,
        zIndex: 1000,
        height: { xs: "70%", md: "80%", lg: "90%" },
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <Box
        ref={notificationRef}
        sx={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: `${scroll} linear infinite`,
          width: "full",
          overflow: "hidden",
          color: "white",
          padding: "10px 0",
          position: "relative",
          top: 0,
          zIndex: 1000,
        }}
      >
        {demoItems.map((item, index) => (
          <Link
            key={index}
            onClick={() => handleLinkClick(item.link!)}
            sx={{
              color: "inherit",
              textDecoration: "none",
              marginRight: "40px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px", // Increased from 8px to 16px
                animation: "blink 1s infinite", // Blinking animation
                padding: "8px",
                borderRadius: "4px", // Rounded corners for the box
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)", // Optional: adds a slight shadow
                "@keyframes blink": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 }, // Adjusted opacity to 0.5 (half visible)
                  "100%": { opacity: 1 },
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "red", fontWeight: 800 }}
              >
                New
              </Typography>
            </Box>

            <Typography variant="body1" component="span">
              {item.message}
            </Typography>
          </Link>
        ))}
      </Box>
      <TabWithPopup
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formFilled={formFilled}
        onFormChange={handleFormChange}
      />
      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </Box>
  );
};

export default NotificationBar;
