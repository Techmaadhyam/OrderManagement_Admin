import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    MenuItem,
    Select,
    Icon,
    Unstable_Grid2 as Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import IconWithPopup from "src/sections/dashboard/user/user-icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "src/config";
import Logo from "src/sections/dashboard/logo/logo";

// Add icon options imports here
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import StoreMallDirectoryTwoToneIcon from "@mui/icons-material/StoreMallDirectoryTwoTone";
import FactoryTwoToneIcon from "@mui/icons-material/FactoryTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";

const iconOptions = [
  {
    label: "Accouting 1",
    value: "BusinessTwoToneIcon",
    icon: <BusinessTwoToneIcon />,
  },
  {
    label: "Warehouse 1",
    value: "WarehouseOutlinedIcon",
    icon: <WarehouseOutlinedIcon />,
  },
  {
    label: "Warehouse 2",
    value: "StorefrontTwoToneIcon",
    icon: <StorefrontTwoToneIcon />,
  },
  {
    label: "Warehouse 3",
    value: "StoreMallDirectoryTwoToneIcon",
    icon: <StoreMallDirectoryTwoToneIcon />,
  },
  {
    label: "Warehouse 4",
    value: "FactoryTwoToneIcon",
    icon: <FactoryTwoToneIcon />,
  },
  {
    label: "Product 1",
    value: "AddTwoToneIcon",
    icon: <AddTwoToneIcon />,
  },
  {
    label: "Product 2",
    value: "ProductionQuantityLimitsTwoToneIcon",
    icon: <ProductionQuantityLimitsTwoToneIcon />,
  },
];



//get userid
const userId = sessionStorage.getItem("user") || localStorage.getItem("user");

const CreateCustomTab = () => {
    //form state handling
    const [userName, setUserName] = useState("");
    const [label, setLabel] = useState("");
    const [type, setType] = useState(true);
    const [description, setDescription] = useState("");
    const [userData, setUserData] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "userName":
                setUserName(value);
                break;
            case "label":
                setLabel(value);
                break;
            case "selectedIcon":
                setSelectedIcon(value);
                break;
            case "description":
                setDescription(value);
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
                const response = await fetch(apiUrl + "createUpdateAppObject", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tablename: userName,
                        tablelabel: label,
                        isvisible: type,
                        description: description,
                        //logo: selectedIcon,
                        createddate: new Date(),
                        // createdByUser: { id: userId },

                        // lastModifiedDate: new Date(),
                        // lastModifiedByUser: { id: userId },
                    }),
                });

                if (response.ok) {
                    // Redirect to home page upon successful submission

                    response.json().then((data) => {
                        navigate("/dashboard/application/tab/detail", { state: data });
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
            <h2 style={{ margin: 0 }}>Create Custom Tab</h2>
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
            <CardHeader title="New Tab" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Table Name"
                    name="userName"
                    value={userName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Table Label"
                    name="label"
                    value={label}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    multiline
                    rows={2}
                    value={description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid />
                <Grid xs={12} md={6}>
                  <TextField
                    value={selectedIcon}
                    name="selectedIcon"
                    onChange={handleInputChange}
                    label="Choose icon"
                    fullWidth
                    select
                    SelectProps={{
                      MenuProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                  >
                    {iconOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Icon
                          style={{
                            marginRight: 8,
                            verticalAlign: "middle", 
                            lineHeight: "normal",
                          }}
                        >
                          {option.icon}
                        </Icon>
                        {option.label}
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

export default CreateCustomTab;
