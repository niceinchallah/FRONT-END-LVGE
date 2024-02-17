import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ExpenseChart from './Expensechart';
import Expensetotal from './Expensetotal';

const expenses = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* Material Chart occupe une ligne complète */}
           < ExpenseChart />
          </Grid>
         
          <Grid item xs={12} lg={12}>
            {/* Material Recent occupe une ligne complète */}
            < Expensetotal />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default expenses;