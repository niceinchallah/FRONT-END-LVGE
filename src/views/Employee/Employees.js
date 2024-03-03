import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AddEmployee from './Add_employee'; // Assurez-vous d'importer le bon composant

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [showAddNewEmployee, setShowAddNewEmployee] = useState(false);

  const handleAddNewEmployeeClick = () => {
    setShowAddNewEmployee(true);
  };

  const handleAddNewEmployeeClose = () => {
    setShowAddNewEmployee(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Employe');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = () => {
    fetchEmployees(); // Mettre à jour les données des employés après l'ajout réussi
  };

  const handleAddEmployee = (newEmployeeData) => {
    setEmployeeData([...employeeData, newEmployeeData]);
    setShowAddNewEmployee(false);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/Employe/${id}`);
      setEmployeeData(employeeData.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <>
      {showAddNewEmployee ? (
        <AddEmployee onClose={handleAddNewEmployeeClose} onEmployeeAdded={handleEmployeeAdded} />
      ) : (
        <PageContainer title="Our Valued Employees" description="Meet the people who make our company run">
          <DashboardCard title="Our Employees"> 
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleAddNewEmployeeClick}>
                Add New Employee
              </Button>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {employeeData.length} Employees
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {Array.isArray(employeeData) && employeeData.map((employee) => (
                <Grid item key={employee.id} xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        Hire Date: {employee.date}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {employee.name}
                      </Typography>
                      {employee.salary ? (
                        <Typography variant="body2" color="text.secondary">
                          Salary: ${employee.salary}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Salary: Confidential
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleDeleteEmployee(employee.id)}
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
export default  Employees ;