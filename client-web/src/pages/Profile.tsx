import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, CircularProgress, Alert } from '@mui/material';
import { useProfileFetch } from '../hooks';

const Profile: React.FC<{ token: string }> = () => {
  const { user, loading, error } = useProfileFetch();

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="warning">No user data available</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ width: 400, borderRadius: '12px', boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Avatar sx={{ bgcolor: '#1976d2', width: 72, height: 72 }}>
                {user.firstname[0].toUpperCase()}
                {user.lastname[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.role}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Member since:</strong> {formatDate(user.createdAt)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
