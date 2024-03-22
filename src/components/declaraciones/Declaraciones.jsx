import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

import { DatosGenerales } from "./datosgenerales/DatosGenerales";
import { Titles } from "./funciones/titles";
import { useParams } from "react-router-dom";
import { DomicilioDeclarante } from "./domiciliodeclarante/DomicilioDeclarante";
import { DatosCurriculares } from "./datoscurriculares/DatosCurriculares";
import { DatosEmpleo } from "./datosempleo/DatosEmpleo";
import { ExperienciaLaboral } from "./experiencialaboral/ExperienciaLaboral";

export const Declaraciones = () => {
   const { declaracion } = useParams();
   const [activeStep, setActiveStep] = useState(4);
   const [page, setPage] = useState(0);
   const stepsPerPage = 5;

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if ((activeStep + 1) % stepsPerPage === 0) {
         setPage((prevPage) => prevPage + 1);
         setActiveStep(0);
      }
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      if (activeStep % stepsPerPage === 0 && page > 0) {
         setPage((prevPage) => prevPage - 1);
         setActiveStep(stepsPerPage - 1);
      }
   };

   const steps = [
      { label: `Datos generales`, component: <DatosGenerales next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Domicilio Declarante`, component: <DomicilioDeclarante next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Datos Curriculares del Declarante`, component: <DatosCurriculares next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Datos del empleo, cargo o comisión que inicia`, component: <DatosEmpleo next={handleNext} previous={handleBack} title={Titles(declaracion)} /> },
      { label: `Experiencia laboral (últimos cinco empleos)`, component: <ExperienciaLaboral next={handleNext} previous={handleBack} title={Titles(declaracion)} /> }
   ];

   const startIndex = page * stepsPerPage;
   const endIndex = Math.min(startIndex + stepsPerPage, steps.length);
   const visibleSteps = steps.slice(startIndex, endIndex);

   return (
      <Box sx={{ minWidth: "90%" }}>
         <Stepper activeStep={activeStep}>
            {visibleSteps.map((step, index) => (
               <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
               </Step>
            ))}
         </Stepper>
         <Box sx={{ mt: 3 }}>
            <Typography>{visibleSteps[activeStep % stepsPerPage].component}</Typography>
         </Box>
      </Box>
   );
};
