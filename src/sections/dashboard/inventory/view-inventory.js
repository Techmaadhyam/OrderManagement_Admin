import PropTypes from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link
} from '@mui/material';
import { Table } from 'antd';
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import IconWithPopup from '../user/user-icon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  //get userid 
  const userId = sessionStorage.getItem('user');

const ViewInventory = () => {
  const [rows, setRows] = useState([{}]);
  const [userData, setUserData]= useState([])


  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getInventoryByUserId/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.inventoryId }));

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

const handleRemoveRow = (id) => async () => {
  try {
    await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteInventoryById/${id}`);
    const updatedRows = userData.filter(item => item.inventoryId !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted inventory row.`
    );
  } catch (error) {
    console.error('Error deleting row:', error.message);
  }
};
 
  const columns = [
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/inventory/viewDetail`, { state: record });
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
            <Typography variant="subtitle2">{name}</Typography>
          </Link>
        );
      },
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Cost',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      key: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      title: 'HSN Code',
      key: 'hsncode',
      dataIndex: 'hsncode',
    },
    {
      dataIndex: 'actionEdit',
      key: 'actionEdit',
      render: () => (
        <Link>
          <IconButton>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        </Link>
      ),
    },
    {
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, row) => (
        <IconButton onClick={handleRemoveRow(row.inventoryId)}>
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
        <h2>View Inventory</h2>
        <IconWithPopup/>
      </div>
      <Box sx={{ position: 'relative', overflowX: 'auto' }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto' }}
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
    
    export default ViewInventory;