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
import React, { useState, useEffect } from 'react';
import { primaryColor } from 'src/primaryColor'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const notify = () => toast("You have sucessfully registered your account");

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);


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
                  >
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
                >              
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
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField

                fullWidth
                label="Zip Code"
                name="zipcode"
    
              />
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
                 
                
                    >
                    Save
                    </Button>
                    <ToastContainer
                     />
            </Box>
          </Grid>
    </div>
      </Box>
   
    </Box>
  </>
  );

};

export default Register;
