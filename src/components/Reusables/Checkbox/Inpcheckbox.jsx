import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { useStepperContext } from "../../../context/StepperContext";

export const Inpcheckbox = ({ text, checked, handleCheckbox }) => {
  // const {checked,setChecked} = useStepperContext()

  const handleChange = (e) => {
    handleCheckbox(e.target.checked);
    // setChecked(!checked)
    // console.log("checked",checked);
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={text}
        />
      </FormGroup>
    </>
  );
};
