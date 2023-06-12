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
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { primaryColor } from 'src/primaryColor';
import EditIcon from '@mui/icons-material/Edit';
import { Scrollbar } from 'src/components/scrollbar';
import React from 'react';
import { Delete } from '@mui/icons-material';
import './customTable.css'
import { useNavigate } from 'react-router-dom';

const userId = parseInt(sessionStorage.getItem('user')|| localStorage.getItem('user'))


const customerType = [
  {
    label: 'Customer',
    value: 'Customer'
  },
  {
    label: 'Vendor',
    value: 'Vendor'
  }
];


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
    id:'cost',
    name:'Unit Price',
    width: 150,
},
  {
      id:'workstation',
      name:'No. Of workstations',
      width: 200,
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

export const QuotationServiceCreateForm = (props) => {


  const [userData, setUserData]= useState([])
  const navigate = useNavigate();
//form state handeling
const [userName, setUserName] = useState('');
const [type, setType] = useState("");
const [deliveryDate, setDeliveryDate] = useState('');
const [status, setStatus] = useState("");
const [contactName,setContactName] = useState('')
const [adminName,setAdminName] = useState('')
const [adminEmail, setAdminEmail] = useState('');
const [adminPhone, setAdminPhone] = useState('');
const [inchargeEmail, setInchargeEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState("");
const [tempId, setTempId] = useState();
const [userState, setUserState] = useState();
const [terms, setTerms] = useState('');
const [comment, setComment] = useState('');
const [category, setCategory] = useState('Service Quotation');

const [currentDate, setCurrentDate] = useState('');

//add product state
const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [workstation, setWorkstation] = useState();
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

  const [totalAmount, setTotalAmount] = useState(0);
 

  //currentdate
  useEffect(() => {
    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('IN', options);
    setCurrentDate(formattedDate);
  }, []);
  console.log(workstation)
 const handleInputChange = (event) => {
  const { name, value } = event.target;

  switch (name) {
  
      case 'user':
        setUserName(value);
          break;
      case 'contactName':
        setContactName(value);
        break;
      case 'adminname':
        setAdminName(value);
        break;
      case 'adminemail':
        setAdminEmail(value);
        break;
      case 'adminphone':
        setAdminPhone(value);
        break;
      case 'inchargeemail':
        setInchargeEmail(value);
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
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllTempUsers/${userId}`)
      .then(response => {
        setUserData(prevData => [...prevData, ...response.data]);
     
      })
      .catch(error => {
        console.error(error);
      });
  
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllUsersBasedOnType/${userId}`)
      .then(response => {
        setUserData(prevData => [...prevData, ...response.data]);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);

const deliveryDateAntd = deliveryDate;
const deliveryDateJS = deliveryDateAntd ? deliveryDateAntd.toDate() : null;
const formattedDeliveryDate = deliveryDateJS ? moment(deliveryDateJS).format('DD/MM/YYYY') : '';



  //////////////
  //add product//
  /////////////

  const handleRemoveRow = (idx) => () => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  
    const calculatedTotalAmount = updatedRows.reduce(
      (total, row) =>
      total +
        row.workstationCount * row.price +
          (row.workstationCount * row.price * row.igst) / 100,
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
  
    if (
      price &&
      productName &&
      workstation &&
      igst &&
      description
    ) {
      const newRow = {
        productId,
        productName,
        quotationId: null,
        price: parseFloat(price),
        description,
        createdBy: userId,
        workstationCount: parseFloat(workstation),
        igst: parseFloat(igst),
        comments: comment,
        createdDate: currentDate,
        lastModifiedDate: currentDate,
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
        row.workstationCount * row.price +
          (row.workstationCount * row.price * row.igst) / 100,
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
  setWorkstation(row.workstationCount)
  setSize(row.size)
  setDescription(row.description);
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
    setWorkstation('')
    setDescription('');
  };

  //
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllItem/${userId}`)
      .then(response => {
        setUserData2(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const updatedRows = rows.map(({ productName, comments, ...rest }) => rest);
  //post request
  const handleClick = async (event) => {

    let finalAmount = totalAmount.toFixed(2)

    event.preventDefault();
    
      if (contactName && userId && phone && status && comment && terms && updatedRows) {
        try {
          const response = await fetch('http://13.115.56.48:8080/techmadhyam/addQuoatation', {
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
                  contactEmail: inchargeEmail,
                  adminPersonName: adminName,
                  adminPhoneNumber: adminPhone,
                  adminEmail: adminEmail,   
                  status: status,
                  type: type,
                  deliveryDate: formattedDeliveryDate,
                  createdBy: userId,
                  createdDate: currentDate,
                  lastModifiedDate: currentDate,
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
              md={4}
            >
            <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    select
                    value={type}
                    onChange={handleInputChange}
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
              md={4}
            >
                <DatePicker placeholder="Delivery Date"
                onChange={handleDateChange}
                className="css-dev-only-do-not-override-htwhyh"
                style={{ height: '58px', width: '250px' , color: 'red'}}

height='50px'/>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
                 <TextField
                fullWidth
                label="Company Name"
                name="user"
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
              md={4}
            >
              <TextField

                    fullWidth
                    label="Status"
                    name="status"
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
              md={4}
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
              md={4}
            >
              <TextField

                    fullWidth
                    label="Admin Name"
                    name="adminname"
                    value={adminName}
                    onChange={handleInputChange}
                
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField

                    fullWidth
                    label="Admin Email"
                    name="adminemail"
                    value={adminEmail}
                    onChange={handleInputChange}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField

                    fullWidth
                    label="Admin Phone"
                    name="adminphone"
                    value={adminPhone}
                    onChange={handleInputChange}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField

                    fullWidth
                    label="Incharge Name"
                    name="contactName"
                    value={contactName}
                    onChange={handleInputChange}
                
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField

                    fullWidth
                    label="Incharge Email"
                    name="inchargeemail"
                    value={inchargeEmail}
                    onChange={handleInputChange}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={4}
            >
              <TextField

                    fullWidth
                    label="Incharge Phone"
                    name="mobileno"
                    value={phone}
                    onChange={handleInputChange}
                  >
                  </TextField>
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
              <div className='modal-content-service'>
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
                          value={productName}
                          onChange={(e) => {
                            const selectedOption = userData2.find(option => option.productName === e.target.value);
                            setProductId(selectedOption.id);
                            setProductName(e.target.value);
                            setDescription(selectedOption.description)
                          }}
                          style={{ marginBottom: 10 }}
                        >
                          {userData2?.map((option) => (
                            <MenuItem key={option.id} 
                            value={option.productName}>
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
                              label="No. Of Workstations"
                              name="workstation"
                              type='number'
                              value={workstation}
                              onChange={(e) => setWorkstation(e.target.value)}
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
                              label="IGST"
                              name="igst"
                              type='number'
                              value={igst}
                              onChange={(e) => setIgst(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
                              />
                            </Grid>
                            <Grid
                            xs={12}
                            md={6}
                            >
                              <TextField
                              fullWidth
                              label="Unit Price"
                              name="cost"
                              type='number'
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              style={{ marginBottom: 10 }}
                          
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
                                <div>{row.description}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.price}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.workstationCount}</div>
                              </TableCell>
                              <TableCell>
                                <div>{row.igst}</div>
                              </TableCell>
                              <TableCell>
                              <div>
                              {(
                              ((row.workstationCount * row.price) +
                              ((row.workstationCount * row.price) * row.igst/ 100)).toFixed(2)
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
              maxRows={8}
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
              maxRows={4}
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

QuotationServiceCreateForm.propTypes = {
  customer: PropTypes.object.isRequired
};