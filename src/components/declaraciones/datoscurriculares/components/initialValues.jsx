import { useFormikContext } from "formik";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Grid } from "@mui/material";

export const InitialValues = ({nivelEstudios,estatus,documentosObtenidos}) => {
    const formik = useFormikContext()
    const {values,setFieldValue,handleChange,handleBlur,errors,touched} = formik
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6} label="Nivel de estudios" name="Id_Nivel" options={nivelEstudios} />
         <Text col={6} name="NombreInstitucionEducativa" label="Institución educativa" />
         <Text col={12} name="CarreraAreaConocimiento" label="Aerea de conocimiento" />
         <CustomRadio
            // getValue={}
            col={12}
            name="Id_UbicacionInstitucionEducativa"
            title="¿Lugar donde se ubica la institución educativa?"
            options={[
               { value: 1, label: "En mexico" },
               { value: 0, label: "En el extranjero" }
            ]} // Opciones para los radio buttons
         />
         <AutoComplete col={6} label="Estatus" name="Id_Estatus" options={estatus} />
         <AutoComplete col={6} label="Documento obtenido" name="Id_DocumentoObtenido" options={documentosObtenidos} />
         <DatePickerComponent
            idName={"FechaObtencion"}
            label={"Fecha de obtención del documento"}
            format={"DD/MM/YYYY"}
            value={values.FechaObtencion}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.FechaObtencion}
            touched={touched.FechaObtencion}
            showErrorInput={null}
         />
         <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />
      </Grid>
   );
};
