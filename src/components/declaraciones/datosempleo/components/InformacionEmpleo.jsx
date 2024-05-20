import { useFormikContext } from "formik";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { Text } from "../../../Reusables/input/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { configValidationsEmpleo } from "../../../../redux/DatosEmpleoHoja4/DatosEmpleo";
import { Grid } from "@mui/material";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";

export const InformacionEmpleo = ({}) => {
   const formik = useFormikContext();
   const { values, setFieldValue, handleChange, handleBlur, errors, touched } = formik;
   const [activeEspecificarEmpleo, setActiveEspecificarEmpleo] = useState(true);
   const dispatch = useDispatch();
   const handleGetValue = async (name, value) => {
      if (name == "NivelEmpleoCargoComision" && value == 4) {
         setActiveEspecificarEmpleo(false);
         dispatch(configValidationsEmpleo({ tipo: "RegimenPublico" }));
      } else {
         setActiveEspecificarEmpleo(true);
         dispatch(configValidationsEmpleo({ tipo: "NoRegimenPublico" }));
      }
   };
   return (
      <Grid container spacing={1}>
         <CustomRadio
            rowLayout={false}
            col={12}
            name="NivelEmpleoCargoComision"
            title="Nivel del empleo, cargo o comisión"
            options={[
               { value: 1, label: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
               { value: 2, label: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
               { value: 3, label: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." }
            ]}
         />
         {/* <AutoComplete
            col={12}
            label="Nivel del empleo, cargo o comisión"
            name="NivelEmpleoCargoComision"
            options={[
               { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
               { id: 2, text: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
               { id: 3, text: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." },
            ]}
            handleGetValue={handleGetValue}
         /> */}
         <Text
            textStyleCase={true}
            hidden={activeEspecificarEmpleo}
            col={12}
            name="NivelEmpleoCargoComisionText"
            label="Nivel del empleo, cargo o comisión"
            placeholder={"Ingrese Nivel del empleo, cargo o comisión"}
         />
         <Text
            textStyleCase={true}
            col={12}
            name="FuncionPrincipal"
            label="Especifique función principal"
            placeholder={"Señalar cuál es la función o actividad principal que desempeña en su empleo, cargo o comisión"}
         />
         <DatePickerComponent
            idName={"FechaTomaConclusionPosesion"}
            label={"Fecha de toma posesión del empleo, cargo o comisión."}
            format={"DD/MM/YYYY"}
            value={values.FechaTomaConclusionPosesion}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.FechaTomaConclusionPosesion}
            touched={touched.FechaTomaConclusionPosesion}
            showErrorInput={null}
         />
         <Text
            textStyleCase={true}
            col={12}
            type="phone"
            name="TelefonoOficina"
            label="Teléfono de oficina"
            placeholder={"Proporcionar el teléfono laboral según corresponda (Si aplica)"}
         />
         <Text
            textStyleCase={true}
            col={12}
            type="number"
            name="ExtensionTelefonoOficina"
            label="Extensión del teléfono de oficina"
            placeholder={`Proporcionar la extensión del teléfono laboral según corresponda (Si aplica)`}
         />
      </Grid>
   );
};
