import { useFormikContext } from "formik";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import DatePickerComponent from "../../../Reusables/datepicker/DatePickerComponent";
import { Text } from "../../../Reusables/input/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { configValidationsEmpleo } from "../../../../redux/DatosEmpleoHoja4/DatosEmpleo";

export const InformacionEmpleo = ({}) => {
   const formik = useFormikContext();
   const { values, setFieldValue, handleChange, handleBlur, errors, touched } = formik;
   const [activeEspecificarEmpleo, setActiveEspecificarEmpleo] = useState(true);
   const dispatch = useDispatch()
   const handleGetValue = async (name, value) => {
      if (name == "NivelEmpleoCargoComision" && value == 4) {
         setActiveEspecificarEmpleo(false);
         dispatch(configValidationsEmpleo({tipo:"RegimenPublico"}))
      } else {
         setActiveEspecificarEmpleo(true);
         dispatch(configValidationsEmpleo({tipo:"NoRegimenPublico"}))

      }
   };
   return (
      <>
         <AutoComplete
            col={12}
            label="Nivel del empleo, cargo o comisión"
            name="NivelEmpleoCargoComision"
            options={[
               { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
               { id: 2, text: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
               { id: 3, text: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." },
               { id: 4, text: "Otro especifique..." }
            ]}
            handleGetValue={handleGetValue}
         />
         <Text
            hidden={activeEspecificarEmpleo}
            col={12}
            name="NivelEmpleoCargoComisionText"
            label="Nivel del empleo, cargo o comisión"
            placeholder={"Ingrese Nivel del empleo, cargo o comisión"}
         />
         <Text
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
            col={12}
            type="phone"
            name="TelefonoOficina"
            label="Teléfono de oficina"
            placeholder={"Proporcionar el teléfono laboral según corresponda (Si aplica)"}
         />
         <Text
            col={12}
            type="number"
            name="ExtensionTelefonoOficina"
            label="Extensión del teléfono de oficina"
            placeholder={`Proporcionar la extensión del teléfono laboral según corresponda (Si aplica)`}
         />
      </>
   );
};
