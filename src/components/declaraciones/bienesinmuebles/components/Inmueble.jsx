import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Numeric } from "../../../Reusables/numeric/Numeric";

export const Inmuebles = ({inmuebles,titular,relacion,motivobaja}) => {
   return (
      <>
         <AutoComplete col={12} options={inmuebles} name="Id_TipoInmueble" label={"Tipo de Inmueble"} />
         <AutoComplete col={12} options={titular} name="Id_Titular" label={"Titular del Inmueble"} />
         <Numeric label={"Porcentaje de propiedad del declarante conforme a escrituración o contrato"} name="PorcentajePropiedad" col={12} max={100} />
         <Numeric label={"Superficie del terreno"} name="SuperficieTerreno" col={12} />
         <Numeric label={"Superficie de construcción (M2)"} name="Superficieconstruncion  " col={12} />
         <AutoComplete col={12} options={relacion} name="Id_Relacion" label={"Relación del transmisor de la propiedad con el titular"} />
         <AutoComplete col={12} options={motivobaja} name="Id_ValorConformeA" label={"En caso de baja del inmueble, incluir motivo"} />

      </>
   );
};
