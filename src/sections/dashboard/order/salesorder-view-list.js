import {
  Typography,
  IconButton,
  Icon,
  Link,
  InputBase,
  TextField,
  MenuItem,
} from "@mui/material";
import { Table } from "antd";
import "./sales-order.css";
import { Box, border } from "@mui/system";
import React from "react";
import { Scrollbar } from "src/components/scrollbar";
import DownloadIcon from "@mui/icons-material/Download";
import IconWithPopup from "../user/user-icon";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import { apiUrl } from "src/config";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import imgUrl from "../pdfAssets/imageDataUrl.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../pdfAssets/vfs_fonts";

const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Inter: {
    normal: "Inter-Regular.ttf",
    bold: "Inter-Bold.ttf",
    light: "Inter-Light.ttf",
    medium: "Inter-Medium.ttf",
  },
};
const customerType = [
  {
    label: "Customer",
    value: "Customer",
  },
  {
    label: "Vendor",
    value: "Vendor",
  },
];

const SalesOrderViewList = () => {
  const [userData, setUserData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [tempGstNumber, setTempGstNumber] = useState(null);
  const [mainGstNumber, setmainGstNumber] = useState(null);
  const [userMain, setUserMain] = useState(true);
  const [userData1, setUserData1] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [selectedType, setSelectedType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + `getAllSalesOrderDetailByUser/${userId}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const numberToWords = require("number-to-words");
  const convertAmountToWords = (amount) => {
    const rupees = Math.floor(amount);
    const paisa = Math.round((amount - rupees) * 100);

    const rupeesInWords = numberToWords.toWords(rupees); // Convert rupees to words
    const paisaInWords = numberToWords.toWords(paisa); // Convert paisa to words

    let result = "";

    if (rupees > 0) {
      result += `${rupeesInWords} rupees`;
    }

    if (paisa > 0) {
      if (rupees > 0) {
        result += " and ";
      }
      result += `${paisaInWords} paisa`;
    }

    return result;
  };

  // Example usage:
  // const number = 1234.56;
  // const words = convertNumberToWords(number);
  // console.log(words); // Output: "one thousand two hundred thirty-four rupees and fifty-six paisas"

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const formattedArray = userData?.map((item) => {
    const formattedItem = { ...item };

    if (formattedItem.createdDate) {
      formattedItem.originalcreatedDate = formattedItem.createdDate;
      formattedItem.createdDate = formatDate(formattedItem.createdDate);
    }

    if (formattedItem.lastModifiedDate) {
      formattedItem.lastModifiedDate = formatDate(
        formattedItem.lastModifiedDate
      );
    }

    if (formattedItem.deliveryDate) {
      formattedItem.originalDeliveryDate = formattedItem.deliveryDate;
      formattedItem.deliveryDate = formatDate(formattedItem.deliveryDate);
    }

    return formattedItem;
  });

  const dataWithKeys = formattedArray?.map((item) => ({
    ...item,
    companyName: item.tempUser?.companyName || item.companyuser?.companyName,
    key: item.id,
  }));

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

  const handleRemoveRow = (id) => async () => {
    try {
      await axios.delete(apiUrl + `deleteSalesOrderId/${id}`);
      const updatedRows = userData.filter((item) => item.id !== id);
      setUserData(updatedRows);
      notify(
        "success",
        `Sucessfully deleted row with sales order number: ${id}.`
      );
    } catch (error) {
      console.error("Error deleting row:", error.message);
    }
  };

  const handleNavigation = (record) => {
    navigate("/dashboard/orders/edit", { state: record });
  };

  //company search
  const handleCompanyClick = () => {
    setIsSearching(true);
  };

  const handleCompanyInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCompanyCancel = () => {
    setIsSearching(false);
    setSearchText("");
  };

  const filteredList = dataWithKeys.filter((product) => {
    const companyMatch = product.companyName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    return companyMatch || !product.hasOwnProperty("companyName");
  });

  const filteredData = selectedType
    ? filteredList.filter((item) => item.type === selectedType)
    : filteredList;

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleInvoicePdf = async (record, heading, dateData, noData) => {
    console.log(record);
    try {
      const response = await axios.get(
        apiUrl + `getAllSalesOrderDetails/${record.id}`
      );
      setInvoiceData(response.data);
      console.log(response.data);

      const rowData = response.data.map((product, index) => {
        let invent = JSON.parse(product.inventory);
        let TotalBD = product.price * product.quantity;
        let TotalAD = TotalBD - product.discountAmount;
        let TotalGST = product.cgst + product.sgst + product.igst;
        let TotalGSTAmount = (TotalAD * TotalGST) / 100;
        return [
          index + 1,
          product.description,
          invent.hsncode,
          product.price,
          product.quantity,
          TotalBD,
          product.discountAmount,
          TotalAD,
          product.cgst,
          product.sgst,
          product.igst,
          TotalAD + TotalGSTAmount,
        ];
      });
      const docDefinition = {
        pageOrientation: "landscape",
        defaultStyle: {
          font: "Inter",
        },
        content: [
          {
            columns: [
              {
                image: imgUrl,
                width: 100,
                alignment: "left",
              },
              {
                stack: [
                  {
                    text: `${record.createdByUser.companyName}`,
                    style: "header",
                  },
                  {
                    text: `${record.createdByUser.address}, ${record.createdByUser.city}, ${record.createdByUser.pincode}, ${record.createdByUser.state}, ${record.createdByUser.country}`,
                    style: "subheader",
                  },
                  {
                    text: `GSTIN: ${record.createdByUser.gstNumber}`,
                    style: "subheader",
                  },
                ],
                margin: [20, 0, 0, 0],
              },

              { text: "ORIGINAL", style: "header", alignment: "center" },

              { text: heading, style: "header", alignment: "right" },
            ],
          },
          {
            style: "newTable",

            table: {
              widths: ["*", "auto", "auto", "auto", "auto", "auto"],
              body: [
                [
                  { text: "", border: [false, false, false, false] },
                  {
                    text: `${noData} Number:`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: `${dateData}:`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer ID:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer Contact:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer PO No.:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                ],
                [
                  { text: "", border: [false, false, false, false] },
                  {
                    text: record.id,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: formatDate(record.createdDate),
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.tempUser.id,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.contactPhone,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.pinCode,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                ],
              ],
            },
          },
          {
            style: "infoTable",
            table: {
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  {
                    text: `Bill To: ${record.tempUser.companyName}`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: `Ship To: ${record.contactPerson}`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer GST Registration information",
                    style: "tableLabel",
                  },
                  {
                    text: "Mode of Dispatch: Courier",
                    style: "tableLabel",
                    border: [true, true, true, true],
                  },
                ],
                [
                  {
                    text: `${record.tempUser.address}, ${record.tempUser.city}, ${record.tempUser.state},${record.tempUser.pincode}, ${record.tempUser.country}`,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: `${record.deliveryAddress}, ${record.city}, ${record.state}, ${record.pinCode}, ${record.country}`,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.tempUser.gstNumber,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: `Mode of Payment: ${record.paymentMode}`,
                    style: "tableLabel",
                    border: [true, false, true, false],
                  },
                ],
              ],
            },
          },
          {
            style: "table",
            table: {
              widths: [
                "auto",
                "*",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              body: [
                [
                  { text: "S.No.", style: "tableLabel" },
                  { text: "Part No./Product Description", style: "tableLabel" },
                  { text: "HSN/SAC Code", style: "tableLabel" },
                  { text: "Unit Price", style: "tableLabel" },
                  { text: "Qty", style: "tableLabel" },
                  { text: "Total before Discount", style: "tableLabel" },
                  { text: "Discount", style: "tableLabel" },
                  { text: "Total", style: "tableLabel" },
                  { text: "CGST", style: "tableLabel" },
                  { text: "SGST", style: "tableLabel" },
                  { text: "IGST", style: "tableLabel" },
                  { text: "Line Total", style: "tableLabel" },
                ],
                ...rowData,
              ],
            },
          },
          {
            table: {
              heights: [50],
              widths: ["*", "*"],
              body: [
                [
                  {
                    text: "REMARKS",
                    alignment: "left",
                    style: "tableLabel",
                    border: [true, false, false, true],
                    margin: [0, 10, 0, 0],
                  },

                  {
                    stack: [
                      {
                        text: `Total: ${record.totalAmount}`,
                        alignment: "right",
                        style: "tableLabel",
                      },
                      {
                        text: `Total in words: ${convertAmountToWords(
                          record.totalAmount
                        )}`,
                        alignment: "right",
                        style: "tableLabel",
                      },
                    ],
                    border: [false, false, true, true],
                    margin: [0, 20, 20, 0],
                  },
                ],
              ],
            },
          },
          {
            table: {
              widths: ["*", "*", "*"],
              body: [
                [
                  {
                    stack: [
                      {
                        text: "Terms & Conditions",
                        bold: true,
                        style: "tableLabel",
                      },
                      {
                        text: `${record.termsAndCondition}`,
                        style: "tableLabel",
                      },
                    ],
                    border: [true, false, false, true],
                    margin: [0, 20, 0, 0],
                    alignment: "left",
                  },

                  {
                    stack: [
                      {
                        text: `Received In Good Condition`,
                        bold: true,
                        style: "tableLabel",
                      },
                      {
                        text: `Customer Signature`,
                        margin: [0, 40, 0, 0],
                        style: "tableLabel",
                      },
                    ],
                    border: [false, false, false, true],
                    margin: [0, 20, 0, 0],
                    alignment: "center",
                  },
                  {
                    stack: [
                      {
                        text: `${record.createdByUser.companyName}`,
                        bold: true,
                        alignment: "center",
                        style: "tableLabel",
                      },
                      {
                        text: `Authorize Signature`,
                        margin: [0, 40, 0, 0],
                        alignment: "center",
                        style: "tableLabel",
                      },
                    ],
                    border: [false, false, true, true],
                    margin: [0, 20, 0, 0],
                    alignment: "right",
                  },
                ],
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            margin: [0, 0, 0, 5],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            marginBottom: 5,
          },
          tableLabel: {
            bold: true,
            // border: [false, false, false, true],
          },
          tableCell: {
            fillColor: "#ffffff",
          },
          tableHeader: {
            fillColor: "#eeeeee",
            bold: true,
          },
        },
      };

      pdfMake.createPdf(docDefinition).download("invoice.pdf");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChallanPdf = async (record) => {
    console.log(record);
    try {
      const response = await axios.get(
        apiUrl + `getAllSalesOrderDetails/${record.id}`
      );
      setInvoiceData(response.data);
      console.log(response.data);
      const rowData = response.data.map((product, index) => {
        //  let invent = JSON.parse(product.inventory);
        return [index + 1, product.description, "", product.quantity];
      });
      const docDefinition = {
        pageOrientation: "landscape",
        defaultStyle: {
          font: "Inter",
        },
        content: [
          {
            columns: [
              {
                image: imgUrl,
                width: 150,
                alignment: "left",
              },
              {
                stack: [
                  {
                    text: `${record.createdByUser.companyName}`,
                    style: "header",
                  },
                  {
                    text: `${record.createdByUser.address}, ${record.createdByUser.city}, ${record.createdByUser.pincode}, ${record.createdByUser.state}, ${record.createdByUser.country}`,
                    style: "subheader",
                  },
                  {
                    text: `GSTIN: ${record.createdByUser.gstNumber}`,
                    style: "subheader",
                  },
                ],
                margin: [20, 0, 0, 0],
              },

              { text: "ORIGINAL", style: "header", alignment: "center" },

              { text: "DELIVERY CHALLAN", style: "header", alignment: "right" },
            ],
          },
          {
            style: "newTable",
            table: {
              widths: ["*", "auto", "auto", "auto", "auto"],
              body: [
                [
                  { text: "", border: [false, false, false, false] },
                  {
                    text: "Delivery Challan No:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Date:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer ID:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer Contact:",
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                ],
                [
                  { text: "", border: [false, false, false, false] },
                  {
                    text: record.id,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: formatDate(record.createdDate),
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.tempUser.id,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.contactPhone,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                ],
              ],
            },
          },
          {
            style: "infoTable",
            table: {
              widths: ["*", "*", "*"],
              body: [
                [
                  {
                    text: `Bill To: ${record.tempUser.companyName}`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: `Ship To: ${record.contactPerson}`,
                    style: "tableLabel",
                    border: [true, true, true, false],
                  },
                  {
                    text: "Customer GST Registration information",
                    style: "tableLabel",
                  },
                ],
                [
                  {
                    text: `${record.tempUser.address}, ${record.tempUser.city}, ${record.tempUser.state},${record.tempUser.pincode}, ${record.tempUser.country}`,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: `${record.deliveryAddress}, ${record.city}, ${record.state}, ${record.pinCode}, ${record.country}`,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                  {
                    text: record.tempUser.gstNumber,
                    style: "tableCell",
                    border: [true, false, true, false],
                  },
                ],
              ],
            },
          },
          {
            style: "table",
            table: {
              heights: ["auto", "auto"],
              widths: ["auto", 300, 300, "*"],
              body: [
                [
                  { text: "S.No.", style: "tableLabel" },
                  {
                    text: "Item Code/product Description",
                    style: "tableLabel",
                  },
                  { text: "", style: "tableLabel" },
                  { text: "Quantity", style: "tableLabel" },
                ],
                ...rowData,
              ],
            },
          },
          {
            table: {
              heights: [50],
              widths: ["*"],
              body: [
                [
                  {
                    text: "NOTE:  Standby Returnable Basis, Kindly share the WO",
                    alignment: "left",
                    style: "tableLabel",
                    border: [true, false, true, true],
                    margin: [0, 10, 0, 0],
                  },
                ],
              ],
            },
          },
          {
            table: {
              // heights:[100],
              widths: ["*", "*", "*"],
              body: [
                [
                  {
                    stack: [
                      {
                        text: "Terms & Conditions",
                        bold: true,
                        style: "tableLabel",
                      },
                      {
                        text: `${record.termsAndCondition}`,
                        style: "tableLabel",
                      },
                    ],
                    border: [true, false, false, true],
                    margin: [0, 20, 0, 0],
                    alignment: "left",
                  },

                  {
                    stack: [
                      {
                        text: `Received In Good Condition`,
                        bold: true,
                        style: "tableLabel",
                      },
                      {
                        text: `Customer Signature`,
                        margin: [0, 40, 0, 0],
                        style: "tableLabel",
                      },
                    ],
                    border: [false, false, false, true],
                    margin: [0, 20, 0, 0],
                    alignment: "center",
                  },
                  {
                    stack: [
                      {
                        text: `For ${record.createdByUser.companyName}`,
                        bold: true,
                        style: "tableLabel",
                        alignment: "center",
                      },
                      {
                        text: `Authorize Signature`,
                        margin: [0, 40, 0, 0],
                        style: "tableLabel",
                        alignment: "center",
                      },
                    ],
                    border: [false, false, true, true],
                    margin: [0, 20, 0, 0],
                    alignment: "right",
                  },
                ],
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 15,
            bold: true,
            margin: [0, 0, 0, 5],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            marginBottom: 5,
          },
          tableLabel: {
            bold: true,
            border: [false, false, false, true],
          },
          tableCell: {
            fillColor: "#ffffff",
          },
          tableHeader: {
            fillColor: "#eeeeee",
            bold: true,
          },
        },
      };

      pdfMake.createPdf(docDefinition).download("deliveryChallan.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Sales Order Number",
      dataIndex: "id",
      key: "id",
      render: (name, record) => {
        const handleNavigation = () => {
          navigate(`/dashboard/orders/viewDetail/${record.id}`, {
            state: record,
          });
        };

        return (
          <Link
            color="primary"
            onClick={handleNavigation}
            sx={{
              alignItems: "center",
              textAlign: "center",
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
        <div style={{ display: "flex", alignItems: "center" }}>
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
      key: "companyName",
      dataIndex: "companyName",
    },
    {
      title: "Order Modified Date",
      key: "lastModifiedDate",
      dataIndex: "lastModifiedDate",
    },
    {
      title: "Order Date",
      key: "createdDate",
      dataIndex: "createdDate",
    },
    {
      title: "Delivery Date",
      key: "deliveryDate",
      dataIndex: "deliveryDate",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },

    {
      title: (
        <TextField
          label="Type"
          name="type"
          sx={{ minWidth: 150 }}
          value={selectedType}
          onChange={handleTypeChange}
          select
        >
          <MenuItem value="">All</MenuItem>
          {customerType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ),
      key: "type",
      dataIndex: "type",
    },
    {
      dataIndex: "actionEdit",
      key: "actionEdit",
      render: (_, record) => (
        <IconButton onClick={() => handleNavigation(record)}>
          <Icon>
            <EditIcon />
          </Icon>
        </IconButton>
      ),
    },

    {
      title: "Download Invoice",
      dataIndex: "downloadInvoice",
      key: "downloadInvoice",
      render: (_, record) => {
        if (record.status === "Approved") {
          return (
            <IconButton
              onClick={() =>
                handleInvoicePdf(
                  record,
                  "TAX INVOICE",
                  "Invoice Date",
                  "Invoice"
                )
              }
            >
              <Icon>
                <DownloadIcon />
              </Icon>
            </IconButton>
          );
        }
        return null; // Return null if the condition is not met
      },
    },
    {
      title: "Download Delivery Challan",
      dataIndex: "deliveryChallan",
      key: "deliveryChallan",
      render: (_, record) => {
        if (record.status === "Approved") {
          return (
            <IconButton onClick={() => handleChallanPdf(record)}>
              <Icon>
                <DownloadIcon />
              </Icon>
            </IconButton>
          );
        }
        return null; // Return null if the condition is not met
      },
    },
    {
      title: "Proforma Invoice",
      dataIndex: "downloadPI",
      key: "downloadPI",
      render: (_, record) => (
        <IconButton
          onClick={() =>
            handleInvoicePdf(record, "PROFORMA INVOICE", "Date", "Quotation")
          }
        >
          <Icon>
            <DownloadIcon />
          </Icon>
        </IconButton>
      ),
    },
    {
      dataIndex: "actionDelete",
      key: "actionDelete",
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
    <div style={{ minWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Sales Order Invoice</h2>
        <IconWithPopup />
      </div>
      <Box sx={{ position: "relative", overflowX: "auto" }}>
        <Scrollbar>
          <Table
            sx={{ minWidth: 800, overflowX: "auto" }}
            columns={columns}
            dataSource={filteredData}
            rowClassName={() => "table-data-row"}
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
          theme="light"
        />
      </Box>
    </div>
  );
};

export default SalesOrderViewList;
