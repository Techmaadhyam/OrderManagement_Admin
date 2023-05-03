import * as Yup from 'yup';
import { useFormik } from 'formik';
import './register.css'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Stack,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSearchParams } from 'src/hooks/use-search-params';
import { paths } from 'src/paths';
import { AuthIssuer } from 'src/sections/auth/auth-issuer';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { primaryColor } from 'src/primaryColor'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Register = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates]= useState([])
  const [cities, setCities]= useState([])
  const [currentCountry, setCurrentCountry]= useState('India')
  const [currentState, setCurrentState]= useState([])
  const [currentCity, setCurrentCity] =useState([])


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

  useEffect(()=>{
    fetchCountries()
  },[fetchCountries])

  const userOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.country_name,
      value: country.country_name
    }));
  }, [countries]);

  const userOptionsState = useMemo(() => {
    return states.map(state => ({
      label: state.state_name,
      value: state.state_name
    }));
  }, [states]);
  const userOptionsCities = useMemo(() => {
    return cities.map(city => ({
      label: city.city_name,
      value: city.city_name
    }));
  }, [cities]);

  const notify = () => toast.success('You have sucessfully registered your account', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

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

const handleCities = async (event) => {
    setCurrentCity(event.target.value);
}
  const images = [
    '/assets/logos/logo.png',
    '/assets/logos/logo1.png',
    '/assets/logos/logo2.png',
    '/assets/logos/logo3.png',
    '/assets/logos/logo4.png', 
    '/assets/logos/logo5.png', 
    '/assets/logos/logo6.png', 
    '/assets/logos/logo7.png', 
    '/assets/logos/logo8.png', 
    '/assets/logos/logo9.png',
    '/assets/logos/logo10.png',  
  ];

  const handleImageChange = useCallback(() => {
    setCurrentImage(currentImage => (currentImage + 1) % images.length);
  }, [images.length]);
  
  useEffect(() => {
    const intervalId = setInterval(handleImageChange, 3000);
    return () => clearInterval(intervalId);
  }, [handleImageChange]);

  const handleToHome =() => {
      notify();
  }
 

  return (
   <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row'
        }
      }}
    > 
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'neutral.800',
          backgroundImage: 'url("/assets/gradient-bg.svg")',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          color: 'common.white',
          display: 'flex',
          flex: {
            xs: '0 0 auto',
            md: '1 1 auto'
          },
          justifyContent: 'center',
          p: {
            xs: 4,
            md: 8
          }
        }}
      >
        <Box maxWidth="md">
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={4}
            sx={{
              color: 'text.primary',
              '& > *': {
                color: 'neutral.400',
                flex: '0 0 auto'
              }
            }}
          >
            <img
              alt=""
              src={images[currentImage]}
              style={{width: 350 , height: 'auto'}}
            />
          </Stack>
        </Box>


      </Box>
     

      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flex: {
            xs: '1 1 auto',
            md: '0 0 auto'
          },
          flexDirection: 'column',
        
          maxWidth: '100%',
          p: {
            xs: 4,
            md: 8
          },
          width: {
            md: 750
          }
        }}
      >
     
   
          <Box sx={{ mb: 4 }}>
            <Stack
              alignItems="center"
              component={RouterLink}
              direction="column"
              display="flex"
              href={paths.authDemo.login.modern}
              spacing={1}
              sx={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                }}
              >
               <img
              alt=""
              src="/assets/icons/icon.png" 
              style={{ width: 'auto', height: 40 }}
            />
              </Box>
              <Box
                sx={{
                  color: primaryColor,
                  fontFamily: '\'Plus Jakarta Sans\', sans-serif',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '0.3px',
                  lineHeight: 1,
                  '& span': {
                    color: 'primary.main'
                  }
                }}
              >
                Tech Maadhyam
              </Box>
            </Stack>
          </Box>
     
        <div style={{minWidth: "100%", marginBottom: '1rem' }}>
      <h3>Register</h3>
    <form>
      <Card>
        <CardHeader title="Create new account" />
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

                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                  
                    fullWidth
                    label="Last Name"
                    name="lastname"

                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                  
                    fullWidth
                    label="Email"
                    name="Email"
                  

                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                  
                    fullWidth
                    label="Phone"
                    name="phone"
                    type='number'

                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                    fullWidth
                    label="Username"
                    name="username"
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                    fullWidth
                    label="Company"
                    name="company"
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                    fullWidth
                    label="Type"
                    name="type"
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
                <TextField        
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    rows={2}           
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
                    defaultValue= ''
                    value={[currentCountry]}
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
    
              >
                </TextField>
            </Grid>
          <Grid
              xs={12}
              md={12}
            >
              <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type='password'
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
              <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmpassword"
                    type='password'
                  >
                  </TextField>
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
                justifyContent="flex-end"
                >
                    <Button
                    color="primary"
                    variant="contained"
                    align="right"
                    onClick={handleToHome}
                    href={paths.index}
                 
                
                    >
                    Save
                    </Button>
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
          </Grid>
    </div>
      </Box>
   
    </Box>
  </>
  );

};

export default Register;
