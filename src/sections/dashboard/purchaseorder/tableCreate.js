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

  TableBody,
  TableCell,
  TextField,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  MenuItem,
  Icon,
} from '@mui/material';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { getInitials } from 'src/utils/get-initials';
import React from 'react';
import { Input } from 'antd';
import { Add, Delete } from '@mui/icons-material';
import Grid from 'antd/es/card/Grid';
import { compose } from 'redux';

  
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    
    {
      title: 'Cost',
      key: 'cost',
      dataIndex: 'cost',
    },
    {
        title: 'Gst',
        key: 'gst',
        dataIndex: 'gst',
      },
      {
        title: 'Cgst',
        key: 'cgst',
        dataIndex: 'cgst',
      },
      {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
      },
  ];
  
  const data = [
    {
      key: '1',
      productName: 'ASUS',
      quantity: 2,
      weight: 32,
      cost: 5678,
      gst:7,
      cgst:9,
      description: "Handle with care"
    },
    {
        key: '2',
        productName: 'Lenevo',
        quantity: 2,
        weight: 32,
        cost: 5788,
        gst:6,
        cgst:0,
        description: "Handle with care"
      },
  ];

class TableCreate extends React.Component {
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
        classes
      } = this.props;
      const {rows} =this.state;
    return (
        <>
        <Box sx={{  position: 'relative' , overflowX: "auto"}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} columns={columns} dataSource={data}></Table>
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
  {/* <label style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount :</label> */}
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : 56,78,020</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions :  This product can be sold on the said customer</Typography>

            </Grid>
        </>
    )


}
};
TableCreate.propTypes = {
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

export default TableCreate;
