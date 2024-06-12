import { FormControl, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Field, useFormikContext } from "formik";
import 'dayjs/locale/es'; // Importa el idioma español
import { useEffect } from "react";

/**
 * 
 * INSTALAR...
 * npm install @mui/x-date-pickers
 * npm install dayjs
 * 
 * AGREGAR A TODA LA APLICACION --> src/App.jsx
 * import { LocalizationProvider } from "@mui/x-date-pickers";
 * import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
 * <LocalizationProvider dateAdapter={AdapterDayjs}> ... </<LocalizationProvider>
 * 
 * <DatePickerComponent
      idName={"license_due_date"}
      label={"Fecha de Vencimiento *"}
      format={"DD/MM/YYYY"}
      value={values.license_due_date}
      setFieldValue={setFieldValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.license_due_date}
      touched={touched.license_due_date}
      showErrorInput={null}
   />
 */

const DatePickerComponent = ({
   idName,
   label,
   format = "DD/MM/YYYY",
   value,
   setFieldValue,
   onChange,
   onBlur,
   error,
   touched,
   showErrorInput = null,
   formData,
   disabled
}) => {
   dayjs.locale('es');
   const formik = useFormikContext()
   useEffect(() => {
      if (!formik.values[idName]) {
         const today = dayjs().format("YYYY-MM-DD");
         formik.setFieldValue(idName, today);
      }
   }, [formik.values[idName], idName]);
   // const handleChangeDatePicker = (date, setFieldValue) => {
   //    // console.log("valor del datePicker en daysjs", date);
   //    const dateFormated = dayjs(date).format("YYYY-MM-DD");
   //    // console.log("idName", idName);
   //    // console.log("formData", formData);
   //    formData[idName] = dateFormated;
   //    setFieldValue(idName, formData[idName]);
   //    // console.log("formData", formData);
   // };

   return (
      <FormControl fullWidth sx={{ margin: "1rem 0" }}>
         <Field name={idName} id={idName}>
            {({ field, form }) => (
               <>
                  <DatePicker
                     label={label}
                     format={format}
                     fullWidth
                     value={dayjs(formik.values[idName]) || null}
                     onChange={(date) => formik.setFieldValue(field.name, dayjs(date).format("YYYY-MM-DD"))}
                     error={error && touched}
                     disabled={disabled}
                  />
                  { formik.errors[idName] && (
                     <FormHelperText error id={`ht-${idName}`}>
                       {formik.errors[idName]}
                     </FormHelperText>
                  )}
               </>
            )}
         </Field>
         {/* <Field name={idName} id={idName}>
            {({ field, form, meta }) => (
               <>
                  <DatePicker
                     closeOnSelect
                     {...field}
                     value={dayjs(field.value) || null}
                     onChange={(date) => {
                        form.setFieldValue(field.name, date);
                        handleChangeDatePicker(date, form.setFieldValue);
                     }}
                     // disabled={values.id == 0 ? false : true}
                     error={error && touched}
                  />
                  {touched && error && (
                     <FormHelperText error id={`ht-${idName}`}>
                        {showErrorInput ? showErrorInput(2, error) : error}
                     </FormHelperText>
                  )}
               </>
            )}
         </Field> */}
      </FormControl>
   );
};

export default DatePickerComponent;
