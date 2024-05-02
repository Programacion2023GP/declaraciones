import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { useDispatch } from "react-redux";
import { configValidatorsVehiculos } from "../../../../redux/VehiculosHoja11/VehiculosHoja11";
import { Ngif } from "../../../Reusables/conditionals/Ngif";

export const VehiculoComponent = ({
   validations,
   seTitularVehiculo,
   titularVehiculo,
   otroVehiculo,
   setOtroVehiculo,
   vehiculos,
   titularVehiculos,
   yearOptions,
   relacion
}) => {
   const dispatch = useDispatch();
   const handleGetValue = (name, value) => {
      setOtroVehiculo(value == 4 ? false : true);

      dispatch(configValidatorsVehiculos({ tipo: value == 4 ? "OtroVehiculo" : "NoOtroVehiculo" }));
   };
   const TitularVehiculo = (name, value) => {
  
      seTitularVehiculo(value);
      dispatch(configValidatorsVehiculos({ tipo: value == 0 ? "DeclaranteTitular" : value == 1 ? "TerceroTitular" : "TransmisorTitular", validaciones: validations }));
   };
   return (
      <Grid container spacing={1}>
         <AutoComplete col={12} name={"Id_TipoVehiculo"} label={"Tipo de vehiculo"} options={vehiculos} handleGetValue={handleGetValue} />
         <Text hidden={otroVehiculo} col={12} name={"EspecifiqueVehiculo"} label={"Especifique otro vehiculo"} />

         <CustomRadio col={12} title={"Titular del vehículo"} name={"Id_Titular"} handleGetValue={TitularVehiculo} options={titularVehiculos} />
         <Ngif condition={titularVehiculo == 1}>
            <AutoComplete col={12} name={"Id_Relacion"} label={"Relación de Titular con tercero"} options={relacion} />
            <CustomRadio
               col={12}
               title={"Tipo persona tercero"}
               name={"T_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona física" },
                  { value: 2, label: "Persona moral" }
               ]}
            />
            <Text col={6} name={"T_NombreRazonSocial"} label={"Nombre del Tercero o Terceros"} />
            <Text col={6} name={"T_Rfc"} label={"RFC"} />
         </Ngif>
         <Ngif condition={titularVehiculo == 2}>
            <CustomRadio
               col={12}
               title={"Transmisor"}
               name={"TR_Id_TipoPersona"}
               options={[
                  { value: 1, label: "Persona física" },
                  { value: 2, label: "Persona moral" },
                  { value: 3, label: "otro" }
               ]}
            />
            <Text col={6} name={"TR_NombreRazonSocial"} label={"Nombre o Razón Social del Transmisor"} />
            <Text col={6} name={"TR_Rfc"} label={"RFC"} />
         </Ngif>
         <Text col={6} name={"Marca"} label={"Marca"} />
         <Text col={6} name={"Modelo"} label={"Modelo"} />
         <AutoComplete col={4} name={"Anio"} label={"Año"} options={yearOptions} />
         <Text col={8} name={"NumeroSerieRegistro"} label={"Número de Serie o Registro"} />
         <CustomRadio
            col={12}
            title={"¿Dónde se encuentra registrado?"}
            name={"EsEnMexico"}
            options={[
               { value: 0, label: "En el extranjero" },
               { value: 1, label: "En México" }
            ]}
         />
      </Grid>
   );
};
