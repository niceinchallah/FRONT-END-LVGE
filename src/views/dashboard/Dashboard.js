import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import Income_Outcome from './components/Income_Outcome';
import VehiclesWashedToday from './components/VehiclesWashedToday';
import RecentTransactions from './components/RecentTransactions';
import TodayEarnings  from './components/TodayEarnings ';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Income_Outcome />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <VehiclesWashedToday />
              </Grid>
              <Grid item xs={12}>
                <TodayEarnings  />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12}>
            <RecentTransactions />
          </Grid>         
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
