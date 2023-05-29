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

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

  //get userid 
  const userId = sessionStorage.getItem('user');

const ViewProduct = () => {
  const [rows, setRows] = useState([{}]);
  const [userData, setUserData]= useState([])

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllItem/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.id }));

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
    await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteItemById/${id}`);
    const updatedRows = userData.filter(item => item.id !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted product row.`
    );
  } catch (error) {
    console.error('Error deleting row:', error.message);
  }
}

const handleEditRecord = (record) => {
  setEditRecord(record);
  setPopupVisible(true);
};

const handleSaveRecord = async (editedRecord) => {

  console.log('Saving edited record:', editedRecord);
  console.log(JSON.stringify({

    product: {
      id: editedRecord.id,
      productName: editedRecord.productName,
      type: editedRecord.type,
      createdBy: editedRecord.createdBy,
      lastModifiedDate: currentDate
      
    },
    category: {
      id: editedRecord.category.id,
      name: editedRecord.category.name,
      desccription: editedRecord.category.description,
      lastModifiedDate: currentDate
  
    }
  }))

  if (currentDate) {
    try {
      const response = await fetch('http://13.115.56.48:8080/techmadhyam/addProduct', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          product: {
            id: editedRecord.id,
            productName: editedRecord.productName,
            type: editedRecord.type,
            createdBy: editedRecord.createdBy,
            lastModifiedDate: currentDate,
            lastModifiedByUser: {id: userId},
            
          },
          category: {
            id: editedRecord.category.id
          }

        })
      });
      
      if (response.ok) {
       response.json().then(data => {
        console.log(data);
        window.location.reload()
   
       
});
      } 
    } catch (error) {
      console.error('API call failed:', error);
    }
  } 

};

//Get date
useEffect(() => {
  const today = new Date();
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('IN', options);
  setCurrentDate(formattedDate);
}, []);

 
const columns = [
  {
    title: 'Name',
    dataIndex: 'productName',
    key: 'productName',
    render: (name, record) => {
     
      const handleNavigation = () => {
        navigate(`/dashboard/products/viewDetail`, { state: record });
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
    }
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
    render: (category) => category?.name
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Description',
    key: 'category',
    dataIndex: 'category',
    render: (category) => category?.description
  },
  {
    dataIndex: 'actionEdit',
    key: 'actionEdit',
    render: (_, record) => (
      <Link>
        <IconButton onClick={() => handleEditRecord(record)}>
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
      <IconButton onClick={handleRemoveRow(row.id)}>
        <Icon>
          <Delete />
        </Icon>
      </IconButton>
    ),
  },
];

  const PopupComponent = ({ record, onClose, onSave }) => {
    const [editedRecord, setEditedRecord] = useState(record);

    const handleChange = (event) => {
      const { name, value } = event.target;
    
      if (name === "category") {
        setEditedRecord((prevRecord) => ({
          ...prevRecord,
          category: {
            ...prevRecord.category,
            name: value,
          },
        }));
      } else if (name === "description") {
        setEditedRecord((prevRecord) => ({
          ...prevRecord,
          category: {
            ...prevRecord.category,
            description: value,
          },
        }));
      } else {
        setEditedRecord((prevRecord) => ({
          ...prevRecord,
          [name]: value,
        }));
      }
    };

    const handleSave = () => {
      onSave(editedRecord);
      onClose();
    };

    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <Grid
            container
            spacing={0}
            
          >
              <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Product Name"
            name="productName"
            value={editedRecord.productName}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Category"
            name="category"
            value={editedRecord.category.name}
            style={{ marginBottom: 10 }}
          />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Type"
            name="type"
           
            value={editedRecord.type}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Description"
            name="description"
            value={editedRecord.category.description}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ minWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>View Product</h2>
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
          {isPopupVisible && editRecord && (
        <PopupComponent
          record={editRecord}
          onClose={() => setPopupVisible(false)}
          onSave={handleSaveRecord}
        />
      )}
        </div>
      );
    };
    
    export default ViewProduct;