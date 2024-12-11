import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon 
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, loading = false }) => (
  <Card 
    sx={{ 
      transition: 'all 0.3s',
      '&:hover': { 
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
      <Box sx={{ 
        color: 'primary.main',
        backgroundColor: 'primary.light',
        borderRadius: 2,
        p: 1.5,
        display: 'flex'
      }}>
        {loading ? (
          <Skeleton variant="circular" width={32} height={32} />
        ) : (
          React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 32 } })
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="40%" height={28} />
          </>
        ) : (
          <>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h5">
              {value}
            </Typography>
          </>
        )}
      </Box>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: 'Total Sales', value: '$15,350', icon: <TrendingUpIcon /> },
    { title: 'Total Orders', value: '126', icon: <ShoppingCartIcon /> },
    { title: 'Products', value: '45', icon: <InventoryIcon /> },
    { title: 'Categories', value: '8', icon: <CategoryIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} loading={loading} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 