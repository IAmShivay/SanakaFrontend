import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import { keyframes } from "@emotion/react";
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

interface NotificationItem {
  message: string;
  link?: string;
  ConfirmationMessage?: string;
}

interface NotificationBarProps {
  duration?: number;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ duration = 40 }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  useState<NotificationItem | null>(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  const demoItems: NotificationItem[] = [
    {
      message: "MBBS admission open for session 2024-2025",
      link: "/",
      ConfirmationMessage:
        "Your information has been shared with our College Representative. They will call you back soon. You can also reach them at the following numbers : 7477798949",
    },
    {
      message: "Scholarship,Loan & Student Credit Card Facility Available",
      link: "/",
      ConfirmationMessage:
        "Your information has been shared with our College Representative. They will call you back soon. You can also reach them at the following numbers : 7477798950",
    },
  ];

  useEffect(() => {
    const element = notificationRef.current;
    if (!element) return;

    const contentWidth = element.scrollWidth;
    const containerWidth = element.offsetWidth;
    const animationDuration = (contentWidth / containerWidth) * duration;
    element.style.animationDuration = `${animationDuration}s`;
  }, [duration, forceUpdate]);

  useEffect(() => {
    const handleResize = () => {
      setForceUpdate((prev) => !prev);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0035B3",
        color: "white",
        padding: "10px",
        overflow: "hidden",
        position: "relative",
        zIndex: 1000,
        width: "auto",
      }}
    >
      <Box
        ref={notificationRef}
        sx={{
          display: "flex",
          alignItems: "center",
          animation: `${scroll} linear infinite`,
          color: "white",
          whiteSpace: "nowrap",
          position: "relative",
          zIndex: 1000,
          width: "fit-content",
        }}
      >
        {[...demoItems, ...demoItems].map((item, index) => (
          <Link
            key={index}
            sx={{
              color: "inherit",
              textDecoration: "none",
              marginRight: "100px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
                animation: "blink 1s infinite",
                padding: "8px",
                borderRadius: "4px",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
                "@keyframes blink": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
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
    </Box>
  );
};

export default NotificationBar;
