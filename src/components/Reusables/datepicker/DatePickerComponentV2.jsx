import { FormControl, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import  'dayjs/locale/es'; 
import { Field, useFormikContext } from "formik";
import { useEffect } from "react";

const DatePickerComponentV2 = ({
   name,
   label,
   format = "DD/MM/YYYY",
   disabled,
   showErrorInput=null
}) => {
   const formik = useFormikContext();
   const { errors, touched } = formik;
   dayjs.locale('es');

   useEffect(() => {
   }, [errors[name], touched[name]]);
   return (
      <FormControl fullWidth sx={{ margin: "1rem 0",paddingLeft:".4rem"  }}>
         <Field name={name} id={name}>
            {({ field, form }) => (
               <>
                  <DatePicker
                     label={label}
                     format={format}
                     fullWidth
                     value={dayjs(field.value) || null}
                     onChange={(date) => form.setFieldValue(field.name, dayjs(date).format("YYYY-MM-DD"))}
                     error={!!errors[name] && touched[name]}
                     disabled={disabled}

                  />
                   {touched[name] && errors[name] && (
                     <FormHelperText error id={`ht-${name}`}>
                        {showErrorInput ? showErrorInput(2, errors[name] ) : errors[name] }
                     </FormHelperText>
                  )}
               </>
            )}
         </Field>
      </FormControl>
   );
};

export default DatePickerComponentV2;
