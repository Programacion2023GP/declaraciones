import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";

export const FormaAdquisicion = ({pago,adquisicion,monedas}) => {
    return (
        <Grid container spacing={1}>
            <AutoComplete col={6}  name={'Id_FormaAdquisicion'} label={'Forma de adquisición'} options={adquisicion} />
            <AutoComplete col={6}  name={'Id_FormaPago'} label={'Forma de Pago'} options={pago} />
            <Text col={6} name={'ValorAdquisicion'} label={'Valor del mueble'}  type="number"/>
            <AutoComplete col={6}  name={'Id_MonedaValorAdquisicion'} label={'Tipo de Moneda'} options={monedas} />
            <DatePickerComponentV2 name={'FechaAdquisicion'} label={'Fecha de Adquisición'} format={'DD/MM/YYYY'}/>
            <Text rows={12} col={12} name={'Aclaraciones'} label={'Aclaraciones/Observaciones'} color={'green'} />
        </Grid>
    );
};