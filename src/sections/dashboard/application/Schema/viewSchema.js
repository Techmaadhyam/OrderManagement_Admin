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
import IconWithPopup from "src/sections/dashboard/user/user-icon";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { apiUrl } from "src/config";
import Logo from "src/sections/dashboard/logo/logo";
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

const ViewSchema = () => {
  const [userData, setUserData] = useState([]);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [tabData, setTabData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + `getSchemas`)
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

  //get company
  useEffect(() => {
    axios
      .get(apiUrl + `getAllCompanys`)
      .then((response) => {
        setCompanyData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //get Profile
  useEffect(() => {
    axios
      .get(apiUrl + `getAllProfiles`)
      .then((response) => {
        setProfileData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //get fields
  useEffect(() => {
    axios
      .get(apiUrl + `getAllFields`)
      .then((response) => {
        setFieldData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //get tabs
  useEffect(() => {
    axios
      .get(apiUrl + `getAllObjects`)
      .then((response) => {
        setTabData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.id }));

  const filteredList = dataWithKeys?.filter((product) => {
    const companyMatch = product?.company?.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return companyMatch;
  });
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
      await axios.delete(apiUrl + `deleteTempUserId/${selectedProductId}`);
      const updatedRows = userData.filter(
        (item) => item.id !== selectedProductId
      );
      setUserData(updatedRows);
      notify("success", `Sucessfully deleted technician row.`);
    } catch (error) {
      console.error("Error deleting row:", error.message);
      notify("error", `This record is linked with AMC.`);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleEditRecord = (record) => {
    setEditRecord(record);
    setPopupVisible(true);
  };

  const handleSaveRecord = async (editedRecord) => {

    
    if (editedRecord) {
      try {
        const response = await fetch(apiUrl + "createUpdateSchema", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editedRecord.id,
            company: { id: editedRecord.company.id },
            profile: { id: editedRecord.profile.id },
            appobject: { id: editedRecord.appobject.id },
            objectfield: { id: editedRecord.objectfield.id },
            isrequired: true,
            isvisible: true,
            createddate: editedRecord.createddate,
            lastmodifieddate: new Date(),
          }),
        });

        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            window.location.reload();
          });
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  //company search
  const handleNameClick = () => {
    setIsSearching(true);
  };

  const handleNameInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleNameCancel = () => {
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
              <IconButton onClick={handleNameClick}>
                <SearchIcon />
              </IconButton>
            </>
          ) : (
            <>
              <InputBase
                value={searchText}
                onChange={handleNameInputChange}
                placeholder="Search user..."
              />
              <IconButton onClick={handleNameCancel}>
                <Icon>
                  <HighlightOffIcon />
                </Icon>
              </IconButton>
            </>
          )}
        </div>
      ),
      key: "company",
      dataIndex: "company",
      render: (name, record) => {
        const handleNavigation = () => {
          navigate("/dashboard/application/schema/detail", { state: record });
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
            <Typography variant="subtitle1">{name?.name}</Typography>
          </Link>
        );
      },
    },
    {
      title: "Profile",
      key: "profile",
      dataIndex: "profile",
      render: (text) => `${text.name}`,
    },
    {
      title: "Table",
      key: "appobject",
      dataIndex: "appobject",
      render: (text) => `${text.tablename}`,
    },
    {
      title: "Field Name",
      key: "objectfield",
      dataIndex: "objectfield",
      render: (text) => `${text.fieldname}`,
    },

    {
      dataIndex: "actionEdit",
      key: "actionEdit",
      render: (_, record) => (
        <Link>
          <IconButton onClick={() => handleEditRecord(record)}>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        </Link>
      ),
    },
    // {
    //   dataIndex: "actionDelete",
    //   key: "actionDelete",
    //   render: (_, row) => (
    //     <IconButton onClick={() => handleConfirmDelete(row.id)}>
    //       <Icon>
    //         <Delete />
    //       </Icon>
    //     </IconButton>
    //   ),
    // },
    ,
  ];

  const PopupComponent = ({ record, onClose, onSave }) => {
    const [editedRecord, setEditedRecord] = useState(record);

    console.log(editedRecord)

const handleChange = (event) => {
  const { name, value } = event.target;
  const [nestedProperty, nestedKey] = name.split(".");

  setEditedRecord((prevRecord) => {
    if (nestedProperty) {
      // If the name contains a dot, update the nested property
      return {
        ...prevRecord,
        [nestedProperty]: {
          ...prevRecord[nestedProperty],
          [nestedKey]: value,
        },
      };
    } else {
      // Otherwise, update the top-level property directly
      return {
        ...prevRecord,
        [name]: value,
      };
    }
  });
};

    const handleSave = () => {
      onSave(editedRecord);
      onClose();
    };

    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Edit Schema</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <TextField
                label="Company Name"
                name="company.id"
                fullWidth
                value={editedRecord.company.id}
                select
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {companyData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Profile"
                name="profile.id"
                fullWidth
                value={editedRecord.profile.id}
                onChange={handleChange}
                select
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {profileData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Table"
                name="appobject.id"
                fullWidth
                value={editedRecord.appobject.id}
                select
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {tabData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.tablename}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                label="Field Name"
                name="objectfield.id"
                fullWidth
                value={editedRecord.objectfield.id}
                onChange={handleChange}
                select
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {fieldData.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.fieldname}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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
          <h2 style={{ margin: 0 }}>View Schema</h2>
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
            Are you sure you want to delete this technician?
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
      {isPopupVisible && editRecord && (
        <PopupComponent
          record={editRecord}
          onClose={() => setPopupVisible(false)}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
};

export default ViewSchema;
