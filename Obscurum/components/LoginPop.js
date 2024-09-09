import * as React from "react";
import styles from "../styles/popUp.module.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateAccount from "./createUser";
import ResetPasswordRequest from "./PasswordResetRequestPop";

export default function FormDialog() {
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState("");

  const handleClickOpen = () => {
    console.log("Login button clicked");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        setUser(data); // Set user information to state
        console.log("Logged in user:", data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        setError("Failed to fetch user information");
      }
      handleClose(); // Close dialog on successful login
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Login failed");
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        className={styles["MuiButton-root"]}
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleLogin,
        }}
      >
        <DialogTitle>Log-In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To pick up where you left off, please log in here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Log In</Button>
          <ResetPasswordRequest />
          <Button onClick={handleClose}>Continue As Guest</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            Don't have an account? Create one below!
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.popupbuttons}>
          <CreateAccount />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
