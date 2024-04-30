import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";

export const VehiculoComponent = ({ vehiculos }) => {
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6} name={"Id_TipoVehiculo"} label={"Tipo de vehiculo"} options={vehiculos} />
         {/* <AutoComplete col={12} name={"Id_TipoVehiculo"} label={"Tipo de vehiculo"} options={vehiculos} />
        <AutoComplete col={12} name={"Id_TipoVehiculo"} label={"Tipo de vehiculo"} options={vehiculos} />
        <AutoComplete col={12} name={"Id_TipoVehiculo"} label={"Tipo de vehiculo"} options={vehiculos} /> */}
      </Grid>
   );
};
