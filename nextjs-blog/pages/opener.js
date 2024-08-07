import React, { useState } from "react";
import styles from "../styles/titlescreen.module.scss";
import { Button, Stack } from "@mui/material";
import MenuscreenOverlay from "../components/menusettings";

function OpeningCrawl() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  return (
    <div className={styles["opening-crawl"]}>
      <MenuscreenOverlay isOpen={isOverlayOpen} onClose={closeOverlay} />
      <div className={styles.header}>
        <h1 className={styles.title}>In Obscurum</h1>
        <img
          src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/0c7eb6ed-663b-4ce4-bfbd-18239a38ba1b"
          alt="Game Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.intro}>
        <h3 className={styles["welcome-message"]}>
          Welcome to the not-so-distant future...
        </h3>
        <Stack spacing={2} mt={4}>
          <Button variant="outlined">Continue</Button>
          <Button variant="outlined" href="/maingame">
            Play
          </Button>
          <Button variant="outlined" onClick={openOverlay}>
            Settings
          </Button>
          <Button variant="outlined" href="/credits">
            Credits
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default OpeningCrawl;
