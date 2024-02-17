import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// Function to generate random car data
const generateRandomCarData = () => {
  const getRandomDate = () => {
    const year = 2022;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const getRandomCarID = () => Math.floor(Math.random() * 1000);

  const carData = [];
  for (let i = 0; i < 20; i++) {
    carData.push({
      photo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP7lmmjPdKZgqKKFvX_ijoNdC5Nq0IZsc7wSMy5liz6Mr3G8H3d6Sk7sm8qD3ftkUkLWw&usqp=CAU=${i + 1}`, // Placeholder cat image URL
      date: getRandomDate(),
      time: getRandomTime(),
      id: getRandomCarID(),
    });
  }

  return carData;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  const [filter, setFilter] = useState('day');
  const carData = generateRandomCarData();

  const filteredCarData = () => {
    const currentDate = new Date();

    switch (filter) {
      case 'week':
        return carData.filter((car) => {
          const carDate = new Date(car.date);
          const diffTime = Math.abs(currentDate - carDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        });

      case 'month':
        return carData.filter((car) => {
          const carDate = new Date(car.date);
          return carDate.getMonth() === currentDate.getMonth();
        });

      case 'year':
        return carData.filter((car) => {
          const carDate = new Date(car.date);
          return carDate.getFullYear() === currentDate.getFullYear();
        });

      default:
        // 'day' filter (default)
        return carData.filter((car) => car.date === currentDate.toISOString().split('T')[0]);
    }
  };

  return (
    <PageContainer title="Car Detection Data" description="Table representing car detection data">
      <DashboardCard title="Cars Detected on Camera">
        <div style={{ marginBottom: '20px' }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCarData().map((car, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={car.photo} alt={`Car ${index + 1}`} style={{ width: '300px', height: 'auto' }} />
                  </TableCell>
                  <TableCell>{car.date}</TableCell>
                  <TableCell>{car.time}</TableCell>
                  <TableCell>{car.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
