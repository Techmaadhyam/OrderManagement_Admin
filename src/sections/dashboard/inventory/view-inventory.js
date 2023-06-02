
import {
  Typography,
  IconButton,
  Icon,
  Link,
  InputBase,
  TextField,
  MenuItem
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

  //get userid 
  const userId = sessionStorage.getItem('user');

  const typeDropdown = [
    {
      label: 'Parts',
      value: 'Parts'
    },
    {
      label: 'Spare Parts',
      value: 'Spare Parts'
    },
    
  ];

const ViewInventory = () => {

  const [userData, setUserData]= useState([])
  //product
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  //warehouse
  const [isSearchingWarehouse, setIsSearchingWarehouse] = useState(false);
  const [warehouseText, setWarehouseText] = useState('');
  //category
  const [isSearchingCategory, setIsSearchingCategory] = useState(false);
  const [categoryText, setCategoryText] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');




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

  const filteredData = selectedCategory
  ? dataWithKeys.filter((item) => item.productType === selectedCategory)
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

const handleRemoveRow = (id) => async () => {
  try {
    await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteInventoryById/${id}`);
    const updatedRows = userData.filter(item => item.inventoryId  !== id);
    setUserData(updatedRows);
    notify(
      "success",
      `Sucessfully deleted inventory row.`
    );
  } catch (error) {
    console.error('Error deleting row:', error.message);
  }
};

const handleNavigation = record => {
  navigate('/dashboard/inventory/edit', { state: record });
};

//product search
const handleProductClick = () => {
  setIsSearching(true);
};

const handleProductInputChange = event => {
  setSearchText(event.target.value);
};

const handleProductCancel = () => {
  setIsSearching(false);
  setSearchText('');
};
//warehouse search
const handleWarehouseClick = () => {
  setIsSearchingWarehouse(true);
};

const handleWarehouseInputChange = event => {
  setWarehouseText(event.target.value);
};

const handleWarehouseCancel = () => {
  setIsSearchingWarehouse(false);
  setWarehouseText('');
};

//category search
const handleCategoryClick = () => {
  setIsSearchingCategory(true);
};

const handleCategoryInputChange = event => {
  setCategoryText(event.target.value);
};

const handleCategoryCancel = () => {
  setIsSearchingCategory(false);
  setCategoryText('');
};

const filteredProducts = filteredData.filter(product => {
  const productNameMatch = product.productName.toLowerCase().includes(searchText.toLowerCase());
  const warehouseNameMatch = product.warehouseName.toLowerCase().includes(warehouseText.toLowerCase());
  const categoryNameMatch = product.categoryName.toLowerCase().includes(categoryText.toLowerCase());

  return (
    (searchText === '' || productNameMatch) &&
    (warehouseText === '' || warehouseNameMatch) &&
    (categoryText === '' || categoryNameMatch)
  );
});
 

  const columns = [
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSearching ? (
            <>
              <Typography variant="subtitle1">Part & Spare Part Name</Typography>
              <IconButton onClick={handleProductClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={searchText}
                onChange={handleProductInputChange}
                placeholder="Search Name..."
              />
              <IconButton onClick={handleProductCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
    ),
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
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSearchingWarehouse? (
            <>
              <Typography variant="subtitle1">Warehouse</Typography>
              <IconButton onClick={handleWarehouseClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={warehouseText}
                onChange={handleWarehouseInputChange}
                placeholder="Search Warehouse..."
              />
              <IconButton onClick={handleWarehouseCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
    ),
      key: 'warehouseName',
      dataIndex: 'warehouseName',
    },
    {
      title: 'Available Stock',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Cost',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSearchingCategory ? (
            <>
              <Typography variant="subtitle1">Model</Typography>
              <IconButton onClick={handleCategoryClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={categoryText}
                onChange={handleCategoryInputChange}
                placeholder="Search Category..."
              />
              <IconButton onClick={handleCategoryCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
    ),
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
      <TextField
      label="Type"
      name="type"
      sx={{ minWidth: 250 }}
      value={selectedCategory}
      onChange={handleCategoryChange}
      select
      >
      <MenuItem value="">All</MenuItem>
        {typeDropdown.map((option) => (
          <MenuItem key={option.value} 
          value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ position: 'relative', overflowX: 'auto', marginTop:'30px' }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto' }}
            columns={columns}
            dataSource={filteredProducts}
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