import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AddEmployee from './Add_employee'; // Assurez-vous d'importer le bon composant

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      name: 'mohamed',
      position: 'CEO',
      salary: 4500,
      avatarUrl: 'https://th.bing.com/th/id/OIP.-5z0DzxtnegQtLgnTwwRxAHaFj?rs=1&pid=ImgDetMain',
      hireDate: '1963-08-21', // Add hire date for each employee
    },
    {
      id: 2,
      name: 'hassan',
      position: 'CFO',
      salary: 3500,
      avatarUrl: 'https://www.pointdevue.fr//storage/images/biography_900/2019/09/gettyimages-1178062210.jpg',
      hireDate: '2003-05-8', // Add hire date for each employee
    },
    {
      id: 3,
      name: 'Rachid',
      position: 'CTO',
      salary: 4000,
      avatarUrl: 'https://fr.hibapress.com/wp-content/uploads/2021/06/images-35.jpg',
      hireDate: '1970-06-20', // Add hire date for each employee
    },
  ]);
  const [deletedEmployees, setDeletedEmployees] = useState([]);
  const [showAddNewEmployee, setShowAddNewEmployee] = useState(false);

  const handleAddNewEmployeeClick = () => {
    setShowAddNewEmployee(true);
  };

  const handleAddNewEmployeeClose = () => {
    setShowAddNewEmployee(false);
  };


  const handleAddEmployee = (newemployeeData) => {
    // Logic to add a new client
    console.log('Adding Employee:', newemployeeData);
    setEmployeeData([...employeeData, newemployeeData]);
    setShowAddNewEmployee(false);
  };
  const handleDeleteEmployee = (id) => {
    const deletedEmployee = employeeData.find(employee => employee.id === id);
    setDeletedEmployees([...deletedEmployees, deletedEmployee]);
    setEmployeeData(employeeData.filter(employee => employee.id !== id));
  };

  const handleRestoreEmployees = () => {
    setEmployeeData([...employeeData, ...deletedEmployees]);
    setDeletedEmployees([]);
  };

  return (
    <>
      {showAddNewEmployee ? (
        <AddEmployee onAddeEmployee={handleAddEmployee} onClose={handleAddNewEmployeeClose} />
      ) : (
    <PageContainer title="Our Valued Employees" description="Meet the people who make our company run">
      <DashboardCard title="Our Employees">
      <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Button variant="contained" color="primary" onClick={handleAddNewEmployeeClick}>
          Add New Employee
        </Button>
       
     
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          {employeeData.length} Satisfied Employees and Counting
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestoreEmployees}
            disabled={deletedEmployees.length === 0}
            sx={{ marginLeft: '560px' }} // Aligns the button to the right
          >
            Restore Deleted Employees
          </Button>
        </Typography>
        </Box>
        <Grid container spacing={4}>
          {employeeData.map((employee) => (
            <Grid item key={employee.id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={employee.avatarUrl}
                  alt="Employee's Photo"
                />
                <CardContent>
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Hire Date: {employee.hireDate}
                  </Typography>


                  <Typography gutterBottom variant="h6" component="div">
                    {employee.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {employee.position}
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
export default Employees;

