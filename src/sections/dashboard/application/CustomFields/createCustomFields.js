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




const fieldType = [

  {
    label: "Textfield",
    value: "Textfield",
  },
  {
    label: "Dropdown",
    value: "Dropdown",
  },
  {
    label: "TabField",
    value: "TabField",
  }

];
//get userid
const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const CreateCustomFields = () => {


  //form state handling
  const [userName, setUserName] = useState("");
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [dropdowns, setDropdowns] = useState(null);
  const [tabfields, setTabfields] = useState(null);
  const [userData, setUserData] = useState([]);
  const [login, setLogin] = useState([]);
  const [tabsData, setTabsData] = useState([]);
  const [breakpoint, setBreakpoint] = useState(0);
  const email = sessionStorage.getItem("mail") || localStorage.getItem("mail");
  const password = sessionStorage.getItem("password") || localStorage.getItem("password");

  useEffect(() => {
    axios
      .get(apiUrl + `getAppUser/${email}/${password}`)
      .then((response) => {
        setLogin(response.data[0]);
        // console.log(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [email, password]);

  if (login.company
    && login.profile
    && login.company.id
    && login.profile.id
    && breakpoint === 0) {
    axios
      .get(apiUrl + `getSchemaTabs/${login.company.id}/${login.profile.id}`)
      .then((response) => {
        setTabsData(response.data);
        console.log(response.data);
        setBreakpoint(1);
      })
      .catch((error) => {
        console.error("tabs is not working");
      });
  }



  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "label":
        setLabel(value);
        break;
      case "type":
        setType(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "dropdowns":
        setDropdowns(value);
        break;
      case "tabfields":
        setTabfields(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();

    if (userName && description) {
      try {
        const response = await fetch(apiUrl + "createUpdateAppObjField", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fieldname: userName,
            fieldlabel: label,
            fieldtype: type,
            description: description,
            createddate: new Date(),
            dropdownlovs: dropdowns,
            tabid: tabfields,
            // createdByUser: { id: userId },

            // lastModifiedDate: new Date(),
            // lastModifiedByUser: { id: userId },
          }),
        });

        if (response.ok) {
          // Redirect to home page upon successful submission

          response.json().then((data) => {
            navigate("/dashboard/application/field/detail", { state: data });
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
          <h2 style={{ margin: 0 }}>Create Custom Field</h2>
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
          <CardHeader title="New Field" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Field Name"
                  name="userName"
                  value={userName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Field Label"
                  name="label"
                  value={label}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Field Type"
                  name="type"
                  required
                  onChange={handleInputChange}
                  value={type}
                  select
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {fieldType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                />
              </Grid>
              {
                type === "Dropdown" ? (
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      maxRows={8}
                      label="Dropdown Values (comma separated)"
                      name="dropdowns"
                      value={dropdowns}
                      onChange={handleInputChange}
                    />
                  </Grid>
                ) : null
              }
              {
                type === "TabField" ? (
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tab Field"
                      name="tabfields"
                      required
                      onChange={handleInputChange}
                      value={tabfields}
                      select
                      SelectProps={{
                        MenuProps: {
                          style: {
                            maxHeight: 300,
                          },
                        },
                      }}
                    >
                      {tabsData.map((option) => (
                        <MenuItem key={option.tabid}
                          value={option.tabid}>
                          {option.tabname}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ) : null
              }
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

export default CreateCustomFields;
