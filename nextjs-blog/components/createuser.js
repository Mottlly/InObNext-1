import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateAccount() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [error, setError] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        // Remember to create adjusted endpoint for account creation //
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, passwordConfirm }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Created account for user:", data.user);
        handleClose(); // Close dialog on successful account creation
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Account creation failed");
      }
    } catch (error) {
      console.error("Error during account creation:", error.message);
      setError("Account creation failed");
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Create Account</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleCreateAccount,
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an account, please fill in your details here.
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
          <TextField
            required
            margin="dense"
            id="passwordconfirm"
            name="passwordconfirm"
            label="Passwordconfirm"
            type="passwordconfirm"
            fullWidth
            variant="standard"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Create Account</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
