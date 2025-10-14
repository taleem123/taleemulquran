import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  AccountCircle,
  Security,
  Notifications,
  Language,
  Palette
} from '@mui/icons-material';

const SettingsPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText 
              primary="Account Settings" 
              secondary="Manage your account preferences"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText 
              primary="Security" 
              secondary="Password and authentication settings"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText 
              primary="Notifications" 
              secondary="Configure notification preferences"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText 
              primary="Language" 
              secondary="Select your preferred language"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Palette />
            </ListItemIcon>
            <ListItemText 
              primary="Appearance" 
              secondary="Customize the look and feel"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Taleem Ul Quran Admin Portal v1.0
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Manage your Quranic content and lessons efficiently.
        </Typography>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
