import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { yellow } from "@mui/material/colors";
import { useStepperContext } from "../../context/StepperContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogWarning = ({ text }) => {
  const warning = yellow[300];
  const { dialog, setDialog } = useStepperContext();

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <>
      <Dialog
        color="warning"
        open={true}
        TransitionComponent={Transition} // Corregir la asignación de la transición
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            background: warning, // Cambia el color de fondo de la barra de título
          },
        }}
      >
        <DialogTitle>{"Se a presentado un error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
