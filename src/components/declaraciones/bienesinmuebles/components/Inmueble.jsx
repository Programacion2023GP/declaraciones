import { Grid } from "@mui/material";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Text } from "../../../Reusables/input/Input";
import { Numeric } from "../../../Reusables/numeric/Numeric";

export const Inmuebles = ({inmuebles,titular,relacion,motivobaja,inmueblesOtro,handleInmueblesOtro}) => {
   const handleGetValue=(name,value)=>{
      handleInmueblesOtro(value==4?false:true)
      
      //  if () {
      
   //  }
   }
   return (
      <Grid container spacing={1}>
         <AutoComplete col={6} options={inmuebles} name="Id_TipoInmueble" label={"Tipo de Inmueble"} />
         <AutoComplete col={6} options={titular} name="Id_Titular" label={"Titular del Inmueble"} />
         <Numeric label={"Porcentaje de propiedad del declarante conforme a escrituración o contrato"} name="PorcentajePropiedad" col={6} max={100} />
         <Numeric label={"Superficie del terreno"} name="SuperficieTerreno" col={6} />
         <Numeric label={"Superficie de construcción (M2)"} name="Superficieconstruncion  " col={6} />
         <AutoComplete col={6} options={relacion} name="Id_Relacion" label={"Relación del transmisor de la propiedad con el titular"} />
         <AutoComplete col={12} options={motivobaja} name="Id_ValorConformeA" label={"En caso de baja del inmueble, incluir motivo"} handleGetValue={handleGetValue} />
         <Text name="OtroMotivoBaja" hidden={inmueblesOtro} col={12} placeholder={'Especifique otro'} label={'Especifique otro'}  />
         
      </Grid>
   );
};
