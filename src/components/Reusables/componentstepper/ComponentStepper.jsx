import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";

import Interface from "../../../services/interface";
import { useFormikContext } from "formik";
import { Ngif } from "../conditionals/Ngif";
import { Alert, AlertTitle } from "@mui/material";

const color = pink[300];
const schema = {
   steps: "any",
   endButton: "string",
   buttonContinue: "string",
   buttonAfter: "string"
   // submit: "function"
};

export const ComponentStepper = ({ steps, endButton, buttonContinue, buttonAfter }) => {
   const formik = useFormikContext();
   const { errors, touched,values } = formik;
   const props = { steps, endButton, buttonContinue, buttonAfter };
   useEffect(() => {
      Interface(props, schema);
   }, [props, errors]);

   const [activeStep, setActiveStep] = useState(0);
   const [skipped, setSkipped] = useState(new Set());

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
      if (activeStep === steps.length - 1) {
         // setActiveStep(0);
         console.log("fini")
         submit(formik.values);
      }
      if (activeStep < steps.length - 1) {
         setSkipped(newSkipped);

         setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
         <Ngif condition={Object.keys(errors).length > 0 && Object.keys(touched).some((key) => touched[key] && errors[key])}>
            <Alert severity="warning">
               <AlertTitle>Error</AlertTitle>
               Verifica los campos.
            </Alert>
         </Ngif>
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

            {steps[activeStep] && steps[activeStep].component}
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
               {buttonAfter}
            </Button>

            <div>
               <Ngif condition={activeStep === steps.length - 1}>
                  <Button
                     type="submit"
                     color="primary" // Cambia el color del botón a primario (azul por defecto)
                     variant="contained"
                  >
                     {endButton}
                  </Button>
               </Ngif>
               <Ngif condition={activeStep !== steps.length - 1}>
                  <Button
                     type={"button"}
                     color="primary" // Cambia el color del botón a primario (azul por defecto)
                     variant="contained"
                     onClick={handleNext}
                  >
                     {buttonContinue}
                  </Button>
               </Ngif>
            </div>
         </Box>
      </Box>
   );
};
