import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import DatePickerComponentV2 from "../../../Reusables/datepicker/DatePickerComponentV2";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { configValidatorsVehiculos } from "../../../../redux/VehiculosHoja11/VehiculosHoja11";

export const Adquisicion = ({adquisicion,pago,monedas,motivobaja,otroMotivoBaja,SetMotivoBaja}) => {
   const dispatch = useDispatch()
   const handleGetValue =(name,value)=>{
      SetMotivoBaja(value==4?false:true);
      dispatch(configValidatorsVehiculos({tipo:value ==4?"MotivoBaja":"NoMotivoBaja"}))
   }
   useEffect(()=>{
      dispatch(configValidatorsVehiculos({tipo:otroMotivoBaja ==4?"MotivoBaja":"NoMotivoBaja"}))

   },[])
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6}  name={'Id_FormaAdquisicion'} label={'Forma de adquisición'} options={adquisicion} />
         <AutoComplete col={6}  name={'Id_FormaPago'} label={'Forma de pago'} options={pago} />
         <Text col={6} name={'ValorAdquisicion'} type={'number'} label={'Valor de adquisición del vehículo'}  />
         <AutoComplete col={6}  name={'Id_MonedaValorAdquisicion'} label={'Tipo de moneda'} options={monedas} /> 
         <DatePickerComponentV2 name={'FechaAdquisicion'} label={'Fecha de adquisición del vehículo'} format={'DD/MM/YYYY'}/>
         <AutoComplete col={12}  name={'Id_MotivoBaja'} label={'En caso de baja del vehículo, incluir motivo'} options={motivobaja} handleGetValue={handleGetValue} />
         <Text col={12} name={"EspecifiqueMotivoBaja"} label={'Especifique otro motivo de baja'} hidden={otroMotivoBaja}  />
         <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

      </Grid>
   );
};
