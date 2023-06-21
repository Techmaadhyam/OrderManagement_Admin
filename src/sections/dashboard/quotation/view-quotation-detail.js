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
    {
      title: 'Net Amount',
      key: 'netAmount',
      dataIndex: 'netAmount',
    },
 
];


const columns2=[
  {
    title: 'Part Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title:'No. Of Workstations',
    dataIndex:'workstationCount',
    key: 'workstationCount',
},
  {
    title: 'Cost',
    dataIndex: 'price',
    key: 'price',
  },
  {
    dataIndex:'igst',
    title:'IGST',
   key: 'igst',
},
{
  title: 'Net Amount',
  key: 'netAmount2',
  dataIndex: 'netAmount2',
},

];




export const ViewQuotationDetail = (props) => {
  const location = useLocation();
  const state = location.state;
console.log(state)

  const [tempuser, setTempuser] =useState([])
  const [rowData, setRowData] =useState()


  const align = 'horizontal' 

  useEffect(() => {

    axios.get(apiUrl +`getTempUserById/${state?.tempUserId || state?.quotation?.tempUserId}`)
      .then(response => {
       setTempuser(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.quotation?.tempUserId, state?.tempUserId]);

  useEffect(() => {
    axios.get(apiUrl +`getAllQuotationDetails/${state?.id || state?.quotation?.id}`)
      .then(response => {
        const modifiedData = response.data.map(item => {
          const { quantity, price, cgst, igst, sgst, workstationCount  } = item;
          const netAmount = (
            (quantity * price) +
            ((quantity * price) * cgst / 100) +
            ((quantity * price) * igst / 100) +
            ((quantity * price) * sgst / 100)
          ).toFixed(2);

          const netAmount2 = (
            ((workstationCount * price) +
            ((workstationCount * price) * igst/ 100)).toFixed(2)
              )
  
          return { ...item, netAmount , netAmount2 };
        });
  
        setRowData(modifiedData);
      
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.quotation?.id]);

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const formattedDate = formatDate(state?.quotation?.deliveryDate);
  const startdate = formatDate(state?.quotation?.startdate);
  const enddate = formatDate(state?.quotation?.enddate);

  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.quotation.view}
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
             Back To <span style={{color: `${primaryColor}` , fontWeight: 600}}>Quotation Order</span> 
          </Typography>
        </Link>
        <IconWithPopup/>
      </div>
 <h2>Quotation Detail</h2>
      <Card style={{marginBottom: "12px" }}>
        <PropertyList>
        <PropertyListItem
          align={align}
          label="User Name"
        >
          <Typography variant="subtitle2">
          {(state?.createdByUser?.firstName || state?.quotation?.createdByUser?.firstName) + ' ' +
   (state?.createdByUser?.lastName || state?.quotation?.createdByUser?.lastName)}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Quotation Order Number"
          value={String(state?.id || state?.quotation?.id)}
        />
        <Divider />
        {state?.category !== "Service Quotation"  &&
        <>
         <PropertyListItem
          align={align}
          label="DeliveryDate"
          value={state?.deliveryDate || formattedDate}
        />
        <Divider />
        </> }
        <PropertyListItem
          align={align}
          label="Contact Name"
          value={state?.contactPersonName|| state?.quotation?.contactPersonName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact No"
          value={state?.contactPhoneNumber || state?.quotation?.contactPhoneNumber}
        />
        <Divider />
        {state?.adminPersonName && (
          <>
            <PropertyListItem
              align={align}
              label="Assignment Start Date"
              value={state?.startdate || startdate}
            />
            <Divider />
            <PropertyListItem
              align={align}
              label="Assignment End Date"
              value={state?.enddate || enddate}
            />  
            <Divider />
            <PropertyListItem
              align={align}
              label="Admin Name"
              value={state?.adminPersonName || state?.quotation?.adminPersonName }
            />
            <Divider />
            <PropertyListItem
              align={align}
              label="Admin Phone"
              value={state?.adminPhoneNumber || state?.quotation?.adminPhoneNumber }
            />
            <Divider />
            <PropertyListItem
              align={align}
              label="Admin Email"
              value={state?.adminEmail || state?.quotation?.adminEmail }
            />
            <Divider />
          </>
        )}
        
        <PropertyListItem
          align={align}
          label="Status"
          value={state?.status || state?.quotation?.status}
        >
        </PropertyListItem>
      </PropertyList>
        <Divider/>
      </Card>
      <Card style={{marginBottom: "40px" }}>
      <Box sx={{  position: 'relative' , overflowX: "auto", marginBottom: '30px'}}>    
      <Scrollbar>
      {!rowData?.some(row => row.workstationCount) && (
      <Table
        sx={{ minWidth: 800, overflowX: "auto" }}
        pagination={false}
        columns={columns}
        dataSource={rowData?.map(row => ({ ...row, key: row.id }))}
      >
      </Table>
    )}
   {rowData?.some(row => row.workstationCount) && (
      <Table
        sx={{ minWidth: 800, overflowX: "auto" }}
        pagination={false}
        columns={columns2}
        dataSource={rowData?.map(row => ({ ...row, key: row.id }))}
      >
      </Table>
      )}
      </Scrollbar>
    </Box>
     <Grid
           
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Total Amount : {state?.totalAmount || state?.quotation?.totalAmount }</Typography>
            </Grid>
            <Grid
       
              style={{marginTop: "20px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Terms &Conditions : {state?.termsAndCondition || state?.quotation?.termsAndCondition}</Typography>

            </Grid>
            <Grid
 
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Comments: {state?.comments || state?.quotation?.comments} </Typography>

            </Grid>
        <Divider/>
      </Card>
    </div>
  );
};

ViewQuotationDetail.propTypes = {
  customer: PropTypes.object.isRequired
};