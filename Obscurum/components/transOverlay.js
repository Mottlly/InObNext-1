import React, { useState } from "react";
import styles from "../styles/transOverlay.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import { Slider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FullscreenOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navWidth, setNavWidth] = useState("0%");
  const [volume, setVolume] = useState(50); // Default volume
  const [brightness, setBrightness] = useState(50); // Default brightness

  const openNav = () => {
    setNavWidth("100%");
    setIsOpen(true);
  };

  const closeNav = () => {
    setNavWidth("0%");
    setIsOpen(false);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  return (
    <div>
      <SettingsIcon onClick={openNav} style={{ cursor: "pointer" }} />
      {isOpen && (
        <div id="myNav" className={styles.overlay} style={{ width: navWidth }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeNav}
            className={styles.closebtn}
          >
            <CloseIcon />
          </IconButton>
          <div className={styles.overlaycontent}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <div className={styles.sliderContainer}>
              <Typography gutterBottom>Volume</Typography>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                min={0}
                max={100}
                valueLabelDisplay="auto"
                step={1}
              />
              <Typography gutterBottom>Brightness</Typography>
              <Slider
                value={brightness}
                onChange={handleBrightnessChange}
                aria-labelledby="brightness-slider"
                min={0}
                max={100}
                valueLabelDisplay="auto"
                step={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullscreenOverlay;
