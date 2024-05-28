import React,{ useState, useEffect } from 'react';
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
import axios from 'axios'; // Import Axios

const Price = () => {
  const [ServiceName, setServiceName] = useState('');
  const [servicePrice, setservicePrice] = useState('');
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/SERVICE');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = async () => {
    if (ServiceName && servicePrice) {
      const newService = {
        serviceName: ServiceName, // Utilisez le nom de propriété correct
        servicePrice
      : servicePrice, // Utilisez le nom de propriété correct
      };
  
      // Push data to backend API
      try {
        const response = await axios.post('http://localhost:8080/api/SERVICE', newService);
        console.log('Service added successfully:', response.data);
        setServices((prevServices) => [response.data, ...prevServices]); // Utilisez la réponse de l'API pour mettre à jour les services
        setServiceName('');
        setservicePrice('');
      } catch (error) {
        console.error('Error adding service:', error);
      }
    } else {
      console.error('Service name and price are required.'); // Log erreur si les champs sont vides
    }
  };

  const handleRemoveService = async (index) => {
    try {
      const serviceId = services[index].id; // Assuming id is the unique identifier for each service
      await axios.delete(`http://localhost:8080/api/SERVICE/${serviceId}`);
      const updatedServices = [...services];
      updatedServices.splice(index, 1);
      setServices(updatedServices);
    } catch (error) {
      console.error('Error removing service:', error);
    }
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
          value={ServiceName}
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
          onChange={(e) => setservicePrice(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddService}>
          Add Service
        </Button>
        <Paper elevation={3} style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
          {services.map((service, index) => (
            <div key={index} style={{ margin: '0 10px' }}>
              <ListItemText
                primary={service.serviceName}
                secondary={`$${service.servicePrice}`}
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
