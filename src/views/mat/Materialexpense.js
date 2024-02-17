import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons';
import DashboardCard from 'src/components/shared/DashboardCard';

const MaterialExpense = () => {
  const theme = useTheme();
  const successColor = theme.palette.success.main;
  const secondary = theme.palette.secondary.main;
  const [selectedOption, setSelectedOption] = useState('Today');

  const [selectedData, setSelectedData] = useState([]);
  const [viewType, setViewType] = useState('year');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selecteday, setSelectedday] = useState(1);
  const [selectedweek, setSelectedweek] = useState(1);
  const handleOptionChange = (event, newOption) => {
    if (newOption === 'today' || newOption === 'thisWeek') {
      setViewType(newOption === 'today' ? 'hour' : 'day');
    } else {
      setSelectedOption(newOption);
      setViewType(newOption === 'monthly' ? 'year' : newOption === 'week' ? 'day' : 'month');
    }
    
  };
  
  const generateXAxisCategories = (type, year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
  
    if (type === 'month') {
      return Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
    } else if (type === 'day') {
      return Array.from({ length: 24 }, (_, i) => `Hour ${i + 1}`);
    } else if (type === 'week') {
      return Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
    } else if (type === 'year') {
      return Array.from({ length: 12 }, (_, i) => `YEAR ${i + 1}`);
    } else {
      return [];
    }
  };
  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  };

  useEffect(() => {
    let numberOfDataPoints;
  
    if (selectedOption === 'monthly') {
      numberOfDataPoints = 30;
    } else if (selectedOption === 'week') {
      numberOfDataPoints = 7;
    } else if (selectedOption === 'Today') {
      numberOfDataPoints = 24;
    } else {
      numberOfDataPoints = 12; // Default for other cases
    }
  
    const data = generateRandomData(numberOfDataPoints);
    setSelectedData(data);
  }, [selectedOption]);
  

  const averagePerTooltip = selectedData.length / 24;
  const totalExpense = selectedData.reduce((acc, value) => acc + value, 0);
  const Expense = totalExpense*34;
  const adjustedValues = selectedData.map(value => (value / totalExpense) * totalExpense);

  const optionsColumnChart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: secondary,
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      colors: [secondary],
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondary],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: generateXAxisCategories(viewType, selectedYear, selectedMonth,selecteday,selectedweek),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        let viewTypeLabel;
  
        if (selectedOption === 'Today') {
          viewTypeLabel = `Hour ${dataPointIndex + 1}`;
        } else if (selectedOption === 'yearly') {
          viewTypeLabel = `Month ${dataPointIndex + 1}`;
        } else if (selectedOption === 'monthly') {
          viewTypeLabel = `Day ${dataPointIndex + 1}`;
        } else if (selectedOption === 'week') {
          viewTypeLabel = `Day ${dataPointIndex + 1}`;
        }
  
        return (
          '<div style="background-color: ' +
secondary +
'; padding: 10px; color: #fff;">' +
`<span>${viewTypeLabel}: ${adjustedValues[dataPointIndex].toFixed(0)} Material added </span>`

        );
      },
    },
    
  };

  return (
    <DashboardCard
  title={`Materials added  - ${
    selectedOption === 'monthly'
      ? 'Monthly'
      : selectedOption === 'yearly'
      ? 'Yearly'
      : selectedOption === 'Today'
      ? 'Today'
      : 'Weekly'
  }`}
  action={
    <ToggleButtonGroup
      value={selectedOption}
      exclusive
      onChange={handleOptionChange}
      size="small"
    >
      <ToggleButton value="monthly" color="secondary">
        Monthly
      </ToggleButton>
      <ToggleButton value="yearly" color="secondary">
        Yearly
      </ToggleButton>
      <ToggleButton value="Today" color="secondary">
        Today
      </ToggleButton>
      <ToggleButton value="week" color="secondary">
        Week
      </ToggleButton>
    </ToggleButtonGroup>
  }
  footer={
    <Chart options={optionsColumnChart} series={[{ data: selectedData }]} type="area" height="60px" />
  }
>
  <>
  <Typography variant="h3" fontWeight="700" mt="-20px">
  {`
  ${totalExpense} Material added`}
</Typography>

    {/* <Stack direction="row" spacing={1} my={1} alignItems="center"> */}
      {/* <Avatar sx={{ bgcolor: secondary, width: 27, height: 27 }}> */}
        {/* <IconArrowDownRight width={20} color="#FA896B" /> */}
      {/* </Avatar> */}
      {/* <Typography variant="subtitle2" fontWeight="600"> */}
        {/* Add your percentage change logic here */}
      {/* </Typography> */}
      {/* <Typography variant="subtitle2" color="textSecondary"> */}
        {/* {selectedOption === 'monthly' */}
          {/* ? 'last month' */}
          {/* : selectedOption === 'yearly' */}
          {/* ? 'last year' */}
          {/* : selectedOption === 'Today' */}
          {/* ? 'yesterday' */}
          {/* : 'last week'} */}
      {/* </Typography> */}
    {/* </Stack> */}
  </>
</DashboardCard>
  );
};

export default MaterialExpense;




