import { useFormikContext } from "formik";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { Grid } from "@mui/material";

export const Periodos = ({}) => {
   const formik = useFormikContext();

   return (
      <>
         <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
               <DatePickerComponent
                  idName={"FechaInicio"}
                  label={"Fecha de inicio"}
                  format={"DD/MM/YYYY"}
                  // value={values.FechaIngreso}
                  setFieldValue={formik.setFieldValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.FechaInicio}
                  touched={formik.touched.FechaInicio}
                  showErrorInput={null}
               />
            </Grid>
            <Grid item xs={12} lg={6}>
               <DatePickerComponent
                  idName={"FechaConclusion"}
                  label={"Fecha de conclusión"}
                  format={"DD/MM/YYYY"}
                  // value={values.FechaIngreso}
                  setFieldValue={formik.setFieldValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.FechaConclusion}
                  touched={formik.touched.FechaConclusion}
                  showErrorInput={null}
               />
            </Grid>
         </Grid>
      </>
   );
};
