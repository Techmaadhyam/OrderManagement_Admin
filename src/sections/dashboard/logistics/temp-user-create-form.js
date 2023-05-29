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
import { Box } from '@mui/system';
import IconWithPopup from '../user/user-icon';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';


  //get userid 
  const userId = sessionStorage.getItem('user');

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


export const TempUserCreateForm = (props) => {
  const { customer, ...other } = props;

  // country, state, city API access token
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);


  //state management for countries,states and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates]= useState([])
  const [cities, setCities]= useState([])
  const [currentCountry, setCurrentCountry]= useState('India')
  const [currentState, setCurrentState]= useState('')
  const [currentCity, setCurrentCity] =useState('')
    
//form state handling

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [company, setCompany] = useState("");
const [type, setType] = useState("");
const [address, setAddress] = useState("");
const [zipcode, setZipcode] = useState("");
const [currentDate, setCurrentDate] = useState('');
const [gstn, setGstn]= useState('')
console.log(gstn)
 ////
 const handleInputChange = (event) => {
  const { name, value } = event.target;

  switch (name) {
  
    case 'firstname':
        setFirstName(value);
        break;
      case 'lastname':
        setLastName(value);
        break;
      case 'username':
        setUserName(value);
          break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'company':
        setCompany(value);
        break;
      case 'gstn':
        setGstn(value);
        break;
    case 'address':
      setAddress(value);
        break;
    case 'zipcode':
      setZipcode(value);
        break;
    default:
      break;
  }
};
////
  //getting current date
  useEffect(() => {
    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('IN', options);
    setCurrentDate(formattedDate);
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
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch access token');
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
const userOptions = useMemo(() => {
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

//for sending response body via route
const navigate = useNavigate();

const handleClick = async (event) => {
event.preventDefault();

  if (firstName && lastName && email && phone && type && company && currentCountry && currentState && address && currentCity && zipcode && currentDate) {
    try {
      const response = await fetch('http://13.115.56.48:8080/techmadhyam/addTempUser', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          firstName : firstName,
          lastName: lastName,
          userName: userName,
          companyName: company,
          emailId: email,
          mobile: phone,
          address: address,
          type: type,
          gstNumber: gstn,
          pincode: zipcode,
          city: currentCity,
          state: currentState,
          country: currentCountry,
          createdBy: userId,
          createdDate:currentDate,
          lastModifiedDate:currentDate,
          lastModifiedByUser: {id: userId},
        })
      });
      
      if (response.ok) {
        // Redirect to home page upon successful submission
    
       response.json().then(data => {
        console.log(data);
       
        navigate('/dashboard/logistics/viewDetail', { state: data });
       
});
      } 
    } catch (error) {
      console.error('API call failed:', error);
    }
  } 

};

 

  return (
    <div style={{minWidth: "100%" , marginBottom: '1rem' }}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Create Customer</h2>
      <IconWithPopup/>
    </div>
    <form>
      <Card>
        <CardHeader title="New Customer" />
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
                label="First Name"
                name="firstname"
                value={firstName}
                onChange={handleInputChange}


              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={lastName}
                onChange={handleInputChange}

         
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={userName}
                onChange={handleInputChange}


              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={handleInputChange}

             
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Phone"
                name="phone"
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
              md={6}
            >
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={company}
                onChange={handleInputChange}


              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="GST Number"
                name="gstn"
                value={gstn}
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
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    select
                    defaultValue=''
                    value={currentCountry}
                    onChange={handleCountry}
                  >
                     {userOptions?.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
            </Grid>
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
                <TextField

                    fullWidth
                    label="State"
                    name="state"
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
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
               <TextField
                    fullWidth
                    label="City"
                    name="city"
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
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="ZipCode"
                name="zipcode"
                value={zipcode}
                onChange={handleInputChange}

              />
            </Grid>
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
            justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            align="right"
            onClick={handleClick}
          >
            Save
          </Button>
        </Box>
          </Grid>
    </div>
  );
};

TempUserCreateForm.propTypes = {
  customer: PropTypes.object.isRequired
};
