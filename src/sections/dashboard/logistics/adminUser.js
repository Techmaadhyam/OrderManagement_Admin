import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Stack,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid,
  SvgIcon,
  Typography,
  Link,
} from "@mui/material";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { primaryColor } from "src/primaryColor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { apiUrl } from "src/config";
import Switch from "@mui/material/Switch";
import { Delete } from "@mui/icons-material";
import {
  fetchAccessToken,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchIndianStates,
} from "src/utils/api-service";
import Logo from "../logo/logo";
import User from "../user/user-icon";
import { useNavigate } from "react-router-dom";

const customerType = [
  {
    label: "Distributor",
    value: "Distributor",
  },
  {
    label: "Retailer",
    value: "Retailer",
  },
  {
    label: "Manufacturer",
    value: "Manufacturer",
  },
];

const AdminUserCreateForm = () => {
  const navigate = useNavigate();
  //image carousel state handeling
  const [currentImage, setCurrentImage] = useState(0);
  // country, state, city API access token
  const [accessToken, setAccessToken] = useState(null);

  //state management for countries,states and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("India");
  const [currentState, setCurrentState] = useState([]);
  const [currentCity, setCurrentCity] = useState([]);

  //form state handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [gstn, setGstn] = useState("");
  const [pan, setPan] = useState("");

  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);

  //handle file uploads
  const [uploadFile, setUploadFile] = useState(null);
  const [checked, setChecked] = useState(false);

  //updating form state
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "gstn":
        setGstn(value);
        break;
      case "pan":
        setPan(value);
        break;
      case "type":
        setType(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "zipcode":
        setZipcode(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmpassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  //check if email field is open
  const handleBlur = () => {
    setTouched(true);
  };

  //add email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasError = touched && !emailRegex.test(email);

  //getting current date
  useEffect(() => {
    const today = new Date();
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-ZA", options);
    setCurrentDate(formattedDate);
  }, []);

  //get access token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await fetchAccessToken();
        setAccessToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //fetches country list for dropdown and pushesh it to state which is later mapped
  const fetchCountriesData = useCallback(async () => {
    try {
      if (accessToken) {
        const countries = await fetchCountries(accessToken);
        setCountries(countries);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }, [accessToken]);

  //fetches states list for dropdown and pushesh it to setStates which is later mapped
  const handleCountry = async (event) => {
    try {
      setCurrentCountry(event.target.value);
      if (accessToken) {
        const states = await fetchStates(accessToken, event.target.value);
        setStates(states);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  //fetches cities list for dropdown and pushesh it to setCities which is later mapped
  const handleState = async (event) => {
    try {
      setCurrentState(event.target.value);
      if (accessToken) {
        const cities = await fetchCities(accessToken, event.target.value);
        setCities(cities);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  //sets default country to India and fetches state list for India and is pushed to setStates
  const handleDefaultState = useCallback(async () => {
    try {
      if (currentCountry === "India" && accessToken) {
        const states = await fetchIndianStates(accessToken);
        setStates(states);
      }
    } catch (error) {
      console.error("Error fetching Indian states:", error);
    }
  }, [accessToken, currentCountry]);

  //useeffect fetch request being called on componet mount
  useEffect(() => {
    if (accessToken) {
      fetchCountriesData();
      handleDefaultState();
    }
  }, [accessToken, fetchCountriesData, handleDefaultState]);

  //sets current city value in MUI select field onchange event
  const handleCities = async (event) => {
    setCurrentCity(event.target.value);
  };

  //mapping countries to MUI select input field
  const userOptionsCountry = useMemo(() => {
    return countries?.map((country) => ({
      label: country.country_name,
      value: country.country_name,
    }));
  }, [countries]);

  //mapping states to MUI select input field
  const userOptionsState = useMemo(() => {
    return states?.map((state) => ({
      label: state.state_name,
      value: state.state_name,
    }));
  }, [states]);

  //mapping cities to MUI select input field
  const userOptionsCities = useMemo(() => {
    return cities?.map((city) => ({
      label: city.city_name,
      value: city.city_name,
    }));
  }, [cities]);

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

  //handle switch
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //calls toast notification on sucessful registration and redirects to login page, handles fetch POST request
  const handleToHome = async (event) => {
    event.preventDefault();

    if (
      firstName &&
      email &&
      phone &&
      company &&
      type &&
      currentCountry &&
      currentState &&
      currentCity &&
      zipcode &&
      currentDate &&
      uploadFile
    ) {
      try {
        const response = await fetch(apiUrl + "addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: company,
            userName: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailId: email,
            mobile: `+91 ${phone}`,
            address: address,
            city: currentCity,
            state: currentState,
            country: currentCountry,
            type: type,
            gstNumber: gstn,
            pandcard: pan,
            pincode: zipcode,
            issuperuser: checked,
            isactive: checked,
            createdDate: new Date(),
            unpdatedDate: new Date(),
          }),
        });

        if (response.ok) {
          // Redirect to home page upon successful submission

          response.json().then(async (data) => {
            if (uploadFile) {
              const formData = new FormData();

              let jsonBodyData = {};

              let file = uploadFile;

              jsonBodyData.fileName = "companylogo";
              jsonBodyData.fileType = uploadFile?.type;
              jsonBodyData.createdbyid = data.id;
              jsonBodyData.lastmodifybyid = null;
              jsonBodyData.createdDate = new Date();
              jsonBodyData.lastModifiedDate = new Date();

              formData.append("file", file);
              formData.append("fileWrapper", JSON.stringify(jsonBodyData));

              try {
                const uploadResponse = await fetch(apiUrl + "upload", {
                  method: "POST",
                  body: formData,
                });

                if (uploadResponse.ok) {
                  if (data.isactive === true) {
                    navigate("/dashboard/logistics/activeView", {
                      state: data,
                    });
                  } else {
                    navigate("/dashboard/logistics/inactiveView", {
                      state: data,
                    });
                  }
                } else {
                  console.error("Logo upload failed");
                }
              } catch (error) {
                console.error(error);
              }
            }
          });
        } else {
          notify("error", "Failed to submit the form. Please try again later.");
        }
      } catch (error) {
        notify(
          "error",
          "An error occurred while submitting the form. Please try again later."
        );
      }
    } else {
      notify(
        "error",
        "Please input all fields and company logo before submitting."
      );
    }
  };

  const handleUploadChange = (event) => {
    const file = event.target.files[0];
    setUploadFile(file);

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      // Perform necessary operations with the file, such as saving or previewing
    } else {
      // Display an error message or perform any other error handling
      alert("Invalid file format. Please select a PNG or JPEG file.");
    }
  };

  //delete uploaded files from state
  const handleDeleteFile = (fileType) => {
    switch (fileType) {
      case "upload":
        setUploadFile(null);
        document.getElementById("upload").value = "";
        break;
      default:
        break;
    }
  };
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Box>
              <div style={{ minWidth: "100%", marginBottom: "1rem" }}>
                <form>
                  <Card>
                    <CardHeader title="Create new customer" />
                    <CardContent sx={{ pt: 0 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Company Contact Person"
                            name="firstname"
                            value={firstName}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        {/* <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastname"
                          value={lastName}
                          onChange={handleInputChange}
                        ></TextField>
                      </Grid> */}
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Company Email"
                            name="Email"
                            value={email}
                            onChange={handleInputChange}
                            helperText={
                              hasError && "Please enter a valid email."
                            }
                            onBlur={handleBlur}
                            error={hasError}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={12}>
                          <div style={{ display: "flex" }}>
                            <TextField
                              style={{ width: 100, marginRight: 10 }}
                              label="Code"
                              name="countryCode"
                              type="text"
                              value={"+91"}
                            />
                            <TextField
                              style={{ flexGrow: 1 }}
                              fullWidth
                              label="Company Phone"
                              name="phone"
                              type="number"
                              value={phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </Grid>

                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            value={company}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="PAN Number"
                            name="pan"
                            value={pan}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="GST Number"
                            name="gstn"
                            value={gstn}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Type"
                            name="type"
                            value={type}
                            select
                            onChange={handleInputChange}
                          >
                            {customerType.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Billing Address"
                            name="address"
                            multiline
                            rows={2}
                            value={address}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid />
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            select
                            defaultValue=""
                            value={currentCountry}
                            onChange={handleCountry}
                          >
                            {userOptionsCountry?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="State"
                            name="state"
                            select
                            defaultValue=""
                            value={currentState}
                            onChange={handleState}
                            onFocus={handleDefaultState}
                          >
                            {userOptionsState?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="City"
                            name="city"
                            select
                            defaultValue=""
                            value={currentCity}
                            onChange={handleCities}
                          >
                            {userOptionsCities?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Zip Code"
                            name="zipcode"
                            value={zipcode}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmpassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                          ></TextField>
                        </Grid>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          xs={12}
                          md={6}
                        >
                          <Grid item>
                            <Typography variant="subtitle2">
                              Admin access:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              checked={checked}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </Grid>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <div>
                            <div style={{ display: "inline-block" }}>
                              <Button
                                color="primary"
                                variant="contained"
                                align="right"
                                onClick={() =>
                                  document.getElementById("upload").click()
                                }
                              >
                                Upload Company Logo
                              </Button>
                              {uploadFile && (
                                <Button
                                  color="secondary"
                                  onClick={() => handleDeleteFile("upload")}
                                  startIcon={<Delete />}
                                  sx={{ color: "grey" }}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                            <input
                              type="file"
                              id="upload"
                              onChange={handleUploadChange}
                              style={{ display: "none" }}
                            />
                          </div>
                          <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            File must be in PNG/JPEG format
                          </Typography>
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
                      onClick={handleToHome}
                      href={paths.index}
                      type="submit"
                    >
                      Save
                    </Button>
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
                </Grid>
              </div>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>Add Customer</h2>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <User />
        </div>
      </div>

      <Box
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          flex: {
            xs: "1 1 auto",
            md: "0 0 auto",
          },
          flexDirection: "column",
          maxWidth: "100%",
          p: {
            xs: 1,
            md: 1,
          },

          overflowY: "hidden",
        }}
      >
        {renderFormStep()}
      </Box>
    </>
  );
};

export default AdminUserCreateForm;
