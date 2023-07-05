import React from "react";
import { Box } from "@mui/material";
import {  useContext } from "react";
import { LogoContext } from "src/utils/logoContext";


const Logo = () => {

  const { logo } = useContext(LogoContext);
  

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
        //src={`data:${logo.fileType};base64, ${logo.file}`}
        src="/assets/logos/notelogo.png"
      />
      <h3 style={{ margin: "0px", fontSize: "15px" }}>
        Note Automation and Solutions
      </h3>
      <p style={{ margin: "0px", fontSize: "12px" }}>
        GSTN NO: 29AARFN6647D1ZR
      </p>
    </>
  );
};

export default Logo;
