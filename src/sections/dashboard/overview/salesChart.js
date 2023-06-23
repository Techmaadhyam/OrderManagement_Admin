import PropTypes from 'prop-types';

import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography, Grid,CardHeader } from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);




export const SalesChart = (props) => {
  const { messages } = props;

  console.log(messages)
  const data = {
    labels: ['Cancelled', 'Approved', 'Waiting for approval', 'Delivered', 'Draft'],
    datasets: [
      {
       
        data: [messages?.cancelled, messages?.approved, messages?.waitingForApproval, messages?.delivered, messages?.draft],
        backgroundColor: [
          '#f88c87',
          '#f9f585',
          '#bfbfbf',
          '#b9ffb3',
          '#ffdeb3',
        ],
        borderColor: [
          '#f22f24',
          '#ede60e',
          '#9c9c9c',
          '#8fff85',
          '#ffca85',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  

  return (
    <Card>
      <CardHeader title="Sales Order Status" />
      <Divider />
      <Grid container spacing={5} padding={2}>
        <Grid item xs={12} sm={6}>
  
          <Grid container direction="column" spacing={1}>
            <Grid item sx={{ borderLeft: '7px solid #ffca85', paddingLeft: 2, marginTop: 1, ml: 2 }}>
              <Typography variant="subtitle2">Draft: {messages?.draft}</Typography>
            </Grid>
            <Grid item sx={{ borderLeft: '7px solid #8fff85', paddingLeft: 2, marginTop: 1, ml: 2 }}>
              <Typography variant="subtitle2">Delivered: {messages?.delivered}</Typography>
            </Grid>
            <Grid item sx={{ borderLeft: '7px solid #ede60e', paddingLeft: 2, marginTop: 1, ml: 2 }}>
              <Typography variant="subtitle2">Approved: {messages?.approved}</Typography>
            </Grid>
            <Grid item sx={{ borderLeft: '7px solid #9c9c9c', paddingLeft: 2, marginTop: 1, ml: 2 }}>
              <Typography variant="subtitle2">Waiting for Approval: {messages?.waitingForApproval}</Typography>
            </Grid>
            <Grid item sx={{  borderLeft: '7px solid #f22f24', paddingLeft: 2, marginTop: 1, ml: 2 }}>
              <Typography variant="subtitle2">Cancelled: {messages?.cancelled}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
       
          <Doughnut data={data} options={chartOptions}  />
        </Grid>
      </Grid>
    </Card>
  );;
};

SalesChart.propTypes = {
  messages: PropTypes.object.isRequired
};
