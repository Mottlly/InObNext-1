import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FullscreenOverlay from "./TransOverlay";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Copyright from "@mui/icons-material/Copyright";
import LocalMovies from "@mui/icons-material/LocalMovies";

const actions = [
  { icon: <PlayArrow />, name: "MainGame", href: "/mainGame" },
  { icon: <LocalMovies />, name: "Movie", href: "/Menu" },
  { icon: <Copyright />, name: "Credits", href: "/Credits" },
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

//import { LocalMovies as BananaIcon, Copyright as CopyrightIcon } from "@mui/icons-material/Copyright"
