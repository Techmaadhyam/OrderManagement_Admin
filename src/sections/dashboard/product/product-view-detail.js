import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Link,
  SvgIcon,
  IconButton,
  Grid,
  Icon
} from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconWithPopup from '../user/user-icon';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const ViewProductDetail = (props) => {
  const location = useLocation();
  const state = location.state;


  const [currentDate, setCurrentDate] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
  name: state?.productName || state?.name,
  category: state?.category?.name,
  type: state?.type,
  description: state?.category?.description
  });

    //for sending response body via route
    const navigate = useNavigate();

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditFieldChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

   //  get date
 useEffect(() => {
  const today = new Date();
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('IN', options);
  setCurrentDate(formattedDate);
}, []);



  const handleSave = () => {

    const responseBody ={
        name: editedData?.category,
        id: state?.category.id,
        description: editedData?.description,
        lastModifiedDate: currentDate,
      }
      console.log(JSON.stringify(responseBody))
    
    if (editedData?.category && editedData?.description) {
        try {
  
          const response = fetch(`http://13.115.56.48:8080/techmadhyam/addCategory`, {
            method: 'POST',
            headers: {
    
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(responseBody)
          });
   
          if (response.ok || response === 200) {
         
           response.json().then(data => {
           
           });
           navigate(`/dashboard/products`);
          } 
        } catch (error) {
          console.error('API call failed:', error);
        }
      } 
    
    handleEditClose();
  };
 
  const align = 'horizontal' 
  

  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.products.view}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline="none"
        >
          <SvgIcon sx={{ mr: 1, width: 38, height: 38,  transition: 'color 0.5s','&:hover': { color: `${primaryColor}` }}}>
            <ArrowCircleLeftOutlinedIcon/>
          </SvgIcon>
          <Typography variant="subtitle2">
            Back To <span style={{color: `${primaryColor}` , fontWeight: 600}}>Product List</span> 
          </Typography>
        </Link>
        <IconWithPopup/>
      </div>
 <h2>Product</h2>
      <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Product Detail" />
        <PropertyList>
        <PropertyListItem
          align={align}
          label="Name"
        >
          <Typography variant="subtitle2">
           
            <div style={{gap: '30px', display: 'flex'}}>
            {state?.productName || state?.name}
        

          <Dialog open={editOpen} 
          onClose={handleEditClose}>
  <DialogTitle>Update Product</DialogTitle>
  <DialogContent>
  <Grid
            container
            spacing={0}
          >
  
    <Grid
        xs={12}
        md={12}
        >
    <TextField
      label="Category Name"
      value={editedData.category}
      onChange={(e) => handleEditFieldChange('category', e.target.value)}
      fullWidth
      style={{ marginBottom: 20 , marginTop: 10}}
    />
    </Grid>


    <TextField
      label="Description"
      value={editedData.description}
      onChange={(e) => handleEditFieldChange('description', e.target.value)}
      fullWidth
      multiline
      rows={3}
    />
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleEditClose} 
    color="primary">
      Cancel
    </Button>
    <Button onClick={handleSave} 
    color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
            </div>
          </Typography>
          
        </PropertyListItem>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ marginRight: '8px' }}>
    <PropertyListItem align={align} 
    label="Category" 
    value={state?.category?.name} />
  </div>
  <IconButton onClick={handleEditOpen}>
    <Icon>
      <EditIcon />
    </Icon>
  </IconButton>
</div>
<Divider />
        <PropertyListItem
          align={align}
          label="Type"
          value={state?.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Description"
          value={state?.category?.description}
        />
      </PropertyList>
        <Divider/>
      </Card>
    </div>
  );
};

ViewProductDetail.propTypes = {
  customer: PropTypes.object.isRequired
};