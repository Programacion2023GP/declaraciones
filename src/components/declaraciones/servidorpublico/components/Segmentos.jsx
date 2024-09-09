import { red } from "@mui/material/colors";
import { Children, cloneElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useFormikContext } from "formik";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Button } from "@mui/material";

export const Segmento = ({ children, text, setError = false, messageButton }) => {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleNext = () => {
      if (Children.count(children) - 1 == value) {
         return;
      }
      setValue(value + 1);
   };
   const handleBefore = () => {
      setValue(value - 1);
   };
   const errorColor = red[500];
   const formik = useFormikContext();
   const names = [
      { 0: ["FechaInicio", "FechaConclusion"] },
      { 1: ["RemuneracionMensualAnualConclusionCargoPublico"] },
      {
         2: [
            "AICE_RemuneracionTotal",
            "AICE_NombreRazonSocial",
            "AICE_TipoNegocio",
            "AF_RemuneracionTotal",
            "AF_Id_TipoInstrumento",
            "AF_EspecifiqueOtroTipo",
            "SP_RemuneracionTotal",
            "SP_TipoServicioPrestado",
            "EB_RemuneracionTotal",
            "EB_Id_TipoBienEnajenado",
            "OINC_RemuneracionTotal",
            "OINC_EspecificarTipoIngreso"
         ]
      },
      { 3: ["IngresoNetoParejaDependiente"] },
      { 4: ["IngresoMensualAnualConclusionNeto", "TotalIngresosNetos"] }
   ];
   const [update, setUpdate] = useState(false);
   const [errors, setErrors] = useState([]);
   useEffect(() => {
      const newErrors = [];
      names.forEach((item, index) => {
         const fieldNames = item[index] || [];
         const hasError = fieldNames.some((fieldName) => formik.errors[fieldName] && formik.touched[fieldName]);
         if (hasError && !errors.includes(index)) {
            newErrors.push(index);
         }
      });

      setErrors((prevErrors) => {
         const updatedErrors = prevErrors.concat(newErrors);
         const currentErrors = updatedErrors.filter((errorIndex) => {
            const fieldNames = names[errorIndex][errorIndex] || [];
            const hasError = fieldNames.some((fieldName) => formik.errors[fieldName] && formik.touched[fieldName]);
            return hasError;
         });
         return currentErrors;
      });
   }, [formik.errors, formik.touched]);

   // Se ejecuta solo una vez al montar el componente

   return (
      <>
         <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}>
                  <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
                     {Children.map(children, (child, index) => {
                        return (
                           <Tab
                              sx={{ color: errors.includes(index) ? errorColor : undefined }} // Establece el color solo si hay errores
                              label={`${child.props.label}  ${errors.includes(index) ? " (Tienes errores)" : ""}`}
                              value={index}
                           />
                        );
                     })}
                  </TabList>
               </Box>
               {Children.map(children, (child, index) => {
                  return <TabPanel value={index}>{child}</TabPanel>;
               })}
            </TabContext>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
               {/* Botón "Regresar", visible si value != 0 */}
               <Ngif condition={value !== 0}>
                  <Button sx={{ marginRight: "2rem" }} onClick={handleBefore} type="button" variant="outlined" color="secondary">
                     Regresar
                  </Button>
               </Ngif>

               {/* Contenedor de los botones "Continuar" y "Finalizar" */}
               <Box display="flex" justifyContent="flex-end" width="100%">
                  {/* Botón "Continuar", visible si no es el último paso */}
                  <Ngif condition={Children.count(children) - 1 > value}>
                     <Button onClick={handleNext} type="button" variant="contained" color="primary">
                        Continuar
                     </Button>
                  </Ngif>

                  {/* Botón final, visible si es el último paso */}
                  <Ngif condition={Children.count(children) - 1 === value}>
                     <Button onClick={handleNext} type="submit" variant="contained" color="primary">
                        {messageButton}
                     </Button>
                  </Ngif>
               </Box>
            </Box>
         </Box>
      </>
   );
};
export const TabSegment = ({ label, children }) => {
   return children;
};
