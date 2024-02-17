import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Profitchart from './profitchart';
import Profit_fact from './profit_fact';

const Profit = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* Material Chart occupe une ligne complète */}
           < Profit_fact  />
          </Grid>
         
          <Grid item xs={12} lg={12}>
            {/* Material Recent occupe une ligne complète */}
            < Profitchart />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Profit;

