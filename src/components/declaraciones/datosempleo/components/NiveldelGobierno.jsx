import { useEffect, useState } from "react";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useDispatch } from "react-redux";
import { configValidationsEmpleo } from "../../../../redux/DatosEmpleoHoja4/DatosEmpleo";
import { Grid } from "@mui/material";
import { GetAxios } from "../../../../services/services";
import { useFormikContext } from "formik";

export const NivelGobierno = ({ nivelOrdenGobierno, ambitoPublico, nombreEntePublico, adscripcion, adscripcionOrganismo, handleActive, active, aerea }) => {
   const [otroEntePublico, setOtroEntePublico] = useState(active);
   const [empleos, setEmpleos] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      if (aerea != "") {
         handleGetValue("name", aerea);
      }
   }, [adscripcionOrganismo, nombreEntePublico]);
   const handleGetValue = async (name, value) => {
      setOtroEntePublico(value == 5 ? true : false);
      dispatch(configValidationsEmpleo(value == 5 ? "OtroEntePublico" : "NoOtroEntePublico"));
      handleActive(value == 5 ? true : false);

    
      const id = parseInt(nombreEntePublico.filter((it) => it.text.trim() == value.trim())[0].organismo);
      setEmpleos(await GetAxios(`empleos/show/${adscripcionOrganismo.filter((item) => (item.text = id))[0].organismo}`));
   };
   useEffect(() => {
   }, [empleos]);
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6} label="Nivel / orden de gobierno" name="Id_NivelOrdenGobierno" options={nivelOrdenGobierno} />
         <AutoComplete col={6} label="Ámbito público" name="Id_AmbitoPublico" options={ambitoPublico} />
         <AutoComplete col={12} label="Nombre del ente público" name="NombreEntePublico" options={nombreEntePublico} handleGetValue={handleGetValue} />
         <Ngif condition={otroEntePublico}>
            <Text textStyleCase={true} col={12} name="OtroEntePublico" label="Especifica el ente público" placeholder={"Especifica el ente público"} />
         </Ngif>
         <AutoComplete col={12} label="Área de adscripción" name="AreaAdscripcion" options={adscripcion} handleGetValue={handleGetValue} />

         {/* <Text
            textStyleCase={true}
            col={12}
            name="AreaAdscripcion"
            label="Área de adscripción"
            placeholder={"Especificar el nombre de la Unidad Administrativa u homóloga superior inmediata de su adscripción. (Superior jerárquico)"}
         /> */}
         <AutoComplete col={12} disabled={empleos.length < 1} name={"EmpleoCargoComision"} label={"Empleo, cargo o comisión"} options={empleos} />
         {/* <Text textStyleCase={true} col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" /> */}
         <CustomRadio
            col={12}
            name="ContratadoPorHonorarios"
            title="¿Está contratado por honorarios?"
            options={[
               { value: 1, label: "Si" },
               { value: 0, label: "No" }
            ]} // Opciones para los radio buttons
         />
      </Grid>
   );
};
