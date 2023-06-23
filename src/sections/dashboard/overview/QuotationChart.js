import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography, Grid,CardHeader } from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import {   Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




export const QuotationChart = (props) => {
  const { messages } = props;

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
        borderWidth:2,
        borderRadius: {
          topLeft: 15,
          topRight: 15,
        },
      },
    ],
  };
  
const maxDataValue = Math.max(...data.datasets[0].data);
const padding = 1;

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
 
    },
    indexAxis: 'x',
    barPercentage: 0.4,
    scales: {

      y: {
        
        max: maxDataValue + padding,
        beginAtZero: true,
        ticks: {
          precision: 0, 
          stepSize: 1, 
        },
      },
      x: {
        grid: {
          display: false, 
        },
        
  
      },
    },
  };

  return (
    <Card>
      <CardHeader title="Quotation Status" />
      <Divider />
      <Grid container spacing={5} padding={2}>
      <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={9}>
          <div style={{ width: '100%' }}>
            <Bar data={data} options={chartOptions}  height={100} />
          </div>
    </Grid>
      </Grid>
    </Card>
  );
};

QuotationChart.propTypes = {
  messages: PropTypes.object.isRequired,
};
