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
import './customTable.css'
import { primaryColor } from 'src/primaryColor';
import EditIcon from '@mui/icons-material/Edit';


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
        name:'Name',
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
        name:'',
        width: 50,
    },
    {
        id:'delete',
        name:'',
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
      name: '',
      weight: '',
      gst: '',
      quantity: '',
      cost: '',
      cgst: '',
      description: '',
      rows: []
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

toggleForm = () => {
  this.setState((prevState) => ({
    showForm: !prevState.showForm,
  }));
};

handleModalClick = (event) => {
  if (event.target.classList.contains('modal')) {
    this.toggleForm();
  }
};

handleSubmit = (e) => {
  e.preventDefault();

  //handle popup form data
  const { name, weight, gst, quantity, cost, cgst, description } = this.state;
  const newRow = { name, weight, gst, quantity, cost, cgst, description };
  const newRows = [...this.state.rows, newRow];
  this.setState({ rows: newRows });
  this.setState({ showForm: false });

  this.setState({
    name: "",
    weight: "",
    gst: "",
    quantity: "",
    cost: "",
    cgst: "",
    description: "",
    showForm: false,
  });
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
        <div className='purchase-popup'>
        <button className='add-purchase' style={{background: `${primaryColor}`}} onClick={this.toggleForm}>Add Product</button>

        {this.state.showForm && (
          <div className="modal" onClick={this.handleModalClick}>
            <div className="modal-content">
              <h5 className='product-detail-heading'>Add Product Details</h5>
              <form className='form'>
             
              <div className='form-row'>
      
               <div className='popup-left'>

               <Grid
              xs={12}
              md={6}
            >
              <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    select
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    style={{ marginBottom: 10 }}
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
            
                  fullWidth
                  label="Weight"
                  name="weight"
                  value={this.state.weight}
                  onChange={e => this.setState({ weight: e.target.value })}
                  style={{ marginBottom: 10 }}
              
                />
               </Grid>
                <Grid
                xs={12}
                md={6}
                >
                  <TextField
            
                  fullWidth
                  label="GST"
                  name="gst"
                  value={this.state.gst}
                  onChange={e => this.setState({ gst: e.target.value })}
                  style={{ marginBottom: 10 }}
              
                  />
                </Grid>
               </div>
               <div className='popup-right'>
               <Grid
                xs={12}
                md={6}
                >
                  <TextField
            
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={e => this.setState({ quantity: e.target.value })}
                  style={{ marginBottom: 15 }}
              
                  />
                </Grid>
                <Grid
                xs={12}
                md={6}
                >
                  <TextField
            
                  fullWidth
                  label="Cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={e => this.setState({ cost: e.target.value })}
                  style={{ marginBottom: 10 }}
              
                  />
                </Grid>
                <Grid
                xs={12}
                md={6}
                >
                  <TextField
            
                  fullWidth
                  label="CGST"
                  name="cgst"
                  value={this.state.cgst}
                  onChange={e => this.setState({ cgst: e.target.value })}
                  style={{ marginBottom: 16 }}
              
                  />
                </Grid>
               </div>  
               </div>
               <Grid
              xs={12}
              md={6}
              >
                  <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                  style={{ marginBottom: 10 }}
                />
               </Grid>
              
              <div className='submit-purchase'><button  style={{background: `${primaryColor}`}} className='submit' type="submit" onClick={this.handleSubmit}>Save</button></div>
       
              </form>
            </div>
          </div>
        )}
      </div>
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
          {this.state.rows.map((row, idx) => (
            <TableRow hover key={idx}>
              <TableCell >
                <div>{row.name}</div>
              </TableCell>
              <TableCell>
                <div>{row.quantity}</div>
              </TableCell>
              <TableCell>
                <div>{row.weight}</div>
              </TableCell>
              <TableCell>
                <div>{row.cost}</div>
              </TableCell>
              <TableCell>
                <div>{row.gst}</div>
              </TableCell>
              <TableCell>
                <div>{row.cgst}</div>
              </TableCell>
              <TableCell>
                <div>{row.description}</div>
              </TableCell>
              <TableCell>
                <IconButton onClick={this.handleAddRow}>
                  <Icon>
                    <EditIcon/>
                  </Icon>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={this.handleRemoveRow(idx)}
                >
                  <Icon>
                    <Delete />
                  </Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
    <br></br>
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
