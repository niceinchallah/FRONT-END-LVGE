import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const TodayEarnings = () => {
  const theme = useTheme();
  const lightGreenColor = '#8BC34A';
  const errorlight = '#fdede8';

  const optionsAreaChart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#899499",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
       fill: {
      colors: [lightGreenColor],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const hour = dataPointIndex + 1;
        const todayEarnings = series[seriesIndex][dataPointIndex];
        return (
          `<div style="background-color: ${lightGreenColor}; padding: 10px; color: #fff;">` +
          `<span>Hour ${hour}: $${todayEarnings}</span>` + // Added dollar sign here
          '</div>'
        );
      },
    },
    
  };

  const generateRandomData = () => {
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * 20) + 5);
  };

  const seriesAreaChart = [
    {
      name: '',
      color: lightGreenColor,
      data: generateRandomData(),
    },
  ];
  const sumChartData = seriesAreaChart[0].data.reduce((acc, value) => acc + value, 0);
  const data = generateRandomData();
  return (
    <DashboardCard
      title="Today Earnings "
      action={
        <Fab style={{ backgroundColor: lightGreenColor, color: 'lightGreenColor' }} size="medium">
         <IconCurrencyDollar width={24} color="#FFFFFF" />
        </Fab>
      }
      footer={
        <>
          {/* Display the total sum of earnings */}
          <Chart options={optionsAreaChart} series={seriesAreaChart } type="area" height="60px" />
        </>
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
        {data.reduce((total, amount) => total + amount, 0)}
        <span style={{ fontSize: '15px' }}>$</span>
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +{Math.floor(Math.random() * 10)}%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last day
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default TodayEarnings;



