import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const AdeudosPasivos = ({data=[],testada=false}) => {
   const {
        Id_AdeudosPasivos= vacio(), 
        Id_SituacionPatrimonial= vacio(), 
        Id_Titular= vacio(), 
        Id_TipoAdeudo= vacio(),
        NumeroCuentaContrato= vacio(), 
        FechaAdquisicion= vacio(), 
        Monto= vacio(), 
        Id_Monto= vacio(),
        SaldoInsolutoSituacionActual= vacio(), 
        Id_SaldoInsolutoSituacionActual= vacio(),
        T_Id_TipoPersona= vacio(),
        T_NombreRazonSocial= vacio(), 
        T_Rfc= vacio(), 
        OC_Id_TipoPersona= vacio(),
        OC_NombreRazonSocial= vacio(), 
        OC_Rfc= vacio(), 
        EsEnMexico= vacio(), 
        Aclaraciones= vacio(),
        FechaRegistro= vacio(),
        EsActivo= vacio(), 
        Id_Pais= vacio(), 
        EspecifiqueOtro= vacio(),
    } = data[0] || {};
    return (
        <>
            <TextPdf title={``} text={''} />
            
        </>
    );
};