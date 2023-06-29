import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
 

  return (
    <>
      <Box
        component="img"
        sx={{
          height: 40,
          width: "auto",
          ml: 0,
          mt: 0,
          mb: 0,
          mr: 0,
        }}
        alt="note logo"
        src="/assets/logos/notelogo.png"
      />
    </>
  );
};

export default Logo;
