import React, { useState } from 'react';
import { Grid, Box, Stack, Typography, TextField, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PageContainer from 'src/components/container/PageContainer';

const Add_new_client = ({  onClose , onAddClient }) => {
  const [clientName, setClientName] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [clientPhoto, setClientPhoto] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setClientPhoto(acceptedFiles[0]);
      ; 
    },
  });
  const handleClose = () => {
    onClose(); // Call the onClose prop to handle closing
  };
  const handleAddClient = async () => {
    const formData = new FormData();
    formData.append('name', clientName);
    formData.append('brand', carBrand);
    formData.append('model', carModel);
    if (clientPhoto) {
      formData.append('photo', clientPhoto);
    }
    fetch('http://localhost:8080/api/Clients', {
      method: 'POST',   
      body: formData,
    })   
   .then(async (response) => {
  // Vérifier le type de contenu de la réponse
  const contentType = response.headers.get('content-type');
  handleClose(); 
  // Si le type de contenu est une image     
  if (contentType && contentType.startsWith('image')) { 
    // Traiter la réponse comme une image
    console.log('Response is an image');
    const blob = await response.blob();
    // Gérer le blob d'image ici (par exemple, l'afficher dans votre application)
  } else {
    // Si le type de contenu n'est pas une image, lire la réponse comme du texte
    return response.text(); 
  
  // Lire le contenu de la réponse en tant que texte
  }
})

.then((text) => {
  if (text) {
    try {
      // Convertir le texte en JSON
      const data = JSON.parse(text);
      console.log('Client added successfully:', data);
      onAddClient && onAddClient(data); // Call onAddClient with the added client data
      handleClose(); // Close the window after adding the client
    } catch (error) {
      // Si le texte ne peut pas être analysé en tant que JSON, considérez-le comme un message texte
      console.log('Response is a text message:', text);
      // Autre traitement ici si nécessaire
    }
  } else {
    console.log('Empty response'); // Réponse vide
    // Autre traitement ici si nécessaire
  }
})

  };

  return (
    <PageContainer title="Add Client" description="Add a new client with name, car brand, and model">
      
      <Box sx={{ position: 'relative', backgroundColor: 'white', marginTop: '-50px' }}>
     
        <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={12} lg={4} xl={3}>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Stack spacing={2} mt={3}>
              <div>
      {/* Form content */}
      <Button variant="contained" onClick={handleClose}>
        Close
      </Button>
    </div>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  NEW CLIENT?
                </Typography>
                <TextField
                  fullWidth
                  label="FULL NAME"
                  variant="outlined"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="CAR BRAND"
                  variant="outlined"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="CAR MODEL"
                  variant="outlined"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
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
                <Button variant="contained" color="primary" fullWidth onClick={handleAddClient}>
                  ADD CLIENT
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Add_new_client;


