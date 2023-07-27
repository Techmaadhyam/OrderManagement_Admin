import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link,
  InputBase,
} from "@mui/material";
import { Table } from "antd";
import { Box } from "@mui/system";
import React from "react";
import { Scrollbar } from "src/components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import IconWithPopup from "../user/user-icon";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { apiUrl } from "src/config";
import Logo from "../logo/logo";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CardContent,
} from "@mui/material";

//get userid
const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const ViewCompany = () => {
  const [userData, setUserData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + `getAllCompanys`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
          console.error(error);
            setLoading(false);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.id }));

  const filteredList = dataWithKeys?.filter((product) => {
    const companyMatch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return companyMatch;
  });
;

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

  const handleRemoveRow = async () => {
    try {
      await axios.delete(apiUrl + `deleteCompanyById/${selectedId}`);
      const updatedRows = userData.filter(
        (item) => item.id !== selectedId
      );
      setUserData(updatedRows);
      notify("success", `Sucessfully deleted company row.`);
    } catch (error) {
      console.error("Error deleting row:", error.message);
      notify("error", `Data is linked to another section, unable to delete.`);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const handleConfirmDelete = (productId) => {
      setSelectedId(productId);
      setOpen(true);
    };


   const handleNavigation = (record) => {
     navigate("/dashboard/company/edit", { state: record });
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

  const columns = [
    {
      title: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
      key: "name",
      dataIndex: "name",
      render: (name, record) => {
        const handleNavigation = () => {
          navigate("/dashboard/company/viewDetail", { state: record });
        };

        return (
          <Link
            color="primary"
            onClick={handleNavigation}
            sx={{
              alignItems: "center",
            }}
            underline="hover"
          >
            <Typography variant="subtitle1">{name}</Typography>
          </Link>
        );
      },
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (text, record) => `${text}, ${record.city}, ${record.state}`,
    },
    {
      title: "GSTN",
      key: "gstnumber",
      dataIndex: "gstnumber",
    },
    {
      title: "PAN",
      key: "pandcard",
      dataIndex: "pandcard",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },

    {
      dataIndex: "actionEdit",
      key: "actionEdit",
      render: (_, record) => (
        <Link>
         <IconButton onClick={() => handleNavigation(record)}>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        </Link>
      ),
    },
    {
      dataIndex: "actionDelete",
      key: "actionDelete",
      render: (_, row) => (
        <IconButton onClick={() => handleConfirmDelete(row.id)}>
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
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>View Companies</h2>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconWithPopup />
        </div>
      </div>
      <Box sx={{ position: "relative", overflowX: "auto" }}>
        {loading === false ? (
          <Scrollbar>
            <Table
              sx={{ minWidth: 800, overflowX: "auto" }}
              columns={columns}
              dataSource={filteredList}
              rowClassName={() => "table-data-row"}
            ></Table>
          </Scrollbar>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <CircularProgress />
          </div>
        )}
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
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this company?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRemoveRow} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
     
    </div>
  );
};

export default ViewCompany;
