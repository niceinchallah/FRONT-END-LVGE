import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Button,
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Add_new_client from './Add_new_client';

const Clients = () => {
  const [clientData, setClientData] = useState([]);
  const [showAddNewClient, setShowAddNewClient] = useState(false);

  const handleAddNewClientClick = () => {
    setShowAddNewClient(true);
  };

  const handleAddNewClientClose = () => {
    setShowAddNewClient(false);
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Clients');
      setClientData(response.data);
    } catch (error) {
      console.error('Error fetching clients :', error);
    }
  };

  // Re-fetch data after adding a new client to update the UI
  useEffect(() => {
    fetchClients();
  }, [showAddNewClient]); // Track changes in showAddNewClient state

  const handleAddClient = async (newClientData) => {
    try {
      // Send data to server (e.g., using axios)
      const response = await axios.post('http://localhost:8080/api/Clients', newClientData);

      // Update the UI by re-fetching data
      fetchClients();

      setShowAddNewClient(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du client :', error);
    }
  };      

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/Clients/${id}`);
      // Update the UI by re-fetching data
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <>
      {showAddNewClient ? (
        <Add_new_client onAddClient={handleAddClient} onClose={handleAddNewClientClose} />
      ) : (
        <PageContainer title="Our Valued Clients" description="Meet the people who drive our passion">
          <DashboardCard title="Our Clients">
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleAddNewClientClick}>
                Add New Client
              </Button>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              {clientData.length} Satisfied Clients and Counting
            </Typography>
            <Grid container spacing={4}>
              {Array.isArray(clientData) &&
                clientData.map((client) => ( 
                  <Grid item key={client.id} xs={12} sm={6} md={4}>
  <Card sx={{ maxWidth: 345 }}>
    {client.photo ? (
      <CardMedia
        component="img"
        height="194"
        image={client.photo}
        alt="Client's Car"
      />
    ) : (
      <Typography
        variant="body1"
        component="div"
        align="center"
        sx={{ height: 194, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        No photo
      </Typography>
    )}
    <CardContent sx={{ p: 2 }}>
      <Typography gutterBottom variant="h6" component="div">
        {client.name}
      </Typography>
      <Chip label={client.brand} color="primary" />
      <Chip label={client.model} color="secondary" />
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" onClick={() => handleDeleteClient(client.id)}>
        Delete
      </Button>
    </CardActions>
  </Card>
     </Grid> ))}
            </Grid>
          </DashboardCard>
        </PageContainer>
      )}
    </>
  );
};


export default Clients;

