import { useEffect } from "react";
import Interface from "../../../../services/interface";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { Numeric } from "../../../Reusables/numeric/Numeric";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import { Text } from "../../../Reusables/input/Input";

export const InitialValues = ({ titular, inmuebles, relacion, adquisicion, pago }) => {
   useEffect(() => {}, []);
   return (
      <>
         <AutoComplete col={12} options={inmuebles} name="Id_TipoInmueble" label={"Tipo de Inmueble"} />
         <AutoComplete col={12} options={titular} name="Id_Titular" label={"Titular del Inmueble"} />
         <Numeric label={"Porcentaje de propiedad del declarante conforme a escrituración o contrato"} name="PorcentajePropiedad" col={12} max={100} />
         <Numeric label={"Superficie del terreno"} name="SuperficieTerreno" col={12} />
         <Numeric label={"Superficie de construcción (M2)"} name="Superficieconstruncion" col={12} />
         <AutoComplete col={12} options={relacion} name="Id_TipoInmueble" label={"Relación del transmisor de la propiedad con el titular"} />

         <CustomRadio
            col={12}
            title={"Tercero"}
            name={"T_Id_TipoPersona"}
            options={[
               { value: 1, label: "Persona Física" },
               { value: 2, label: "Persona Moral" }
            ]}
         />
         <Text label={"Nombre del tercero o terceros"} name="" col={12} />
         <Text label={"Rfc"} name="rfc" col={12} />
         <Numeric label={"Valor de adquisición"} name="PorcentajePropiedad" col={12} />
         <Numeric label={"Folio real u otro dato que permita su identifiación"} name="PorcentajePropiedad" col={12} />
         <AutoComplete col={12} options={adquisicion} name="Id_FormaAdquisicion" label={"Forma de adquisición"} />
         <AutoComplete col={12} options={pago} name="Id_FormaAdquisicion" label={"Forma de pago"} />

         <CustomRadio
            col={12}
            title={"Ubicación del Inmueble"}
            name={"T_Id_TipoPersona"}
            options={[
               { value: 0, label: "En el extranjero" },
               { value: 1, label: "En México" }
            ]}
         />
         <Ngif condition={true}></Ngif>
      </>
   );
};
