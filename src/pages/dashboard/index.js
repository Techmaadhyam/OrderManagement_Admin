import { addDays, setSeconds, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { TotalInventoryCount } from 'src/sections/dashboard/overview/TotalInventoryCount';
import { OverviewTask } from 'src/sections/dashboard/overview/OverviewTask';
import { OverviewAMC } from 'src/sections/dashboard/overview/OverviewAMC';
import { TotalWareHouseCount } from 'src/sections/dashboard/overview/TotalWareHouseCount';
import { TotalCost } from 'src/sections/dashboard/overview/TotalCost';
import { TotalPO } from 'src/sections/dashboard/overview/TotalPO';
import { TotalSO } from 'src/sections/dashboard/overview/TotalSO';
import { TotalQuotation } from 'src/sections/dashboard/overview/TotalQuotation';
import IconWithPopup from '../../sections/dashboard/user/user-icon';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from 'src/config';




const userId = parseInt(sessionStorage.getItem('user')|| localStorage.getItem('user'))

const now = new Date();

const Page = () => {
  const [inventoryCount, setInventoryCount] = useState(0);
  const [wareHouseCount, setWarehouseCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [so, setSo] = useState(0);
  const [po, setPo] = useState(0);
  const [quotation, setQuotation] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [tasks2, setTasks2] = useState([]);




  const settings = useSettings();

  usePageView();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(apiUrl + `getInventoryCount/${userId}`);
        setInventoryCount(response1.data);
  
        const response2 = await axios.get(apiUrl + `getWarehouseCount/${userId}`);
        setWarehouseCount(response2.data);

        const response3 = await axios.get(apiUrl + `getTotalCost/${userId}`);
        setTotal(response3.data);

        const response4 = await axios.get(apiUrl + `getSalesOrderBasedOnStatus/${userId}/Open`);
        setSo(response4.data);

        const response5 = await axios.get(apiUrl + `getPurchaseOrderBasedOnStatus/${userId}/Open`);
        setPo(response5.data);

        const response6 = await axios.get(apiUrl + `getQuotationBasedOnStatus/${userId}/Open`);
        setQuotation(response6.data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await axios.get(apiUrl + `getAllTodaysTask/${userId}`);
        console.log(response.data);
  
        let combinedList = [
          ...response.data.poList.map(obj => ({ ...obj, category: "poList" })),
          ...response.data.soList.map(obj => ({ ...obj, category: "soList" }))
        ];

        let combinedList2 =[
          ...response.data.woList.map(obj => ({ ...obj, category: "woList" }))
        ];
 
  
        setTasks(combinedList);
        setTasks2(combinedList2)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchData();
  }, []);




  
console.log(tasks2)


  return (
    <>
      <Seo title="Dashboard: Overview" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}
            sx={{mt:2}}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
                
              >
                <div>
                  <Typography variant="h4">
                    Overview
                  </Typography>
                </div>
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                       <IconWithPopup/>
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalInventoryCount amount={inventoryCount} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalWareHouseCount amount={wareHouseCount} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalCost amount={total.toLocaleString("en-IN")} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalQuotation amount={quotation} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalSO amount={so} />
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TotalPO amount={po} />
            </Grid>
          
          
           
           
            <Grid
              xs={12}
              md={6}
            >
              <OverviewTask
                messages={tasks}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <OverviewAMC
                messages={tasks2}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Page;
