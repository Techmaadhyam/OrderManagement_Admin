import React from 'react';
import User03 from '@untitled-ui/icons-react/build/esm/User03';
import { ButtonBase, SvgIcon, Box, Link } from '@mui/material';
import './user.css';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { primaryColor } from 'src/primaryColor';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from 'src/config';
import { useNavigate } from 'react-router-dom';

const mail = sessionStorage.getItem('mail')

const User = () => {
  const navigate = useNavigate();

  const [userData, setUserData]= useState()

  useEffect(() => {
    axios.get(apiUrl + `getUserByUsername/${mail}`)
      .then(response => {
    
        setUserData(response.data[0]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleClick =() =>{
    
    navigate('/dashboard/social/profile', {
      state: userData,
    });
  }

  return (
    <Link style={{color: '#111927'}}
 
    onClick={handleClick}
    >
      <Box className="popup-container" 
      sx={{backgroundColor: `${primaryColor}`
    }}
        >
        <ButtonBase className="popup-trigger">
          <SvgIcon >
            <User03 style={{color: '#fff'}} />
          </SvgIcon>
        </ButtonBase>
        <div className="popup-content">
          <span className='title'>TechMaadhyam</span>
          <span className='user'>User: {userData?.firstName+' '+userData?.lastName}</span>
          <span className='mail'>Mail: {userData?.userName}</span>
        </div>
      </Box>
    </Link>
  );
}

export default User;

