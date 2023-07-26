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
import IconWithPopup from "../user/user-icon";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "src/config";
import Logo from "../logo/logo";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  fetchAccessToken,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchIndianStates,
} from "src/utils/api-service";

//get userid
const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const EditAppUser = () => {
  const location = useLocation();
  const state = location.state;
  // country, state, city API access token
  const [accessToken, setAccessToken] = useState(null);

  //state management for countries,states and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(state?.country || "");
  const [currentState, setCurrentState] = useState(state?.state || "");
  const [currentCity, setCurrentCity] = useState(state?.city || "");

  //form state handling
  const [password, setPassword] = useState(state?.password || "");
  const [category, setCategory] = useState("Customer");
  const [email, setEmail] = useState(state?.email || "");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(state?.company?.id || "");
  const [type, setType] = useState(state?.profile?.id || "");
  const [address, setAddress] = useState(state?.address || "");
  const [zipcode, setZipcode] = useState(state?.zipcode || "");
  const [gstn, setGstn] = useState(state?.gstnumber || "");
  const [touched, setTouched] = useState(false);
  const [pan, setPan] = useState(state?.pandcard || "");

  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  ////

  const handleBlur = () => {
    setTouched(true);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasError = touched && !emailRegex.test(email);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "type":
        setType(value);
        break;
      case "pan":
        setPan(value);
        break;
      case "company":
        setCompany(value);
        break;
      case "gstn":
        setGstn(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "zipcode":
        setZipcode(value);
        break;
      default:
        break;
    }
  };
  ////


 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch(
         "https://www.universal-tutorial.com/api/getaccesstoken",
         {
           headers: {
             Accept: "application/json",
             "api-token":
               "8HWETQvEFegKi6tGPUkSWDiQKfW8UdZxPqbzHX6JdShA3YShkrgKuHUbnTMkd11QGkE",
             "user-email": "mithesh.dev.work@gmail.com",
           },
         }
       );

       if (!response.ok) {
         throw new Error("Failed to fetch access token");
       }

       const data = await response.json();

       setAccessToken(data.auth_token);
     } catch (error) {
       console.error(error);
     }
   };

   fetchData();
 }, []);
 //fetches country list for dropdown and pushesh it to state which is later mapped
 const fetchCountries = useCallback(async () => {
   try {
     const response = await fetch(
       "https://www.universal-tutorial.com/api/countries/",
       {
         headers: {
           Authorization: "Bearer " + accessToken,
           Accept: "application/json",
         },
       }
     );

     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     const data = await response.json();
     setCountries(data);
   } catch (error) {
     console.error("Error fetching countries:", error);
   }
 }, [accessToken]);

 //using useeffect to prevent fetch request being called on render
 useEffect(() => {
   fetchCountries();
 }, [fetchCountries]);

 //mapping countries to MUI select input field
 const userOptionsCountry = useMemo(() => {
   return countries.map((country) => ({
     label: country.country_name,
     value: country.country_name,
   }));
 }, [countries]);

 //mapping states to MUI select input field
 const userOptionsState = useMemo(() => {
   return states.map((state) => ({
     label: state.state_name,
     value: state.state_name,
   }));
 }, [states]);

 //mapping cities to MUI select input field
 const userOptionsCities = useMemo(() => {
   return cities.map((city) => ({
     label: city.city_name,
     value: city.city_name,
   }));
 }, [cities]);

 //fetches states list for dropdown and pushesh it to setStates which is later mapped
 const handleCountry = async (event) => {
   try {
     setCurrentCountry(event.target.value);
     const response = await fetch(
       `https://www.universal-tutorial.com/api/states/${event.target.value}`,
       {
         headers: {
           Authorization: "Bearer " + accessToken,
           Accept: "application/json",
         },
       }
     );

     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     const data = await response.json();
     setStates(data);
   } catch (error) {
     console.error("Error fetching states:", error);
   }
 };

 //fetches cities list for dropdown and pushesh it to setCities which is later mapped
 const handleState = async (event) => {
   try {
     setCurrentState(event.target.value);
     const response = await fetch(
       `https://www.universal-tutorial.com/api/cities/${event.target.value}`,
       {
         headers: {
           Authorization: "Bearer " + accessToken,
           Accept: "application/json",
         },
       }
     );

     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
     const data = await response.json();
     setCities(data);
   } catch (error) {
     console.error("Error fetching states:", error);
   }
 };

 useEffect(() => {
   const fetchStates = async () => {
     try {
       const response = await axios.get(
         `https://www.universal-tutorial.com/api/states/${currentCountry}`,
         {
           headers: {
             Authorization: "Bearer " + accessToken,
             Accept: "application/json",
           },
         }
       );

       if (response.status === 200) {
         const data = response.data;
         setStates(data);
       } else {
         throw new Error("Network response was not ok");
       }
     } catch (error) {
       console.error("Error fetching states:", error);
     }
   };

   if (currentCountry && accessToken) {
     fetchStates();
   }
 }, [currentCountry, accessToken]);

 useEffect(() => {
   const fetchCities = async () => {
     try {
       const response = await axios.get(
         `https://www.universal-tutorial.com/api/cities/${currentState}`,
         {
           headers: {
             Authorization: "Bearer " + accessToken,
             Accept: "application/json",
           },
         }
       );

       if (response.status === 200) {
         const data = response.data;
         setCities(data);
       } else {
         throw new Error("Network response was not ok");
       }
     } catch (error) {
       console.error("Error fetching states:", error);
     }
   };

   if (currentState && accessToken) {
     fetchCities();
   }
 }, [currentState, accessToken]);

 //sets default country to India and fetches state list for India and is pushed to setStates
 const handleDefaultState = async () => {
   try {
     if (currentCountry === "India") {
       const response = await fetch(
         "https://www.universal-tutorial.com/api/states/India",
         {
           headers: {
             Authorization: "Bearer " + accessToken,
             Accept: "application/json",
           },
         }
       );
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       const data = await response.json();
       setStates(data);
     }
   } catch (error) {
     console.error("Error fetching states:", error);
   }
 };

 //sets current city value in MUI select field onchange event
 const handleCities = async (event) => {
   setCurrentCity(event.target.value);
 };

  //for sending response body via route
  const navigate = useNavigate();

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

  const handleClick = async (event) => {
    event.preventDefault();

    if (
      type &&
      company &&
      currentCountry &&
      currentState &&
      address &&
      currentCity &&
      zipcode &&
      pan &&
      gstn
    ) {
      try {
        const response = await fetch(apiUrl + "createUpdateAppUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            body: JSON.stringify({
            id: state?.id,
            company: { id: company },
            category: category,
            profile: { id: type },
            gstnumber: gstn,
            zipcode: zipcode,
            city: currentCity,
            state: currentState,
            country: currentCountry,
            pandcard: pan,
            address: address,
            email: email,
            username: email,
            password: password,
            isactive: state?.isactive,
            createddate: state?.createddate,
            lastmodifieddate: new Date()
            // createdByUser: { id: userId },
            // createdDate: new Date(),
            // lastModifiedDate: new Date(),
            // lastModifiedByUser: { id: userId },
          }),
        });

        if (response.ok) {
          // Redirect to home page upon successful submission

          response.json().then((data) => {
            navigate("/dashboard/appUser/viewDetail", { state: data });
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
          <h2 style={{ margin: 0 }}>Edit App User</h2>
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
          <CardHeader title="New User" />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="company"
                  required
                  value={company}
                  onChange={handleInputChange}
                  select
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  {userData.map(
                    (option) =>
                      option?.name && (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      )
                  )}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Profile"
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
                  {profileData.map(
                    (option) =>
                      option?.name && (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      )
                  )}
                </TextField>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  required
                  value={email}
                  helperText={hasError && "Please enter a valid email."}
                  onBlur={handleBlur}
                  error={hasError}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label="Category" value={category} />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="PAN Card"
                  name="pan"
                  value={pan}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GST Number"
                  name="gstn"
                  value={gstn}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  required
                  minRows={3}
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid />
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  required
                  select
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
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
                  required
                  select
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
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
                  SelectProps={{
                    MenuProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  required
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
                  label="ZipCode"
                  name="zipcode"
                  required
                  value={zipcode}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
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

export default EditAppUser;
