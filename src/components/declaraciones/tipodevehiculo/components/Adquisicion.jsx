import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";

export const Adquisicion = ({adquisicion,pago,monedas,motivobaja}) => {
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6}  name={'Id_FormaAdquisicion'} label={'Forma de adquisición'} options={adquisicion} />
         <AutoComplete col={6}  name={'Id_FormaPago'} label={'Forma de pago'} options={pago} />
         <Text col={6} name={'ValorAdquisicion'} type={'number'} label={'Valor de adquisición del vehículo'}  />
         <AutoComplete col={6}  name={'Id_MonedaValorAdquisicion'} label={'Tipo de moneda'} options={monedas} /> 
         <DatePickerComponentV2 name={'FechaAdquisicion'} label={'Fecha de adquisición del vehículo'} format={'DD/MM/YYYY'}/>
         <AutoComplete col={12}  name={'Id_MotivoBaja'} label={'En caso de baja del vehículo, incluir motivo'} options={motivobaja} />
         <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

      </Grid>
   );
};
