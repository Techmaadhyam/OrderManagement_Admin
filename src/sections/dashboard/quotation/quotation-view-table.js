import PropTypes from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Table } from 'antd';
import './purchase-order.css'
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';


const userOptions = [
    {
      label: 'Buy',
      value: 'buy'
    },
    {
      label: 'Sell',
      value: 'sell'
    },
  ];

const columns = [
  {
    title: 'Quotation Order Number',
    dataIndex: 'purchaseOrder',
    key: 'purchaseOrder',
    render: (name) => <Link
    color="primary"
    component={RouterLink}
    href={paths.dashboard.quotation.viewDetail}
    sx={{
      alignItems: 'center',
      textAlign: 'center'
      // display: 'inline-flex'
    }}
    underline="hover"
  >
    <Typography variant="subtitle2">
   {name}
    </Typography>
  </Link>
  },
  {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
      },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  
  
  {
      title: 'Created Date',
      key: 'createdDate',
      dataIndex: 'createdDate',
    },
    {
      title: 'Last Modified Date',
      key: 'lastModified',
      dataIndex: 'lastModified',
    },
    {
      dataIndex: 'actionEdit',
      key: 'actionEdit',
    render: () => <Link
    component={RouterLink}
    href={paths.dashboard.quotation.edit}
  >
    <IconButton>
  <Icon>
         <EditIcon />
     </Icon>
     </IconButton>
  </Link>
    },
    {
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, __, index) =>  <IconButton
       onClick={() => this.handleRemoveRow(index)}
     >
       <Icon>
         <Delete />
       </Icon>
     </IconButton>
    },
];

const data = [
  {
    key: '1',
    purchaseOrder: '12345',
    status: "Completed",
    user: 'Harsh',
    type: 'Buy',
    createdDate:'16/02/2023',
    lastModified:'3/03/2023',
  },
];

class QuotationViewTable extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        type:'',
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
handleSelectChange = e => () =>{
    this.setState({type: e.target.value})
}
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
    const {rows, type} =this.state;
  return (
    <div style={{ minWidth: "100%" }}>
 <h2>View Quotation</h2>
      <TextField
                    sx={{ minWidth: 350 }}
                    label="Type"
                    name="type"
                    onChange={this.handleSelectChange}
                    select
                    // value={formik.values.category}
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
 <Box sx={{  position: 'relative' , overflowX: "auto", marginTop:'30px'}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} columns={columns} dataSource={data}></Table>
      </Scrollbar>
    </Box>
    {/* <Grid
              xs={12}
              md={6}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Total Amount : 56,78,020</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              style={{marginTop: "20px", marginBottom: "30px"}}
            >
  <Typography style={{ fontFamily:"Arial, Helvetica, sans-serif", fontSize:"14px", marginRight: '6px', color:'black', fontWeight:"bold"}}>Terms &Conditions :  This product can be sold on the said customer</Typography>

            </Grid> */}
    </div>
  );
    }
};

QuotationViewTable.propTypes = {
  customer: PropTypes.object.isRequired
};

export default QuotationViewTable;