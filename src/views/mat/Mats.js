import React,{useState} from 'react';
import { Grid, Box, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Materialchart from './Materialchart';
import Materialexpense from './Materialexpense';
import Materialglobal from './Materialglobal';
import Materialrecent from './Materialrecent';
import Add_mats from './Add_mats';

const Mats = () => {
  const [showAddMats, setShowAddMats] = useState(false);

  const handleAddMatsOpen = () => {
    setShowAddMats(true);
  };

  const handleAddMatsClose = () => {
    setShowAddMats(false);
  };
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      {showAddMats ? (
        <Add_mats onClose={handleAddMatsClose} />
      ) : (
        <DashboardCard>
        <Box>
          <Grid container spacing={3}>
          <Box sx={{ mt: 2, textAlign: 'center',display: 'block', margin: 'auto' , width: '40px' }}>
            <Button variant="contained" color="primary" onClick={handleAddMatsOpen}  sx={{ display: 'block', margin: 'auto', width: '135px' ,textAlign: 'center'}}>
              Add Mats
            </Button>
          </Box>
          <Grid item xs={12} lg={12}>
            {/* Material Chart occupe une ligne complète */}
            <Materialchart />
          </Grid>
          <Grid item xs={12} lg={6}>
            {/* Material Expense occupe une moitié de la ligne */}
            <Materialexpense />
          </Grid>
          <Grid item xs={12} lg={1}>
            {/* Material Global occupe l'autre moitié de la ligne */}
            <Materialglobal />
          </Grid>
          <Grid item xs={12} lg={12}>
            {/* Material Recent occupe une ligne complète */}
            <Materialrecent />
          </Grid>
        </Grid>
      </Box>
      </DashboardCard>
      )}
    </PageContainer>
    
  );
};

export default Mats;