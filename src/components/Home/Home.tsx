import React, { useState, useCallback, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TabWithPopup from "../PopupForm/PopupForm";
import ActionAreaCard from "../Section/Crads/Crads";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospital",
    description: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospital is a private medical college located in Durgapur, West Bengal. It was established in 2019.",
    image: "images/SanakaEducation.jpg",
    link: "/aboutUs",
  },
  {
    id: 2,
    title: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospital",
    description: "Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospital is a private medical college located in Durgapur, West Bengal. It was established in 2019.",
    image: "",
    link: "/aboutUs",
  },
];

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const CarouselComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedFormFilled = localStorage.getItem("formFilled");
    if (storedFormFilled === "true") {
      setFormFilled(true);
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (!formFilled) {
      setIsOpen(true);
    } else {
      console.log("The form is already filled. Popup is disabled.");
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

  const nextProduct = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevProduct = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  }, []);

  const handleButtonClick = (link: string) => {
    if (formFilled) {
      window.location.href = link;
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          width: "100%",
          height: { xs: 300, md: 500 },
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0135af, #FFFFFF)",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0% 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={variants}
            initial="hidden"
            animate={index === currentIndex ? "visible" : "hidden"}
            transition={{ ease: "easeInOut", duration: 0.8 }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: index === currentIndex ? 1 : 0,
              opacity: index === currentIndex ? 1 : 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "90%", md: "80%" },
                height: { xs: "90%", md: "80%" },
                overflow: "hidden",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  color: "#fff",
                  padding: { xs: 1, md: 3 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    width: { xs: "90%", md: 'auto' ,xl:'auto' },
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth:'90vh',
                    marginBottom: 1,
                    fontSize: { xs: '0.75rem', md: '1rem' },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: { xs: "90%", md: 'auto' },
                  }}
                >
                  {product.description}
                </Typography>
                <Button
                  onClick={() => handleButtonClick(product.link)}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2, fontSize: { xs: '0.75rem', md: '1rem' } }}
                >
                  View More
                </Button>
              </Box>
            </Box>
          </motion.div>
        ))}
        <Button
          onClick={prevProduct}
          sx={{
            position: "absolute",
            top: "50%",
            left: 16,
            zIndex: 2,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "10px",
            minWidth: "40px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          &lt;
        </Button>
        <Button
          onClick={nextProduct}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            zIndex: 2,
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "10px",
            minWidth: "40px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          &gt;
        </Button>
      </Box>
      <TabWithPopup
        isOpen={isOpen}
        onSubmit={handleSubmit}
        formFilled={formFilled}
        onFormChange={handleFormChange}
      />
      <ActionAreaCard />
    </>
  );
};

export default CarouselComponent;
