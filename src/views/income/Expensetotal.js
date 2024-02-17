import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons';
import DashboardCard from '../../components/shared/DashboardCard';

const Expensetotal = () => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const successColor = theme.palette.success.main;
  const defeatColor = '#FF0000';
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [selectedData, setSelectedData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [viewType, setViewType] = useState('year');

  const handleOptionChange = (event, newOption) => {
    setSelectedOption(newOption);
    setViewType(newOption === 'monthly' ? 'year' : 'month');
  };

  const generateXAxisCategories = (type, year, month) => {
  if (type === 'month') {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
  } else if (type === 'year') {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
};


  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  };

  useEffect(() => {
    const numberOfDataPoints = selectedOption === 'monthly' ? 30 : 12;
    const data = generateRandomData(numberOfDataPoints);
    setSelectedData(data);
  }, [selectedOption]);

  const optionsColumnChart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: defeatColor,
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      zoom: {
        enabled: false, // Remove zooming feature
      },
    },
    stroke: {
      colors: [defeatColor],
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [defeatColor],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: generateXAxisCategories(viewType, selectedYear, selectedMonth),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        let viewTypeLabel;
        if (selectedOption === 'yearly') {
          viewTypeLabel = months[dataPointIndex];
        } else if (selectedOption === 'monthly') {
          viewTypeLabel = `Day ${dataPointIndex + 1}`;
        }
        return (
          '<div style="background-color: ' +
         defeatColor +
          '; padding: 10px; color: #fff;">' +
          `<span>${viewTypeLabel}: -$${
            series[seriesIndex][dataPointIndex].toFixed(0)
          }</span>` +
          '</div>'
        );
      },
    },
  };

  return (
    <DashboardCard
      title={`Expenses total  - ${selectedOption === 'monthly' ? 'Monthly' : 'Yearly'}`}
      action={
        <ToggleButtonGroup
          value={selectedOption}
          exclusive
          onChange={handleOptionChange}
          size="small"
          color= 'defeatColor'
        >
          <ToggleButton value="monthly" color="secondary">
            Monthly
          </ToggleButton>
          <ToggleButton value="yearly" color="secondary">
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      }
      footer={
        <Chart options={optionsColumnChart} series={[{ data: selectedData }]} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {`-$${selectedData.reduce((acc, value) => acc + value, 0)}`}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +{Math.floor(Math.random() * 10)}%
          </Typography>
          <Typography variant="subtitle2" fontWeight="600">
            {/* Add your percentage change logic here */}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {selectedOption === 'monthly' ? 'last month' : 'last year'}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Expensetotal;