import PropTypes from 'prop-types';

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
import { Box } from '@mui/system';
import IconWithPopup from '../user/user-icon';
import { useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from 'src/config';


  //get userid 
  const userId = sessionStorage.getItem('user') || localStorage.getItem('user');

export const CreateProduct = (props) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [product, setProduct]= useState('')
  const [category, setCategory]= useState('')
  const [newCategory, setNewCategory]= useState('')
  // const [type, setType]= useState('Parts')
  const [desc1, setDesc1]= useState('')
  const [desc2, setDesc2]= useState('')
  const [currentDate, setCurrentDate] = useState('');
  const [data, setData]= useState([])
  const [partNumber, setpartNumber]= useState('')
  
  
//handle category change
  const handleCategoryChange = (event) => {

    const selectedCategory = event.target.value;
    //console.log(selectedCategory)
    setCategory(selectedCategory)

    if (selectedCategory && selectedCategory !== 'none' && selectedCategory !== 'other' && isNaN(Number(selectedCategory))) {
      setShowAdditionalFields(true);

    } else {
      setShowAdditionalFields(false);
    }
  };
 //  get date
 useEffect(() => {
  const today = new Date();
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-ZA', options);
  setCurrentDate(formattedDate);
}, []);

  //get category using userid
  useEffect(() => {
    axios.get(apiUrl +`getAllCategorys/${userId}`)
      .then(response => {
   
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
//concat useroptions with new data from above API GET request
  const userOptions = [
    {
      label: 'None',
      value: 'none'
    },
    {
      label: 'Add New Model',
      value: 'Add New Model'
    },
    // {
    //   label: 'ETON STD 2002',
    //   value: 'ETON STD 2002'
    // },
    // {
    //   label: 'ETON BASIC 2002',
    //   value: 'ETON BASIC 2002'
    // },
    // {
    //   label: 'ETON 5000 APPAREL STD',
    //   value: 'ETON 5000 APPAREL STD'
    // },
    // {
    //   label: 'ETON 5000 ADVANCE SYNCRO',
    //   value: 'ETON 5000 ADVANCE SYNCRO'
    // },
    // {
    //   label: 'ETON 4000',
    //   value: 'ETON 4000'
    // },
    
  ];


  // const typeDropdown = [
  //   {
  //     label: 'Parts',
  //     value: 'Parts'
  //   },
  //   {
  //     label: 'Spare Parts',
  //     value: 'Spare Parts'
  //   },
    
  // ];

  const mappedOptions = data.map(({ id, name }) => ({
    label: name,
    value: id
  }));
  
  const updatedUserOptions = userOptions.concat(mappedOptions);


  //handle user inputs
  const handleProduct = (event) => {
    setProduct(event.target.value);
  };
  const handleNewCategory = (event) => {
    setNewCategory(event.target.value);
  };
  // const handleType = (event) => {
  //   setType(event.target.value);
  // };
  const handleDescription1 = (event) => {
    setDesc1(event.target.value);
  };
  const handleDescription2 = (event) => {
    setDesc2(event.target.value);
  };
  const handlePart = (event) => {
    setpartNumber(event.target.value);
  };
  //for sending response body via route
  const navigate = useNavigate();
  //handle save
  let requestBody
  
  const handleSave = () => {

    if(showAdditionalFields){
      requestBody = {
        product: {
          productName: product,
          //type: type,
          partnumber: partNumber,
          description: desc2,
          createdBy: parseFloat(userId),
          createdDate: new Date(),
          lastModifiedDate:new Date(),
          lastModifiedByUser: {id: parseFloat(userId)},
 
        },
        category: {
          name: newCategory,
          description: desc1,
          createdBy: parseFloat(userId),
          createdDate:new Date(),
        }
      };
    } else if(showAdditionalFields===false && product && desc2 && userId && currentDate && category){
      requestBody = {
        product: {
          productName: product,
          partnumber: partNumber,
          //type: type,
          description: desc2,
          createdBy: parseFloat(userId),
          createdDate:new Date(),
          lastModifiedDate:new Date(),
          lastModifiedByUser: {id: parseFloat(userId)},
          
        },
        category: {
          id: category
      
        }
      }
    }
    
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
    };
   console.log(JSON.stringify(requestBody))
    axios.post(apiUrl +'addProduct', JSON.stringify(requestBody), config)
      .then(response => {
        // Handle successful response
        console.log(response.data);
        if (response.status === 200) {
          //navigate to view product details (using react router)
          navigate('/dashboard/products/viewDetail', { state: response.data });
        
        }
      

      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };




  return (
    <div style={{minWidth: "100%", marginBottom: '1rem' }}>
<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Add Parts / Products</h2>
      <IconWithPopup/>
    </div>
    <form>
      <Card>
        <CardHeader title="Part Detail" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          > {/*<Grid
          xs={12}
          md={6}
        >
          <TextField
        
                fullWidth
                label="Type"
                name="type"
                select
                value={type}
                onChange={handleType} 
            >
               {typeDropdown.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
               </Grid>*/}
    
        
      
            <Grid
              xs={12}
              md={6}
            >
                <TextField
               
                    fullWidth
                    label="Model"
                    name="category"
                    required
                    select
                    value={category}
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
            label="Add New Model"
            name="new category"
            required
            value={newCategory}
            onChange={handleNewCategory} 
          >
          </TextField>
          </Grid>
          <Grid
              xs={12}
              md={6}
            >
          <TextField

            fullWidth
            label="Model Description"
            name="description"
            required
            value={desc1}
            onChange={handleDescription1} 
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
                    label="Part Name"
                    name="name"
                    required
                    value={product}
                    onChange={handleProduct} 
                   
            
                  >
                  </TextField>
      
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField

                    fullWidth
                    label="Part Number"
                    name="partNumber"
                    required
                    value={partNumber}
                    onChange={handlePart} 
                   
            
                  >
                  </TextField>
      
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
                multiline
                required
                rows={4}
            
                value={desc2}
                onChange={handleDescription2} 
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

CreateProduct.propTypes = {
  customer: PropTypes.object.isRequired
};
