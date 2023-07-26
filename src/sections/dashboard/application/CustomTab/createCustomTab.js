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



const fieldType = [

    {
        label: "Textfield",
        value: "Textfield",
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case "userName":
                setUserName(value);
                break;
            case "label":
                setLabel(value);
                break;
            // case "type":
            //     setType(true);
            //     break;
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
                            {/* <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Is Visible"
                                    name="type"
                                    required
                                    onChange={handleInputChange}
                                    value={type}
                                >
                                </TextField>
                            </Grid> */}
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={description}
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

export default CreateCustomTab;
