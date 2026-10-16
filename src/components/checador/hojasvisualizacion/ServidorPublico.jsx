import { OptionsPdf, SquardsTextPdf, TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { testField, field, testArrayField, arrayField, vacio } from "../funciones/Funciones";
import { DatosDomicilio } from "./datosdomicilo/DatosDomicilio";
export const ServidorPublico = ({ data = [], testada = false, instrumentos = [], bienenAjenacion = [] }) => {
   const {
      Id_ActividadAnualAnterior = vacio(),
      Id_SituacionPatrimonial = vacio(),
      ServidorPublicoAnioAnterior = vacio(),
      FechaInicio = vacio(),
      FechaConclusion = vacio(),
      RemuneracionNetaCargoPublico = vacio(),
      Id_RemuneracionNetaCargoPublico = vacio(),
      OtrosIngresosTotal = vacio(),
      Id_OtrosIngresosTotal = vacio(),
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
      IngresoMensualConclusionNeto = vacio(),
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
   return (
      <>
         /* <TextPdf text={field(FechaInicio)} title={"Fecha de inicio"} width={50} />
         <TextPdf text={field(FechaConclusion)} title={"Fecha de conclusión"} width={50} />
         <TextPdf
            text={field(RemuneracionNetaCargoPublico)}
            title={`I.- Remuneración neta del declarante
recibida durante el tiempo en el que se
desempeño como servidor público en el año
inmediato anterior (por concepto de sueldos,
honorarios, compensaciones, bonos,
aguinaldos y otras prestaciones) (cantidades
netas después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(sumarRemuneraciones(AICE_RemuneracionTotal, AF_RemuneracionTotal, SP_RemuneracionTotal, OINC_RemuneracionTotal))}
            title={`II.- Otros ingresos del declarante recibidos
durante el tiempo en el que se desempeñó
como servidor público en el año inmediato
anterior (suma del II.1 al II.5)
`}
            width={100}
         />
         <TextPdf
            text={field(AICE_RemuneracionTotal)}
            title={`II.1.- Por actividad industrial, comercial y/o
empresarial (después de impuestos)`}
            width={100}
         />
         <TextPdf text={field(AICE_NombreRazonSocial)} title={"Nombre o razón social"} width={50} />
         <TextPdf text={field(AICE_TipoNegocio)} title={"Tipo de negocio"} width={50} />
         <TextPdf
            text={field(AF_RemuneracionTotal)}
            title={`II.2.- Por actividad financiera (rendimientos
o ganancias) (después de impuestos)
`}
            width={50}
         />
         <TextPdf width={50} text={arrayField(instrumentos, AF_Id_TipoInstrumento)} title={"Tipo de instrumento que generó el rendimiento o ganancia"} />
         <TextPdf
            width={100}
            text={field(SP_RemuneracionTotal)}
            title={`II.3.- Por servicios profesionales, consejos,
consultorías y/o asesorías (después de
impuestos)
`}
         />
         <TextPdf text={field(SP_TipoServicioPrestado)} title={"Tipo de servicio prestado"} width={50} />
         <TextPdf text={field(EB_RemuneracionTotal)} title={"II.4.- Por enajenación de bienes (después de impuestos)"} width={50} />
         <TextPdf width={100} text={arrayField(bienenAjenacion, EB_Id_TipoBienEnajenado)} title={"Tipo de bien enajenado"} />
         <TextPdf
            text={field(OINC_RemuneracionTotal)}
            title={`II.5.- Otros ingresos no considerados a los
anteriores (después de impuestos) 
`}
            width={100}
         />
         <TextPdf text={field(OINC_EspecificarTipoIngreso)} title={"Tipo de ingreso"} width={100} />
         <TextPdf
            width={100}
            text={field(IngresoMensualConclusionNeto)}
            title={`A.- Ingreso neto del declarante, recibido en
            el año inmediato anterior (suma del numeral
            I y II)
`}
         />
         <TextPdf
            text={field(IngresoNetoParejaDependiente)}
            title={`B.- Ingreso neto de la pareja y/o
dependientes económicos recibido en el año
inmediato anterior (después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(TotalIngresosNetos)}
            title={`C.- Total de ingresos netos percibidos por el
            declarante, pareja y/o dependientes
            económicos en el año inmediato anterior
            (suma de los apartados A y B)`}
            width={100}
         />
         <TextPdf text={field(Aclaraciones)} title={"Aclaraciones/Observaciones"} width={100} />
      </>
   );
};
