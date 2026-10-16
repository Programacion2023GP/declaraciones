import { TextPdf } from "../../Reusables/pdf/PdfDeclaracion";
import { field, vacio } from "../funciones/Funciones";

export const ServidorPublico = ({ data = {}, testada = false }) => {
   // Desestructurar datos del JSON recibido del backend PHP
   const {
      servidorPublicoAnioAnterior = vacio(),
      fechaIngreso = vacio(),
      fechaConclusion = vacio(),
      remuneracionNetaCargoPublico = {},
      otrosIngresosTotal = {},
      actividadIndustrialComercialEmpresarial = {},
      actividadFinanciera = {},
      serviciosProfesionales = {},
      enajenacionBienes = {},
      otrosIngresos = {},
      ingresoNetoAnualDeclarante = {},
      totalIngresosNetosAnuales = {},
   } = data || {};

   // Función de ayuda para acceder al valor de un monto con seguridad
   const getMonto = (obj) => obj?.monto?.valor ?? 0;

   return (
      <>
         {/* Fecha de inicio y conclusión */}
         <TextPdf text={field(fechaIngreso)} title={"Fecha de inicio"} width={50} />
         <TextPdf text={field(fechaConclusion)} title={"Fecha de conclusión"} width={50} />

         {/* I. Remuneración neta */}
         <TextPdf
            text={field(getMonto(remuneracionNetaCargoPublico))}
            title={`I.- Remuneración neta del declarante recibida durante el tiempo en el que se desempeñó como servidor público en el año inmediato anterior (cantidades netas después de impuestos)`}
            width={100}
         />

         {/* II. Otros ingresos */}
         <TextPdf
            text={field(getMonto(otrosIngresosTotal))}
            title={`II.- Otros ingresos del declarante recibidos durante el tiempo en el que se desempeñó como servidor público en el año inmediato anterior (suma del II.1 al II.5)`}
            width={100}
         />

         {/* II.1 Actividad industrial, comercial y/o empresarial */}
         <TextPdf
            text={field(getMonto(actividadIndustrialComercialEmpresarial?.remuneracionTotal))}
            title={`II.1.- Por actividad industrial, comercial y/o empresarial (después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(actividadIndustrialComercialEmpresarial?.actividades?.nombreRazonSocial)}
            title={"Nombre o razón social"}
            width={50}
         />
         <TextPdf
            text={field(actividadIndustrialComercialEmpresarial?.actividades?.tipoNegocio)}
            title={"Tipo de negocio"}
            width={50}
         />

         {/* II.2 Actividad financiera */}
         <TextPdf
            text={field(getMonto(actividadFinanciera?.remuneracionTotal))}
            title={`II.2.- Por actividad financiera (rendimientos o ganancias) (después de impuestos)`}
            width={50}
         />
         <TextPdf
            text={field(actividadFinanciera?.actividades?.[0]?.tipoInstrumento?.valor)}
            title={"Tipo de instrumento que generó el rendimiento o ganancia"}
            width={50}
         />

         {/* II.3 Servicios profesionales */}
         <TextPdf
            text={field(getMonto(serviciosProfesionales?.remuneracionTotal))}
            title={`II.3.- Por servicios profesionales, consejos, consultorías y/o asesorías (después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(serviciosProfesionales?.servicios?.[0]?.tipoServicio)}
            title={"Tipo de servicio prestado"}
            width={50}
         />

         {/* II.4 Enajenación de bienes */}
         <TextPdf
            text={field(getMonto(enajenacionBienes?.remuneracionTotal))}
            title={`II.4.- Por enajenación de bienes (después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(enajenacionBienes?.bienes?.tipoBienEnajenado)}
            title={"Tipo de bien enajenado"}
            width={100}
         />

         {/* II.5 Otros ingresos */}
         <TextPdf
            text={field(getMonto(otrosIngresos?.remuneracionTotal))}
            title={`II.5.- Otros ingresos no considerados a los anteriores (después de impuestos)`}
            width={100}
         />
         <TextPdf
            text={field(otrosIngresos?.ingresos?.[0]?.tipoIngreso)}
            title={"Tipo de ingreso"}
            width={100}
         />

         {/* A. Ingreso neto anual del declarante */}
         <TextPdf
            text={field(getMonto(ingresoNetoAnualDeclarante))}
            title={`A.- Ingreso neto del declarante, recibido en el año inmediato anterior (suma del numeral I y II)`}
            width={100}
         />

         {/* C. Total ingresos netos anuales */}
         <TextPdf
            text={field(getMonto(totalIngresosNetosAnuales))}
            title={`C.- Total de ingresos netos percibidos por el declarante, pareja y/o dependientes económicos en el año inmediato anterior`}
            width={100}
         />
      </>
   );
};
