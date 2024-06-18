
import React, { useEffect, useRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { keyframes } from "@emotion/react";

const scroll = keyframes`
  0% { transform: translateX(100%); } // Start from the right
  100% { transform: translateX(-100%); } // End at the left
`;

interface NotificationBarProps {
  message: string;
  link?: string;
  duration?: number; 
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, link, duration = 40}) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = notificationRef.current;
    if (!element) return;

    const animationDuration = element.offsetWidth / 60; // Adjust the divisor for speed requirements
    element.style.animationDuration = `${animationDuration}s`;

    const timer = setTimeout(() => {
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#0035b3",
        color: "white",
        padding: "10px 0",
        position: "relative",
        top: 0,
        zIndex: 1000,
        height: "6vh",
        marginBottom:'10px',
        borderRadius:'5px'
      }}
    >
      <Box
        ref={notificationRef}
        sx={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: `${scroll} linear infinite`,
          width: "100%",
          overflow: "hidden",
          color: "white",
          padding: "10px 0",
          position: "relative",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link href={link} sx={{ color: "inherit", textDecoration: "none" }}>
          <Typography variant="body1" component="span">
            {message}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default NotificationBar;
