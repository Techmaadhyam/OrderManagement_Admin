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
        src={`data:${logo.fileType};base64, ${logo.file}`}
        //src="/assets/logos/notelogo.png"
      />
      <h3 style={{ margin: "0px", fontSize: "15px" }}>
        {logo.company}
      </h3>
      <p style={{ margin: "0px", fontSize: "12px" }}>
        GSTN NO: {logo.gstn}
      </p>
    </>
  );
};

export default Logo;
