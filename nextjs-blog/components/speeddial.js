import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const actions = [
  { icon: <PlayArrowIcon />, name: "MainGame" },
  { icon: <LocalMoviesIcon />, name: "Movie" },
  { icon: <CopyrightIcon />, name: "Credits" },
  { icon: <SettingsSuggestIcon />, name: "Settings" },
];

export default function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction={"right"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
