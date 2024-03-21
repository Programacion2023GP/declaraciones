import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";

import { DatosGenerales } from "./datosgenerales/DatosGenerales";
import { Titles } from "./funciones/titles";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { DomicilioDeclarante } from "./domiciliodeclarante/DomicilioDeclarante";
import { DatosCurriculares } from "./datoscurriculares/DatosCurriculares";
import { DatosEmpleo } from "./datosempleo/DatosEmpleo";
import { ExperienciaLaboral } from "./experiencialaboral/ExperienciaLaboral";

const color = pink[300];

export const Declaraciones = () => {
   const { declaracion } = useParams();
   const [skipped, setSkipped] = useState(new Set());
   const checkeds = [];
   const messages = [
      "Se tiene que aceptar para continuar",
      "Se tiene que seleccionar una opcion",
      "Se tiene que aceptar para continuar",
      "Se tiene que aceptar para continuar"
   ];

   const [activeStep, setActiveStep] = useState(4);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleReset = () => {
      setActiveStep(0);
   };
   const steps = [
      {
         label: `Datos generales`,
         description: () => <DatosGenerales next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      },
      {
         label: `Domicilio Declarante`,
         description: () => <DomicilioDeclarante next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      },
      {
         label: `Datos Curriculares del Declarante`,
         description: () => <DatosCurriculares next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      },
      {
         label: `Datos del empleo, cargo o comisión que inicia`,
         description: () => <DatosEmpleo next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      },
      {
         label: `Experiencia laboral (últimos cinco empleos)`,
         description: () => <ExperienciaLaboral next={handleNext} previous={handleBack} title={Titles(declaracion)} />
      }
   ];
   return (
      <>
         <Box sx={{ minWidth: "90%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
               {steps.map((step, index) => (
                  <Step key={step.label}>
                     <StepLabel optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>{step.label}</StepLabel>
                     <StepContent>
                        <Typography>{step.description()}</Typography>
                        <Box sx={{ mb: 2 }}>
                           <div></div>
                        </Box>
                     </StepContent>
                  </Step>
               ))}
            </Stepper>
            {activeStep === steps.length && (
               <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                     Reset
                  </Button>
               </Paper>
            )}
         </Box>
      </>
   );
};
