import PropTypes from "prop-types";

import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  TableRow,
  MenuItem,
  Icon,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import React from "react";
import { Add, Delete } from "@mui/icons-material";
import Grid from "antd/es/card/Grid";
import "./customTable.css";
import { primaryColor } from "src/primaryColor";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "src/config";

const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const tableHeader = [
  {
    id: "product_name",
    name: "Name",
    width: 200,
  },
  {
    id: "quantity",
    name: "Quantity",
    width: 200,
  },
  {
    id: "weight",
    name: "Weight",
    width: 150,
  },
  {
    id: "cost",
    name: "Cost",
    width: 150,
  },
  {
    id: "gst",
    name: "GST",
    width: 150,
  },
  {
    id: "cgst",
    name: "CGST",
    width: 150,
  },
  {
    id: "description",
    name: "Description",
    width: 350,
  },
  {
    id: "add",
    name: "",
    width: 50,
  },
  {
    id: "delete",
    name: "",
    width: 50,
  },
];

const CustomTable = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [gst, setGst] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [cgst, setCgst] = useState("");
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [userData, setUserData] = useState([]);
  const [productId, setProductId] = useState();

  const handleRemoveRow = (idx) => () => {
    const updatedRows = rows.filter((_, index) => index !== idx);
    setRows(updatedRows);
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
    setEditIndex(null);
    clearFormFields();
  };

  const handleModalClick = (event) => {
    if (event.target.classList.contains("modal")) {
      toggleForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRow = {
      productId,
      name,
      weight,
      gst,
      quantity,
      cost,
      cgst,
      description,
    };

    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
    } else {
      setRows((prevRows) => [...prevRows, newRow]);
    }

    clearFormFields();
    setShowForm(false);
    setEditIndex(null);
  };
  const handleEditRow = (idx, row) => {
    setName(row.name);
    setWeight(row.weight);
    setGst(row.gst);
    setQuantity(row.quantity);
    setCost(row.cost);
    setCgst(row.cgst);
    setDescription(row.description);
    setEditIndex(idx);
    setShowForm(true);
  };

  const clearFormFields = () => {
    setName("");
    setWeight("");
    setGst("");
    setQuantity("");
    setCost("");
    setCgst("");
    setDescription("");
  };

  //
  useEffect(() => {
    axios
      .get(apiUrl + `getAllItem/${userId}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Box sx={{ position: "relative", overflowX: "auto" }}>
        <div className="purchase-popup">
          <button
            className="add-purchase"
            style={{ background: `${primaryColor}` }}
            onClick={toggleForm}
          >
            Add Product
          </button>

          {showForm && (
            <div className="modal" onClick={handleModalClick}>
              <div className="modal-content">
                <h5 className="product-detail-heading">Add Product Details</h5>
                <form className="form">
                  {/* Form fields */}
                  <div className="form-row">
                    <div className="popup-left">
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          select
                          value={name}
                          onChange={(e) => {
                            const selectedOption = userData.find(
                              (option) => option.name === e.target.value
                            );
                            setProductId(selectedOption.id);
                            setName(e.target.value);
                          }}
                          style={{ marginBottom: 10 }}
                        >
                          {userData?.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Weight"
                          name="weight"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          style={{ marginBottom: 10 }}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="GST"
                          name="gst"
                          value={gst}
                          onChange={(e) => setGst(e.target.value)}
                          style={{ marginBottom: 10 }}
                        />
                      </Grid>
                    </div>
                    <div className="popup-right">
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          name="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          style={{ marginBottom: 15 }}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Cost"
                          name="cost"
                          value={cost}
                          onChange={(e) => setCost(e.target.value)}
                          style={{ marginBottom: 10 }}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="CGST"
                          name="cgst"
                          value={cgst}
                          onChange={(e) => setCgst(e.target.value)}
                          style={{ marginBottom: 16 }}
                        />
                      </Grid>
                    </div>
                  </div>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ marginBottom: 10 }}
                    />
                  </Grid>
                  <div className="submit-purchase">
                    <button
                      style={{ background: `${primaryColor}` }}
                      className="submit"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <Scrollbar>
          <Table sx={{ minWidth: 800, overflowX: "auto" }}>
            <TableHead>
              <TableRow>
                {tableHeader.map((item, idx) => (
                  <TableCell sx={{ width: item.width }} key={idx}>
                    {item.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow hover key={idx}>
                  {/* Render table rows */}
                  <TableCell>
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
                    <IconButton onClick={() => handleEditRow(idx, row)}>
                      <Icon>
                        <EditIcon />
                      </Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleRemoveRow(idx)}>
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
      </Box>
      <br></br>
      <Grid xs={12} md={6}>
        <label
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
            marginRight: "6px",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Total Amount :
        </label>
        <TextField sx={{ height: 40 }}></TextField>
      </Grid>
      <Grid xs={12} md={6} style={{ marginTop: "20px" }}>
        <label
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "14px",
            marginRight: "6px",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Terms &Conditions :
        </label>
        <TextField fullWidth multiline rows={4} maxRows={8} />
      </Grid>
    </>
  );
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
