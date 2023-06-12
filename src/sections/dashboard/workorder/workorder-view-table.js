
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
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const userId = sessionStorage.getItem('user') || localStorage.getItem('user');


const WorkOrderViewTable = () => {
  const [userData, setUserData]= useState([])


  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');


  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllWorkOrders/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const updatedData = userData?.map((item) => {
    return {
      ...item,
      companyName: item.noncompany.companyName
    };
  });

  const dataWithKeys = updatedData?.map((item) => ({ ...item, key: item.id }));


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
      await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteWorkOrderById/${id}`);
      const updatedRows = userData.filter(item => item.id !== id);
      setUserData(updatedRows);
      notify(
        "success",
        `Sucessfully deleted row with work order number: ${id}.`
      );
    } catch (error) {
      console.error('Error deleting row:', error.message);
    }
  };

  const handleNavigation = record => {

    navigate('/dashboard/workorder/edit', { state: record });
 
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

  
const filteredList = dataWithKeys.filter(product => {
  const companyMatch = product.companyName?.toLowerCase().includes(searchText.toLowerCase());
 
  return companyMatch
});

console.log(filteredList)

  const columns = [
    {
      title: 'Work Order Number',
      dataIndex: 'id',
      key: 'id',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/workorder/viewDetail`, { state: record });
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
        <h2>View Work Order</h2>
        <IconWithPopup/>
      </div>
      
    
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
    
    export default  WorkOrderViewTable;