import { labelRenumeracion, labelPareja, labelSumaIyII, labelTotal } from "../../declaraciones/funciones/ingresosEservidor/labels";
import { useEffect, useState } from "react";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";

export const IngresosNetos = ({ data = [], testada = false, tipo_declaracion = 1, instrumentos = [], bienenAjenacion = [] }) => {
   const {
      Id_Ingresos = vacio(),
      Id_SituacionPatrimonial = vacio(),
      RemuneracionMensualAnualConclusionCargoPublico = vacio(),
      Id_RemuneracionMensualAnualConclusionCargoPublico = vacio(),
      OtrosIngresosMensualesAnualesConclusionTotal = vacio(),
      Id_OtrosIngresosMensualesAnualesConclusionTotal = vacio(),
      AICE_RemuneracionTotal = vacio(),
      AICE_Id_RemuneracionTotal = vacio(),
      AICE_NombreRazonSocial = vacio(),
      AICE_TipoNegocio = vacio(),
      AF_RemuneracionTotal = vacio(),
      AF_Id_RemuneracionTotal = vacio(),
      AF_Id_TipoInstrumento = vacio(),
      SP_RemuneracionTotal = vacio(),
      SP_Id_RemuneracionTotal = vacio(),
      SP_TipoServicioPrestado = vacio(),
      EB_RemuneracionTotal = vacio(),
      EB_Id_RemuneracionTotal = vacio(),
      EB_Id_TipoBienEnajenado = vacio(),
      OINC_RemuneracionTotal = vacio(),
      OINC_Id_RemuneracionTotal = vacio(),
      OINC_EspecificarTipoIngreso = vacio(),
      IngresoMensualAnualConclusionNeto = vacio(),
      IngresoNetoParejaDependiente = vacio(),
      TotalIngresosNetos = vacio(),
      Aclaraciones = vacio(),
      FechaRegistro = vacio(),
      EsActivo = vacio(),
      AF_EspecifiqueOtroTipo = vacio()
   } = data[0] || {};
   const sumarRemuneraciones = (AICE_RemuneracionTotal, AF_RemuneracionTotal, SP_RemuneracionTotal, OINC_RemuneracionTotal) => {
      // Convertir a número o asignar 0 si no es un número válido
      const aice = isNaN(AICE_RemuneracionTotal) ? 0 : Number(AICE_RemuneracionTotal);
      const af = isNaN(AF_RemuneracionTotal) ? 0 : Number(AF_RemuneracionTotal);
      const sp = isNaN(SP_RemuneracionTotal) ? 0 : Number(SP_RemuneracionTotal);
      const oinc = isNaN(OINC_RemuneracionTotal) ? 0 : Number(OINC_RemuneracionTotal);

      // Sumar todas las remuneraciones
      const sumaTotal = aice + af + sp + oinc;

      return sumaTotal;
   };

   // Ejemplo de uso:
   return (
      <>
         <TextPdf title={labelRenumeracion(tipo_declaracion)} text={testField(RemuneracionMensualAnualConclusionCargoPublico)} width={100} />
         <TextPdf
            width={50}
            title={`"II.- Otros ingresos ${
               tipo_declaracion == 1 || tipo_declaracion == 4
                  ? "mensuales"
                  : tipo_declaracion == 2 || tipo_declaracion == 5
                    ? "anual"
                    : tipo_declaracion == 3 || tipo_declaracion == 6
                      ? "hasta la fecha"
                      : ""
            } del declarante(suma del II.1 al II.4)`}
            text={testField(sumarRemuneraciones(AICE_RemuneracionTotal, AF_RemuneracionTotal, SP_RemuneracionTotal, OINC_RemuneracionTotal))}
         />
         <TextPdf title={"II.1 Por actividad industrial, comercial y/o empresarial"} text={testField(AICE_RemuneracionTotal)} width={50} />
         <TextPdf title={"Nombre o razón social"} text={testField(AICE_NombreRazonSocial)} width={50} />
         <TextPdf title={"Tipo de negocio"} text={testField(AICE_TipoNegocio)} width={50} />
         <TextPdf text={testField(AF_RemuneracionTotal)} title={"II.2 Por actividad financiera (Rendimientos o ganancias)"} width={50} />
         <TextPdf text={testArrayField(instrumentos,AF_Id_TipoInstrumento)} title={"Tipo de instrumento que generó el rendimiento o ganancia"} width={50} />
         <TextPdf
            text={testField(AF_Id_TipoInstrumento)}
            title={"II.3.- Por servicios profesionales, consejos,consultorías y / o asesorías (después de impuestos)"}
            width={100}
         />
         <TextPdf text={testField(SP_TipoServicioPrestado)} title={"Tipo de servicio prestado"} width={50} />
         <TextPdf text={testField(EB_RemuneracionTotal)} title={"II.4.- enajenacion de bienes"} width={50} />
         <TextPdf text={testArrayField(bienenAjenacion,EB_Id_TipoBienEnajenado)} title={"Tipo de bien enajenado"} width={100} />
         <TextPdf text={testField(OINC_RemuneracionTotal)} title={"II.5 Otros ingresos no considerados a los anteriores"} width={100} />
         <TextPdf
            text={testField(OINC_EspecificarTipoIngreso)}
            title={`Especificar tipo de ingreso (arrendamiento,
regalía, sorteos, concursos, donaciones,
seguros de vida, etc.)`}
            width={100}
         />

         <TextPdf text={testField(IngresoMensualAnualConclusionNeto)} title={labelSumaIyII(tipo_declaracion)} width={100} />
         <TextPdf text={testField(IngresoNetoParejaDependiente)} title={labelPareja(tipo_declaracion)} width={100} />

         <TextPdf text={testField(TotalIngresosNetos)} title={labelTotal(tipo_declaracion)} width={100} />
         <TextPdf text={testField(Aclaraciones)} title={"Aclaraciones / Observaciones"} width={100} />
      </>
   );
};
