import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Box } from '@mui/material';

const cards = [
  {
    title: 'Lizard',
    description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.',
    image: '/static/images/cards/contemplative-reptile.jpg',
    alt: 'green iguana'
  },
  {
    title: 'Turtle',
    description: 'Turtles are reptiles with hard shells that protect them from predators. They live in various environments, from deserts to wetlands.',
    image: '/static/images/cards/turtle.jpg',
    alt: 'turtle'
  },
  {
    title: 'Snake',
    description: 'Snakes are elongated, legless, carnivorous reptiles of the suborder Serpentes. They are found on every continent except Antarctica.',
    image: '/static/images/cards/snake.jpg',
    alt: 'snake'
  },
  {
    title: 'Crocodile',
    description: 'Crocodiles are large aquatic reptiles that live throughout the tropics in Africa, Asia, the Americas, and Australia.',
    image: '/static/images/cards/crocodile.jpg',
    alt: 'crocodile'
  }
];

export default function ResponsiveCardGrid() {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box sx={{ margin: 'auto', maxWidth: 345 }}>
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
