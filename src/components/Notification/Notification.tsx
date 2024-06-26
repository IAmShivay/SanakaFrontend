import React, { useEffect, useRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { keyframes } from "@emotion/react";
import FiberNewIcon from "@mui/icons-material/FiberNew";

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

  // Demo notification items
  const demoItems: NotificationItem[] = [
    {
      message: "MBBS admission open for session 2024-2025",
      link: "/features/dark-mode",
    },
    { message: "Scholarship,Loan & Student Credit Card Facility Available", link: "/summer-sale" },
    {
      message: "25% Scholarship Available",
      link: "/webinars/react-best-practices",
    },
    { message: "System maintenance scheduled for tonight" },
    {
      message: "Check out our latest blog post on UI/UX trends",
      link: "/blog/ui-ux-trends",
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
            href={item.link}
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
                backgroundColor: "red",
                border: "2px solid yellow",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                marginRight: "16px", // Increased from 8px to 16px
              }}
            >
              <FiberNewIcon sx={{ color: "white" }} />
            </Box>
            <Typography variant="body1" component="span">
              {item.message}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default NotificationBar;
