import { Backdrop, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "./Reusables/loading/Loading";

export const insertFormik = (formik, data) => {
   const esNumero = (cadena) => !isNaN(parseFloat(cadena)) && isFinite(cadena);

   for (let key in data) {
      if (typeof data[key] === "string" && esNumero(data[key])) {
         if (data[key].includes(".")) {
            data[key] = parseFloat(data[key]);
         } else {
            data[key] = parseInt(data[key], 10);
         }
      }
   }
   formik.current.setValues(data);
   
};
const SimpleBackdrop = ({state}) => {
   const [open, setOpen] = useState(state);
   const handleClose = () => {
      setOpen(false);
   };
   const handleOpen = () => {
      setOpen(true);
   };

   return (
      <>
         <Button onClick={handleOpen}>Show backdrop</Button>
         <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <Loading />
         </Backdrop>
      </>
   );
};
