import PropTypes from 'prop-types';
import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link
} from '@mui/material';
import { Table } from 'antd';
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import IconWithPopup from '../user/user-icon';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <Link
    color="primary"
    component={RouterLink}
    href={paths.dashboard.logistics.viewDetail}
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
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Company',
    key: 'company',
    dataIndex: 'company',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
  },
  {
    dataIndex: 'actionEdit',
    key: 'actionEdit',
    render: () => 
    <IconButton>
    <Icon>
        <EditIcon />
    </Icon>
    </IconButton>

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
    name: "Max",
    email: 'test@xyz.com',
    type: 'test type',
    company:'xyz company',
    address:'Street:  277, I S Sadan X Road, Santoshnagar, Hyderabad, Andhra Pradesh, India'
  },
];

class ViewTemporaryUser extends React.Component {
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
    <div style={{minWidth: "100%" }}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2>View Temporary User</h2>
      <IconWithPopup/>
    </div>
 <Box sx={{  position: 'relative' , overflowX: "auto"}}>    
      <Scrollbar>
        <Table sx={{ minWidth: 800,overflowX: "auto" }} columns={columns} dataSource={data}></Table>
      </Scrollbar>
</Box>
    </div>
  );
    }
};

ViewTemporaryUser.propTypes = {
  customer: PropTypes.object.isRequired
};

export default ViewTemporaryUser;
