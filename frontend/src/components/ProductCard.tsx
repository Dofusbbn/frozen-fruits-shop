import React from 'react';
import { Card, CardMedia, Typography, Stack, Chip, IconButton, Box, CardContent, Button, Grid } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ProductCardProps {
  product: {
    name: string;
    category: string;
    price: number;
    stock: number;
    image?: string;
  };
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Card sx={{ display: 'flex', p: 2, '&:hover': { boxShadow: 3 } }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 48, height: 48, borderRadius: 1 }}
              image={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.category}
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip 
                label={`${product.stock} in stock`}
                color={product.stock > 10 ? 'success' : 'error'}
                size="small"
              />
              <Typography variant="subtitle1">${product.price.toFixed(2)}</Typography>
              <Box>
                <IconButton size="small"><EditIcon /></IconButton>
                <IconButton size="small" color="error"><DeleteIcon /></IconButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <Card sx={{ '&:hover': { boxShadow: 3 } }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image || 'https://via.placeholder.com/300'}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.category}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip 
            label={`${product.stock} in stock`}
            color={product.stock > 10 ? 'success' : 'error'}
            size="small"
          />
          <Typography variant="h6">${product.price.toFixed(2)}</Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              variant="text"
              size="small"
              fullWidth
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="text"
              size="small"
              fullWidth
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 