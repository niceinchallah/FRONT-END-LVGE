import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Stack, Typography, TextField, Button, InputLabel, Input } from '@mui/material';
import { useDropzone } from 'react-dropzone'; // Import the useDropzone hook
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Add_new_client = ({ onClose }) => {

  const [clientName, setClientName] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [clientPhoto, setClientPhoto] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*', // N'accepte que les images
    onDrop: (acceptedFiles) => {
      setClientPhoto(acceptedFiles[0]); // Stocker la première image déposée
    },
  });

  const handleAddClient = () => {
    // Logique pour ajouter le client (vous pouvez ajouter votre logique ici)
    console.log('Adding client:', { name: clientName, brand: carBrand, model: carModel, photo: clientPhoto });
    // Réinitialiser les champs après l'ajout
    setClientName('');
    setCarBrand('');
    setCarModel('');
    setClientPhoto(null);
    onClose && onClose();
  };
  const handleClose = () => {
    onClose(); // Call the onClose prop to handle closing
  };
  
  return (
    <PageContainer title="Add Client" description="Add a new client with name, car brand, and model">
      {/* Close button */}
      <div>
      {/* Form content */}
      <Button variant="contained" onClick={handleClose}>
        Close
      </Button>
    </div>

      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          marginTop: '-50px',
        }}
      >
        <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={12} lg={4} xl={3}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>*
            <div>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </div>
              <Stack spacing={2} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  NEW CLIENT?
                </Typography>
                {/* Champ de saisie pour le nom du client */}
                <TextField
                  fullWidth
                  label="FULL NAME"
                  variant="outlined"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                {/* Champ de saisie pour la marque de la voiture */}
                <TextField
                  fullWidth
                  label="CAR BRAND"
                  variant="outlined"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
                {/* Champ de saisie pour le modèle de la voiture */}
                <TextField
                  fullWidth
                  label="CAR MODEL"
                  variant="outlined"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
                {/* Champ de saisie pour la photo de la voiture (optionnel) */}
                <Stack spacing={2}>
                  <input {...getInputProps()} />
                  <div {...getRootProps()} style={{ width: '100%', height: 150, borderWidth: 2, borderColor: 'gray', borderStyle: 'dashed' }}>
                    {isDragActive ? (
                      <Typography variant="body1">Drop the photo here ...</Typography>
                    ) : (
                      <Typography variant="body1">Drag 'n' drop a photo, or click to select one</Typography>
                    )}
                  </div>
                </Stack>
                {/* Bouton Ajouter */}
                <Button variant="contained" color="primary" fullWidth onClick={handleAddClient}>
                  ADD CLIENT
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

export default Add_new_client;
