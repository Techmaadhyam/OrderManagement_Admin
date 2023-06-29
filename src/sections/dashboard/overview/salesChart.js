import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Grid,
  CardHeader,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  TextField
} from "@mui/material";
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { apiUrl } from "src/config";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const userId = parseInt(
  sessionStorage.getItem("user") || localStorage.getItem("user")
);



ChartJS.register(ArcElement, Tooltip, Legend);


const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear().toString();

export const SalesChart = (props) => {

    const [list, setList] = useState({});
 const [selectedDate, setSelectedDate] = useState(
   dayjs(`${currentMonth} ${currentYear}`)
 );

 const handleDateChange = (date) => {
   setSelectedDate(date);
   const monthYear = date?.format("MMMM/YYYY").toLowerCase();
   const [month, year] = monthYear.split("/");

   axios
     .get(
       apiUrl +
         `groupByBasedOnStatus/${userId}/${
           month || currentMonth?.toLowerCase()
         }/${year || currentYear}`
     )
     .then((response) => {
       setList(response.data);
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
 };

 useEffect(() => {
   axios
     .get(
       apiUrl +
         `groupByBasedOnStatus/${userId}/${currentMonth?.toLowerCase()}/${currentYear}`
     )
     .then((response) => {
       setList(response.data);
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
 }, [currentYear, currentMonth]);

    const soListObject = {
      delivered: 0,
      cancelled: 0,
      waitingForApproval: 0,
      draft: 0,
      approved: 0,
    };

    list?.soList?.forEach(([count, status]) => {
      if (status === "Delivered") {
        soListObject.delivered = count;
      } else if (status === "Cancelled") {
        soListObject.cancelled = count;
      } else if (status === "Waiting for Approval") {
        soListObject.waitingForApproval = count;
      } else if (status === "Draft") {
        soListObject.draft = count;
      } else if (status === "Approved") {
        soListObject.approved = count;
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
          soListObject?.cancelled,
          soListObject?.approved,
          soListObject?.waitingForApproval,
          soListObject?.delivered,
          soListObject?.draft,
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
        title="Sales Order Status"
        subheader="Based on the selected period"
        action={
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  variant="filled"
                  label={"Month and Year"}
                  views={["month", "year"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{ width: "150px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {/* <TextField
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
            </FormControl> */}
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
                borderLeft: "7px solid #ffcb88",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Draft: {soListObject?.draft}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #92ff88",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Delivered: {soListObject?.delivered}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #fff959",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Approved: {soListObject?.approved}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #acacac",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Waiting for Approval: {soListObject?.waitingForApproval}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                borderLeft: "7px solid #ff625a",
                paddingLeft: 2,
                marginTop: 1,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2">
                Cancelled: {soListObject?.cancelled}
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


