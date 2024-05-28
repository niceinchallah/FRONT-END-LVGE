import React, { useState } from 'react';
import { Grid, Box, Stack, Typography, TextField, Button, Chip, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icône de l'argent
import axios from 'axios'; // Importer Axios pour effectuer des requêtes HTTP

// components
import PageContainer from 'src/components/container/PageContainer';

const Add_mats = ({ onClose }) => {
  const [materialSuggestions, setMaterialSuggestions] = useState([
    'Savon',
    'Eau',
    'Pipe',
    'Balais',
    // ... Ajoutez d'autres suggestions ici
  ]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [price, setPrice] = useState('');
  const handleMaterialClick = (material) => {
    setSelectedMaterial(material);
  };

  const handleAddMaterial = async () => {
    try {
      const newMaterial = {
        name: selectedMaterial,
        price: price,
        date: new Date().toISOString().slice(0, 10), // Date actuelle
      };
      const response = await axios.post('http://localhost:8080/api/materials', newMaterial);
      console.log('Material added successfully:', response.data);
      // Réinitialiser les valeurs après l'ajout réussi
      setSelectedMaterial('');
      setPrice('');
      handleClose();
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

  const handleClose = () => {
    onClose(); // Call the onClose prop to handle closing
  };

  return (
    <PageContainer title="Add_material" description="this is Add_material">
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          marginTop: '-50px'
        }}
      >
        <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={12} lg={4} xl={3}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <div>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </div>
              <Stack spacing={2} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  NEW MATERIAL?
                </Typography>
                {/* Afficher les suggestions de matériaux sous forme de puces */}
                <Stack direction="row" spacing={1} justifyContent="center">
                  {materialSuggestions.map((material) => (
                    <Chip
                      key={material}
                      label={material}
                      onClick={() => handleMaterialClick(material)}
                      color={selectedMaterial === material ? 'primary' : 'default'}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
                {/* Champ de saisie pour le nom du matériau */}
                <TextField
                  fullWidth
                  label="THE MATERIAL"
                  variant="outlined"
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                />
                {/* Champ de saisie pour le prix avec symbole d'argent */}
                <TextField
                  fullWidth
                  label="PRICE"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  type="number" // Définir le type de champ comme nombre
                />
                {/* Bouton Ajouter */}
                <Button variant="contained" color="primary" fullWidth onClick={handleAddMaterial}>
                  ADD
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Add_mats;

