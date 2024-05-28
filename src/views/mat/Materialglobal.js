import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';

const MaterialGlobal = () => {
  const theme = useTheme();
  const [materials, setMaterials] = useState([]);
  const [selectedOption, setSelectedOption] = useState('monthly');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/materials');
        setMaterials(response.data); // Stocker les données reçues dans l'état materials
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  // Filtrer les matériaux par mois ou par année
  const filteredMaterials = selectedOption === 'monthly' ?
    materials.filter(material => new Date(material.date).getMonth() === new Date().getMonth()) :
    materials.filter(material => new Date(material.date).getFullYear() === new Date().getFullYear());

  // Calculer le nombre total de matériaux
  const totalMaterials = filteredMaterials.length;

  // Calculer le nombre de chaque type de matériau
  const materialCounts = filteredMaterials.reduce((acc, material) => {
    acc[material.name] = (acc[material.name] || 0) + 1;
    return acc;
  }, {});

  // Calculer le pourcentage de chaque type de matériau
  const materialPercentages = Object.keys(materialCounts).reduce((acc, name) => {
    acc[name] = (materialCounts[name] / totalMaterials) * 100;
    return acc;
  }, {});

  // Options pour le graphique en donut
  const optionsDonutChart = {
    labels: Object.keys(materialCounts),
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      justifyContent: 'flex-end', // Alignement à droite
      paddingRight: '20px', 
      markers: {
        width: 12,
        height: 12,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  // Series pour le graphique en donut
  const seriesDonutChart = Object.values(materialPercentages);

  return (
    <DashboardCard
      title={`Monthly Material Consumption`}
      action={
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleOptionChange}
          size="small"
        >
          <ToggleButton value="monthly" color="primary">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly" color="primary">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      }
    >
    <Typography variant="h3" fontWeight="700" mt="-20px" sx={{ marginRight: '40px', marginBottom: '60px' }}>
  {totalMaterials}
</Typography>


      <Grid container spacing={3}justifyContent="flex-end"sx={{ marginTop: '-90px' }}> 
        <Grid item xs={3} sm={3}>
          <div>
            <Chart
              options={optionsDonutChart}
              series={seriesDonutChart}
              type="donut"
              height="300px"
              
            />
          </div>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default MaterialGlobal;
