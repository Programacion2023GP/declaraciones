import { labelRenumeracion, labelPareja, labelSumaIyII, labelTotal } from "../../declaraciones/funciones/ingresosEservidor/labels";
import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";

export const IngresosNetos = ({ data = {}, testada = false, metaData }) => {
   const {
      
      remuneracionMensualCargoPublico = {},
      totalIngresosMensualesNetos ={},
      actividades ={},
      otrosIngresos = {},
      actividadIndustrialComercialEmpresarial = {},
      actividadFinanciera = {},
      serviciosProfesionales = {},
      EB_RemuneracionTotal = vacio(),
      EB_Id_TipoBienEnajenado = vacio(),
      OINC_EspecificarTipoIngreso = vacio(),
      IngresoMensualAnualConclusionNeto = vacio(),
      IngresoNetoParejaDependiente = vacio(),
      Aclaraciones = vacio(),
      ingresoMensualNetoParejaDependiente = {}
   } = data || {};


   // Ejemplo de uso:
   return (
      <>
         <TextPdf title={labelRenumeracion(metaData?.Id_Plazo)} text={testField(remuneracionMensualCargoPublico?.valor)} width={100} />
         <TextPdf
            width={50}
            title={`"II.- Otros ingresos ${
               metaData?.Id_Plazo == 1 || metaData?.Id_Plazo == 4
                  ? "mensuales"
                  : metaData?.Id_Plazo == 2 || metaData?.Id_Plazo == 5
                    ? "anual"
                    : metaData?.Id_Plazo == 3 || metaData?.Id_Plazo == 6
                      ? "hasta la fecha"
                      : ""
            } del declarante(suma del II.1 al II.4)`}
            text={testField(totalIngresosMensualesNetos?.monto?.valor)}
         />
         <TextPdf title={"II.1 Por actividad industrial, comercial y/o empresarial"} text={testField(actividadIndustrialComercialEmpresarial?.remuneracionTotal?.monto?.valor)} width={50} />
         <TextPdf title={"Nombre o razón social"} text={testField(actividadIndustrialComercialEmpresarial?.remuneracionTotal?.nombreRazonSocial)} width={50} />
         <TextPdf title={"Tipo de negocio"} text={testField(actividadIndustrialComercialEmpresarial?.remuneracionTotal?.tipoNegocio)} width={50} />
         <TextPdf text={testField(actividadFinanciera?.remuneracionTotal?.monto?.valor)} title={"II.2 Por actividad financiera (Rendimientos o ganancias)"} width={50} />
         <TextPdf text={testField()} title={"Tipo de instrumento que generó el rendimiento o ganancia"} width={50} />
         <TextPdf
            text={testField(actividades?.tipoInstrumento?.valor)}
            title={"II.3.- Por servicios profesionales, consejos,consultorías y / o asesorías (después de impuestos)"}
            width={100}
         />
         <TextPdf text={testField(serviciosProfesionales?.servicios?.tipoServicio)} title={"Tipo de servicio prestado"} width={50} />
         <TextPdf text={testField(EB_RemuneracionTotal)} title={"II.4.- enajenacion de bienes"} width={50} />
         {/* <TextPdf text={testField(bienenAjenacion, EB_Id_TipoBienEnajenado)} title={"Tipo de bien enajenado"} width={100} /> */}
         <TextPdf text={testField(otrosIngresos?.remuneracionTotal?.monto?.valor)} title={"II.5 Otros ingresos no considerados a los anteriores"} width={100} />
         <TextPdf
            text={testField(OINC_EspecificarTipoIngreso)}
            title={`Especificar tipo de ingreso (arrendamiento,regalía, sorteos, concursos, donaciones,seguros de vida, etc.)`}
            width={100}
         />

         <TextPdf text={testField(IngresoMensualAnualConclusionNeto)} title={labelSumaIyII(metaData?.Id_Plazo)} width={100} />
         <TextPdf text={testField(ingresoMensualNetoParejaDependiente?.monto?.valor)} title={labelPareja(metaData?.Id_Plazo)} width={100} />

         <TextPdf text={testField(totalIngresosMensualesNetos?.monto?.valor)} title={labelTotal(metaData?.Id_Plazo)} width={100} />
         <TextPdf text={testField(Aclaraciones)} title={"Aclaraciones / Observaciones"} width={100} />
      </>
   );
};
