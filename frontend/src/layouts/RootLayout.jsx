import { Box } from "@mui/material";
import React from "react";
import MenuBar from "../components/Menubar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <Box
      sx={{
        background: 'url("/backGround.png") fixed center',
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ height: "100%" }}>
        <MenuBar>
          <Outlet />
        </MenuBar>
      </Box>
    </Box>
  );
}

export default RootLayout;
