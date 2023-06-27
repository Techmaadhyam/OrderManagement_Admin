import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography, Grid,CardHeader ,TextField, MenuItem, FormControl, InputLabel, Select} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { apiUrl } from "src/config";
import axios from "axios";

const userId = parseInt(
  sessionStorage.getItem("user") || localStorage.getItem("user")
);

ChartJS.register(ArcElement, Tooltip, Legend);

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear().toString();

export const PurchaseChart = (props) => {

    const [list, setList] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(
      currentMonth.toLowerCase()
  );
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleChange = (event) => {
      setSelectedMonth(event.target.value);
  };
    const handleYear = (event) => {
      setSelectedYear(event.target.value);
    };
  
      useEffect(() => {
        axios
          .get(
            apiUrl +
              `groupByBasedOnStatus/${userId}/${selectedMonth}/${selectedYear}`
          )
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, [selectedMonth, selectedYear]);
  
    const poListObject = {
      delivered: 0,
      cancelled: 0,
      waitingForApproval: 0,
      draft: 0,
      approved: 0,
    };

    list?.poList?.forEach(([count, status]) => {
      if (status === "Delivered") {
        poListObject.delivered = count;
      } else if (status === "Cancelled") {
        poListObject.cancelled = count;
      } else if (status === "Waiting for Approval") {
        poListObject.waitingForApproval = count;
      } else if (status === "Draft") {
        poListObject.draft = count;
      } else if (status === "Approved") {
        poListObject.approved = count;
      }
    });

  const data = {
    labels: [
      "Cancelled",
      "Approved",
      "Waiting for approval",
      "Delivered",
      "Draft",
    ],
    datasets: [
      {
        data: [
          poListObject?.cancelled,
          poListObject?.approved,
          poListObject?.waitingForApproval,
          poListObject?.delivered,
          poListObject?.draft,
        ],
        backgroundColor: [
          "#f88c87",
          "#f9f585",
          "#bfbfbf",
          "#b9ffb3",
          "#ffdeb3",
        ],
        borderColor: ["#f22f24", "#ede60e", "#9c9c9c", "#8fff85", "#ffca85"],
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
      <CardHeader
        title="Purchase Order Status"
        action={
          <>
            <TextField
              id="filled-basic"
              label="Year"
              variant="filled"
              placeholder="YYYY"
              value={selectedYear}
              onChange={handleYear}
              sx={{ width: 100, mr: 2, mb: 1 }}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedMonth}
                onChange={handleChange}
                label="Month"
              >
                <MenuItem value="january">January</MenuItem>
                <MenuItem value="february">February</MenuItem>
                <MenuItem value="march">March</MenuItem>
                <MenuItem value="april">April</MenuItem>
                <MenuItem value="may">May</MenuItem>
                <MenuItem value="june">June</MenuItem>
                <MenuItem value="july">July</MenuItem>
                <MenuItem value="august">August</MenuItem>
                <MenuItem value="september">September</MenuItem>
                <MenuItem value="october">October</MenuItem>
                <MenuItem value="november">November</MenuItem>
                <MenuItem value="december">December</MenuItem>
              </Select>
            </FormControl>
          </>
        }
      />
      <Divider />
      <Grid container spacing={5} padding={2}>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={1}>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #ffca85",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Draft: {poListObject?.draft}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #8fff85",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Delivered: {poListObject?.delivered}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #ede60e",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Approved: {poListObject?.approved}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #9c9c9c",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Waiting for Approval: {poListObject?.waitingForApproval}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #f22f24",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Cancelled: {poListObject?.cancelled}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Doughnut data={data} options={chartOptions} />
        </Grid>
      </Grid>
    </Card>
  );;
};


