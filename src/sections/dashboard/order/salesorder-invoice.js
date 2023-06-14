import {
  Typography,
  IconButton,
  Icon,
  InputBase,
  TextField,
  MenuItem
} from '@mui/material';
import { Table } from 'antd';
import './sales-order.css'
import { Box, border } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import DownloadIcon from '@mui/icons-material/Download';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import imgUrl from '../pdfAssets/imageDataUrl.js';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
const customerType = [   
  {
    label: 'Distributor',
    value: 'Distributor'
  },
  {
    label: 'Retailer',
    value: 'Retailer'
  },
  {
    label: 'Manufacturer',
    value: 'Manufacturer'
  },
  {
    label: 'Customer',
    value: 'Customer'
  }
];
const userId = sessionStorage.getItem('user') || localStorage.getItem('user');
console.log(userId);
const SalesOrderInvoice = (props) => {

  const [userData, setUserData]= useState([])
  const [invoiceData, setInvoiceData]= useState([])
   const [tempGstNumber, setTempGstNumber] = useState(null)
  const [mainGstNumber, setmainGstNumber] = useState(null)
  const [userMain, setUserMain] = useState(true);
  const [userData1, setUserData1]= useState([])
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');


 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetailByUser/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const numberToWords = require('number-to-words');
    const convertAmountToWords = (amount) => {
    const rupees = Math.floor(amount);
    const paisa = Math.round((amount - rupees) * 100);
  
    const rupeesInWords = numberToWords.toWords(rupees); // Convert rupees to words
    const paisaInWords = numberToWords.toWords(paisa); // Convert paisa to words
  
    let result = '';
  
    if (rupees > 0) {
      result += `${rupeesInWords} rupees`;
    }
  
    if (paisa > 0) {
      if (rupees > 0) {
        result += ' and ';
      }
      result += `${paisaInWords} paisa`;
    }
  
    return result;
  };
  
  // Example usage:
  // const number = 1234.56;
  // const words = convertNumberToWords(number);
  // console.log(words); // Output: "one thousand two hundred thirty-four rupees and fifty-six paisas"


  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const formattedArray = userData?.map((item) => {
    const formattedItem = { ...item }; 
  
    if (formattedItem.createdDate) {
      formattedItem.createdDate = formatDate(formattedItem.createdDate);
    }
  
    if (formattedItem.lastModifiedDate) {
      formattedItem.lastModifiedDate = formatDate(formattedItem.lastModifiedDate);
    }
  
    if (formattedItem.deliveryDate) {
      formattedItem.deliveryDate = formatDate(formattedItem.deliveryDate);
    }
  
    return formattedItem;
  });

const dataWithKeys = formattedArray?.map((item) => ({ ...item, key: item.id }));

const handleCompanyClick = () => {
  setIsSearching(true);
};

const handleCompanyInputChange = event => {
  setSearchText(event.target.value);
};

const handleCompanyCancel = () => {
  setIsSearching(false);
  setSearchText('');
};

useEffect(() => {
  const request1 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllTempUsers/${userId}`);
  const request2 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllUsersBasedOnType/${userId}`);

  Promise.all([request1, request2])
    .then(([response1, response2]) => {
      const tempUsersData = response1.data;
      const usersData1 = response2.data;
      const combinedData = [...tempUsersData, ...usersData1];
      setUserData1(combinedData);
     
    })
    .catch(error => {
      console.error(error);
    });
}, []);

const updatedUser = dataWithKeys?.map((item) => {
  if (item.tempUserId !== 0) {
    const matchedCompany = userData1.find(
      (u) => u.id === item.tempUserId || u.id === item.userId
    );
    if (matchedCompany) {
      return { ...item, companyName: matchedCompany.companyName };
    }
  }
  return item;
});
const filteredList = updatedUser.filter(product => {
  const companyMatch = product.companyName?.toLowerCase().includes(searchText.toLowerCase());
 
  return companyMatch || !product.hasOwnProperty('companyName');
});


console.log(updatedUser)

const filteredData = selectedType
? filteredList.filter((item) => item.type === selectedType)
: filteredList;

const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
};
 

const handleInvoicePdf = async (record ,heading) => {
  console.log(record);
        try{
              const response = await axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetails/${record.id}`)
                setInvoiceData(response.data);
                console.log(response.data)
                 const handleTempGst = async (tempId) =>{
                        try{
                            const tempGst = await axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${tempId}`)
                            setTempGstNumber(tempGst.data.gstNumber);                            
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                        const handleGst = async (Id) =>{
                        try{
                            const Gst = await axios.get(`http://13.115.56.48:8080/techmadhyam/getUserById/${Id}`)
                            setmainGstNumber(Gst.data.gstNumber);
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                    if (record.tempUserId) {
                        setUserMain(false);
                        
                        handleTempGst(record.tempUserId);
                    } else {
                      setUserMain(true);
                        handleGst(record.userId)
                    }
                const rowData = response.data.map((product,index) => {
                 let invent = JSON.parse(product.inventory);
                 let TotalBD = product.price*product.quantity;
                 let TotalAD = TotalBD - product.discountAmount;
                let TotalGST = product.cgst + product.sgst + product.igst;
                let TotalGSTAmount = (TotalAD * TotalGST) / 100;
                    return [index+1, product.productName, invent.hsncode, product.price, product.quantity, TotalBD, product.discountAmount, TotalAD, product.cgst, product.sgst, product.igst, 
                    TotalAD + TotalGSTAmount]
                    });
                const docDefinition = {
                    pageOrientation: 'landscape',
                    content: [
                      {
                        columns: [
                          {
                            image: imgUrl,
                            width: 150,
                            alignment: 'left',
                          },
                          {stack: [
                            {text: `${record.createdByUser.companyName}`, style: 'header'},
                            { text: `${record.createdByUser.address}, ${record.createdByUser.city}, ${record.createdByUser.pincode}, ${record.createdByUser.state}, ${record.createdByUser.country}`, style: 'subheader' },
                      { text: `GSTIN: ${record.createdByUser.gstNumber}`, style: 'subheader'},
                      { text: 'PAN: AAGFT5872R', style: 'subheader'},
                        ],
                        margin: [20, 0, 0, 0],
                      },
                      
                      { text: 'ORIGINAL', style: 'header', alignment: 'center' },
                        
                      { text: heading, style: 'header', alignment: 'right' },
                        ]},
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
                              { text: record.tempUserId || record.userId, style: 'tableCell',border: [true, false, true, false] },
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
                              { text: 'Customer GST Registration information', style: 'tableLabel' },
                              { text: 'Payment Mode:', style: 'tableLabel' },
                            ],
                            [
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell', border: [true, false, true, false] },
                              { text: `${userMain ? mainGstNumber : tempGstNumber}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.paymentMode}`, style: 'tableCell',border: [true, false, true, false] },
                            ],
                          ],
                        },
                      },
                      {
                        style: 'table',
                        table: {
                            heights:['auto', 'auto'],
                            widths: ['auto',200,'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
                          body: [
                            
                            ['S.No.','Item Code/product Description', 'HSN/SAC Code', 'Unit Price', 'Qty', 'Total before Discount', 'Discount', 'Total', 'CGST', 'SGST', 'IGST', 'Line Total'],
                            ...rowData,
                          ],
                        },
                      },
                      {
                        table: {
                          heights:[50],
                          widths: ['*','*'],
                          body: [
                            [
                                  { text: 'REMARKS', alignment: 'left', style: 'tableLabel',  border: [true, false, false, true] },
                                
                                {
                                    stack:[
                                        { text: `Total: ${record.totalAmount}`, alignment: 'right', style: 'tableLabel'},
                                        { text: `Total in words: ${convertAmountToWords(record.totalAmount)}`, alignment: 'right', style: 'tableLabel'},
                                    ],
                                    border: [false, false, true, true] , margin:[0,20,20,0]
                                }
                            ],
                            
                          ],
                        },
                      },
                      {
                        table: {
                          widths: ['*','*','*'],
                          body: [
                            [
                                  {
                                    stack:[
                                        { text: 'Terms & Conditions',bold: true, style: 'tableLabel'},
                                        { text: `${record.termsAndCondition}`, style:'tableLabel'}
                                
                                ],
                                border: [true, false, false, true],margin:[0,20,0,0], alignment:'left'
                            },
                                
                                {
                                    stack:[
                                        { text: `Received In Good Condition`,bold:true, style: 'tableLabel'},
                                        { text: `Customer Signature`, margin:[0,40,0,0], style: 'tableLabel'},
                                    ],
                                    border: [false, false, false, true],margin:[0,20,0,0], alignment:'center'
                                },
                                {
                                    stack:[
                                        { text: `${record.createdByUser.companyName}`,bold:true,alignment:'center', style: 'tableLabel'},
                                        { text: `Authorize Signature`, margin:[0,40,0,0],alignment:'center', style: 'tableLabel'},
                                    ],
                                    border: [false, false, true, true],margin:[0,20,0,0], alignment:'right'
                                },
                            ],
                            
                          ],
                        },
                      },
                      
                    ],
                    styles: {
                        header: {
                          fontSize: 16,
                          bold: true,
                          margin: [0, 0, 0, 5],
                        },
                        subheader: {
                            fontSize: 14,
                            bold: true,
                            marginBottom: 5,
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
const handleChallanPdf = async (record) => {
  console.log(record);
        try{
              const response = await axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetails/${record.id}`)
                setInvoiceData(response.data);
                console.log(response.data)
                 const handleTempGst = async (tempId) =>{
                        try{
                            const tempGst = await axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${tempId}`)
                            setTempGstNumber(tempGst.data.gstNumber);                            
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                        const handleGst = async (Id) =>{
                        try{
                            const Gst = await axios.get(`http://13.115.56.48:8080/techmadhyam/getUserById/${Id}`)
                            setmainGstNumber(Gst.data.gstNumber);
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                    if (record.tempUserId) {
                        setUserMain(false);
                        
                        handleTempGst(record.tempUserId);
                    } else {
                      setUserMain(true);
                        handleGst(record.userId)
                    }
                const rowData = response.data.map((product,index) => {
                //  let invent = JSON.parse(product.inventory);
                    return [index+1, product.productName,'',product.quantity]
                    });
                const docDefinition = {
                    pageOrientation: 'landscape',
                    content: [
                        {
                        columns: [
                          // {
                          //   image: logo,
                          //   width: 100,
                          // },
                      { text: `${record.createdByUser.companyName}`, style: 'header', alignment: 'left' },
                      
                      // { text: 'ORIGINAL', style: 'header', alignment: 'center' },
                        
                      { text: 'DELIVERY CHALLAN', style: 'header', alignment: 'right' },
                        ]},
                        { text: `${record.createdByUser.address}, ${record.createdByUser.city}, ${record.createdByUser.pincode}, ${record.createdByUser.state}, ${record.createdByUser.country}`, style: 'subheader', alignment: 'left', margin: [0, 0, 450, 5] },
                      { text: `GSTIN: ${record.createdByUser.gstNumber}`, style: 'subheader', alignment: 'left' },
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
                              { text: record.tempUserId || record.userId, style: 'tableCell',border: [true, false, true, false] },
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
                              { text: 'Customer GST Registration information', style: 'tableLabel' },
                              { text: 'Payment Mode:', style: 'tableLabel' },
                            ],
                            [
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.deliveryAddress}\n${record.city} - ${record.pinCode}\n${record.state}\n${record.country}`, style: 'tableCell', border: [true, false, true, false] },
                              { text: `${userMain ? mainGstNumber : tempGstNumber}`, style: 'tableCell',border: [true, false, true, false] },
                              { text: `${record.paymentMode}`, style: 'tableCell',border: [true, false, true, false] },
                            ],
                          ],
                        },
                      },
                      {
                        style: 'table',
                        table: {
                            heights:['auto', 'auto'],
                            widths: ['auto',300,300,'*'],
                          body: [
                            ['S.No.','Item Code/product Description','', 'Quantity'],
                            ...rowData,
                          ],
                        },
                      },
                      {
                        table: {
                          heights:[50],
                          widths: ['*'],
                          body: [
                            [
                                  { text: 'NOTE:  Standby Returnable Basis, Kindly share the WO', alignment: 'left', style: 'tableLabel',  border: [true, false, true, true] },
                            ],
                            
                          ],
                        },
                      },
                      {
                        table: {
                          heights:[100],
                          widths: ['*','*','*'],
                          body: [
                            [
                                  {
                                    stack:[
                                        { text: 'Terms & Conditions',bold: true, style: 'tableLabel'},
                                        { text: `${record.termsAndCondition}`, style:'tableLabel'}
                                
                                ],
                                border: [true, false, false, true],margin:[0,20,0,0],alignment:'left'
                            },
                                
                                {
                                    stack:[
                                        { text: `Received In Good Condition`,bold:true, style: 'tableLabel'},
                                        { text: `Customer Signature`, margin:[0,40,0,0], style: 'tableLabel'},
                                    ],
                                    border: [false, false, false, true] ,margin:[0,20,0,0],alignment:'center'
                                },
                                {
                                    stack:[
                                        { text: `For ${record.createdByUser.companyName}`,bold:true, style: 'tableLabel',alignment:'center'},
                                        { text: `Authorize Signature`, margin:[0,40,0,0], style: 'tableLabel',alignment:'center'},
                                    ],
                                    border: [false, false, true, true], margin:[0,20,0,0], alignment:'right'
                                },
                            ],
                            
                          ],
                        },
                      },
                      
                    ],
                    styles: {
                        header: {
                          fontSize: 16,
                          bold: true,
                          margin: [0, 0, 0, 5],
                        },
                        subheader: {
                            fontSize: 14,
                            bold: true,
                            marginBottom: 5,
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
              
                  pdfMake.createPdf(docDefinition).download('deliveryChallan.pdf');
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
            <Typography variant="subtitle1">{name}</Typography>
          </Box>
        );
      },
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSearching ? (
            <>
              <Typography variant="subtitle2">Company Name</Typography>
              <IconButton onClick={handleCompanyClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={searchText}
                onChange={handleCompanyInputChange}
                placeholder="Search company..."
              />
              <IconButton onClick={handleCompanyCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
      ),
      key: 'companyName',
      dataIndex: 'companyName',
    },
    {
      title: 'Order Modified Date',
      key: 'lastModifiedDate',
      dataIndex: 'lastModifiedDate',
    },
     
    {
      title: 'Order Date',
      key: 'createdDate',
      dataIndex: 'createdDate',
    },
    {
      title: 'Delivery Date',
      key: 'deliveryDate',
      dataIndex: 'deliveryDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
  
    {
      title: (
        <TextField

        label="Type"
        name="type"
        sx={{ minWidth: 150 }}
        value={selectedType}
        onChange={handleTypeChange}
  
  
        select
        >
       <MenuItem value="">All</MenuItem>
          {customerType.map((option) => (
            <MenuItem key={option.value} 
            value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ),
      key: 'type',
      dataIndex: 'type',
    },
  
    {
        title: 'Download Invoice',
      dataIndex: 'downloadInvoice',
      key: 'downloadInvoice',
      render: (_, record) => (
        <IconButton onClick={() => handleInvoicePdf(record,"TAX INVOICE")}>
          <Icon>
            <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
        title: 'Download Delivery Challan',
      dataIndex: 'deliveryChallan',
      key: 'deliveryChallan',
      render: (_, record) => (
        <IconButton onClick={() => handleChallanPdf(record)}>
          <Icon>
            <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
        title: 'Download Invoice',
      dataIndex: 'downloadInvoice',
      key: 'downloadInvoice',
      render: (_, record) => (
        <IconButton onClick={() => handleInvoicePdf(record,"PROFORMA INVOICE")}>
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
            dataSource={filteredData}
            rowClassName={() => 'table-data-row'}
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