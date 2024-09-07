import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Loading } from '../Loading';
import EditForm from '../editPages/BaseEditPage';
import { promotionsOperations } from '../../config/operations/promotions.tsx';
import { Box, Divider, Tab } from '@mui/material';
import { Title } from '../Title';
import { DataCard } from '../DataCard';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { StatsCard } from '../StatsCard';
import { BackButton } from '../buttons/BackButton';
import { PartnersDataGrid } from '../tables/PartnersDataGrid';
import { PromotionIcon } from '../icons/PromotionIcon';
import { promotionsColumns } from '../../config/columns/promotions';
import { checkPermissions } from '../functions/checkPermissions';
import { LeadsDataGrid } from '../tables/LeadsDataGrid.tsx';


const API_URL: string = import.meta.env.VITE_API_URL;


export const PromotionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState('global');
  const location = useLocation();
  const navigate = useNavigate();
  const operations = promotionsOperations;
  const [tabValue, setTabValue] = React.useState(location.state?.tabValue || '1');

  const handleChangeTab = (_: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  const TabStyle = {
    fontWeight: '700', 
    textTransform: 'none', 
    fontSize: '17px', 
    padding: '0', 
    minWidth: 0,
    marginRight: '30px',
  }

  const TabHeight = {
    md: 'calc(100dvh - 65px - 86px - 10dvh - 104px)',
    sm: 'calc(100dvh - 65px - 86px - 10dvh - 89px)',
    xs: 'calc(100dvh - 65px - 86px - 10dvh - 126px)',
  }

  function setPartners(partners: any) {
    setItem({ ...item, partners: partners })
  }
  

  useEffect(() => {
    async function fetchItem() {
      const token = Cookies.get('token');
      let state = location.state
      if (!state?.object) {
        try {
          const response = await axios.get(`${API_URL}${operations.get?.path}`, { params: { token: token, id: id } });
          if (response.data.state === 'successful') {
            setItem(response.data[operations.get?.responseKey || 'data']);
          } else {
            console.error(response.data.message);
          }
          
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
      else {
        setItem(state.object);
        window.history.replaceState({}, '')
      }
      setLoading('none');
    };

    fetchItem();
  }, []);

  if(!checkPermissions(['promotions', 'partners', 'referrals'])){
    navigate('/no-access')
  }

  if (loading == 'global') return <Loading/>;

  return (
  <>
  <Box sx={{marginBottom: '20px'}}>
    <Box>
        <BackButton backPath={`/${operations.model}s`} />
    </Box>
  </Box>
  <DataCard 
      icon={ <PromotionIcon height={30} width={30}/> }
      primaryDataKeys={ ['name'] }
      secondaryDataKeys={ ['referrer_bonus', 'referral_bonus'] }
      primaryFont={ "Quicksand, Manrope" }
      object={ item }
      loading={ loading }
      transperent
      columns={promotionsColumns.primary}
  />
  <Box>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '10px', }}>
          <TabList onChange={handleChangeTab} sx={{overflowX: 'auto', width: {sm: '100dvw', xs: 'calc(100dvw - 20px)'}}}>
            <Tab label="Сводка" value="1" sx={TabStyle} disableRipple/>
            <Tab label="Партнеры" value="2" sx={TabStyle} disableRipple/>
            <Tab label="Лиды" value="3" sx={TabStyle} disableRipple/>
            <Tab label="Управление" value="4" sx={TabStyle} disableRipple/>
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding: '0'}}>
          <Box sx={{padding: '10px 0'}}>
            <Title title={'Сводка'}/>
          </Box>
          <Box sx={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: {sm: 'row', xs: 'column'},
            gap: {sm: '30px', xs: '10px'},
            flexWrap: {xs: 'wrap', sm: 'nowrap'},
            height: TabHeight,
          }}>
            <StatsCard
              statName={'Привлечено клиентов'}
              statText={item.total_referrals}
              statForDay={item.day_referrals}
              statForWeek={item.week_referrals}
            />
            <StatsCard
              statName={'Переходов по ссылкам / Лидов'}
              statText={`${item.total_clicks} / ${item.total_leads}`}
              statForDay={`${item.day_clicks} / ${item.day_leads}`}
              statForWeek={`${item.week_clicks} / ${item.week_leads}`}
            />
          </Box>
        </TabPanel>
        <TabPanel value="2" sx={{padding: 0}}>
          <Box sx={{padding: '10px 0'}}>
            <PartnersDataGrid 
            tableHeight={TabHeight} 
            initialRows={item.partners}
            setPartners={setPartners}
            promotion_id={item.id}
            />
          </Box>
        </TabPanel>
        <TabPanel value="3" sx={{padding: 0}}>
          <Box sx={{padding: '10px 0'}}>
            <LeadsDataGrid
                tableHeight={TabHeight}
                initialRows={item.leads}
                promotion_id={item.id}
              />
          </Box>
        </TabPanel>
        <TabPanel value="4" sx={{
          padding: 0,
        }}>
          <Box sx={{padding: '10px 0'}}>
            <Title title={'Управление'}/>
          </Box>
          <Divider />
          <Box sx={{
              height: TabHeight, 
              overflow: 'auto',
              padding: '15px 0'
            }}>
            <EditForm
                operations={operations}
                item={item}
                setItem={setItem}
                submodelIcon={<PromotionIcon width={30} height={30}/>}
            />
          </Box>
        </TabPanel>
      </TabContext>
  </Box>
  
  </>
  ); 
};
