import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { DatePicker } from 'antd';
import { wait } from 'src/utils/wait';
import './inventory.css'
import { Box } from '@mui/system';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const userId = sessionStorage.getItem('user');

const userOptions = [
  {
    label: 'None',
    value: 'none'
  },
  {
    label: 'Others',
    value: 'others'
  },
  
];
export const CreateInventory = (props) => {
  const { customer, ...other } = props;
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
//warehouse
  const [warehouse, setWarehouse]= useState()
  const [warehouseId, setWarehouseId]=useState()
  //purchase order
  const [purchaseOrder, setPurchaseOrder]=useState()
  const [purchaseId, setPurchaseId]=useState()
  //category
  const [category, setCategory]=useState()
  const [categoryName, setCategoryName]=useState()
  const [categoryId, setCategoryId]=useState()

  //product name
  const [selectedName, setSelectedName]= useState()
  const [selectedId, setSelectedId] = useState();
  const [product, setProduct]=useState([])
  //remaining form states

  const [hsnCode, setHsnCode] = useState('');
  const [size, setSize] = useState("");
  const [rack,  setRack]= useState('')
  const [weight, setWeight] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost,setCost] = useState('')
  const [sgst, setSgst] = useState('');
  const [igst, setIgst] = useState('');
  const [cgst, setCgst] = useState('');
  const [description, setDescription] = useState('');

  const [rackName, setRackName] =useState('')
  const [rackDesc, setRackDesc] =useState('')

  const [userData, setUserData]= useState([])

  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  //get warehouse data
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllWareHouse/${userId}`)
      .then(response => {

        setWarehouse(response.data)
        console.log(response.data)

      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  //get purchase order
   
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllPurchaseOrderByUser/${userId}`)
      .then(response => {

        setPurchaseOrder(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
//get category
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllCategorys/${userId}`)
      .then(response => {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //get Product
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllItem/${userId}`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //  get date
 useEffect(() => {
  const today = new Date();
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('IN', options);
  setCreatedDate(formattedDate);
}, []);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    switch (name) {
    
        case 'hsncode':
          setHsnCode(value);
            break;
        case 'rack':
        setRack(value);
          break;
        case 'size':
          setSize(value);
          break;
        case 'weight':
          setWeight(value);
          break;
        case 'quantity':
          setQuantity(value);
          break;
        case 'cost':
          setCost(value);
          break;
        case 'cgst':
          setCgst(value);
          break;
      case 'sgst':
        setSgst(value);
          break;
      case 'igst':
        setIgst(value);
          break;
      case 'description':
        setDescription(value);
          break;
      default:
        break;
    }
  };

  //handle rack change
  const handleCategoryChange = (event) => {

    const selectedCategory = event.target.value;

    setRack(selectedCategory)

    if (selectedCategory && selectedCategory !== 'none' && selectedCategory !== 'other' && isNaN(Number(selectedCategory))) {
      setShowAdditionalFields(true);

    } else {
      setShowAdditionalFields(false);
    }
  };

  const handleRack = (event) => {
    setRackName(event.target.value);
  };
  const handleRackDesc = (event) => {
    setRackDesc(event.target.value);
  };

  const mappedOptions = userData.map(({ rackName, rackId}) => ({
    label: rackName,
    value: rackId
  }));

  const updatedUserOptions = userOptions.concat(mappedOptions);
  const handleSave=async ()=>{

    // let inventory ={
    //   productId: selectedId,
    //   purchaseOrderId:purchaseId,
    //   warehouseId:warehouseId,
    //   quantity: parseFloat(quantity),
    //   weight:weight,
    //   size:size,
    //   hsncode:hsnCode,
    //   rack:rack,
    //   cgst: parseFloat(cgst),
    //   igst: parseFloat(igst),
    //   sgst: parseFloat(sgst),
    //   price: parseFloat(cost),
    //   description: description,
    //   createdBy:parseFloat(userId),
    //   createdDate: createdDate,
    //   lastModifiedDate: createdDate
    // }

    let inventory={
      inventory:{
          
        quantity:parseFloat(quantity),
        weight:weight,
        size:size,
        hsncode:hsnCode,
        price:parseFloat(cost),
        description:description,
        createdBy: parseFloat(userId),
        productId: selectedId,
        purchaseOrderId:purchaseId,
        warehouseId:warehouseId,
        sgst:parseFloat(sgst),
        cgst:parseFloat(cgst),
        igst:parseFloat(igst),
        lastModifiedByUser: {id: userId},
      },

      rack:{
            name: rackName,
            description: rackDesc,
            createdBy:parseFloat(userId),
      },

      category:{
          id: categoryId
      }

      
  }
  console.log(JSON.stringify(inventory))

    if (  purchaseId && warehouseId && quantity && weight && size && hsnCode && rack && cost && description && userId) {
      try {
        const response = await fetch('http://13.115.56.48:8080/techmadhyam/addInventory', {
          method: 'POST',
          headers: {
  
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inventory)
        });
        
        if (response.ok) {
          // Redirect to home page upon successful submission
      
         response.json().then(data => {
  
          console.log(data)
          navigate('/dashboard/inventory/viewDetail', { state: data });
        });
        } 
      } catch (error) {
        console.error('API call failed:', error);
      }
    } 
  }



  return (
    <div style={{minWidth: "100%", marginBottom: '1rem' }}>
   <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Create Inventory</h2>
      <IconWithPopup/>
    </div>
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Inventory Detail" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                    fullWidth
                    label="Warehouse"
                    name="warehouse"
                    select
                    value={warehouseId? warehouseId: ''}
                    onChange={(e) => {
                      const selectedOption = warehouse?.find((option) => option.id === e.target.value);
                      setWarehouseId(selectedOption?.id || '');
                  
                    }}
                    style={{ marginBottom: 10 }}
                  >
                    {warehouse?.map((option) => (
                      option.id && (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      )
                    ))}
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                    fullWidth
                    label="Purchase Order"
                    name="purchaseorder"
                    select
                    value={purchaseId? purchaseId: ''}
                    onChange={(e) => {
                      const selectedOption = purchaseOrder?.find((option) => option.id === e.target.value);
                      setPurchaseId(selectedOption?.id || '');
                  
                    }}
                    style={{ marginBottom: 10 }}
                  >
                    {purchaseOrder?.map((option) => (
                      option.id && (
                        <MenuItem key={option.id} value={option.id}>
                          {option.id}
                        </MenuItem>
                      )
                    ))}
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
            <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    select
                    value={categoryName? categoryName: ''}
                    onChange={(e) => {
                      const selectedOption = category?.find((option) => option.name === e.target.value);
                      setCategoryId(selectedOption?.id || '');
                      setCategoryName(e.target.value);
                    }}
                    style={{ marginBottom: 10 }}
                  >
                    {category?.map((option) => (
                      option.name && (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      )
                    ))}
                  </TextField>
            </Grid>
            
            <Grid
              xs={12}
              md={6}
            >
                 <TextField
                  fullWidth
                  label="Product"
                  name="product"
                  select
                  value={selectedId ? selectedId : ''}
                  onChange={(e) => {
                    const selectedProductId = e.target.value;
                    const selectedOption = product.find((option) => option.id === selectedProductId);
                    
                    if (selectedOption) {
                      setSelectedId(selectedOption.id);
                      setSelectedName(selectedOption.productName);

                    } else {
                      setSelectedId(null);
                      setSelectedName('');
                    }
                  }}
                  style={{ marginBottom: 10 }}
                >
                  {product
                    .filter((option) => option.category.id === categoryId)
                    .map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.productName}
                      </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                 <TextField
                    fullWidth
                    label="Rack"
                    name="rack"
                    select
                    value={rack}
                    onChange={(event) => {handleCategoryChange(event)}}
  
        
                  >
                     {updatedUserOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
            </Grid>
            {showAdditionalFields && (
        <>
      <Grid/>
        <Grid
              xs={12}
              md={6}
            >
          <TextField

            fullWidth
            label="Rack Name"
            name="rack name"
            value={rackName}
            onChange={handleRack} 
 
          >
          </TextField>
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField

            fullWidth
            label="Description"
            name="description"
            value={rackDesc}
            onChange={handleRackDesc} 
            multiline
          />
          </Grid>
        </>
      )}
            <Grid
              xs={12}
              md={6}
            >
              <TextField
           
                    fullWidth
                    label="HSN Code"
                    name="hsncode"
                    value={hsnCode}
                    onChange={handleInputChange}
                >
                </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Size"
                name="size"
                value={size}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Weight"
                name="weight"
                value={weight}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type='number'
                value={quantity}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Cost"
                name="cost"
                type='number'
                value={cost}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="CGST"
                name="cgst"
                value={cgst}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="SGST"
                name="sgst"
                value={sgst}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="IGST"
                name="igst"
                value={igst}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px"}}
            > 
                <TextField
                fullWidth
                label= "Description"
                name='description'
                multiline
                rows={4}
                maxRows={6}
                value={description}
                onChange={handleInputChange}
                />
            </Grid>
        </CardContent>
        <Divider/>
      </Card>
    </form>
        <Grid
        xs={12}
        md={6}
            >
            <Box sx={{ mt: 2 }}
                display="flex"
                justifyContent="flex-end"
                >
                    <Button
                    color="primary"
                    variant="contained"
                    align="right"
                    onClick={handleSave}
                    >
                    Save
                    </Button>
            </Box>
          </Grid>
    </div>
  );
};

CreateInventory.propTypes = {
  customer: PropTypes.object.isRequired
};