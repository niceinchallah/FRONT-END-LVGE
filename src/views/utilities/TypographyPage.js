// TypographyPage.js
import React from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from 'src/components/shared/BlankCard';

// Importez vos composants
import Veh from './parties/veh';
import Graphes_veh from './parties/graphes_veh';
import History from './parties/History';
import Price from './parties/price';
import Graphes_mtn from './parties/graphes_mtn';

const TypographyPage = () => {
  return (
    <PageContainer title="Typography" description="this is Typography">

      <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
            {/* Material Expense occupe une moitié de la ligne */}
            <Price />
          </Grid>
          
          <Grid item xs={12} lg={12}>
            {/* Material Global occupe l'autre moitié de la ligne */}
            <Veh />
          </Grid>
         
          <Grid item xs={12} lg={6}>
            {/* Material Expense occupe une moitié de la ligne */}
            < Graphes_veh />
          </Grid>  
          <Grid item xs={12} lg={6}>
            {/* Material Global occupe l'autre moitié de la ligne */}
            <Graphes_mtn />
          </Grid>
          <Grid item xs={12} lg={12}>
            {/* Material Global occupe l'autre moitié de la ligne */}
            <History />
          </Grid>
         
       
      
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
