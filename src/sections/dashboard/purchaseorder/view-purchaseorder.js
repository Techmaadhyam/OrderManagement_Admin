import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Link,
  SvgIcon,
  Grid
} from '@mui/material';

import './purchase-order.css'
import {  Box } from '@mui/system';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import {  useState } from 'react';
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








export const ViewPurchaseOrder = (props) => {
  const location = useLocation();
  const state = location.state;


  const columns = [

    {
      title: 'Part Description',
      dataIndex: 'description',
      key: 'description',
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
  
  ]

  const [tempuser, setTempuser] =useState([])
  const [rowData, setRowData] =useState()


  const align = 'horizontal' 
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${state?.tempUserId || state?.purchaseOrderRec?.tempUserId || state?.userId}`)
      .then(response => {
       setTempuser(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.tempUserId, state?.purchaseOrderRec?.tempUserId, state?.userId]);

  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllPurchaseOrderDetails/${state?.id || state?.purchaseOrderRec?.id}`)
      .then(response => {
       setRowData(response.data)

      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.purchaseOrderRec?.id]);


  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.purchaseorder.view}
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
             Back To <span style={{color: `${primaryColor}` , fontWeight: 600}}>Purchase Order List</span> 
          </Typography>
        </Link>
        <IconWithPopup/>
      </div>
 <h2>Purchase Order</h2>
      <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Product Order Detail" />
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
          label="Purchase Order Number"
          value={String(state?.id || state?.purchaseOrderRec?.id)}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Quotation"
          value={state?.quotation || state?.purchaseOrderRec?.quotation}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="DeliveryDate"
          value={state?.deliveryDate || state?.purchaseOrderRec?.deliveryDate}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact Name"
          value={state?.contactPerson || state?.purchaseOrderRec?.contactPerson}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact No"
          value={state?.contactPhone || state?.purchaseOrderRec?.contactPhone}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Status"
          value={state?.status || state?.purchaseOrderRec?.status}
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
             
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : {state?.totalAmount || state?.purchaseOrderRec?.totalAmount }</Typography>
            </Grid>
            <Grid
          
            
              style={{marginTop: "20px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions : {state?.termsAndCondition || state?.purchaseOrderRec?.termsAndCondition}</Typography>

            </Grid>
            <Grid
             
 
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Comments: {state?.comments || state?.purchaseOrderRec?.comments}</Typography>

            </Grid>
        <Divider/>
      </Card>
    </div>
  );
};

ViewPurchaseOrder.propTypes = {
  customer: PropTypes.object.isRequired
};
