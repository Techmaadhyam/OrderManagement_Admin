import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Link,
  SvgIcon,
  Container,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { primaryColor } from "src/primaryColor";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useLocation } from "react-router-dom";
import User from "src/sections/dashboard/user/user-icon";
import Logo from "src/sections/dashboard/logo/logo";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { apiUrl } from "src/config";

const Page = (props) => {
  const location = useLocation();
  const state = location.state;

  const [checked, setChecked] = useState(state?.isactive);
  const [editMode, setEditMode] = useState(false);
  const [modifiedValues, setModifiedValues] = useState({
    id: state?.id,
    password: state?.password,
    companyName: state?.companyName,
    userName: state?.emailId,
    firstName: state?.firstName,
    lastName: state?.lastName,
    emailId: state?.emailId,
    mobile: state?.mobile,
    address: state?.address,
    city: state?.city,
    state: state?.state,
    country: state?.country,
    type: state?.type,
    issuperuser: state?.issuperuser,
    isactive: state?.isactive,
    gstNumber: state?.gstNumber,
    pandcard: state?.pandcard,
    createdDate: state?.createdDate,
    pincode: state?.pincode,
    updatedDate: new Date(),
  });
  const handleEditClick = () => {
    setEditMode(true);
  };
  console.log(modifiedValues);

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset modified values to original state values
    setModifiedValues({
      id: state?.id,
      password: state?.password,
      companyName: state?.companyName,
      userName: state?.emailId,
      firstName: state?.firstName,
      lastName: state?.lastName,
      emailId: state?.emailId,
      mobile: state?.mobile,
      address: state?.address,
      city: state?.city,
      state: state?.state,
      country: state?.country,
      type: state?.type,
      isactive: checked,
      issuperuser: state?.issuperuser,
      gstNumber: state?.gstNumber,
      pandcard: state?.pandcard,
      createdDate: state?.createdDate,
      pincode: state?.pincode,
      updatedDate: new Date(),
    });
  };

  const handleSaveClick = async () => {
    if (state?.id) {
      try {
        const response = await fetch(apiUrl + "addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedValues),
        });

        if (response.ok) {
          setEditMode(false);
          response.json().then((data) => {
            alert("update success");
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //handle switch
  const handleChange = (event) => {
    const { checked } = event.target;
    setChecked(checked);

    setModifiedValues((prevValues) => ({
      ...prevValues,
      isactive: checked,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModifiedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const align = "horizontal";

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
            <div style={{ minWidth: "100%", marginTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.inactive}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="none"
                  >
                    <SvgIcon
                      sx={{
                        mr: 1,
                        width: 38,
                        height: 38,
                        transition: "color 0.5s",
                        "&:hover": { color: `${primaryColor}` },
                      }}
                    >
                      <ArrowCircleLeftOutlinedIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">
                      Back To{" "}
                      <span
                        style={{ color: `${primaryColor}`, fontWeight: 600 }}
                      >
                        inactive users
                      </span>
                    </Typography>
                  </Link>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Inactive User Detail</h2>
                <Box
                  sx={{ mt: 3, mb: 2 }}
                  display="flex"
                  justifyContent="flex-end"
                  marginRight="12px"
                >
                  {editMode && (
                    <Button
                      color="primary"
                      variant="contained"
                      align="right"
                      onClick={handleCancelClick}
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    color="primary"
                    variant="contained"
                    align="right"
                    onClick={handleEditClick}
                  >
                    Edit
                  </Button>
                </Box>
              </div>
              <Card style={{ marginBottom: "12px" }}>
                <PropertyList>
                  <PropertyListItem>
                    <Typography variant="h6" component="span">
                      Account Status:
                    </Typography>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </PropertyListItem>
                  <Divider />
                  <Grid xs={12} md={6}>
                    <PropertyListItem align={align} label="First name">
                      {editMode ? (
                        <TextField
                          name="firstName"
                          value={modifiedValues.firstName}
                          onChange={handleInputChange}
                          variant="standard"
                        />
                      ) : (
                        <Typography variant="subtitle2">
                          {state?.firstName}
                        </Typography>
                      )}
                    </PropertyListItem>
                  </Grid>
                  <Divider />
                  <Grid xs={12} md={6}>
                    <PropertyListItem
                      align={align}
                      label="Last name"
                      value={state?.lastName}
                    >
                      {editMode ? (
                        <TextField
                          name="lastName"
                          value={modifiedValues.lastName}
                          onChange={handleInputChange}
                          variant="standard"
                        />
                      ) : (
                        <Typography variant="body2">
                          {state?.lastName}
                        </Typography>
                      )}
                    </PropertyListItem>
                  </Grid>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Email"
                    value={state?.emailId}
                  >
                    {editMode ? (
                      <TextField
                        name="emailId"
                        value={modifiedValues.emailId}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.emailId}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Phone"
                    value={state?.mobile}
                  >
                    {editMode ? (
                      <TextField
                        name="mobile"
                        value={modifiedValues.mobile}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.mobile}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Company"
                    value={state?.companyName}
                  >
                    {editMode ? (
                      <TextField
                        name="companyName"
                        value={modifiedValues.companyName}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">
                        {state?.companyName}
                      </Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="GSTN NO"
                    value={state?.gstNumber}
                  >
                    {editMode ? (
                      <TextField
                        name="gstNumber"
                        value={modifiedValues.gstNumber}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">
                        {state?.gstNumber}
                      </Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="PAN"
                    value={state?.pandcard}
                  >
                    {editMode ? (
                      <TextField
                        name="pandcard"
                        value={modifiedValues.pandcard}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.pandcard}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Type"
                    value={state?.type}
                  >
                    {editMode ? (
                      <TextField
                        name="type"
                        value={modifiedValues.type}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.type}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Address"
                    value={state?.address}
                  >
                    {editMode ? (
                      <TextField
                        name="address"
                        value={modifiedValues.address}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.address}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="City"
                    value={state?.city}
                  >
                    {editMode ? (
                      <TextField
                        name="city"
                        value={modifiedValues.city}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.city}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="State"
                    value={state?.state}
                  >
                    {editMode ? (
                      <TextField
                        name="state"
                        value={modifiedValues.state}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.state}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Country"
                    value={state?.country}
                  >
                    {editMode ? (
                      <TextField
                        name="country"
                        value={modifiedValues.country}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.country}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                  <PropertyListItem
                    align={align}
                    label="Pincode"
                    value={state?.pincode}
                  >
                    {editMode ? (
                      <TextField
                        name="pincode"
                        value={modifiedValues.pincode}
                        onChange={handleInputChange}
                        variant="standard"
                      />
                    ) : (
                      <Typography variant="body2">{state?.pincode}</Typography>
                    )}
                  </PropertyListItem>
                  <Divider />
                </PropertyList>
                <Divider />
                <Box
                  sx={{ mt: 3, mb: 2 }}
                  display="flex"
                  justifyContent="flex-end"
                  marginRight="12px"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    align="right"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                </Box>
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
