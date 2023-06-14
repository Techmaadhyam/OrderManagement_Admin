
import {
  Typography,
  IconButton,
  Icon,
  Link,
  MenuItem,
  TextField,
  InputBase
} from '@mui/material';
import { Table } from 'antd';
import './purchase-order.css'
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import Papa from 'papaparse';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const userId = sessionStorage.getItem('user') || localStorage.getItem('user');

const categoryBuySell = [
   
  {
    label: 'Purchase Quotation',
    value: 'Purchase Quotation'
  },
  {
    label: 'Sales Quotation',
    value: 'Sales Quotation'
  },
  {
    label: 'Service Quotation',
    value: 'Service Quotation'
  }
];

const  QuotationDownloadTable = () => {
  const [userData, setUserData]= useState([])
  const [userData1, setUserData1]= useState([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quotationData, setQuotationData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');


  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllQuotations/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
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
      formattedItem.originalDeliveryDate =formattedItem.deliveryDate
      formattedItem.deliveryDate = formatDate(formattedItem.deliveryDate);
    }
  
    return formattedItem;
  });

  const dataWithKeys = formattedArray?.map((item) => ({ ...item, key: item.id }));

  const filteredData = selectedCategory
  ? dataWithKeys.filter((item) => item.category === selectedCategory)
  : dataWithKeys;

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
};

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
 //delete row
  const handleRemoveRow = (id) => async () => {
    try {
      await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteQuotationId/${id}`);
      const updatedRows = userData.filter(item => item.id !== id);
      setUserData(updatedRows);
      notify(
        "success",
        `Sucessfully deleted row with quotation order number: ${id}.`
      );
    } catch (error) {
      console.error('Error deleting row:', error.message);
    }
  };

  const handleNavigation = record => {
    if (record.category === 'Sales Quotation' || record.category === 'Purchase Quotation') {
      navigate('/dashboard/quotation/edit', { state: record });
    } else if (record.category === 'Service Quotation') {
      navigate('/dashboard/quotation/editService', { state: record });
    }
  };
  //company search
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



  //get company name
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

const updatedUser = filteredData?.map((item) => {
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
 
  return companyMatch
});

const handleQuotation = async (record) => {
  console.log(record)
  try {
    const response = await axios.get(`http://13.115.56.48:8080/techmadhyam/getAllQuotationDetails/${record.id}`)
    setQuotationData(response.data);
    const temp = await axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${record.tempUserId}`)
    // console.log(quotationData);
    const rowData = response.data.map((product,index) =>{
      return {
        id: index+1,
        productName: product.productName,
        productDescription: product.description,
        quantity: product.quantity,
        weight: product.weight,
        size: product.size,
        price: product.price,
        cgst: product.cgst,
        sgst: product.sgst,
        igst: product.igst,
        total: ((product.price*product.quantity)+((product.price*product.quantity)*product.cgst/100)+((product.price*product.quantity)*product.sgst/100)+((product.price*product.quantity)*product.igst/100)).toFixed(2),
      }
    })
    const userData = [
      ['Company Name', record.companyName],
      ['User Name', temp.data.firstName + ' ' + temp.data.lastName],
      ['Quotation Number', record.id],
      ['Delivery Date', record.deliveryDate],
      ['Contact Name', record.contactPersonName],
      ['Contact Number', record.contactPhoneNumber],
    ];
    const footerData = [
      ['Total Amount', record.totalAmount],
      ['Terms & Conditions', record.termsAndCondition],
      ['Comments', record.comments],
    ];

    const allData = [
      ...userData.map(row => [row[0], row[1]]), // User data as a 2-column table
      [], // Empty row for separation
      csvHeaders.map(header => header.label), // Column headers for quotation data
      ...rowData.map(product =>
        csvHeaders.map(header => product[header.key])
      ), // Quotation data as a 10-column table
      [], // Empty row for separation
      ...footerData.map(row => [row[0], row[1]]), // Additional data as a 2-column table
    ];

    const csv = Papa.unparse(allData);
    const csvData = new Blob([csv], { type: 'text/csv' });
    // const csvData = new Blob([Papa.unparse(allData)], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvUrl;
    tempLink.setAttribute('download', 'quotation.csv');
    tempLink.click();
    // setCsvData(rowData);
    // console.log(csvData);
  } catch (error) {
    console.log(error);
  }
}
  const csvHeaders = [
    { label: 'S.No.', key: 'id' },
    { label: 'Product Name', key: 'productName' },
    { label: 'Product Description', key: 'productDescription' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Weight', key: 'weight' },
    { label: 'Size', key: 'size' },
    { label: 'Cost', key: 'price' },
    { label: 'CGST', key: 'cgst' },
    { label: 'SGST', key: 'sgst' },
    { label: 'IGST', key: 'igst' },
    { label: 'Total Amount', key: 'total' },
  ]

  const columns = [
    {
      title: 'Quotation Order Number',
      dataIndex: 'id',
      key: 'id',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/quotation/viewDetail`, { state: record });
        };
        
        return (
          <Link
            color="primary"
            onClick={handleNavigation}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
            underline="hover"
          >
            <Typography variant="subtitle1">{name}</Typography>
          </Link>
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
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      dataIndex: 'actionEdit',
      key: 'actionEdit',
       render: (_, record) => (
        <IconButton onClick={() => handleNavigation(record)}>
          <Icon>
            <EditIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
      dataIndex: 'quotation',
      key: 'quotation',
      render: (_, record) => (
        <IconButton  onClick={() => handleQuotation(record)}>
          <Icon>
              <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, row) => (
        <IconButton onClick={handleRemoveRow(row.id)}>
          <Icon>
            <Delete />
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
        <h2>Download Quotation Order</h2>
        <IconWithPopup/>
      </div>
      
      <TextField

      label="Category"
      name="category"
      sx={{ minWidth: 250 }}
      value={selectedCategory}
      onChange={handleCategoryChange}


      select
      >
     <MenuItem value="">All</MenuItem>
        {categoryBuySell.map((option) => (
          <MenuItem key={option.value} 
          value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <Box sx={{  position: 'relative' , overflowX: "auto", marginTop:'30px'}}>
 
           
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto'}}
            columns={columns}
            dataSource={filteredList}
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
    
    export default  QuotationDownloadTable;