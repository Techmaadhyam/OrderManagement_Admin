import PropTypes, { string } from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link
} from '@mui/material';
import { Table } from 'antd';
import './sales-order.css'
import { Box, border } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import DownloadIcon from '@mui/icons-material/Download';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const userId = sessionStorage.getItem('user');
const SalesOrderInvoice = (props) => {
  const [rows, setRows] = useState([{}]);
  const [userData, setUserData]= useState([])
  const [invoiceData, setInvoiceData]= useState([])
  const { customer, ...other } = props;
  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetailByUser/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData?.map((item) => ({ ...item, key: item.id }));
 
    //toast notification from toastify library
const notify = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const handleInvoicePdf = async (record) => {
        try{
              const response = await axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetails/${record.id}`)
                setInvoiceData(response.data);
                console.log(response.data)
                const rowData = response.data.map((product,index) => {
                    return [index+1, product.productName, "-", product.price, product.quantity, product.price*product.quantity, "-", product.price*product.quantity, product.cgst, product.sgst, product.igst, product.price*product.quantity+product.igst]
                    });
                const docDefinition = {
                    pageOrientation: 'landscape',
                    content: [
                        {
                        columns: [
                      { text: `${record.createdByUser.companyName}`, style: 'header', alignment: 'left' },
                      
                      { text: 'ORIGINAL', style: 'header', alignment: 'center' },
                        
                      { text: 'TAX INVOICE', style: 'header', alignment: 'right' },
                        ]},
                        { text: `${record.createdByUser.address}, ${record.createdByUser.city}, ${record.createdByUser.pincode}, ${record.createdByUser.state}, ${record.createdByUser.country}`, style: 'subheader', alignment: 'left', margin: [0, 0, 450, 10] },
                      { text: 'GSTIN: 24AAGFT5872R1ZC', style: 'subheader', alignment: 'left' },
                      { text: 'PAN: AAGFT5872R', style: 'subheader', alignment: 'left' },
                      {
                        style: 'newTable',
                        margin: [380,0,0,0],
                        table: {
                          widths: ['*', '*', 'auto', 'auto'],
                          body: [
                            [
                              { text: 'Invoice Number:', style: 'tableLabel', border: [true, true, true, false]},
                              { text: 'Invoice Date:', style: 'tableLabel', border: [true, true, true, false]},
                              { text: 'Customer ID:', style: 'tableLabel', border: [true, true, true, false] },
                              { text: 'Phone No.:', style: 'tableLabel', border: [true, true, true, false] },
                            ],
                            [
                              { text: record.id, style: 'tableCell',border: [true, false, true, false] },
                              { text: record.createdByUser.createdDate, style: 'tableCell', border: [true, false, true, false] },
                              { text: record.tempUserId, style: 'tableCell',border: [true, false, true, false] },
                              { text: record.contactPhone, style: 'tableCell',border: [true, false, true, false] },
                            ],
                          ],
                        },
                      },
                      {
                        style: 'infoTable',
                        table: {
                          widths: ['*', '*', '*', '*'],
                          body: [
                            [
                              { text: `Bill To: ${record.contactPerson}`, style: 'tableLabel', border: [true, true, true, false]},
                              { text: `Ship To: ${record.contactPerson}`, style: 'tableLabel', border: [true, true, true, false] },
                              { text: 'Delivery Status:', style: 'tableLabel' },
                              { text: 'Payment Mode:', style: 'tableLabel' },
                            ],
                            [
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell', border: [true, false, true, false] },
                              { text: `${record.status}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.paymentMode}`, style: 'tableCell',border: [true, false, true, false] },
                            ],
                          ],
                        },
                      },
                      {
                        style: 'table',
                        table: {
                            heights:['auto', 150],
                            widths: ['auto',300,'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
                          body: [
                            
                            ['S.No.','Item Code/product Description', 'HSN/SAC Code', 'Unit Price', 'Qty', 'Total before Discount', 'Discount', 'Total', 'CGST', 'SGST', 'IGST', 'Line Total'],
                            ...rowData,
                          ],
                        },
                      },
                      {
                        table: {
                          widths: ['*','*'],
                          body: [
                            [
                                  { text: 'REMARKS', alignment: 'left', style: 'tableLabel',  border: [true, false, false, true] },
                                
                                {
                                    stack:[
                                        { text: `Total: ${record.totalAmount}`, alignment: 'right', style: 'tableLabel'},
                                        { text: `Total: ${record.totalAmount}`, alignment: 'right', style: 'tableLabel'},
                                    ],
                                    border: [false, false, true, true] 
                                }
                            ],
                            
                          ],
                        },
                      },
                      
                    ],
                    styles: {
                        header: {
                          fontSize: 18,
                          bold: true,
                          margin: [0, 0, 0, 10],
                        },
                        subheader: {
                            fontSize: 16,
                            bold: true,
                            marginBottom: 10,
                            },
                        tableLabel: {
                          bold: true,
                          border: [false, false, false, true],
                        },
                        tableCell: {
                          fillColor: '#ffffff',
                        },
                        tableHeader: {
                          fillColor: '#eeeeee',
                          bold: true,
                        },
                      },
                     
                    };
              
                  pdfMake.createPdf(docDefinition).download('invoice.pdf');
        }
        catch(error){
            console.log(error)
        }
    }


  const columns = [
    {
      title: 'Sales Order Number',
      dataIndex: 'id',
      key: 'id',
      render: (name) => {
        return (
          <Box
            color="primary"
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
            underline="hover"
          >
            <Typography variant="subtitle2">{name}</Typography>
          </Box>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Name',
      key: 'contactPerson',
      dataIndex: 'contactPerson',
    },
    {
      title: 'Delivery Date',
      key: 'deliveryDate',
      dataIndex: 'deliveryDate',
    },
    {
      title: 'Created Date',
      key: 'createdDate',
      dataIndex: 'createdDate',
    },
    {
      title: 'Last Modified Date',
      key: 'lastModifiedDate',
      dataIndex: 'lastModifiedDate',
    },
    {
        title: 'Download Invoice',
      dataIndex: 'actionEdit',
      key: 'actionEdit',
      render: (_, record) => (
        <IconButton onClick={() => handleInvoicePdf(record)}>
          <Icon>
            <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ minWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Sales Order Invoice</h2>
        <IconWithPopup/>
      </div>
      <Box sx={{ position: 'relative', overflowX: '*' }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: '*' }}
            columns={columns}
            dataSource={dataWithKeys}
            ></Table>
            </Scrollbar>
            <ToastContainer
                     position="top-right"
                     autoClose={2000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"/>
          </Box>
        </div>
      );
    };
    
    export default SalesOrderInvoice;