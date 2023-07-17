import {
  Unstable_Grid2 as Grid,
  Typography,
  IconButton,
  Icon,
  Link,
  InputBase,
  Container,
  Stack,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { Table } from "antd";
import { Box } from "@mui/system";
import React from "react";
import { Scrollbar } from "src/components/scrollbar";
import EditIcon from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { apiUrl } from "src/config";
import CircularProgress from "@mui/material/CircularProgress";


import User from "src/sections/dashboard/user/user-icon";
import Logo from "src/sections/dashboard/logo/logo";



const Page = () => {
  const [userData, setUserData] = useState([]);



  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
      const [loading, setLoading] = useState(true);



  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + `getAllUsers`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dataWithKeys = userData.map((item) => ({ ...item, key: item.id }));

  const filteredList = dataWithKeys?.filter((product) => {
    const companyMatch = product.companyName
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return companyMatch;
  }).map((product) => ({
  ...product,
  name: `${product.firstName} ${product.lastName}`,
}));;
 
const filteredData =
       filteredList.filter((item) => item.isactive === true)
      


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
        title: "User Id",
        dataIndex: "id",
        key: "id",
        render: (name, record) => {
          const handleNavigation = () => {
            navigate("/dashboard/logistics/activeView", { state: record });
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
        title: "Name",
        dataIndex: "name",
        key: "name",
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
        title: "Address",
        key: "address",
        dataIndex: "address",
        render: (text, record) => `${text}, ${record.city}, ${record.state}`,
      },
      {
        title: "Email",
        key: "emailId",
        dataIndex: "emailId",
      },
      {
        title: "Type",
        key: "type",
        dataIndex: "type",
      },
    ];

  
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
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
                  <h2 style={{ margin: 0 }}>All Active Customers</h2>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <Logo />
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <User />
                </div>
              </div>
              <Box sx={{ position: "relative", overflowX: "auto" }}>
                {loading === false ? (
                  <Scrollbar>
                    <Table
                      sx={{ minWidth: 800, overflowX: "auto" }}
                      columns={columns}
                      dataSource={filteredData}
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
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
