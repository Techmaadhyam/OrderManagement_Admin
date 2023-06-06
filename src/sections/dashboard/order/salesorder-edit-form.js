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
import './sales-order.css'
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
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const userId = parseInt(sessionStorage.getItem('user'))
const dateFormat = 'DD/MM/YYYY';

const customerType = [
   
  {
    label: 'Distributor',
    value: 'Distributor'
  },
  {
    label: 'Retailer',
    value: 'Retailer'
  },
  {
    label: 'Manufacturer',
    value: 'Manufacturer'
  },
  {
    label: 'Customer',
    value: 'Customer'
  }
];

const userOptions = [
  {
    label: 'Open',
    value: 'Open'
  },
  {
    label: 'Waiting for Approval',
    value: 'Waiting for Approval'
  },
  {
    label: 'Pending',
    value: 'Pending'
  },
  {
    label: 'Cancelled',
    value: 'Cancelled'
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

export const SalesOrderEditForm = (props) => {

  const location = useLocation();
  const state = location.state;

  console.log(state)



  const [userData, setUserData]= useState([])
  const navigate = useNavigate();
//form state handeling

const [type, setType] = useState(state?.type||"");
const [quotation, setQuotation] = useState(state?.quotationId ||'');
const [deliveryDate, setDeliveryDate] = useState(dayjs(state?.deliveryDate, dateFormat));
const [status, setStatus] = useState(state?.status || "");
const [contactName,setContactName] = useState(state?.contactPerson||'')
const [phone, setPhone] = useState(state?.contactPhone||'');
const [address, setAddress] = useState(state?.deliveryAddress || "");
const [tempId, setTempId] = useState(state?.tempUserId);
const [terms, setTerms] = useState(state?.termsAndCondition || '');
const [comment, setComment] = useState(state?.comments||'');
const [user, setUser] = useState('')
const [payment, setPayment]= useState(state?.paymentMode||'')


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
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [userData2, setUserData2] = useState([])
  const [productId, setProductId] = useState()
  const [Id, setId] = useState()

  const [totalAmount, setTotalAmount] = useState(0);

  const [rowData, setRowData] =useState()
  const [dDate, setDDate] =useState(state?.deliveryDate)
  //deleted row
  const [deletedRows, setDeletedRows] = useState([]);

  const [inventoryData, setInventoryData] =useState()

  const [inventoryId, setInventoryId] = useState()
  const [productDescription, setProductDescription] = useState('');
  const [allQuotation, setAllQuotation] = useState([])

  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllSalesOrderDetails/${state?.id || state?.soRecord?.id}`)
      .then(response => {
        const updatedData = response.data.map(obj => {
          let parsedInventoryId;
          try {
            const parsedInventory = JSON.parse(obj.inventory);
            parsedInventoryId = parsedInventory.id;
          } catch (error) {
            console.error("Error parsing inventory JSON for object:", obj, error);
            parsedInventoryId = null;
          }
  
          return {
            ...obj,
            inventory: { id: parsedInventoryId }
          };
        });
  
        setRowData(updatedData);
        setTotalAmount(state?.totalAmount);
  
        console.log(updatedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.id, state?.soRecord?.id, state?.totalAmount]);
//inventory 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getInventoryByUserId/${userId}`)
      .then(response => {
        setInventoryData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  console.log(inventoryData)
  // const parsedInventory = JSON.parse(rowData.inventory);



  //currentdate
  useEffect(() => {
    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('IN', options);
    setCurrentDate(formattedDate);
  }, []);

 const handleInputChange = (event) => {
  const { name, value } = event.target;

  switch (name) {
  
      case 'user':
        setUser(value);
          break;
      case 'contactName':
        setContactName(value);
        break;
      case 'quotation':
        setQuotation(value);
        break;
      case 'mobileno':
        setPhone(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'payment':
        setPayment(value);
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

   //get temp user
   useEffect(() => {
    const request1 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllTempUsers/${userId}`);
    const request2 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllUsersBasedOnType/${userId}`);
  
    Promise.all([request1, request2])
      .then(([response1, response2]) => {
        const tempUsersData = response1.data;
        const usersData = response2.data;
        const combinedData = [...tempUsersData, ...usersData];
        setUserData(combinedData);
  
        const selecteduserId = combinedData.find((option) => (option.id !== 0 && option.id === state?.tempUserId) || option.id === state?.userId);
        const selecteduser = selecteduserId ? selecteduserId.companyName : '';
        setUser(selecteduser);
      })
      .catch(error => {
        console.error(error);
      });
  }, [state?.tempUserId, state?.userId]);


  useEffect(() => {
    if (deliveryDate) {
      const deliveryDateJS = deliveryDate.toDate();
      const formattedDeliveryDate = moment(deliveryDateJS).format('DD/MM/YYYY');
      setDDate(formattedDeliveryDate);
    } else {
      setDDate('');
    }
  }, [deliveryDate]);

  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllQuotations/${userId}`)
      .then(response => {
        const filteredQuotations = response.data.filter(item => item.status === "Delivered");
        setAllQuotation(filteredQuotations);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const approvedQuotation = allQuotation.map(item => ({
    value: item.id,
    label: item.contactPersonName
  }));

  const handleDateChange = (date) => {
    setDeliveryDate(date);
  };

  //////////////
  //add product//
  /////////////


  const handleRemoveRow = (idx, row) => () => {

  const deletedRow = { ...row }; 
  setDeletedRows((prevDeletedRows) => [...prevDeletedRows, deletedRow]);

    const updatedRows = rowData?.filter((_, index) => index !== idx);
    setRowData(updatedRows);
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
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
     const selectedOption = inventoryData.find((option) => option.inventoryId === inventoryId);
  
    if (parseInt(quantity) > selectedOption.quantity) {
      notify(
        "error",
        `Insufficient Quantity in Inventory. Quantity must be below ${selectedOption.quantity}`
      );
      return;
    }

      const newRow = {
        id: Id,
        inventory: {id: inventoryId},
        productDescription,
        productId,
        productName,
        weight,
        quotationId: null,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        cgst: parseFloat(cgst),
        description,
        createdBy: userId,
        size: size,
        sgst: parseFloat(sgst),
        igst: parseFloat(igst),
        comments: comment,
        createdDate: currentDate,
        lastModifiedDate: currentDate,
      };
  
      let updatedRows;
  
      if (editIndex !== null) {
        updatedRows = [...rowData];
        updatedRows[editIndex] = newRow;
        setRowData(updatedRows);
      } else {
        updatedRows = [...rowData, newRow];
        setRowData(updatedRows);
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


  const selectedOption = inventoryData.find((option) => option.productName === row.productName);
  const selectedProductId = selectedOption ? selectedOption.productId : '';



  setId(row.id)
  setProductId(selectedProductId);
  setInventoryId(row.inventory.id)
  setProductName(row.inventory.id);
  setWeight(row.weight);
  setQuantity(row.quantity);
  setPrice(row.price);
  setCgst(row.cgst);
  setIgst(row.igst)
  setSgst(row.sgst)
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
    setSgst('')
    setDescription('');
    setId(undefined)
  };

  //get all parts
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllItem/${userId}`)
      .then(response => {
        setUserData2(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  
  const updatedRows = rowData?.map(({ productName, productDescription, ...rest }) => rest);
  const deleteRows= deletedRows?.map(({ productName, productDescription, ...rest }) => rest);
  //post request
  const handleClick = async (event) => {
    let finalAmount = parseFloat(totalAmount.toFixed(2))

    
    
    event.preventDefault();

    console.log({
      salesOrder:{
          id: state?.id,
          quotationId:null,
          userId: userId,
          tempUserId :tempId,
          contactPerson: contactName,
          contactPhone: phone,    
          status: status,
          paymentMode: payment,
          deliveryDate: dDate,
          deliveryAddress: address,
          city: null,
          state:null,
          country: null,
          createdBy: userId,
          createdDate: state?.createdDate,
          lastModifiedDate: currentDate,
          comments : comment,
          termsAndCondition: terms,
          totalAmount: finalAmount,
          lastModifiedByUser: {id: userId},
      },
          salesOrderDetails: updatedRows,
          deletedSODetails: deleteRows
  })
    
      if (contactName && address && userId && phone && status && address && comment && terms && updatedRows) {
        try {
          const response = await fetch('http://13.115.56.48:8080/techmadhyam/createSalesOrder', {
            method: 'POST',
            headers: {
    
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              salesOrder:{
                  id: state?.id,
                  quotationId:null,
                  userId: userId,
                  tempUserId :tempId,
                  contactPerson: contactName,
                  contactPhone: phone,    
                  status: status,
                  paymentMode: payment,
                  type: type,
                  deliveryDate: dDate,
                  deliveryAddress: address,
                  city: null,
                  state:null,
                  country: null,
                  createdBy: userId,
                  lastModifiedDate: currentDate,
                  comments : comment,
                  termsAndCondition: terms,
                  totalAmount: finalAmount,
                  lastModifiedByUser: {id: userId},
              },
                  salesOrderDetails: updatedRows,
                  deletedSODetails: deleteRows
          })
          });
          
          if (response.ok) {
            // Redirect to home page upon successful submission
           response.json().then(data => {

          
            navigate('/dashboard/orders/viewDetail', { state: data });
            console.log(data)
    });
          } 
        } catch (error) {
          console.error('API call failed:', error);
        }
      } 
    
    };

    console.log(rowData)
    console.log(inventoryData)

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
      <h2>Edit Sales Order</h2>
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
                    select
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
              md={6}
            >
              <TextField
                fullWidth
                label="Payment Mode"
                name="payment"
                value={payment}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            ><TextField
            fullWidth
            label="Company Name"
            name="user"
            select
            value={user}
            onChange={(e) => {
              const selectedOption = userData?.find((option) => option.companyName === e.target.value);
              setTempId(selectedOption?.id || '');
              setUser(e.target.value);
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
                    label="Quotation"
                    name="quotation"
                    value={quotation}
                    select
                    onChange={handleInputChange}
                  >    
                    {approvedQuotation.map((option) => (
                  <MenuItem 
                  key={option.value} 
                  value={option.value}>
                    {option.label}
                  </MenuItem>
  ))}             
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                <DatePicker placeholder="Delivery Date"
                onChange={handleDateChange}
                defaultValue={deliveryDate} 
                format={dateFormat}
                
             

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
                value={phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Address"
                multiline
                minRows={3}
                name="address"
                value={address}
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
                      <Grid 
                      xs={12} 
                      md={6}>
                        <TextField
                            fullWidth
                            label='Part Name'
                            name='name'
                            select
                            value={productName}
                            onChange={(e) => {
                              const selectedOption = inventoryData.find(option => option.inventoryId === e.target.value);
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
                            {inventoryData.map((option) => (
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
                          multiline
                          rows={4}
                          value={description}

                          style={{ marginBottom: 10 }}
                        />
                        </Grid>
                            <div className='submit-purchase'>
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
                          {rowData?.map((row, idx) => (
                            <TableRow hover 
                            key={idx.id}>
                              <TableCell>
                                <div>{row.description}</div>
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
                                <IconButton onClick={handleRemoveRow(idx, row)}>
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
            <Box sx={{ mt: 2 , mb: 2}}
            display="flex"
            justifyContent="flex-end"
            marginRight="12px">
            <Button
              color="primary"
              variant="contained"
              align="right"
              onClick={handleClick}
            >
              Place Order
            </Button>
          </Box>
        </Grid>
    </div>
  );
};

SalesOrderEditForm.propTypes = {
  customer: PropTypes.object.isRequired
};
