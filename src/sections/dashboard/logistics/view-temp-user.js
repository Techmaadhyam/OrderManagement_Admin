
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link,
  InputBase,
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
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './customer.css'
import { apiUrl } from 'src/config';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';

  //get userid 
const userId = sessionStorage.getItem('user') || localStorage.getItem('user');



const customerType = [
  {
    label: 'Customer',
    value: 'Customer'
  },
  {
    label: 'Vendor',
    value: 'Vendor'
  }
];;


const ViewTemporaryUser = () => {

  const [userData, setUserData]= useState([])

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(apiUrl +`getAllTempUsers/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.id }));


const filteredList = dataWithKeys.filter(product => {
    const companyMatch = product.companyName.toLowerCase().includes(searchText.toLowerCase());
   
    return companyMatch
});

const removeTechnician = filteredList.filter((obj) => obj.type !== 'Technician');

const filteredData = selectedType
? removeTechnician.filter((item) => item.type === selectedType)
: removeTechnician;

const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
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


const handleRemoveRow = (id) => async () => {
  try {
    await axios.delete(apiUrl +`deleteTempUserId/${id}`);
    const updatedRows = userData.filter(item => item.id !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted customer row.`
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

    userName: editedRecord.emailId,
    contactpersonname: editedRecord?.contactpersonname,
    companyName: editedRecord.companyName,
    emailId: editedRecord.emailId,
    mobile: editedRecord.mobile,
    address: editedRecord.address,
    type: editedRecord.type,
    pincode: editedRecord.pincode,
    city: editedRecord.city,
    gstNumber: editedRecord.gstNumber,
    state: editedRecord.state,
    pancard: editedRecord?.pancard,
    country: editedRecord.country,
    createdBy: editedRecord.createdBy,
    lastModifiedDate: new Date(currentDate)
  }))

  if (currentDate) {
    try {
      const response = await fetch(apiUrl +'addTempUser', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          id: editedRecord.id,
          firstName : editedRecord.firstName,
          lastName: editedRecord.lastName,
          userName: editedRecord.emailId,
          companyName: editedRecord.companyName,
          emailId: editedRecord.emailId,
          gstNumber: editedRecord.gstNumber,
          mobile: editedRecord.mobile,
          address: editedRecord.address,
          type: editedRecord.type,
          pincode: editedRecord.pincode,
          city: editedRecord.city,
          state: editedRecord.state,
          country: editedRecord.country,
          pancard: editedRecord?.pancard,
          createdByUser: {id: editedRecord.createdByUser.id},
          lastModifiedDate: new Date(),
          lastModifiedByUser: {id: userId},
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
  const formattedDate = today.toLocaleDateString('en-ZA', options);
  setCurrentDate(formattedDate);
}, []);



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


  
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/logistics/viewDetail`, { state: record });
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
      title:  (
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
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
      render: (text, record) => `${text}, ${record.city}, ${record.state}`,
    },
    {
      title: 'Email',
      key: 'emailId',
      dataIndex: 'emailId',
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
        <DialogTitle>Edit Customer</DialogTitle>
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
            name="userName"
            value={editedRecord.userName}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Email"
            name="emailId"
            value={editedRecord.emailId}
            onChange={handleChange}
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
            select
            value={editedRecord.type}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          >
             {customerType.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))} 
          </TextField>
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="Company"
            name="companyName"
            value={editedRecord.companyName}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField
            label="GST Number"
            name="gstn"
            value={editedRecord.gstNumber}
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
            <TextField
            label="Address"
            name="address"
            value={editedRecord.address}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
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
        <h2>View Customer / Vendor</h2>
        <IconWithPopup/>
      </div>
      <Box sx={{ position: 'relative', overflowX: 'auto' }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto' }}
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
    
    export default ViewTemporaryUser;
