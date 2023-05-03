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
  Unstable_Grid2 as Grid
} from '@mui/material';
import { DatePicker } from 'antd';
import { wait } from 'src/utils/wait';
import './warehouse.css'
import { Box } from '@mui/system';

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

export const CreateWarehouse = (props) => {
  const { customer, ...other } = props;
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
    <div style={{minWidth: "100%", marginBottom: '1rem' }}>
 <h2>Create Warehouse</h2>
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Warehouse Detail" />
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                   
                    value={formik.values.category}
                  >
                  </TextField>
              {/* <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              /> */}
            </Grid>
            <Grid/>
            <Grid
              xs={12}
              md={6}
            >
                <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Address"
                    name="address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    multiline
                    rows={2}
                    value={formik.values.category}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
                <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Country"
                    name="country"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="State"
                    name="state"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                >
                    {userOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="City"
                name="city"
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Zip Code"
                name="zipcode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>

          </Grid>
          <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px"}}
            > 
                <TextField
                fullWidth
                label= "Description"
                multiline
                rows={4}
                maxRows={6}
                />
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
                
                    >
                    Save
                    </Button>
            </Box>
          </Grid>
    </div>
  );
};

CreateWarehouse.propTypes = {
  customer: PropTypes.object.isRequired
};