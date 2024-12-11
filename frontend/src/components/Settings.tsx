import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  useTheme
} from '@mui/material';

const Settings: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={theme.palette.mode === 'dark'}
                disabled // Theme switching is handled at app level
              />
            }
            label="Dark Mode"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings; 