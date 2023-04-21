import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  MenuItem,
  Icon
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';
import React from 'react';
import { Input } from 'antd';
import { Add, Delete } from '@mui/icons-material';
import Grid from 'antd/es/card/Grid';

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
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class ProductFormTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    rows:[{}]
 };
}
 handleChange = idx => e => {
    const {name, value} =e.target;
    const rows = {...this.state.row}
    rows[idx] ={
    ...rows[idx],
    [name]:value
 };
 this.setState({
    rows
 })
 }

 handleEmailChange = idx => e => {
    const {name, value} =e.target;
    const rows = {...this.state.row}
    rows[idx] ={
    ...rows[idx],
    email:value
 };
 this.setState({
    rows
 })
 }
 handleAddRow = () => {
    const item ={
        email:'',
        mobile:''
    }
 this.setState({
    rows: [...this.state.rows, item]
 })
 }
handleRemoveRow = idx =>() =>{
    const rows = [...this.state.rows];
    rows.splice(idx,1);
    this.setState({rows});
};
render (){
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
      } = this.props;
      const {rows} =this.state;
    return (
        <>
        <Box sx={{  position: 'relative' , overflowX: "auto"}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
              </TableCell> */}
              <TableCell sx={{ width: 200 }}>
                Product Name
              </TableCell>
              <TableCell sx={{ width: 200 }}>
                Quantity
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                Weight
              </TableCell>
              <TableCell sx={{ width: 150}}>
               Cost
              </TableCell>
              <TableCell sx={{ width: 150 }}>
               GST
              </TableCell>
              <TableCell sx={{ width: 150 }}>
              CGST
              </TableCell>
              <TableCell sx={{ width: 350 }}>
              Description
              </TableCell>
              <TableCell>
              Add
              </TableCell>
              <TableCell align="right">
              Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {rows.map((item,idx)=> (
                <TableRow
                  hover
                  key={idx}
                  // selected={isSelected}
                >
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    // label="User"
                    // name="user"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    select
                    value="Product"
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
                  {/* <Input type="text"
                name="Name"
                value={rows[idx].name}/> */}
                </TableCell>
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    // label="User"
                    // name="user"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    select
                    value="Quantity"
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
                </TableCell>
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    // label="User"
                    name="Weight"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    name="Cost"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    name="GST"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    // error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    name="CGST"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
  multiline
  rows={2}
  maxRows={4}
/>
                </TableCell>
                  <TableCell>
                    <IconButton
                      // component={RouterLink}
                      // href={paths.dashboard.customers.edit}
                      onClick={this.handleAddRow}
                    >
                      <Icon>
                        <Add />
                      </Icon>
                    </IconButton>
                    
                  </TableCell>
                <TableCell align="right">
                    <IconButton
                    disabled ={idx === 0 ? true: false}
                      // component={RouterLink}
                      // href={paths.dashboard.customers.edit}
                      onClick={this.handleRemoveRow(idx)}
                    >
                      <Icon>
                        <Delete />
                      </Icon>
                    </IconButton>
                    
                  </TableCell>
                 
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Box>
    <Grid
              xs={12}
              md={6}
            >
  <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount :</label>
  <TextField sx={{ height: 40 }}
                    // error={!!(formik.touched.category && formik.errors.category)}
                    // label="User"
                    // name="user"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                  >
                  </TextField>
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px"}}
            >
  <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions :</label>
  <TextField
  fullWidth
  multiline
  rows={4}
  maxRows={8}
/>
            </Grid>
        </>
    )


}
};
ProductFormTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
  };

export default ProductFormTable;
