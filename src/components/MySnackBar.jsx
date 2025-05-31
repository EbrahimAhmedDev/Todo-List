import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message }) {
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        // onClick={handleClose}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        // onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
        dir="ltr"
        color="green"
      >
        <Alert
          // onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
