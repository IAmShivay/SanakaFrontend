import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Box,
} from "@mui/material";

const cards = [
  {
    title: "MCI APPROVED",
    description:
      "Board of Governors in Supersession of Medical Council of India approved 150 MBBS Seats for Academic Session 2021-22.",
    image: "/images/MCI LOGO.jpg", // Replace with a real image URL
    alt: "MCI approved",
  },
  {
    title: "CLAUSE B.1.11",
    description:
      "Shri Ramkrishna Institute of Medical Sciences, situated in Durgapur, boasts a sprawling campus that spans over 50 acres.",
    image: "/images/CLAUSE.jpeg", // Replace with a real image URL
    alt: "Campus",
  },
  {
    title: "COURSES",
    description:
      "At Sanaka Education, we offer a diverse range of courses in medical sciences and engineering, including esteemed programs such as MBBS.",
    image: "/images/courses.jpeg", // Replace with a real image URL
    alt: "Courses",
  },
  {
    title: "FACULTY",
    description:
      "Our institution is distinguished by its top-notch faculty, comprised of experts and industry leaders.",
    image: "/images/HeroBanner.jpg", // Replace with a real image URL
    alt: "Faculty",
  },
];

export default function ResponsiveCardGrid() {
  return (
    <Box sx={{ padding: 2, width: { xs: "auto", md: "80vh", lg: "100%" }
     }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Box sx={{ margin: "3px", maxWidth: 340 }}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.alt}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
