import React, { useState } from "react";
import styles from "../styles/transoverlay.module.scss";
import { Slider, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MenuscreenOverlay = ({ isOpen, onClose }) => {
  const [volume, setVolume] = useState(50); // Default volume
  const [brightness, setBrightness] = useState(50); // Default brightness

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  return (
    <div>
      {isOpen && (
        <div id="myNav" className={styles.overlay} style={{ width: "100%" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
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

export default MenuscreenOverlay;
