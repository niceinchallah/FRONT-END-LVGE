import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';

import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Add_new_client from './Add_new_client';

const Clients = () => {
  const [clientData, setClientData] = useState([
    {
      id: 1,
      name: 'John Doe',
      carBrand: 'Tesla',
      carModel: 'Model 3',
      avatarUrl: 'https://th.bing.com/th/id/R.b151fe307378e95b5dc15cd395eb608c?rik=6HgVwWpgst7jTA&pid=ImgRaw&r=0',
      dateAdded: new Date().toLocaleDateString()
    },
    {
      id: 2,
      name: 'Jane Doe',
      carBrand: 'Mercedes-Benz',
      carModel: 'Classe S',
      avatarUrl: 'https://th.bing.com/th/id/OIP.YqY_aPN6E5Mx_m5ewoVO2wHaDR?pid=ImgDet&w=474&h=209&rs=1',
      dateAdded: new Date().toLocaleDateString()
    },
    {
      id: 3,
      name: 'John Smith',
      carBrand: 'dacia',
      carModel: 'logan',
      avatarUrl: 'https://ajiauto.com/wp-content/uploads/2023/05/DT2I-1204396699-768x432.jpg',
      dateAdded: new Date().toLocaleDateString()
    },
    {
      id: 4,
      name: 'nice doe',
      carBrand: 'mercedes',
      carModel: '190',
      avatarUrl: 'https://static.cargurus.com/images/site/2020/01/14/16/12/1988_mercedes-benz_300-class_300e_sedan-pic-8179502240227911834-1600x1200.jpeg',
      dateAdded: new Date().toLocaleDateString()
    },
    {
      id: 5,
      name: 'good doe ',
      carBrand: 'Honda',
      carModel: 'civic',
      avatarUrl: 'https://media.easyavvisi.net/004549/3308/honda-civic-gasoline-2003-usata-hamilton-G.jpg',
      dateAdded: new Date().toLocaleDateString()
    },
    {
      id: 6,
      name: 'The Williams Family',
      carBrand: 'Mazda',
      carModel: '5',
      avatarUrl: 'https://media.kijiji.ca/api/v1/autos-prod-ads/images/8b/8b5284bf-a253-423b-a8cb-63e21ea2729a?rule=move-300-jpg',
      dateAdded: new Date().toLocaleDateString()
    },
  ]);

  const [numberOfClients, setNumberOfClients] = React.useState(clientData.length);
  const [showAddNewClient, setShowAddNewClient] = useState(false);

  const [deletedClients, setDeletedClients] = useState([]);

  const handleAddNewClientClick = () => {
    setShowAddNewClient(true);
  };

  const handleAddNewClientClose = () => {
    setShowAddNewClient(false);
  };

  const handleAddClient = (newClientData) => {
    // Logic to add a new client
    console.log('Adding client:', newClientData);
    setClientData([...clientData, newClientData]);
    setShowAddNewClient(false);
  };

  const handleDeleteClient = (id) => {
    const deletedClient = clientData.find(client => client.id === id);
    setDeletedClients([...deletedClients, deletedClient]);
    setClientData(clientData.filter(client => client.id !== id));
  };

  const handleRestoreClients = () => {
    setClientData([...clientData, ...deletedClients]);
    setDeletedClients([]);
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
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleRestoreClients} 
                disabled={deletedClients.length === 0}
                sx={{ ml: 2 }}
              >
                Restore Deleted Clients
              </Button>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              {clientData.length} Satisfied Clients and Counting
            </Typography>
            <Grid container spacing={4}>
              {clientData.map((client) => (
                <Grid item key={client.id} xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={client.avatarUrl}
                      alt="Client's Car"
                    />
                    <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} > 
                        Added on: {client.dateAdded}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {client.name}
                      </Typography>
                      <Chip label={client.carBrand} color="primary" />
                      <Chip label={client.carModel} color="secondary" />
                 
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                       
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DashboardCard>
          
        </PageContainer>
      )}
    </>
  );
    
};

export default Clients;

