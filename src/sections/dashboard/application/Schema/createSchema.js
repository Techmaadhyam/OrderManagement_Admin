import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import IconWithPopup from "src/sections/dashboard/user/user-icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "src/config";
import Logo from "src/sections/dashboard/logo/logo";
import axios from "axios";



//get userid
const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const CreateSchema = () => {
  //form state handling
  const [tab, setTab] = useState("");
  const [field, setField] = useState("");
  const [company, setCompany] = useState("");
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [tabData, setTabData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "tab":
        setTab(value);
        break;
      case "field":
        setField(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "profile":
        setProfile(value);
        break;
      default:
        break;
    }
  };

  //get company
  useEffect(() => {
    axios
      .get(apiUrl + `getAllCompanys`)
      .then((response) => {
        setUserData(response.data);
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

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();

    if (tab && profile && company && field) {
      try {
        const response = await fetch(apiUrl + "createUpdateSchema", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: { id: company },
            profile: { id: profile },
            appobject: { id: tab },
            objectfield: { id: field },
            isrequired: true,
            isvisible: true,
            //createdByUser: { id: userId },
            createddate: new Date(),
            // lastModifiedDate: new Date(),
            // lastModifiedByUser: { id: userId },
          }),
        });

        if (response.ok) {
          // Redirect to home page upon successful submission

          response.json().then((data) => {
            console.log(data);

            navigate("/dashboard/application/schema/detail", { state: data });
          });
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  return (
    <div style={{ minWidth: "100%", marginBottom: "1rem" }}>
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
          <h2 style={{ margin: 0 }}>Create Schema</h2>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconWithPopup />
        </div>
      </div>
      <form>
        <Card>
          <CardHeader title="New Schema" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  required
                  onChange={handleInputChange}
                  value={company}
                  select
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {userData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Profile"
                  name="profile"
                  required
                  onChange={handleInputChange}
                  value={profile}
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
                  fullWidth
                  label="Table"
                  name="tab"
                  required
                  onChange={handleInputChange}
                  value={tab}
                  select
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
                  fullWidth
                  label="Field"
                  name="field"
                  required
                  onChange={handleInputChange}
                  value={field}
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
          </CardContent>
          <Divider />
        </Card>
      </form>
      <Grid xs={12} md={6}>
        <Box sx={{ mt: 2 }} display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            align="right"
            onClick={handleClick}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default CreateSchema;
