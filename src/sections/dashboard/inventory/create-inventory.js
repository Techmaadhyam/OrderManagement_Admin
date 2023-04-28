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
import './inventory.css'
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

export const CreateInventory = (props) => {
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
 <h2>Create Inventory</h2>
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Inventory Detail" />
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
                    label="Warehouse"
                    name="warehouse"
                    select
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Purchase Order"
                    name="purchaseorder"
                    select
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Category"
                    name="category"
                    select
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Rack"
                    name="rack"
                    select
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="Product"
                    name="product"
                    select
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    label="HSN Code"
                    name="hsncode"
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
                error={!!(formik.touched.address1 && formik.errors.address1)}
                fullWidth
                helperText={formik.touched.address1 && formik.errors.address1}
                label="Size"
                name="size"
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
                label="Weight"
                name="weight"
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
                label="Quantity"
                name="quantity"
                type='number'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                label="Cost"
                name="cost"
                type='number'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                label="GST"
                name="gst"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
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
                label="CGST"
                name="cgst"
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

CreateInventory.propTypes = {
  customer: PropTypes.object.isRequired
};