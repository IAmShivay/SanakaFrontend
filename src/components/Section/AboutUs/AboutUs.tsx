import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sri TAPAN Kr. POBI",
      position: "Founder Trustee",
      description: "Sri TAPAN Kr. POBI is the founder trustee, dedicated to establishing and guiding our institution.",
      image: "/images/tapan.jpg",
    },
    {
      id: 2,
      name: "Dr. BONAPART",
      position: "Chief Executive Officer",
      description: "Dr. BONAPART CHOWDHURY leads the institution with a vision for excellence",
      image: "/images/Bonapart.jpg",
    },
  ];

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4} textAlign="center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/images/Loader.png"
            alt="Company Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
        </motion.div>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          style={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          About Us
        </Typography>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/images/HeroBanner.jpg"
            alt="Hero"
            style={{
              width: "80vh", // Reduced width
              height: "40vh", // Reduced height
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </motion.div>
        <Typography
          paragraph
          variant="h4"
          component="h1"
          gutterBottom
          style={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Shri Ramkrishna Institute of Medical Sciences and Sanaka Hospitals
        </Typography>
        <Typography
          variant="body1"
          paragraph
          style={{ color: "#757575", fontSize: "1.1rem", lineHeight: "1.6" }}
        >
          Established in September 2015, Shri Ramkrishna Institute of Medical
          Sciences and Sanaka Hospitals (SRIMS & SH) is committed to serve the
          under privileged section of the society with State of the Art health
          care with the motto of "Skill to heal, Spirit to care." The medical
          college has state of the art Infrastructure along with 385 bedded
          Super Speciality Hospital in a lush green 20+ acre campus. Here, the
          aspiring doctors will be trained not only in latest medical knowledge
          and skill, they will also develop leadership, compassion and empathy
          in health care. SRIMS & SH has been issued Letter of Permission by the
          Board of Governors in Suppression of Medical Council of India for
          starting of a Medical College with 150 annual intake for MBBS course
          for the academic year 2019-2020.
        </Typography>
        <Grid container spacing={4} mt={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={member.id}
              style={{
                display: "flex",
                justifyContent: index === 0 ? "center" : "flex-start", // Center the Founder Trustee
                alignItems: "center",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Card style={{ backgroundColor: "#ffffff", maxWidth: "300px" }}>
                  <CardMedia
                    component="img"
                    style={{ height: "auto", width: "auto", objectFit: "cover" }}
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ color: "#3f51b5" }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      style={{
                        color: "#e91e63", // Highlight color
                        fontWeight: "bold", // Bold text
                      }}
                    >
                      {member.position}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ color: "#757575" }}
                    >
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
