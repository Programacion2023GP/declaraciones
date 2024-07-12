import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import { DocumentacionSugerida } from "./DocumentacionSugerida";
import { useStepperContext } from "../../../context/StepperContext";
import { TipoDeclaracion } from "./TipoDeclaracion";
import { Plazos } from "./Plazos";
import { BajoProtesta } from "./BajoProtesta";
import { DialogWarning } from "../../Reusables/DialogWarning";

const color = pink[300];

const steps = [
   {
      label: "Documentación Sugerida",
      content: <DocumentacionSugerida />
   },
   {
      label: "Tipo de Declaración",
      content: <TipoDeclaracion />
   },
   {
      label: "Información de Plazos de Declaración",
      content: <Plazos />
   },
   {
      label: "Bajo Protesta",
      content: <BajoProtesta />
   }
];

const Steppers = () => {
   const { checked, selected, checkedPlazo, checkedProtesta, dialog, setDialog, resetStepper } = useStepperContext();
   const [activeStep, setActiveStep] = useState(0);
   const [skipped, setSkipped] = useState(new Set());
   const checkeds = [checked, selected, checkedPlazo, checkedProtesta];
   const messages = [
      "Se tiene que aceptar para continuar",
      "Se tiene que seleccionar una opcion",
      "Se tiene que aceptar para continuar",
      "Se tiene que aceptar para continuar"
   ];

   const isStepOptional = (step) => {
      return step === 1;
   };

   const isStepSkipped = (step) => {
      return skipped.has(step);
   };

   const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
         newSkipped = new Set(newSkipped.values());
         newSkipped.delete(activeStep);
      }
      console.warn(activeStep, checkeds[activeStep]);
      if (checkeds[activeStep]) {
         setDialog(false);
         setActiveStep((prevActiveStep) => prevActiveStep + 1);
         if (activeStep === steps.length - 1) {
            localStorage.removeItem("id_SituacionPatrimonial");

            window.location.hash = `dashboard/declaraciones/${selected}`;
         }
         setSkipped(newSkipped);
      } else {
         setDialog(true);
      }
      if (activeStep === steps.length - 1) {
         resetStepper();
      }
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
         throw new Error("You can't skip a step that isn't optional.");
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      setSkipped((prevSkipped) => {
         const newSkipped = new Set(prevSkipped.values());
         newSkipped.add(activeStep);
         return newSkipped;
      });
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   return (
      <Box sx={{ width: "100%" }}>
         {dialog && <DialogWarning text={messages[activeStep]} />}
         <Stepper activeStep={activeStep}>
            {steps.map((step, index) => (
               <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
               </Step>
            ))}
         </Stepper>
         <Box>
            <br />
            <br />

            {steps[activeStep] && steps[activeStep].content}
         </Box>
         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               marginTop: 2
            }}
         >
            <Button
               style={{
                  backgroundColor: color,
                  color: "white",
                  display: activeStep === 0 ? "none" : "inline-block" // Oculta el botón si activeStep es 0
               }}
               variant="contained"
               disabled={activeStep === 0}
               onClick={handleBack}
               sx={{ marginRight: 1 }}
            >
               Regresar
            </Button>

            <Box>
               <Button
                  color="primary" // Cambia el color del botón a primario (azul por defecto)
                  variant="contained"
                  onClick={handleNext}
               >
                  {activeStep === steps.length - 1 ? "Comenzar" : "Continuar"}
               </Button>
            </Box>
         </Box>
      </Box>
   );
};

export default Steppers;