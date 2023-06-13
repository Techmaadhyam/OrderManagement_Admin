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
import './warehouse.css'
import { Box } from '@mui/system';
import IconWithPopup from '../user/user-icon';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

  //get userid 
  const userId = sessionStorage.getItem('user') || localStorage.getItem('user');


export const CreateWarehouse = (props) => {
    // country, state, city API access token
    const [accessToken, setAccessToken] = useState(null);

  
  
    //state management for countries,states and cities
    const [countries, setCountries] = useState([]);
    const [states, setStates]= useState([])
    const [cities, setCities]= useState([])
    const [currentCountry, setCurrentCountry]= useState('India')
    const [currentState, setCurrentState]= useState('')
    const [currentCity, setCurrentCity] =useState('')
      //form state handling

  const [username, setUsername] = useState('');
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState('');
  const [phone, setPhone] = useState('');
  const [contactName, setContactName] = useState('');




 
  ////
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    switch (name) {
    
      case 'name':
        setUsername(value);
        break;
      case 'contactname':
        setContactName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
          break;
      case 'zipcode':
        setZipcode(value);
          break;
      case 'description':
        setDescription(value);
          break;
      default:
        break;
    }
  };
  ////
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

    //getting current date
    useEffect(() => {
      const today = new Date();
      const year = today.getFullYear().toString();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}/${month}/${day}`;
      setCurrentDate(formattedDate);
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

    if (username && currentCountry && currentState && address && description && currentCity && zipcode && currentDate) {
      try {
        const response = await fetch('http://13.115.56.48:8080/techmadhyam/addWareHouse', {
          method: 'POST',
          headers: {

            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
  
            name : username,
            contactName: contactName,
            phone: phone,
            address: address,
            description: description,
            zipcode: zipcode,
            city: currentCity,
            state: currentState,
            country: currentCountry,
            createdBy: userId,
            createdDate:new Date(currentDate),
            lastModifiedDate:new Date(currentDate),
          })
        });
        
        if (response.ok) {
          // Redirect to home page upon successful submission
      
         response.json().then(data => {
          console.log(data);
          navigate('/dashboard/invoices/viewDetail', { state: data });
         
});
        } 
      } catch (error) {
        console.error('API call failed:', error);
      }
    } 

};

  return (
    <div style={{minWidth: "100%", marginBottom: '1rem' }}>
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>Create Warehouse</h2>
      <IconWithPopup/>
    </div>
    <form>
      <Card>
        <CardHeader title="Warehouse Detail" />
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
                    label="Name"
                    name="name"
                    value={username}
                    onChange={handleInputChange}
                  >
                  </TextField>
            
            </Grid>
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
                <TextField

                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}
                    value={address}
                    onChange={handleInputChange}   
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                <TextField

                    fullWidth
                    label="Contact Name"
                    name="contactname"
                    value={contactName}
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
                    label="Phone"
                    name="phone"
                    type='number'
                    value={phone}
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
            <Grid
              xs={12}
              md={6}
            >
              <TextField

                fullWidth
     
                label="Zip Code"
                name="zipcode"
                value={zipcode}
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
                    onClick={handleClick}
            
                
                    >
                    Save
                    </Button>
            </Box>
          </Grid>
    </div>
  );
};

CreateWarehouse.propTypes = {
  customer: PropTypes.object.isRequired
};