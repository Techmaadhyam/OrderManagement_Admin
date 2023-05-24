import PropTypes from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link
} from '@mui/material';
import { Table } from 'antd';
import './sales-order.css'
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const userId = sessionStorage.getItem('user');
const SalesOrderViewList = () => {
  const [rows, setRows] = useState([{}]);
  const [userData, setUserData]= useState([])


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

const handleRemoveRow = (id) => async () => {
  try {
    await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteSalesOrderId/${id}`);
    const updatedRows = userData.filter(item => item.id !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted row with sales order number: ${id}.`
    );
  } catch (error) {
    console.error('Error deleting row:', error.message);
  }
};

const handleNavigation = record => {
  navigate('/dashboard/orders/edit', { state: record });
};

  const columns = [
    {
      title: 'Sales Order Number',
      dataIndex: 'id',
      key: 'id',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate('/dashboard/orders/viewDetail', { state: record });
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
        <h2>View Sales Order</h2>
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
    
    export default SalesOrderViewList;