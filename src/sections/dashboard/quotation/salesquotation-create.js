import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
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
import './purchase-order.css'
import IconWithPopup from '../user/user-icon';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { primaryColor } from 'src/primaryColor';
import EditIcon from '@mui/icons-material/Edit';
import { Scrollbar } from 'src/components/scrollbar';
import React from 'react';
import { Delete } from '@mui/icons-material';
import './customTable.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'moment-timezone';
import { apiUrl } from 'src/config';




const userId = parseInt(sessionStorage.getItem('user')|| localStorage.getItem('user'))




const userOptions = [
  {
    label: 'Draft',
    value: 'Draft'
  },
  {
    label: 'Waiting for Approval',
    value: 'Waiting for Approval'
  },
  {
    label: 'Cancelled',
    value: 'Cancelled'
  },
  {
    label: 'Approved',
    value: 'Approved'
  },
  {
    label: 'Delivered',
    value: 'Delivered'
  },
 
];

const tableHeader=[
  {
      id:'product_name',
      name:'Part Description',
      width: 200,
      
  },
  {
      id:'quantity',
      name:'Quantity',
      width: 200,
  },
  {
      id:'weight',
      name:'Weight',
      width: 150,
  },
  {
    id:'size',
    name:'Size',
    width: 150,
},
  {
      id:'cost',
      name:'Cost',
      width: 150,
  },
  {
      id:'cgst',
      name:'CGST',
      width: 150,
  },
  {
    id:'sgst',
    name:'SCGST',
    width: 150,
},
  {
    id:'igst',
    name:'IGST',
    width: 150,
},

  {
    id:'amount',
    name:'Net Amount',
    width: 150,
},
  {
      id:'add',
      name:'',
      width: 50,
  },
  {
      id:'delete',
      name:'',
      width: 50,
  }
];

export const QuotationOrderCreateForm = (props) => {


  const [userData, setUserData]= useState([])
  const navigate = useNavigate();
//form state handeling
const [userName, setUserName] = useState('');
const [type, setType] = useState("");
const [deliveryDate, setDeliveryDate] = useState('');
const [status, setStatus] = useState("");
const [contactName,setContactName] = useState('')
const [phone, setPhone] = useState('');
const [address, setAddress] = useState("");
const [tempId, setTempId] = useState();
const [userState, setUserState] = useState();
const [terms, setTerms] = useState('');
const [comment, setComment] = useState('');
const [category, setCategory] = useState('');

const [currentDate, setCurrentDate] = useState('');

//add product state
const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [sgst, setSgst] = useState();
  const [igst, setIgst] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [cgst, setCgst] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState('');
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [userData2, setUserData2] = useState([])
  const [productId, setProductId] = useState()
  const [inventoryId, setInventoryId] = useState()
  const [productDescription, setProductDescription] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);

  // country, state, city API access token
  const [accessToken, setAccessToken] = useState(null);



  //state management for countries,states and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates]= useState([])
  const [cities, setCities]= useState([])
  const [currentCountry, setCurrentCountry]= useState('India')
  const [currentState, setCurrentState]= useState('')
  const [currentCity, setCurrentCity] =useState('')
  const [zipcode, setZipcode]= useState('')
 
  const location = useLocation();


  useEffect(() => {
    // Check the current path and set the state accordingly
    if (location.pathname === '/dashboard/quotation/buy') {
      setCategory('Purchase Quotation');
      setType('Vendor')
    } else if (location.pathname === '/dashboard/quotation/sell') {
      setCategory('Sales Quotation');
      setType('Customer')
    }
  }, [location.pathname]);

  //currentdate
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    const date = moment.tz(formattedDate, 'YYYY/MM/DD', 'Asia/Kolkata');
    const currentIST = date.format('YYYY-MM-DDTHH:mm:ssZ');
    setCurrentDate(currentIST);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
          headers: {
            'Accept': 'application/json',
            'api-token': '8HWETQvEFegKi6tGPUkSWDiQKfW8UdZxPqbzHX6JdShA3YShkrgKuHUbnTMkd11QGkE',
            'user-email': 'mithesh.dev.work@gmail.com'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }
  
        const data = await response.json();
  
        setAccessToken(data.auth_token);
  
      } catch (error) {
        console.error(error);
  
      }
    };
  
    fetchData();
  }, []);
  //fetches country list for dropdown and pushesh it to state which is later mapped 
  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch("https://www.universal-tutorial.com/api/countries/", {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Accept": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, [accessToken]);
  
  //using useeffect to prevent fetch request being called on render
  useEffect(()=>{
    fetchCountries()
  },[fetchCountries])
  
  //mapping countries to MUI select input field
  const userOptionsCountry = useMemo(() => {
    return countries.map(country => ({
      label: country.country_name,
      value: country.country_name
    }));
  }, [countries]);
  
  //mapping states to MUI select input field
  const userOptionsState = useMemo(() => {
    return states.map(state => ({
      label: state.state_name,
      value: state.state_name
    }));
  }, [states]);
  
  //mapping cities to MUI select input field
  const userOptionsCities = useMemo(() => {
    return cities.map(city => ({
      label: city.city_name,
      value: city.city_name
    }));
  }, [cities]);
  
  //fetches states list for dropdown and pushesh it to setStates which is later mapped 
  const handleCountry = async (event) => {
    try {
      setCurrentCountry(event.target.value);
      const response = await fetch(`https://www.universal-tutorial.com/api/states/${event.target.value}`, {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Accept": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  
  //fetches cities list for dropdown and pushesh it to setCities which is later mapped 
  const handleState = async (event) => {
    try {
      setCurrentState(event.target.value);
      const response = await fetch(`https://www.universal-tutorial.com/api/cities/${event.target.value}`, {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Accept": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  
  //sets default country to India and fetches state list for India and is pushed to setStates
  const handleDefaultState = async () => {
  try {;
  if (currentCountry === 'India') {
    const response = await fetch('https://www.universal-tutorial.com/api/states/India', {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Accept": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setStates(data);
  }
  } catch (error) {
  console.error("Error fetching states:", error);
  }
  };
  
  //sets current city value in MUI select field onchange event
  const handleCities = async (event) => {
  setCurrentCity(event.target.value);
  }

 

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

 const handleInputChange = (event) => {
  const { name, value } = event.target;

  switch (name) {
  
      case 'user':
        setUserName(value);
          break;
      case 'contactName':
        setContactName(value);
        break;
      case 'mobileno':
        setPhone(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'status':
        setStatus(value);
        break;
        case 'zipcode':
          setZipcode(value);
          break;
    case 'address':
      setAddress(value);
        break;
    default:
      break;
  }
};
const handleDateChange = (date) => {
  setDeliveryDate(date);
};
   //get temp user
   useEffect(() => {
    axios.get(apiUrl +`getAllTempUsers/${userId}`)
      .then(response => {
        setUserData(prevData => [...prevData, ...response.data]);
     
      })
      .catch(error => {
        console.error(error);
      });
  
    axios.get(apiUrl +`getAllUsersBasedOnType/${userId}`)
      .then(response => {
        setUserData(prevData => [...prevData, ...response.data]);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const deliveryDateAntd = deliveryDate;
  const deliveryDateJS = deliveryDateAntd ? deliveryDateAntd.toDate() : null;
  //const formattedDeliveryDate = deliveryDateJS ? moment(deliveryDateJS).format('YYYY/MM/DD') : '';
  //const date = moment.tz(formattedDeliveryDate, 'YYYY/MM/DD', 'Asia/Kolkata');
  
  const deliveryIST = deliveryDateJS;



  //////////////
  //add product//
  /////////////

  const handleRemoveRow = (idx) => () => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  
    const calculatedTotalAmount = updatedRows.reduce(
      (total, row) =>
        total +
        row.quantity * row.price +
        (row.quantity * row.price * row.cgst) / 100 +
        (row.quantity * row.price * row.igst) / 100 +
        (row.quantity * row.price * row.sgst) / 100,
      0
    );
  
    setTotalAmount(calculatedTotalAmount);
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
    setEditIndex(null);
    clearFormFields();
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains('modal')) {
      toggleForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const selectedOption = userData2.find((option) => option.inventoryId === inventoryId);
  
    if (parseInt(quantity) > selectedOption.quantity) {
      notify(
        "error",
        `Insufficient Quantity in Inventory. Quantity must be below ${selectedOption.quantity}`
      );
      return;
    }
  
    if (
      quantity &&
      price &&
      cgst &&
      productName &&
      sgst &&
      igst &&
      description &&
      weight &&
      size
    ) {
      const newRow = {

        inventory: {id: inventoryId},
        quotationId: null,
        productDescription,
        productId,
        productName,
        weight,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        cgst: parseFloat(cgst),
        description: description,
        createdBy: userId,
        size: size,
        sgst: parseFloat(sgst),
        igst: parseFloat(igst),
        comments: comment,
        createdDate: new Date(),
        lastModifiedDate: new Date(),
      };
  
      let updatedRows;
  
      if (editIndex !== null) {
        updatedRows = [...rows];
        updatedRows[editIndex] = newRow;
        setRows(updatedRows);
      } else {
        updatedRows = [...rows, newRow];
        setRows(updatedRows);
      }
  
      clearFormFields();
      setShowForm(false);
      setEditIndex(null);
  
      const calculatedTotalAmount = updatedRows.reduce(
        (total, row) =>
          total +
          row.quantity * row.price +
          (row.quantity * row.price * row.cgst) / 100 +
          (row.quantity * row.price * row.igst) / 100 +
          (row.quantity * row.price * row.sgst) / 100,
        0
      );
  
      setTotalAmount(calculatedTotalAmount);
    }
  };


  const handleEditRow = (idx, row) => {
    setProductName(row.productName);
    setWeight(row.weight);
    setQuantity(row.quantity);
    setPrice(row.price);
    setCgst(row.cgst);
    setIgst(row.igst)
    setSgst(row.sgst)
    setSize(row.size)
    setDescription(row.productDescription);
    setEditIndex(idx);
    setShowForm(true);
  };
  

  const clearFormFields = () => {
    setProductName('');
    setWeight('');
    setQuantity('');
    setPrice('');
    setCgst('');
    setSize('')
    setIgst('')
    setSgst('')
    setDescription('');
  };

  //
  useEffect(() => {
    axios.get(apiUrl +`getInventoryByUserId/${userId}`)
      .then(response => {
        setUserData2(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


console.log(currentDate, deliveryIST)

  const updatedRows = rows.map(({ productName,productDescription, ...rest }) => rest);
  //post request
  const handleClick = async (event) => {

    let finalAmount = totalAmount.toFixed(2)


    event.preventDefault();
    
      if (contactName && address && userId && phone && status && address  && updatedRows) {
        try {
          const response = await fetch(apiUrl +'addQuoatation', {
            method: 'POST',
            headers: {
    
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              quotation:{
                  tempUserId :tempId,
                  userId: userState,
                  contactPersonName: contactName,
                  contactPhoneNumber: phone,   
                  status: status,
                  type: type,
                  deliveryDate: deliveryIST,
                  createdBy: userId,
                  address: address,
                  city: currentCity,
                  state: currentState,
                  country: currentCountry,
                  pincode: zipcode,
                  createdDate: new Date(),
                  lastModifiedDate: new Date(),
                  comments : comment,
                  category: category,
                  lastModifiedByUser: {id: userId},
                  termsAndCondition: terms,
                  totalAmount: finalAmount,
        
              },
                  quotationDetails: updatedRows
          })
          });
          
          if (response.ok) {
            // Redirect to home page upon successful submission
        
           response.json().then(data => {
    
      
          navigate('/dashboard/quotation/viewDetail', { state: data });
          console.log(data)
    });
          } 
        } catch (error) {
          console.error('API call failed:', error);
        }
      } 
    
    };


  return (
    <div style={{minWidth: "100%" }}>
       <ToastContainer
                     position="top-right"
                     autoClose={4000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"/>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Create Quotation Order</h2>
      <IconWithPopup/>
    </div>
    <form>
      <Card>
        <CardHeader title="Product Order Detail" />
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
                    label="Type"
                    name="type"
                    
                    value={type}
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
                label="HSN Code"
                name="hsncode"
                required
             
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                 <TextField
                fullWidth
                label="Company Name"
                name="user"
                required
                select
                value={userName}
                onChange={(e) => {
                  const selectedOption = userData.find((option) => option.companyName === e.target.value);
                  if (selectedOption) {
                    if (selectedOption.hasOwnProperty('createdByUser')) {
                      setTempId(selectedOption.id || '');
                      setUserState(null)
                    } else {
                      setUserState(selectedOption.id || '');
                      setTempId(null)
                    }
                  }
                  setUserName(e.target.value);
                }}
                style={{ marginBottom: 10 }}
              >
                {userData
              .filter((option) => option.type === type) 
              .map((option) => (
                option.companyName && (
                  <MenuItem key={option.id} 
                  value={option.companyName}>
                    {option.companyName}
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
           
                    value={category}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                <DatePicker placeholder="Delivery Date"
                onChange={handleDateChange}
           
                className="css-dev-only-do-not-override-htwhyh"
                style={{ height: '58px', width: '250px' , color: 'red'}}

height='50px'/>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField

                    fullWidth
                    label="Status"
                    name="status"
                    required
                    value={status}
                    onChange={handleInputChange}
                    select
                  >
                    {userOptions.map((option) => (
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
                fullWidth
                label="Contact Name"
                name="contactName"
                required
                value={contactName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Mobile No."
                name="mobileno"
                required
                value={phone}
                type='number'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Shipping Address"
                multiline
                required
                minRows={3}
                name="address"
                value={address}
                onChange={handleInputChange}   
              />
            </Grid>
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    required
                    select
                    defaultValue=""
                    value={currentCountry}
                    onChange={handleCountry}
                  >
                     {userOptionsCountry?.map((option) => (
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

                    fullWidth
                    label="State"
                    name="state"
                    required
                    select
                    defaultValue=''
                    value={currentState}
                    onChange={handleState}
                    onFocus={handleDefaultState}
                   
                > 
                {userOptionsState?.map((option) => (
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
                    fullWidth
                    label="City"
                    name="city"
                    required
                    select
                    defaultValue=''
                value={currentCity}
                onChange={handleCities}
             
              >
                  {userOptionsCities?.map((option) => (
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
                fullWidth
                label="ZipCode"
                name="zipcode"
                required
                value={zipcode}
                onChange={handleInputChange}

              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
      </Card>
    </form>
    <>
      <Box sx={{ position: 'relative', overflowX: 'auto' }}>
        <div className='purchase-popup'>
        <Grid
            xs={12}
            md={6}
            >
            <Box sx={{ mt: 2 , mb: 2}}
            display="flex"
            justifyContent="flex-end"
            marginRight="12px">
            <Button
              color="primary"
              variant="contained"
              align="right"
              onClick={toggleForm}
            >
              Add Parts
            </Button>
          </Box>
        </Grid>

          {showForm && (
            <div className='modal' 
            onClick={handleModalClick}>
              <div className='modal-content'>
                <h5 className='product-detail-heading'>Add Part Details</h5>
                <form className='form'>
                  {/* Form fields */}
                  <div className='form-row'>
                    <div className='popup-left'>
                      <Grid xs={12} 
                      md={6}>
                                   <TextField
                        fullWidth
                        label='Part Name'
                        name='name'
                        select
                        required
                        value={productName}
                        onChange={(e) => {
                          const selectedOption = userData2.find(option => option.inventoryId === e.target.value);
                          if (selectedOption) {
                            setProductId(selectedOption.productId);
                            setProductName(e.target.value);
                            setWeight(selectedOption.weight);
                            setSgst(selectedOption.sgst);
                            setCgst(selectedOption.cgst);
                            setIgst(selectedOption.igst);
                            setQuantity(1);
                            setSize(selectedOption.size);
                            setPrice(selectedOption.price);
                            setInventoryId(selectedOption.inventoryId)
                            setDescription(selectedOption.productDescription);
                            setProductDescription(selectedOption.productDescription)
                          }
                        }}
                        style={{ marginBottom: 10 }}
                      >
                        {userData2.map((option) => (
                          <MenuItem key={option.inventoryId} 
                          value={option.inventoryId}>
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
                              label="Weight"
                              name="weight"
                              required
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                              style={{ marginBottom: 10 }}
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
                              required
                              type='number'
                              value={sgst}
                              onChange={(e) => setSgst(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
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
                              required
                              type='number'
                              value={igst}
                              onChange={(e) => setIgst(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
                              />
                            </Grid>
                          </div>
                          <div className='popup-right'>
                          <Grid
                            xs={12}
                            md={6}
                            >
                              <TextField
                              fullWidth
                              label="Quantity"
                              name="quantity"
                              required
                              type='number'
                              value={quantity}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue >= 0) {
                                  setQuantity(inputValue);
                                }
                              }}
                              style={{ marginBottom: 15 }}
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
                              required
                              type='number'
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
                              />
                            </Grid>
                            <Grid
                            xs={12}
                            md={6}
                            >
                              <TextField
                              fullWidth
                              label="Size"
                              name="size"
                              required
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
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
                              required
                              type='number'
                              value={cgst}
                              onChange={(e) => setCgst(e.target.value)}
                              style={{ marginBottom: 16 }}
                              />
                            </Grid>
                            </div>     
                          </div>
                          <Grid
                          xs={12}
                          md={6}
                          >
                          <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          required
                          multiline
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          style={{ marginBottom: 10 }}
                        />
                        </Grid>
                            <div className='submit-purchase'>
                            <button style={{ background: `${primaryColor}`, marginRight: '20px' }} 
                              className='submit' 
                              
                              onClick={toggleForm}>
                                 Cancel
                              </button>
                              <button style={{ background: `${primaryColor}` }} 
                              className='submit' 
                              type='submit' 
                              onClick={handleSubmit}>
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>

                    <Scrollbar>
                      <Table sx={{ minWidth: 800, overflowX: 'auto' }}>
                        <TableHead>
                          <TableRow>
                            {tableHeader.map((item, idx) => (
                              <TableCell sx={{ width: item.width }} 
                              key={idx}>
                                {item.name}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, idx) => (
                            <TableRow hover 
                            key={idx}>
                               <TableCell>
                               <div>{row.productDescription}</div>
                              </TableCell>
                              <TableCell>
                                 <div>{row.quantity}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.weight}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.size}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.price}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.cgst}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.sgst}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.igst}</div>
                              </TableCell>
                              
                              <TableCell>
                              <div>
                                {(
                                  ((row.quantity * row.price) +
                                  ((row.quantity * row.price) * row.cgst/ 100) +
                                  ((row.quantity * row.price) * row.igst / 100) +
                                  ((row.quantity * row.price) * row.sgst / 100)).toFixed(2)
                                )}
                              </div>
                              </TableCell>
                              <TableCell>
                                <IconButton onClick={() => handleEditRow(idx, row)}>
                                  <Icon>
                                    <EditIcon />
                                  </Icon>
                                </IconButton>
                              </TableCell>
                              <TableCell align='right'>
                                <IconButton onClick={handleRemoveRow(idx)}>
                                  <Icon>
                                    <Delete />
                                  </Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </Box>
                  <br></br>
                <Grid
                xs={12}
                md={6}
              >
              <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : {totalAmount.toFixed(2)}</label>
      
              </Grid>
              <Grid
                xs={12}
                md={6}
                style={{marginTop: "20px"}}
              >
              <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions :</label>
              <TextField
              fullWidth
              multiline
              rows={4}
   
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px"}}
            >
              <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Comments :</label>
              <TextField
              fullWidth
              multiline
              rows={2}
       
              value={comment}
              onChange={(e) => setComment(e.target.value)} 
            />
          </Grid>
          </>
          <Grid
            xs={12}
            md={6}
            >
            <Box sx={{ mt: 2, mb: 2 }}
            display="flex"
            justifyContent="flex-end"
            marginRight="12px">
            <Button
              color="primary"
              variant="contained"
              align="right"
              onClick={handleClick}
            >
              Create Quotation
            </Button>
          </Box>
        </Grid>
    </div>
  );
};

QuotationOrderCreateForm.propTypes = {
  customer: PropTypes.object.isRequired
};