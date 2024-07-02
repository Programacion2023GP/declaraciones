import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
export const PrestamoComodato = ({data=[],testada= false}) => {
 const   {
        Id_PrestamoComodato= vacio(), 
        Id_SituacionPatrimonial= vacio(), 
        EsVehiculo= vacio(), 
        Id_TipoInmueble= vacio(),
        Calle= vacio(), 
        NumeroExterior= vacio(),
        NumeroInterior= vacio(), 
        ColoniaLocalidad= vacio(), 
        Id_MunicipioAlcaldia= vacio(), 
        Id_EntidadFederativa= vacio(), 
        CiudadLocalidad= vacio(),
        EstadoProvincia= vacio(), 
        Id_Pais= vacio(), 
        CodigoPostal= vacio(),
        EsEnMexico= vacio(),
        Id_TipoVehiculo= vacio(),
        Marca= vacio(), 
        Modelo= vacio(), 
        Anio= vacio(), 
        NumeroSerieRegistro= vacio(), 
        V_EsEnMexico= vacio(), 
        V_Id_EntidadFederativa= vacio(),
        Id_TipoDuenoTitular= vacio(), 
        NombreTitular= vacio(),
        RfcTitular= vacio(), 
        Id_Relacion= vacio(),
        Aclaraciones= vacio(),
        FechaRegistro= vacio(), 
        EsActivo= vacio(),
        V_Id_Pais= vacio(),
        TipoBien= vacio(), 
        EspecifiqueOtro= vacio(),
    } = data[0] || {};
    return (
        <>
        </>
    );
};