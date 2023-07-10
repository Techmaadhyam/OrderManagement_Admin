import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Link,
  SvgIcon,
  IconButton,
  Grid,
  Icon
} from '@mui/material';
import {Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconWithPopup from '../user/user-icon';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from 'src/config';
import Logo from '../logo/logo';


export const ViewProductDetail = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state)


  

  const [editedData, setEditedData] = useState({
  name: state?.productName || state?.name,
  category: state?.category?.name,
  type: state?.type,
  description: state?.category?.description
  });
 







 
  const align = 'horizontal' 


  return (
    <div style={{ minWidth: "100%", marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.products.view}
            sx={{
              alignItems: "center",
              display: "inline-flex",
            }}
            underline="none"
          >
            <SvgIcon
              sx={{
                mr: 1,
                width: 38,
                height: 38,
                transition: "color 0.5s",
                "&:hover": { color: `${primaryColor}` },
              }}
            >
              <ArrowCircleLeftOutlinedIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Back To{" "}
              <span style={{ color: `${primaryColor}`, fontWeight: 600 }}>
                Parts
              </span>
            </Typography>
          </Link>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconWithPopup />
        </div>
      </div>
      <h2>Product</h2>
      <Card style={{ marginBottom: "12px" }}>
        <CardHeader title="Product Detail" />
        <PropertyList>
          <PropertyListItem align={align} label="Product Name" value={ state?.productName || state?.name}>
        
          </PropertyListItem>
          <Divider />
   
          <PropertyListItem
            align={align}
            label="Product description"
            value={state?.category?.description || state?.description}
          />
        </PropertyList>
        <Divider />
      </Card>
    </div>
  );
};

ViewProductDetail.propTypes = {
  customer: PropTypes.object.isRequired
};