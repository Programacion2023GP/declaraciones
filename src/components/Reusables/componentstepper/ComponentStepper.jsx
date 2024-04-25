import { Fragment, cloneElement, forwardRef, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
//uuidv4()
import { useFormikContext } from "formik";
import { Ngif } from "../conditionals/Ngif";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { ref } from "yup";
import { element } from "prop-types";
import { v4 as uuidv4 } from "uuid";

const color = pink[300];

export const ComponentStepper = ({ steps, endButton, buttonContinue, buttonAfter, postStepper=1 }) => {
   const formik = useFormikContext();
   const { errors, touched, values, isSubmitting } = formik;
   const componentRef = useRef(null);
   const [activeStep, setActiveStep] = useState(0);
   const [errorStepper, setErrorStepper] = useState([]);

   useEffect(() => {
      const errorsFormik = Object.keys(errors).filter((key) => touched[key] && errors[key]);
      const names = Array.from(componentRef.current.querySelectorAll("[name]"))
         .map((element) => element.name)
         .filter((name) => name !== undefined);

      if (errorsFormik.some((item) => names.includes(item))) {
         if (!errorStepper.includes(activeStep)) {
            setErrorStepper([...errorStepper, activeStep]);
         }
      } else {
         setErrorStepper(errorStepper.filter((step) => step !== activeStep));
      }
   }, [errors, touched, componentRef, activeStep, errorStepper.length]);
   useEffect(() => {
      setActiveStep(0)      
   }, [postStepper]);

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

   return (
      <Box sx={{ width: "100%" }}>
         <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
               const labelProps = {};
               if (errorStepper.includes(index)) {
                  labelProps.optional = (
                     <Typography key={"Typography" + uuidv4()} variant="caption" color="error">
                        Hay un campo invalido en esta sección.
                     </Typography>
                  );

                  labelProps.error = true;
               }
               return (
                  <Step key={"Step" + uuidv4()} sx={{ color: "red" }}>
                     <StepLabel key={"StepLabel" + uuidv4()} {...labelProps} color="error">
                        {step.label}
                     </StepLabel>
                  </Step>
               );
            })}
         </Stepper>
         <Box>
            <br />
            {steps[activeStep] && <ComponentRefStepper ref={componentRef} activeStep={activeStep} component={steps[activeStep].component} />}
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
const ComponentRefStepper = forwardRef(({ component, activeStep }, ref) => {
   return (
      <div key={"component"} ref={ref}>
         {component}
      </div>
   );
});
