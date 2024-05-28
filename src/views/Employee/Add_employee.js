import React, { useState } from 'react';
import { Grid, Box, Stack, Typography, TextField, Button, InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Icône de l'argent

// components
import PageContainer from 'src/components/container/PageContainer';

const AddEmployee = ({ onClose , onEmployeeAdded }) => {
  const [name, setname] = useState('');
  const [salary, setsalary] = useState('');

  const handleAddEmployee = () => {
    const employeeData = {
      name:name,
      salary: salary
    };
  
    fetch('http://localhost:8080/api/Employe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Employee added successfully!');
        setname('');
        setsalary('');
        onEmployeeAdded && onEmployeeAdded(); // Appel de la fonction de rappel pour signaler l'ajout réussi
        onClose && onClose();
      } else {
        console.error('Failed to add employee');
      }
    })
    .catch(error => {
      console.error('Error adding employee:', error);
    });
  };
  const handleClose = () => {              
    onClose(); // Call the onClose prop to handle closing
  };
  return (
    <PageContainer title="Add Employee" description="Add a new employee with name and optional salary">
      
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
              <Stack spacing={2} mt={3}>
              <div>
      {/* Form content */}
      <Button variant="contained"  size="small" onClick={onClose} sx={{ width: '10%', marginTop: '1px' }} >
        Close
      </Button>
    </div>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  NEW EMPLOYEE
                </Typography>
            
                {/* Champ de saisie pour le nom de l'employé */}
                <TextField
                  fullWidth
                  label="FULL NAME"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                {/* Champ de saisie pour le salaire de l'employé avec symbole d'argent */}
                <TextField
                  fullWidth
                  label="Salary (Optional)"
                  variant="outlined"
                  value={salary}
                  onChange={(e) => setsalary(e.target.value.replace(/[^0-9.]/g, ''))}
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
                <Button variant="contained" color="primary" fullWidth onClick={handleAddEmployee}>
                  ADD EMPLOYEE
                </Button>
                {/* Bouton Close */}
               
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

export default AddEmployee;


