import PropTypes from 'prop-types';

import { Box} from '@mui/material';





export const TenantSwitch = (props) => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
       
        <Box
          component="img"
          sx={{
            height: 55,
            width: "auto",
          }}
          alt="Tech Maadhyam logo"
          src="/assets/logos/logo.png"
        />
      </Box>
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object
};
