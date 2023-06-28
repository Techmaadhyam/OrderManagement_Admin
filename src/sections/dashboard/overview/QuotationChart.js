import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
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
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { apiUrl } from "src/config";
import axios from "axios";
import { useTheme } from "@mui/system";

const userId = parseInt(
  sessionStorage.getItem("user") || localStorage.getItem("user")
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const currentMonth = new Date().toLocaleString("default", { month: "long" });
const currentYear = new Date().getFullYear().toString();

export const QuotationChart = (props) => {

  const theme = useTheme();
  
  const [list, setList] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonth.toLowerCase()
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

 
  const chartFontStyle = {
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize,
    },
  };

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

    const quotationListObject = {
      delivered: 0,
      cancelled: 0,
      waitingForApproval: 0,
      draft: 0,
      approved: 0,
    };

    list?.quotationList?.forEach(([count, status]) => {
      if (status === "Delivered") {
        quotationListObject.delivered = count;
      } else if (status === "Cancelled") {
        quotationListObject.cancelled = count;
      } else if (status === "Waiting for Approval") {
        quotationListObject.waitingForApproval = count;
      } else if (status === "Draft") {
        quotationListObject.draft = count;
      } else if (status === "Approved") {
        quotationListObject.approved = count;
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
          quotationListObject?.cancelled,
          quotationListObject?.approved,
          quotationListObject?.waitingForApproval,
          quotationListObject?.delivered,
          quotationListObject?.draft,
        ],
        backgroundColor: [
          "#f88c87",
          "#f9f585",
          "#bfbfbf",
          "#b9ffb3",
          "#ffdeb3",
        ],
        borderColor: ["#f22f24", "#ede60e", "#9c9c9c", "#8fff85", "#ffca85"],
        borderWidth: 2,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
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
    indexAxis: "x",
    barPercentage: 0.4,
    scales: {
      y: {
        max: maxDataValue + padding,
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
          font: {
            family: theme.typography.fontFamily,
            size: theme.typography.fontSize - 2,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
            size: theme.typography.fontSize - 2,
          },
        },
      },
    },
  };


  return (
    <Card>
      <CardHeader
        title="Quotation Status"
        action={
          <>
            <TextField
              id="filled-basic"
              label="Year"
              variant="filled"
              placeholder="YYYY"
              value={selectedYear}
              onChange={handleYear}
              sx={{ width: 100, mr: 3, mb: 1 }}
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
        <Grid item xs={12} sm={3}>
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
                Draft: {quotationListObject?.draft}
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
                Delivered: {quotationListObject?.delivered}
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
                Approved: {quotationListObject?.approved}
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
                Waiting for Approval: {quotationListObject?.waitingForApproval}
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
                Cancelled: {quotationListObject?.cancelled}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9}>
          <div style={{ width: "100%" }}>
            <Bar data={data} options={chartOptions} height={100} />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

