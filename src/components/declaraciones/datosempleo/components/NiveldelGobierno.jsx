import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";

export const NivelGobierno = ({ nivelOrdenGobierno, ambitoPublico }) => {
   return (
      <>
         <AutoComplete col={12} label="Nivel / orden de gobierno" name="Id_NivelOrdenGobierno" options={nivelOrdenGobierno} />
         <AutoComplete col={12} label="Ámbito público" name="Id_AmbitoPublico" options={ambitoPublico} />
         <Text col={12} name="NombreEntePublico" label="Nombre del ente público" />
         <Text
            col={12}
            name="AreaAdscripcion"
            label="Área de adscripción"
            placeholder={"Especificar el nombre de la Unidad Administrativa u homóloga superior inmediata de su adscripción. (Superior jerárquico)"}
         />
         <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" />
         <CustomRadio
            col={12}
            name="ContratadoPorHonorarios"
            title="¿Está contratado por honorarios?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]} // Opciones para los radio buttons
         />
      </>
   );
};
