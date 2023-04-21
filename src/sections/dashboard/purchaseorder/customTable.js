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
const tableHeader=[
    {
        id:'product_name',
        name:'Product Name',
        width: 200,
    },
    {
        id:'quantity',
        name:'Quantity',
        width: 200,
    },
    {
        id:'weight',
        name:'Weight',
        width: 150,
    },
    {
        id:'cost',
        name:'Cost',
        width: 150,
    },
    {
        id:'gst',
        name:'GST',
        width: 150,
    },
    {
        id:'cgst',
        name:'CGST',
        width: 150,
    },
    {
        id:'description',
        name:'Description',
        width: 350,
    },
    {
        id:'add',
        name:'Add',
        width: 50,
    },
    {
        id:'delete',
        name:'Delete',
        width: 50,
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

class CustomTable extends React.Component {
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
            {tableHeader.map((item,idx)=> (
                    <TableCell sx={{ width: item.width }}
key={idx}>
                    {item.name}
                  </TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
           {rows.map((item,idx)=> (
                <TableRow
                  hover
                  key={idx}
                >
                <TableCell>
                <TextField
                    fullWidth
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
                </TableCell>
                <TableCell>
                <TextField
                    fullWidth
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
                    fullWidth
                    name="Weight"
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    fullWidth
                    name="Cost"
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    fullWidth
                    name="GST"
                  >
                  </TextField>
                </TableCell>
                <TableCell>
                <TextField
                    fullWidth
                    name="CGST"
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
CustomTable.propTypes = {
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

export default CustomTable;
