import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Eaerningchart from './Eaerningchart';
import Eaerningtotal from './Earningtotal';

const earnings = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* Material Chart occupe une ligne complète */}
           <Eaerningchart />
          </Grid>     
          <Grid item xs={12} lg={12}>
            {/* Material Recent occupe une ligne complète */}
            < Eaerningtotal />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default earnings;