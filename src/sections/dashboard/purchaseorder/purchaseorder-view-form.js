import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import { DatePicker } from 'antd';
import { wait } from 'src/utils/wait';
import TableCreate  from './tableCreate';
import './purchase-order.css'
import { Box, Stack } from '@mui/system';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

const userOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

const data={
  userName: 'Harsh',
  type: 'Stell',
  quotation: ' ',
  deliveryDate: 23/4/2021,
  contactName: 'Nilla',
  contactno: '567892483984',
  status: 'Canceled'
}

const statusOptions = ['Canceled', 'Complete', 'Rejected'];

export const PurchaseOrderViewForm = (props) => {
  const { customer, ...other } = props;
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
    <div style={{minWidth: "100%" }}>
 <h2>View Puchase Order</h2>
      <Card style={{marginBottom: "60px" }}>
        <CardHeader title="Product Order Detail" />
        <PropertyList>
        <PropertyListItem
          align={align}
          label="userName"
        >
          <Typography variant="subtitle2">
            {data.userName}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="quotation"
          value={data.quotation}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Invoice"
          value={data.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="DeliveryDate"
          value={data.deliveryDate}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact Name"
          value={data.contactName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Contact No"
          value={data.contactno}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Status"
        >
          <Stack
            alignItems={{
              xs: 'stretch',
              sm: 'center'
            }}
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            spacing={1}
          >
            <TextField
              label="Status"
              margin="normal"
              name="status"
              // onChange={handleChange}
              select
              SelectProps={{ native: true }}
              sx={{
                flexGrow: 1,
                minWidth: 150
              }}
              value={data.status}
            >
              {statusOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </TextField>
            <Button variant="contained">
              Save
            </Button>
          </Stack>
        </PropertyListItem>
      </PropertyList>
        <Divider/>
      </Card>
    <TableCreate/>
    </div>
  );
};

PurchaseOrderViewForm.propTypes = {
  customer: PropTypes.object.isRequired
};
