import PropTypes from 'prop-types';
import {
  Card,
  Divider,
  Typography,
  Link,
  SvgIcon,
  Grid
} from '@mui/material';
import './sales-order.css'
import {  Box } from '@mui/system';
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





const columns = [
  {
    title: 'Part or Spare Part Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
  },
  
  {
    title: 'Cost',
    key: 'price',
    dataIndex: 'price',
  },
    {
      title: 'CGST',
      key: 'cgst',
      dataIndex: 'cgst',
    },
    {
      title: 'SGST',
      key: 'sgst',
      dataIndex: 'sgst',
    },
    {
      title: 'IGST',
      key: 'igst',
      dataIndex: 'igst',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
];




export const ViewSalesOrder = (props) => {
  const location = useLocation();
  const state = location.state;




  const [tempuser, setTempuser] =useState([])
  const [rowData, setRowData] =useState()


  const align = 'horizontal' 

  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${state?.tempUserId || state?.soRecord?.tempUserId || state?.userId}`)
      .then(response => {
       setTempuser(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.tempUserId, state?.soRecord?.tempUserId, state?.userId]);

  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetails/${state?.id || state?.soRecord?.id}`)
      .then(response => {
       setRowData(response.data)
       console.log(response.data)

      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.soRecord?.id]);



  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.orders.details}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline="none"
        >
          <SvgIcon sx={{ mr: 1, width: 38, height: 38,  transition: 'color 0.5s','&:hover': { color: `${primaryColor}` }}}>
            <ArrowCircleLeftOutlinedIcon/>
          </SvgIcon>
          <Typography variant="subtitle2">
             Back To <span style={{color: `${primaryColor}` , fontWeight: 600}}>Sales Order List</span> 
          </Typography>
        </Link>
        <IconWithPopup/>
      </div>
 <h2>Sales Order</h2>
      <Card style={{marginBottom: "12px" }}>
        <PropertyList>
        <PropertyListItem
          align={align}
          label="Username"
        >
          <Typography variant="subtitle2">
          {tempuser.firstName+' '+tempuser.lastName}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Sales Order Number"
          value={state?.id || state?.soRecord?.id}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Quotation"
          value={state?.quotation || state?.soRecord?.quotation}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="DeliveryDate"
          value={state?.deliveryDate || state?.soRecord?.deliveryDate}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact Name"
          value={state?.contactPerson || state?.soRecord?.contactPerson}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact No"
          value={state?.contactPhone || state?.soRecord?.contactPhone}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Status"
          value={state?.status || state?.soRecord?.status}
        >
        </PropertyListItem>
      </PropertyList>
        <Divider/>
      </Card>
      <Card style={{marginBottom: "40px" }}>
      <Box sx={{  position: 'relative' , overflowX: "auto", marginBottom: '30px'}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} 
        pagination={false} 
        columns={columns} 
        dataSource={rowData}></Table>
      </Scrollbar>
    </Box>
     <Grid
              xs={12}
              md={6}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : {state?.totalAmount || state?.soRecord?.totalAmount}</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions : {state?.termsAndCondition || state?.soRecord?.termsAndCondition}</Typography>

            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Comments: {state?.comments  || state?.soRecord?.comments} </Typography>

            </Grid>
        <Divider/>
      </Card>
    </div>
  );
};

ViewSalesOrder.propTypes = {
  customer: PropTypes.object.isRequired
};
