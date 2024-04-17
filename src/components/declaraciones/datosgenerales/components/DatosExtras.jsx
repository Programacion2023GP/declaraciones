import { useParams } from "react-router-dom";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addValidacioneServidorPublico } from "../../../../redux/DatosGeneralesHoja1/DatosGenerales";

export const DatosExtras = ({ estadocivil, regimenes, nacionalidades, paises,validaciones }) => {
   let { declaracion } = useParams();
   const dispatch = useDispatch();
   declaracion = parseInt(declaracion);
   const [activeRegimen, setActiveRegimen] = useState(true);
   const handleGetValue = (name, value) => {
      setActiveRegimen(value == 2 ? false : true);
      dispatch(addValidacioneServidorPublico({validaciones,tipo:value==2? "RegimenMatrimonial":"QuitarRegimenMatrimonial"}))
   };
   return (
      <>
         <Text
            col={12}
            name="CorreoInstitucional"
            label="Correo electrónico institucional"
            type={"email"}
            placeholder={"En caso de no contar con correo institucional ingresar el correo personal."}
         />
         <Text
            col={12}
            name="CorreoPersonal"
            label="Correo electrónico Personal"
            type={"email"}
            placeholder={"En caso de no contar con correo institucional ingresar el correo personal."}
         />
         <Text col={12} name="TelefonoCasa" label="Ingresa el telefono de tu casa" mask="(999) 999-9999" />
         <Text col={12} name="TelefonoCelularPersonal" label="Ingresa tu numero de telefono" mask="(999) 999-9999" />
         <AutoComplete col={12} label="Situación personal / Estado civil" name="Id_EstadoCivil" handleGetValue={handleGetValue} options={estadocivil} />
         <AutoComplete col={12} label="Regimen matrimonial" name="Id_RegimenMatrimonial" disabled={activeRegimen} options={regimenes} />
         <AutoComplete
            col={12}
            label="Pais de nacimiento"
            name="Id_PaisNacimiento"
            options={paises} //
         />
         <AutoComplete col={12} label="Nacionalidad" name="Id_Nacionalidad" options={nacionalidades} />
         <Text col={12} name="Aclaraciones" label="Aclaraciones" rows={10} color={"green"} />
         <CustomRadio
            hidden={declaracion == 2 ? false : true}
            col={12}
            name="FueServidorPublicoAnioAnterior" // Nombre del campo en el formulario
            title="¿Te desempeñaste como un servidor público el año inmediato anterior?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]} // Opciones para los radio buttons
         />
      </>
   );
};
