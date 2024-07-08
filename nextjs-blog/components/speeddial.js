import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FullscreenOverlay from "../components/transoverlay";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const actions = [
  { icon: <PlayArrowIcon />, name: "MainGame", href: "/maingame" },
  { icon: <LocalMoviesIcon />, name: "Movie", href: "/homepage" },
  { icon: <CopyrightIcon />, name: "Credits", href: "/credits" },
  {
    icon: <FullscreenOverlay />,
    name: "Settings",
  },
];

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ height: "10vh", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 16, left: 16 }}
        icon={<SpeedDialIcon />}
        direction={"right"}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            href={action.href}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
