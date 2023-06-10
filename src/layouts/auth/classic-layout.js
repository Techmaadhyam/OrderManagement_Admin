import PropTypes from 'prop-types';
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
