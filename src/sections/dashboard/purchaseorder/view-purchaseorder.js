import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Link,
  SvgIcon,
  Grid,
  Button,
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
import { apiUrl } from 'src/config';








export const ViewPurchaseOrder = (props) => {

  const location = useLocation();
  const state = location.state.data || location.state;

  const performaInvoice =location.state.performaInvoice?.file
  const approvedInvoice =location.state.approvedInvoice?.file
  const deliveryChallan =location.state.deliveryChallan?.file
 

  console.log(performaInvoice, approvedInvoice, deliveryChallan )
  console.log(state)



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
  
  ]

  const [tempuser, setTempuser] =useState([])
  const [rowData, setRowData] =useState()

  const [performaInvoiceFile, setPerformaInvoiceFile] = useState(null);
  const [approvedInvoiceFile, setApprovedInvoiceFile] = useState(null);
  const [deliveryChallanFile, setDeliveryChallanFile] = useState(null);


  const align = 'horizontal' 
 
  useEffect(() => {
    axios.get(apiUrl +`getTempUserById/${state?.tempUserId || state?.purchaseOrderRec?.tempUserId || state?.userId}`)
      .then(response => {
       setTempuser(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.tempUserId, state?.purchaseOrderRec?.tempUserId, state?.userId]);

  useEffect(() => {
    axios.get(apiUrl +`getAllPurchaseOrderDetails/${state?.id || state?.purchaseOrderRec?.id}`)
      .then(response => {
        const modifiedData = response.data.map(item => {
          const { quantity, price, cgst, igst, sgst } = item;
          const netAmount = (
            (quantity * price) +
            ((quantity * price) * cgst / 100) +
            ((quantity * price) * igst / 100) +
            ((quantity * price) * sgst / 100)
          ).toFixed(2);
  
          return { ...item, netAmount };
        });
  
        setRowData(modifiedData);
      
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.purchaseOrderRec?.id]);


  // const handlePerfoma = () => {
  //   const blob = new Blob([performaInvoice], { type: 'text/plain' });
  //   const blobURL = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = blobURL;
  //   link.download = performaInvoice?.name;
  //   link.click();
  //   URL.revokeObjectURL(blobURL);
  // };
  // const handleApproved = () => {
  //   const blob = new Blob([approvedInvoice], { type: 'text/plain' });
  //   const blobURL = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = blobURL;
  //   link.download = approvedInvoice?.name;
  //   link.click();
  //   URL.revokeObjectURL(blobURL);
  // };
  // const handleDelivery = () => {
  //   const blob = new Blob([deliveryChallan], { type: 'text/plain' });
  //   const blobURL = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = blobURL;
  //   link.download = deliveryChallan?.name;
  //   link.click();
  //   URL.revokeObjectURL(blobURL);
  // };


  useEffect(() => {
    const getFile = async () => {
      try {
        const fileResponse = await fetch(apiUrl + `getAllFiles/PurchaseOrder/${state?.id || state?.purchaseOrderRec?.id}`);
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          console.log(fileData);
  
          const fileDecodeData = {};
          const fileNamesData = {};
          const fileIdData = {};
  
          fileData.forEach(file => {
            switch (file.fileName) {
              case 'proforma_invoice':
                fileDecodeData.perfoma = file.fileData;
                fileNamesData.perfoma = file.fileName;
                fileIdData.perfoma = file.id;
                break;
              case 'approved_invoice':
                fileDecodeData.approved = file.fileData;
                fileNamesData.approved = file.fileName;
                fileIdData.approved = file.id;
                break;
              case 'delivery_challan':
                fileDecodeData.delivery = file.fileData;
                fileNamesData.delivery = file.fileName;
                fileIdData.delivery = file.id;
                break;
              default:
                break;
            }
          });
  
          handleFileDecode(fileDecodeData, fileNamesData);
        } else {
          console.error('Unable to fetch the file');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    getFile();
  }, [state?.id, state?.purchaseOrderRec?.id]);

  const decodeAndCreateURL = (base64String) => {
    if (!base64String) {
      return null; 
    }
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const handleFileDecode = (fileDecode, fileNames) => {
    const createURL = (base64String, fileName) => {
      const url = decodeAndCreateURL(base64String);
      return { url, fileName };
    };
  
    const perfomaURL = createURL(fileDecode?.perfoma, fileNames?.perfoma);
    const approvedURL = createURL(fileDecode?.approved, fileNames?.approved);
    const deliveryURL = createURL(fileDecode?.delivery, fileNames?.delivery);
  
    setPerformaInvoiceFile(perfomaURL);
    setApprovedInvoiceFile(approvedURL);
    setDeliveryChallanFile(deliveryURL);
  };

  const handlePerfoma = () => {
    if (performaInvoice) {
      const fileURL = URL.createObjectURL(performaInvoice);
      window.open(fileURL, '_blank');
    } else if (performaInvoiceFile && performaInvoiceFile.url) {
      window.open(performaInvoiceFile.url, '_blank');
    }
  };
  const handleApproved = () => {
    if (approvedInvoice) {
      const fileURL = URL.createObjectURL(approvedInvoice);
      window.open(fileURL, '_blank');
    } else if (approvedInvoiceFile && approvedInvoiceFile.url) {
      window.open(approvedInvoiceFile.url, '_blank');
    }
  };
  
  const handleDelivery = () => {
    if (deliveryChallan) {
      const fileURL = URL.createObjectURL(deliveryChallan);
      window.open(fileURL, '_blank');
    } else if (deliveryChallanFile && deliveryChallanFile.url) {
      window.open(deliveryChallanFile.url, '_blank');
    }
  };

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const formattedDate = formatDate(state?.purchaseOrderRec?.deliveryDate);

  console.log(performaInvoiceFile, approvedInvoiceFile, deliveryChallanFile)

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
          {(state?.createdByUser?.firstName || state?.purchaseOrderRec?.createdByUser?.firstName) + ' ' +
   (state?.createdByUser?.lastName || state?.purchaseOrderRec?.createdByUser?.lastName)}
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
          value={String(state?.quotationId || state?.purchaseOrderRec?.quotationId || 0)}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="DeliveryDate"
          value={state?.deliveryDate || formattedDate}
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
        dataSource={rowData?.map(row => ({ ...row, key: row.id }))} >

        </Table>
      </Scrollbar>
    </Box>
     <Grid
             
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Total Amount : {state?.totalAmount || state?.purchaseOrderRec?.totalAmount }</Typography>
            </Grid>
            <Grid
          
            
              style={{marginTop: "20px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Terms &Conditions : {state?.termsAndCondition || state?.purchaseOrderRec?.termsAndCondition}</Typography>

            </Grid>
            <Grid
             
 
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginLeft: '10px', color:'black', fontWeight:"bold"}}>Comments: {state?.comments || state?.purchaseOrderRec?.comments}</Typography>

            </Grid>
       
        <Divider/>
        {performaInvoice || (performaInvoiceFile && performaInvoiceFile?.url) ? (
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={handlePerfoma}
        >
          View Performa Invoice
        </Button>
      ) : null}
      {approvedInvoice || (approvedInvoiceFile && approvedInvoiceFile?.url) ? (
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={handleApproved}
        >
          View Approved Invoice
        </Button>
      ): null}
       {deliveryChallan || (deliveryChallanFile && deliveryChallanFile?.url) ? (
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={handleDelivery}
        >
          View Delivery Challan
        </Button>
      ) : null}
      </Card>
    </div>
  );
};

ViewPurchaseOrder.propTypes = {
  customer: PropTypes.object.isRequired
};
