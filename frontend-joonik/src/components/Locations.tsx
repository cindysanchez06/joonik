import React, { useEffect, useState } from 'react';
import { Location, getLocations } from '../services/api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        console.log('Datos obtenidos exitosamente:', data);
        setLocations(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Error al cargar imagen:', e.currentTarget.src);
    e.currentTarget.src = '/placeholder-image.png';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress sx={{ color: '#0097C2' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        align="center"
        sx={{
          bgcolor: 'rgba(220, 53, 69, 0.1)',
          p: 2,
          borderRadius: 1,
          m: 2,
        }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#25252D' }}>
      <Typography
        variant="h4"
        component="h2"
        align="center"
        sx={{
          color: '#0097C2',
          mb: 4,
          fontWeight: 500,
        }}
      >
        Sedes Colombia
      </Typography>
      <Grid container spacing={3}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card
              sx={{
                bgcolor: '#30303B',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={location.url}
                alt={location.name}
                onError={handleImageError}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  sx={{ color: '#ffffff', textAlign: 'center' }}
                >
                  {location.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', textAlign: 'center', mb: 1 }}>
                  Código: {location.id}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff', textAlign: 'center' }}>
                  Creado: {formatDate(location.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Locations;
