
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
import IconWithPopup from '../user/user-icon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './warehouse.css'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

  //get userid 
  const userId = sessionStorage.getItem('user') || localStorage.getItem('user');

const ViewWarehouse = () => {

  const [userData, setUserData]= useState([])

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllWareHouse/${userId}`)
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
    await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteWareHouseById/${id}`);
    const updatedRows = userData.filter(item => item.id !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted warehouse row.`
    );
  } catch (error) {
    console.error('Error deleting row:', error.message);
  }
};

const handleEditRecord = (record) => {
  setEditRecord(record);
  setPopupVisible(true);
};

const handleSaveRecord = async (editedRecord) => {

  console.log('Saving edited record:', editedRecord);
  console.log(JSON.stringify({

    id: editedRecord.id,
    name: editedRecord.name,
    description: editedRecord.description,
    contactName: editedRecord.contactName,
    address: editedRecord.address,
    zipcode: editedRecord.zipcode,
    city: editedRecord.city,
    state: editedRecord.state,
    country: editedRecord.country,
    createdBy: userId,
    lastModifiedDate: new Date(currentDate),

  }))

  if (currentDate) {
    try {
      const response = await fetch('http://13.115.56.48:8080/techmadhyam/addWareHouse', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          id: editedRecord.id,
          name: editedRecord.name,
          description: editedRecord.description,
          contactName: editedRecord.contactName,
          address: editedRecord.address,
          zipcode: editedRecord.zipcode,
          city: editedRecord.city,
          state: editedRecord.state,
          country: editedRecord.country,
          createdBy: userId,
          lastModifiedDate: new Date(currentDate),

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
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}/${month}/${day}`;
  setCurrentDate(formattedDate);
}, []);

 
const columns = [
  {
    title: 'Warehouse Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => {
      const handleNavigation = () => {
        navigate(`/dashboard/invoices/viewDetail`, { state: record });
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
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
    render: (text, record) => `${text}, ${record.city}, ${record.state}`,
  },
  {
    title: 'Zip Code',
    key: 'zipcode',
    dataIndex: 'zipcode',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
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
      setEditedRecord((prevRecord) => ({
        ...prevRecord,
        [name]: value,
      }));
    };

    const handleSave = () => {
      onSave(editedRecord);
      onClose();
    };

    return (
      <Dialog open={true} 
      onClose={onClose}>
        <DialogTitle>Edit Warehouse</DialogTitle>
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
            label="Name"
            name="name"
            value={editedRecord.name}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Zip Code"
            name="zipcode"
            value={editedRecord.zipcode}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
            </Grid>
           
          <Grid
              xs={12}
              md={6}
            >
           <TextField
            label="Country"
            name="country"
            value={editedRecord.country}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
           <TextField
            label="State"
            name="state"
            value={editedRecord.state}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
            </Grid>
          <Grid
              xs={12}
              md={6}
            >
           <TextField
            label="City"
            name="city"
            value={editedRecord.city}
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
            value={editedRecord.description}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={11}
            >
            <TextField
            label="Address"
            name="address"
            value={editedRecord.address}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} 
          color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} 
          color="primary">
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
        <h2>View Warehouse</h2>
        <IconWithPopup/>
      </div>
      <Box sx={{ position: 'relative', overflowX: 'auto' }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto' }}
            columns={columns}
            dataSource={dataWithKeys}
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
    
    export default ViewWarehouse;