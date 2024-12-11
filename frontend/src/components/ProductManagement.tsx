import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  ToggleButtonGroup, 
  ToggleButton, 
  Container,
  TextField,
  InputAdornment,
  Skeleton,
  Card,
  CardContent
} from '@mui/material';
import { ViewList, ViewModule, Search as SearchIcon } from '@mui/icons-material';
import ProductCard from './ProductCard';

const ProductManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [allProducts] = useState([
    {
      name: "Frozen Strawberries",
      category: "Berries",
      price: 9.99,
      stock: 150,
    },
    {
      name: "Frozen Mango Chunks",
      category: "Tropical",
      price: 12.99,
      stock: 80,
    },
    {
      name: "Mixed Berries",
      category: "Berries",
      price: 14.99,
      stock: 95,
    },
  ]);

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search query
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: 'grid' | 'list' | null
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const LoadingSkeleton = () => (
    <Box sx={{ 
      display: 'grid', 
      gap: 2, 
      gridTemplateColumns: viewMode === 'grid' 
        ? { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }
        : '1fr'
    }}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <Skeleton variant="rectangular" height={200} />
          <CardContent>
            <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} width="60%" />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="text" width={60} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <ViewModule />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gap: 2, 
          gridTemplateColumns: viewMode === 'grid' 
            ? { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }
            : '1fr'
        }}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ProductManagement; 