import PropTypes from 'prop-types';
import { Box, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Logo } from 'src/components/logo';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import Register from 'src/pages/auth/jwt/register';





export const Layout = (props) => {
 
  return (
  <>
  <Register/>
  </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
