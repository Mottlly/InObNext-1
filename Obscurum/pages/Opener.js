import React, { useState } from "react";
import {
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../styles/titleScreen.module.scss";
import MenuscreenOverlay from "../components/menuSettings";
import FormDialog from "../components/loginPop";

function OpeningCrawl() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);

  const handleContinueClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsDialogOpen(true); // Show the pop-up if no token is found
    } else {
      // Logic to continue to the next part of your application
      console.log("Token is valid, continue to the game.");
      window.location.href = "/mainGame";
    }
  };

  return (
    <>
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
            <FormDialog />
            <Button
              variant="outlined"
              className={styles["MuiButton-root"]}
              onClick={handleContinueClick}
            >
              Continue
            </Button>
            <Button
              variant="outlined"
              href="/mainGame"
              className={styles["MuiButton-root"]}
            >
              Play
            </Button>
            <Button
              variant="outlined"
              onClick={openOverlay}
              className={styles["MuiButton-root"]}
            >
              Settings
            </Button>
            <Button
              variant="outlined"
              href="/Credits"
              className={styles["MuiButton-root"]}
            >
              Credits
            </Button>
          </Stack>
        </div>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <p>You need to log in to continue where you left off.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OpeningCrawl;
