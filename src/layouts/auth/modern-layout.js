import PropTypes from 'prop-types';
import { Box, Stack} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import React, { useState, useEffect } from 'react';
import { primaryColor } from 'src/primaryColor'; 

export const Layout = (props) => {
  const { children } = props;
  const [currentImage, setCurrentImage] = useState(0);

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
  }, [images.length]);


  return (
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
          justifyContent: {
            md: 'center'
          },
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
        <div>
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
                TechMaadhyam
              </Box>
            </Stack>
          </Box>
          {children}
        </div>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
