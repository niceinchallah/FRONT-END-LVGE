import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from 'src/components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { Fab } from '@mui/material';
import {  IconLayoutDashboard, IconLogin,   IconUserPlus,IconCar,IconCamera,IconMoneybag,IconPlus
  ,IconCash,IconBottle, IconTransitionRight,IconUser, IconUsers} from '@tabler/icons'; 

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// Dans generateChartData, ajustez la logique pour générer les données en fonction du type et du mois sélectionné
const generateChartData = (type, year, month) => {
  const data = [];

  if (type === 'year') {
    for (let i = 1; i <= 12; i++) {
      data.push({
        x: monthNames[i - 1],
        y: Math.floor(Math.random() * 1000),
      });
    }
  } else {
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= (type === 'year' ? 12 : daysInMonth); i++) {
      data.push({
        x: type === 'year' ? `Month ${i}` : `${monthNames[month - 1]} ${i}`, // Subtract 1 from month to match JavaScript Date object's month index
        y: Math.floor(Math.random() * 1000), // Replace with your actual data
      });


  }
  }
  return [
    {
      name: 'Profit',
      data: data,
    },
  ];
};





// Dans generateXAxisCategories, générez les catégories en fonction du nombre de jours dans le mois sélectionné
const generateXAxisCategories = (type, year, month) => {
  if (type === 'month') {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);
  } else {
    return monthNames; // Retourne les noms des mois pour le type 'year'
  }
};



//const generateXAxisCategories = (type, year, month) => {
 // const daysInMonth = new Date(year, month, 0).getDate();
  //if (type === 'month') {
   // return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  //} else {
    //return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 // }//
//};//
const Grapghe_veh = () => {
  const [viewType, setViewType] = useState('year');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [chartData, setChartData] = useState(generateChartData('year', 2024, 12));

  const handleChangeViewType = (event) => {
    setViewType(event.target.value);
    setChartData(generateChartData(event.target.value, selectedYear, selectedMonth));
  };
  
  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
    setChartData(generateChartData(viewType, event.target.value, selectedMonth));
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
    setChartData(generateChartData(viewType, selectedYear, event.target.value));
  };

  // Reste du code inchangé...

  



  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionsColumnChart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: 10, // Set the radius for rounded corners
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        roundedBars: true, // Enable rounded bars
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: generateXAxisCategories(viewType, selectedYear, selectedMonth),
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          fontSize: viewType === 'year' ? '12px' : '7.5px', // Taille de la police pour année et mois
        },
      },
    },
  
  
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  return (
    <DashboardCard 
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Vehicles
          <Fab style={{ backgroundColor:primary, color: '#FFFFFF', marginLeft: '10px' }} size="small">
            <IconCar width={20} color="#FFFFFF" />
          </Fab>
        </div>
      }
      action={
        <div>
          <Select
            labelId="view-type-dd"
            id="view-type-dd"
            value={viewType}
            size="small"
            onChange={handleChangeViewType}
          >
            <MenuItem value="year">Year</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
          {viewType === 'year' ? (
            <Select
              labelId="year-dd"
              id="year-dd"
              value={selectedYear}
              size="small"
              onChange={handleChangeYear}
            >
              <MenuItem value={2024}>2024</MenuItem>
              {/* Add more years as needed */}
            </Select>
          ) : (
            <Select
              labelId="month-dd"
              id="month-dd"
              value={selectedMonth}
              size="small"
              onChange={handleChangeMonth}
            >
              {monthNames.map((month, index) => (
                <MenuItem key={index + 1} value={index + 1}>{month}</MenuItem>
              ))}
            </Select>
          )}
        </div>
      }
    >
      <Chart options={optionsColumnChart} series={chartData} type="bar" height="370px" />
    </DashboardCard>
  );
};

export default Grapghe_veh;










