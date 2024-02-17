import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';


const MaterialGlobal = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const monthlyData = { savon: 5, tuyau: 1 };
const yearlyData = { savon: 152, tuyau: 30 };

const totalMonthlyData = monthlyData.savon + monthlyData.tuyau;
const totalYearlyData = yearlyData.savon + yearlyData.tuyau;

const percentagemonthlySavon = (monthlyData.savon / totalMonthlyData) * 100;
const percentagemonthlyTuyau = (monthlyData.tuyau / totalMonthlyData) * 100;

const percentageYearlySavon = (yearlyData.savon / totalYearlyData) * 100;
const percentageYearlyTuyau = (yearlyData.tuyau / totalYearlyData) * 100;

  const [selectedOption, setSelectedOption] = useState('monthly');
 

  const handleOptionChange = (event, newOption) => {
    if (newOption !== null) {
      setSelectedOption(newOption);
    }
  };

  const optionsDonutChart = {
    labels: ['Savon', 'Tuyau'],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
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
  // ... calculations for totalMonthlyData, totalYearlyData, percentages
  const seriesDonutChartMonthly = [percentagemonthlySavon, percentagemonthlyTuyau]; // Pour le graphique mensuel
  const seriesDonutChartYearly = [percentageYearlySavon, percentageYearlyTuyau]; // Pour le graphique annuel
  useEffect(() => {
    const options = ['savon', 'tuyau'];
  
   
  }, [selectedOption, percentagemonthlySavon, percentagemonthlyTuyau, percentageYearlySavon, percentageYearlyTuyau]);

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
      <Typography variant="h3" fontWeight="700" mt="-20px" sx={{ marginRight: '40px' }} >
        {selectedOption === 'monthly' ? totalMonthlyData : totalYearlyData}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
            
          </Grid>
        <Grid item xs={6} sm={6}>
    <div>
      {selectedOption === 'monthly' && (
        <Chart
          options={optionsDonutChart}
          series={seriesDonutChartMonthly}
          type="donut"
          height="200px"
        />
      )}

      {selectedOption === 'yearly' && (
        <Chart
          options={optionsDonutChart}
          series={seriesDonutChartYearly}
          type="donut"
          height="200px"
        />
      )}
    </div>

        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default MaterialGlobal;
