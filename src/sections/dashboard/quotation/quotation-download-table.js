
import {
  Typography,
  IconButton,
  Icon,
  Link,
  MenuItem,
  TextField,
  InputBase
} from '@mui/material';
import { Table } from 'antd';
import './purchase-order.css'
import { Box } from '@mui/system';
import React from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import EditIcon from '@mui/icons-material/Edit';
import {  Delete } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import IconWithPopup from '../user/user-icon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import imgUrl from '../pdfAssets/imageDataUrl';


const userId = sessionStorage.getItem('user') || localStorage.getItem('user');

const categoryBuySell = [
   
  {
    label: 'Purchase Quotation',
    value: 'Purchase Quotation'
  },
  {
    label: 'Sales Quotation',
    value: 'Sales Quotation'
  },
  {
    label: 'Service Quotation',
    value: 'Service Quotation'
  }
];

const QuotationDownloadTable = () => {
  const [userData, setUserData]= useState([])
  const [userData1, setUserData1]= useState([])
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quotationData, setQuotationData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');


  const navigate = useNavigate();
  
 
  useEffect(() => {
    axios.get(`http://13.115.56.48:8080/techmadhyam/getAllQuotations/${userId}`)
      .then(response => {
        setUserData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const formattedArray = userData?.map((item) => {
    const formattedItem = { ...item }; 
  
    if (formattedItem.createdDate) {
      formattedItem.createdDate = formatDate(formattedItem.createdDate);
    }
  
    if (formattedItem.lastModifiedDate) {
      formattedItem.lastModifiedDate = formatDate(formattedItem.lastModifiedDate);
    }
  
    if (formattedItem.deliveryDate) {
      formattedItem.originalDeliveryDate =formattedItem.deliveryDate
      formattedItem.deliveryDate = formatDate(formattedItem.deliveryDate);
    }
  
    return formattedItem;
  });

  const dataWithKeys = formattedArray?.map((item) => ({ ...item, key: item.id }));

  const filteredData = selectedCategory
  ? dataWithKeys.filter((item) => item.category === selectedCategory)
  : dataWithKeys;

const handleCategoryChange = (event) => {
  setSelectedCategory(event.target.value);
};

  //toast notification from toastify library
  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
 //delete row
  const handleRemoveRow = (id) => async () => {
    try {
      await axios.delete(`http://13.115.56.48:8080/techmadhyam/deleteQuotationId/${id}`);
      const updatedRows = userData.filter(item => item.id !== id);
      setUserData(updatedRows);
      notify(
        "success",
        `Sucessfully deleted row with quotation order number: ${id}.`
      );
    } catch (error) {
      console.error('Error deleting row:', error.message);
    }
  };

  const handleNavigation = record => {
    if (record.category === 'Sales Quotation' || record.category === 'Purchase Quotation') {
      navigate('/dashboard/quotation/edit', { state: record });
    } else if (record.category === 'Service Quotation') {
      navigate('/dashboard/quotation/editService', { state: record });
    }
  };
  //company search
const handleCompanyClick = () => {
  setIsSearching(true);
};

const handleCompanyInputChange = event => {
  setSearchText(event.target.value);
};

const handleCompanyCancel = () => {
  setIsSearching(false);
  setSearchText('');
};



  //get company name
useEffect(() => {
  const request1 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllTempUsers/${userId}`);
  const request2 = axios.get(`http://13.115.56.48:8080/techmadhyam/getAllUsersBasedOnType/${userId}`);

  Promise.all([request1, request2])
    .then(([response1, response2]) => {
      const tempUsersData = response1.data;
      const usersData1 = response2.data;
      const combinedData = [...tempUsersData, ...usersData1];
      setUserData1(combinedData);
     
    })
    .catch(error => {
      console.error(error);
    });
}, []);

const updatedUser = filteredData?.map((item) => {
  if (item.tempUserId !== 0) {
    const matchedCompany = userData1.find(
      (u) => u.id === item.tempUserId || u.id === item.userId
    );
    if (matchedCompany) {
      return { ...item, companyName: matchedCompany.companyName };
    }
  }
  return item;
});
  
const filteredList = updatedUser.filter(product => {
  const companyMatch = product.companyName?.toLowerCase().includes(searchText.toLowerCase());
 
  return companyMatch
});

const handleQuotation = async (record) => {
  console.log(record);
  try {
    const response = await axios.get(`http://13.115.56.48:8080/techmadhyam/getAllQuotationDetails/${record.id}`);
    const tempResponse = await axios.get(`http://13.115.56.48:8080/techmadhyam/getTempUserById/${record.tempUserId}`);
    const temp = tempResponse.data;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
    worksheet.properties.defaultRowHeight = 15;
    worksheet.properties.defaultColWidth = 12;
    worksheet.properties.tabColor = { argb: 'FFFFFFFF' };
    worksheet.views = [{
      showGridLines: false
    }];

    
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'QUOTATION';
    titleCell.font = { size: 27, bold: true, name: 'Arial' };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '87CEEB' }, // Sky blue color
    };
    worksheet.mergeCells('A1:L1');
    worksheet.mergeCells('A2:B6');
    const image = workbook.addImage({
      base64: imgUrl,
      extension: 'png',
    });
    worksheet.addImage(image, {
      tl: { col: 0, row: 1.2},
      ext: { width: 167, height: 100 },
    });
    const infoData = [
      ['Quotation Date:', `${record.createdDate}`], 
      ['Quotation No.:', `${record.id}`], 
      ['Customer Name:', `${temp.firstName} ${temp.lastName}`], 
      ['Customer Contact:', `${temp.mobile}`], 
    ];
    
    infoData.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, colIndex) => {
        const cell = worksheet.getCell(rowIndex + 3, colIndex + 7);
        cell.value = cellData;
        cell.font = { size: 10, bold: true, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    });
    worksheet.mergeCells('C7:F7');
    const tableOneData = [
      ['Name:', `${record.createdByUser.companyName}`], 
      ['Address:', `${record.createdByUser.address} ${record.createdByUser.city} ${record.createdByUser.state} ${record.createdByUser.country}`], 
      ['Contact:', `${record.createdByUser.mobile}`], 
      ['Email:', `${record.createdByUser.emailId}`], 
      ['GSTIN:', `${record.createdByUser.gstNumber}`], 
    ];
    tableOneData.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, colIndex) => {
        const cell = worksheet.getCell(rowIndex + 9, colIndex + 3);
        cell.value = cellData;
        cell.font = { size: 10, bold: true, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    });
    worksheet.getCell('C7').value = 'Company Address';
    worksheet.getCell('C7').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '87CEEB' }, // Sky blue color
    };
    worksheet.getCell('C7').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell('C7').font = { size: 10, bold: true, name: 'Arial' };
    worksheet.getCell('I7').font = { size: 10, bold: true, name: 'Arial' };
    worksheet.getCell('I7').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.mergeCells('C8:F8');
    worksheet.mergeCells('C14:F14');
    worksheet.mergeCells('D9:F9');
    worksheet.mergeCells('D10:F10');
    worksheet.mergeCells('D11:F11');
    worksheet.mergeCells('D12:F12');
    worksheet.mergeCells('D13:F13');
    
    worksheet.mergeCells('I7:L7');
    const tableTwoData = [
      ['Name:', `${temp.firstName} ${temp.lastName}`], 
      ['Address:', `${temp.address} ${temp.city} ${temp.state} ${temp.country}`], 
      ['Contact:', `${temp.mobile}`], 
      ['Email:', `${temp.emailId}`], 
      ['GSTIN:', `${temp.gstNumber}`], 
    ];
    tableTwoData.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, colIndex) => {
        const cell = worksheet.getCell(rowIndex + 9, colIndex + 9);
        cell.value = cellData;
        cell.font = { size: 10, bold: true, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      });
    });
    worksheet.getCell('I7').value = 'Customer Address';
    worksheet.getCell('I7').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '87CEEB' }, // Sky blue color
    };
    worksheet.mergeCells('I8:L8');
    worksheet.mergeCells('I14:L14');
    worksheet.mergeCells('J9:L9');
    worksheet.mergeCells('J10:L10');
    worksheet.mergeCells('J11:L11');
    worksheet.mergeCells('J12:L12');
    worksheet.mergeCells('J13:L13');

    // Set Border for tables
    const tableBorder = { style: 'medium', color: { argb: '80808080' } };
    
    // Set border for cells E8 to E14 (left border)
    for (let row = 8; row <= 14; row++) {
      worksheet.getCell(`I${row}`).border = { left: tableBorder };
    }
    // Set border for cells G8 to G14 (right border)
    for (let row = 8; row <= 14; row++) {
      worksheet.getCell(`L${row}`).border = { right: tableBorder };
    }
    for (let row = 8; row <= 14; row++) {
      worksheet.getCell(`C${row}`).border = { left: tableBorder };
    }
    // Set border for cells G8 to G14 (right border)
    for (let row = 8; row <= 14; row++) {
      worksheet.getCell(`F${row}`).border = { right: tableBorder };
    }
    worksheet.getCell('C14').border = { bottom: tableBorder ,left: tableBorder, right: tableBorder};
    worksheet.getCell('C8').border = { left: tableBorder , right: tableBorder};
    worksheet.getCell('I14').border = { bottom: tableBorder ,left: tableBorder, right: tableBorder};
    worksheet.getCell('I8').border = { left: tableBorder , right: tableBorder};
    worksheet.getCell('I7').border = {
      top: tableBorder,
      left: tableBorder,
      bottom: tableBorder,
      right: tableBorder,
    };
    
    // Set border for cell A7 (top, bottom, left, right borders)
    worksheet.getCell('C7').border = {
      top: tableBorder,
      left: tableBorder,
      bottom: tableBorder,
      right: tableBorder,
    };
    worksheet.getRow(16).height = 45;
    worksheet.mergeCells('A16:L16');
    worksheet.getCell('A16').value = `Note/Remarks: ${record.comments}`;
    worksheet.getCell('A16').font = { size: 10, bold: true, name: 'Arial' };
    worksheet.getCell('A16').alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getCell('A16').border = {
      top: tableBorder,
      left: tableBorder,
      bottom: tableBorder,
      right: tableBorder,
    };
    const table2Headers = [
      'S.No.',
      'PRODUCT NAME',
      'DESCRIPTION',
      'HSN/SAC',
      'QUANTITY',
      'WEIGHT',
      'SIZE',
      'COST',
      'CGST',
      'SGST',
      'IGST',
      'AMOUNT',
    ];
    table2Headers.forEach((header, index) => {
      worksheet.getCell(18, index + 1).value = header;
      worksheet.getCell(18, index + 1).font = { bold: true, size: 9, name: 'Arial' };
      worksheet.getCell(18, index + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '87CEEB' },
      };
      if (index !==  0&& index !== 1) {
        worksheet.getColumn(index + 1).width = header.length + 8;
      }
      worksheet.getColumn(2).width = 16;
      worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 20;
    });
    for (let row = 18; row <= 18; row++) {
      for (let col = 1; col <= 12; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: tableBorder,
          // left: tableBorder,
          bottom: tableBorder,
          right: { style: 'thin', color: { argb: '80808080' } },
        };
      }
    }
    worksheet.getCell('A18').border = {
      top: tableBorder,
      left: tableBorder,
      bottom: tableBorder,
      right: { style: 'thin', color: { argb: '80808080' } },
    };
    worksheet.getCell('L18').border = {
      top: tableBorder,
      left: { style: 'thin', color: { argb: '80808080' } },
      bottom: tableBorder,
      right: tableBorder,
    };
    const rowData = response.data.map((product, index) => {
      const totalAmount = (
        product.price * product.quantity +
        (product.price * product.quantity * product.cgst) / 100 +
        (product.price * product.quantity * product.sgst) / 100 +
        (product.price * product.quantity * product.igst) / 100
      ).toFixed(2);

      return {
        id: index + 1,
        productName: product.productName,
        productDescription: product.description,
        hsn: product.id,
        quantity: product.quantity,
        weight: product.weight,
        size: product.size,
        price: product.price,
        cgst: product.cgst,
        sgst: product.sgst,
        igst: product.igst,
        total: totalAmount,
      };
    });
    rowData.forEach((row, rowIndex) => {
      Object.keys(row).forEach((key, columnIndex) => {
        const cell = worksheet.getCell(19 + rowIndex, columnIndex + 1);
        cell.value = row[key];
        cell.font = { bold: true, size: 9, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
          top: tableBorder,
          left: tableBorder,
          bottom: tableBorder,
          right: tableBorder,
        };
      });
    });
    const editableRow = worksheet.lastRow.number + 2;
    const thankYouCell = worksheet.getCell(editableRow, 2);
    thankYouCell.value = 'THANK YOU FOR YOUR BUSINESS!';
    thankYouCell.font = { bold: true, size: 9, name: 'Arial' };

    const signatureCell = worksheet.getCell(editableRow + 1, 2);
    signatureCell.value = 'Signature/Stamp:';
    signatureCell.font = { size: 9, name: 'Arial' };

    const placeCell = worksheet.getCell(editableRow + 2, 2);
    placeCell.value = 'Place:';
    placeCell.font = { size: 9, name: 'Arial' };
    const placeCell2 = worksheet.getCell(editableRow + 2, 3);
    placeCell2.value = 'Hyderabad';
    placeCell2.font = { size: 9, name: 'Arial' };

    const DateCell = worksheet.getCell(editableRow + 3, 2);
    DateCell.value = `Date:`;
    DateCell.font = { size: 9, name: 'Arial' };
    
    const DateCell2 = worksheet.getCell(editableRow + 3, 3);
    const currentDate = new Date();
    DateCell2.value = `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}`
    worksheet.mergeCells(`B${editableRow}:C${editableRow}`);
    DateCell2.font = { size: 9, name: 'Arial' };
   
    // Save the workbook as a file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'table.xlsx';
      a.click();
    });
  } catch (error) {
    console.log(error);
  }
};

  const columns = [
    {
      title: 'Quotation Order Number',
      dataIndex: 'id',
      key: 'id',
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/quotation/viewDetail`, { state: record });
        };
        
        return (
          <Link
            color="primary"
            onClick={handleNavigation}
            sx={{
              alignItems: 'center',
              textAlign: 'center',
            }}
            underline="hover"
          >
            <Typography variant="subtitle1">{name}</Typography>
          </Link>
        );
      },
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!isSearching ? (
            <>
              <Typography variant="subtitle2">Company Name</Typography>
              <IconButton onClick={handleCompanyClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={searchText}
                onChange={handleCompanyInputChange}
                placeholder="Search company..."
              />
              <IconButton onClick={handleCompanyCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
    ),
      key: 'companyName',
      dataIndex: 'companyName',
    },
    {
      title: 'Order Modified Date',
      key: 'lastModifiedDate',
      dataIndex: 'lastModifiedDate',
    },
    {
      title: 'Order Date',
      key: 'createdDate',
      dataIndex: 'createdDate',
    },
    {
      title: 'Delivery Date',
      key: 'deliveryDate',
      dataIndex: 'deliveryDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    },
    {
      dataIndex: 'actionEdit',
      key: 'actionEdit',
       render: (_, record) => (
        <IconButton onClick={() => handleNavigation(record)}>
          <Icon>
            <EditIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
      dataIndex: 'quotation',
      key: 'quotation',
      render: (_, record) => (
        <IconButton  onClick={() => handleQuotation(record)}>
          <Icon>
              <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, row) => (
        <IconButton onClick={handleRemoveRow(row.id)}>
          <Icon>
            <Delete />
          </Icon>
        </IconButton>
      ),
    },
  ];


   

  return (
    <div style={{ minWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Download Quotation Order</h2>
        <IconWithPopup/>
      </div>
      
      <TextField

      label="Category"
      name="category"
      sx={{ minWidth: 250 }}
      value={selectedCategory}
      onChange={handleCategoryChange}


      select
      >
     <MenuItem value="">All</MenuItem>
        {categoryBuySell.map((option) => (
          <MenuItem key={option.value} 
          value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <Box sx={{  position: 'relative' , overflowX: "auto", marginTop:'30px'}}>
 
           
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: 'auto'}}
            columns={columns}
            dataSource={filteredList}
            rowClassName={() => 'table-data-row'}
            ></Table>
            </Scrollbar>
            <ToastContainer
                     position="top-right"
                     autoClose={2000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"/>
          </Box>
        </div>
      );
    };
    
    export default  QuotationDownloadTable;