import PropTypes from 'prop-types';
import {
  Card,
  Divider,
  Typography,
  Link,
  SvgIcon,
  Grid
} from '@mui/material';
import './purchase-order.css'
import {  Box} from '@mui/system';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Scrollbar } from 'src/components/scrollbar';
import { Table } from 'antd';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconWithPopup from '../user/user-icon';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { apiUrl } from 'src/config';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo/logo';



export const ViewAMCDetail = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [tempuser, setTempuser] =useState([])
  const [rowData, setRowData] =useState()


  const align = 'horizontal' 

 
const columns = [
  {
    title: "Part Description",
    dataIndex: "description",
    key: "description",
    render: (name, record) => {
      const handleNavigation = () => {
        navigate(`/dashboard/products/viewDetail/${record.productId}`, {
          state: record,
        });
      };

      return (
        <Link
          color="primary"
          onClick={handleNavigation}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
          underline="hover"
        >
          <Typography variant="subtitle2">{name}</Typography>
        </Link>
      );
    },
  },
  {
    title: "No. Of Workstations",
    dataIndex: "workstationcount",
    key: "workstationcount",
  },
  {
    title: "Cost",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    dataIndex: "igst",
    title: "IGST",
    key: "igst",
  },
  {
    title: "Net Amount",
    key: "netAmount",
    dataIndex: "netAmount",
  },
];


  useEffect(() => {
    axios.get(apiUrl +`getAllWorkOrderItems/${state?.id || state?.workorder?.id}`)
      .then(response => {
        const modifiedData = response.data.map(item => {
          const {  unitPrice,  igst,  workstationcount} = item;
        
          const netAmount =
            parseFloat(workstationcount) * unitPrice +
            (parseFloat(workstationcount) * unitPrice * igst) / 100;

          const discountedAmount =
            netAmount - (netAmount * item.discountpercent) / 100;

          return {
            ...item,
            netAmount: parseFloat(discountedAmount.toFixed(2)),
          };
        });

        const updatedData = modifiedData.map(obj => {
          let product;
          
          try {
            product = obj.product;
            
          } catch (error) {
            console.error("Error parsing inventory JSON for object:", obj, error);
           
          }
  
          return {
            ...obj,
            productId: product?.id,
            productName: product?.productName,
            partnumber: product?.partnumber,
            category: product?.category?.name,

          };
        });
  
        setRowData(updatedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.workorder?.id]);

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const startdate = formatDate(state?.startdate);
  const enddate = formatDate(state?.enddate);

  const totalNetAmount = rowData?.reduce(
    (total, item) => total + parseFloat(item.netAmount),
    0
  );
  


  return (
    <div style={{ minWidth: "100%", marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.services.AMCview}
            sx={{
              alignItems: "center",
              display: "inline-flex",
            }}
            underline="none"
          >
            <SvgIcon
              sx={{
                mr: 1,
                width: 38,
                height: 38,
                transition: "color 0.5s",
                "&:hover": { color: `${primaryColor}` },
              }}
            >
              <ArrowCircleLeftOutlinedIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Back To{" "}
              <span style={{ color: `${primaryColor}`, fontWeight: 600 }}>
                AMC
              </span>
            </Typography>
          </Link>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconWithPopup />
        </div>
      </div>
      <h2>AMC Detail</h2>
      <Card style={{ marginBottom: "12px" }}>
        <PropertyList>
          <PropertyListItem align={align} label="Work Order Number">
            <Typography variant="subtitle2">
              {String(state?.id || state?.workorder?.id)}
            </Typography>
          </PropertyListItem>
          <Divider />
          {state.technicianInfo.userName && (
            <PropertyListItem
              align={align}
              label="Technician"
              value={state?.technicianInfo.userName}
            />
          )}
          <PropertyListItem
            align={align}
            label="Assignment Start Date"
            value={startdate}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Assignment End Date"
            value={enddate}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Incharge Name"
            value={
              state?.contactPersonName || state?.workorder?.contactPersonName
            }
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Incharge Phone"
            value={
              state?.contactPhoneNumber || state?.workorder?.contactPhoneNumber
            }
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Admin Name"
            value={state?.adminPersonName || state?.workorder?.adminPersonName}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Admin Phone"
            value={
              state?.adminPhoneNumber || state?.workorder?.adminPhoneNumber
            }
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Admin Email"
            value={state?.adminEmail || state?.workorder?.adminEmail}
          />
          <Divider />

          <PropertyListItem
            align={align}
            label="Status"
            value={state?.status || state?.workorder?.status}
          ></PropertyListItem>
        </PropertyList>
        <Divider />
      </Card>
      <Card style={{ marginBottom: "40px" }}>
        <Box
          sx={{ position: "relative", overflowX: "auto", marginBottom: "30px" }}
        >
          <Scrollbar>
            {!rowData?.some((row) => row.workstationCount) && (
              <Table
                sx={{ minWidth: 800, overflowX: "auto" }}
                pagination={false}
                columns={columns}
                dataSource={rowData?.map((row) => ({ ...row, key: row.id }))}
              ></Table>
            )}
            {rowData?.some((row) => row.workstationCount) && (
              <Table
                sx={{ minWidth: 800, overflowX: "auto" }}
                pagination={false}
                columns={columns}
                dataSource={rowData?.map((row) => ({ ...row, key: row.id }))}
              ></Table>
            )}
          </Scrollbar>
        </Box>
        <Grid>
          <Typography
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              marginLeft: "10px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Total Amount : ₹{state?.totalAmount || totalNetAmount?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: "20px" }}>
          <Typography
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              marginLeft: "10px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Terms &Conditions :{" "}
            {state?.termsAndCondition || state?.quotation?.termsAndCondition}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: "20px", marginBottom: "30px" }}>
          <Typography
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "14px",
              marginLeft: "10px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Comments: {state?.comments || state?.quotation?.comments}{" "}
          </Typography>
        </Grid>
        <Divider />
      </Card>
    </div>
  );
};

ViewAMCDetail.propTypes = {
  customer: PropTypes.object.isRequired
};