import React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "src/config";

const Logo = () => {

  const [userData, setUserData] = useState();
  const [imageSrc, setImageSrc] = useState(null);

  const mail = sessionStorage.getItem("mail");

  useEffect(() => {
    axios
      .get(apiUrl + `getUserByUsername/${mail}`)
      .then((response) => {
        setUserData(response.data.documents[0].fileData);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    if (userData) {
      const base64ImageData = `data:image/png;base64,${userData}`;



     if (base64ImageData) {
       const mimeType = base64ImageData
         .split(",")[0]
         ?.split(":")[1]
         ?.split(";")[0];

       const byteCharacters = atob(base64ImageData.split(",")[1]);
       const byteArrays = [];

       for (let i = 0; i < byteCharacters.length; i++) {
         byteArrays.push(byteCharacters.charCodeAt(i));
       }

       const byteArray = new Uint8Array(byteArrays);
       const blob = new Blob([byteArray], { type: mimeType });
       const dataURL = URL.createObjectURL(blob);

       setImageSrc(dataURL);
     }
    }
  }, [userData]);

 

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 70,
          width: "auto",
          ml: 0,
          mt: 0,
          mb: 0,
          mr: 0,
        }}
        alt="logo"
        src={imageSrc || "/assets/logos/notelogo.png"}
      />
    </>
  );
};

export default Logo;
