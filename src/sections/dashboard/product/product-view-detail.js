import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
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
  Grid
} from '@mui/material';
import { wait } from 'src/utils/wait';
import {  Box, Stack } from '@mui/system';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { useCallback, useState } from 'react';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Scrollbar } from 'src/components/scrollbar';
import { Table } from 'antd';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconWithPopup from '../user/user-icon';
import { useLocation } from 'react-router-dom';

const statusOptions = ['Canceled', 'Complete', 'Rejected'];

export const ViewProductDetail = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const { customer, ...other } = props;
  const [status, setStatus] = useState(statusOptions[0]);

  const handleChange = useCallback((event) => {
    setStatus(event.target.value);
  }, []);
  const align = 'horizontal' 
  const formik = useFormik({
    initialValues: {
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      country: customer.country || '',
      email: customer.email || '',
      hasDiscount: customer.hasDiscount || false,
      isVerified: customer.isVerified || false,
      name: customer.name || '',
      phone: customer.phone || '',
      state: customer.state || '',
      submit: null
    },
    validationSchema: Yup.object({
      address1: Yup.string().max(255),
      address2: Yup.string().max(255),
      country: Yup.string().max(255),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      hasDiscount: Yup.bool(),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      phone: Yup.string().max(15),
      state: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Customer updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });



  return (
    <div style={{minWidth: "100%", marginTop: "1rem"  }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link
          color="text.primary"
          component={RouterLink}
          href={paths.dashboard.products.view}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline="none"
        >
          <SvgIcon sx={{ mr: 1, width: 38, height: 38,  transition: 'color 0.5s','&:hover': { color: `${primaryColor}` }}}>
            <ArrowCircleLeftOutlinedIcon/>
          </SvgIcon>
          <Typography variant="subtitle2">
            Back To <span style={{color: `${primaryColor}` , fontWeight: 600}}>Product List</span> 
          </Typography>
        </Link>
        <IconWithPopup/>
      </div>
 <h2>Product</h2>
      <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Product Detail" />
        <PropertyList>
        <PropertyListItem
          align={align}
          label="Name"
        >
          <Typography variant="subtitle2">
            {state?.productName || state?.name}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Category"
          value={state?.category?.name}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Type"
          value={state?.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Description"
          value={state?.description}
        />
      </PropertyList>
        <Divider/>
      </Card>
    </div>
  );
};

ViewProductDetail.propTypes = {
  customer: PropTypes.object.isRequired
};