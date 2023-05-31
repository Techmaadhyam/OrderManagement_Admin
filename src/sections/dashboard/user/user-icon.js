import React from 'react';
import User03 from '@untitled-ui/icons-react/build/esm/User03';
import { ButtonBase, SvgIcon, Box, Link } from '@mui/material';
import './user.css';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { primaryColor } from 'src/primaryColor';

const User = () => {
  return (
    <Link style={{color: '#111927'}}
    component={RouterLink}
    href= {paths.dashboard.social.profile}>
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
          <span className='title'>Tech Maadhyam</span>
          <span className='user'>User: Max Ray</span>
          <span className='mail'>Mail: maxray@xyz.com</span>
        </div>
      </Box>
    </Link>
  );
}

export default User;

