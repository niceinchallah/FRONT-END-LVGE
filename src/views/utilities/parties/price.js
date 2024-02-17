import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Price = () => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [services, setServices] = useState([]);

  const handleAddService = () => {
    if (serviceName && servicePrice) {
      const newService = {
        name: serviceName,
        price: parseFloat(servicePrice),
      };

      setServices((prevServices) => [newService, ...prevServices]);
      setServiceName('');
      setServicePrice('');
    }
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  return (
    <DashboardCard title="Service">
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        
  
        <TextField
          label="Service Name"
          fullWidth
          margin="normal"
          size="small"
          style={{ marginBottom: '0.1px' }}
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
  
        <TextField
          label="Service Price"
          type="number"
          fullWidth
          margin="normal"
          size="small"
          style={{ marginBottom: '10px' }}
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
        />
  
        <Button variant="contained" color="primary" onClick={handleAddService}>
          Add Service
        </Button>
  
        <Paper elevation={3} style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
          {services.map((service, index) => (
            <div key={index} style={{ margin: '0 10px' }}>
              <ListItemText
                primary={service.name}
                secondary={`Price: $${service.price.toFixed(2)}`}
              />
              <IconButton color="secondary" onClick={() => handleRemoveService(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Paper>
      </div>
    </DashboardCard>
  );
  
  
  
  
            };  

export default Price;
