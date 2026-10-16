import { useEffect, useState } from "react";
import { PagePdf, PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";
import { DatosGenerales } from "../checador/hojas/DatosGenerales";
import { MiniNota, Notas } from "../checador/hojas/notas/Notas";
import { DomiDeclarante } from "../checador/hojas/DomiDeclarante";
import { DatosCurriculares } from "../checador/hojas/DatosCurriculares";
import { DatosEmpleoCargo } from "../checador/hojas/DatosEmpleoCargo";
import { ExperienciaLaboral } from "../checador/hojas/ExperienciaLaboral";
import { DatosPareja } from "../checador/hojas/DatosPareja";

import { Ngif } from "../Reusables/conditionals/Ngif";
import { DependientesEconomicos } from "../checador/hojas/DependientesEconomicos";
import { IngresosNetos } from "../checador/hojas/IngresosNetos";
import { ServidorPublico } from "../checador/hojas/ServidorPublico";
import { BienesInmuebles } from "../checador/hojas/BienesInmuebles";
import { Vehiculos } from "../checador/hojas/Vehiculos";
import { BienesMuebles } from "../checador/hojas/BienesMuebles";
import { CuentasValores } from "../checador/hojas/CuentasValores";
import { AdeudosPasivos } from "../checador/hojas/AdeudosPasivos";
import { PrestamoComodato } from "../checador/hojas/PrestamoComodato";
import { Participacion } from "../checador/hojas/interes/Participacion";
import { ParticipacionTomaDecisiones } from "../checador/hojas/interes/ParticipacionTomaDecisiones";
import { Apoyos } from "../checador/hojas/interes/Apoyos";
import { Clientes } from "../checador/hojas/interes/Clientes";
import { BeneficiariosPrivados } from "../checador/hojas/interes/BeneficiariosPrivados";
import { Representacion } from "../checador/hojas/interes/Representacion";
import { Fideicomisos } from "../checador/hojas/interes/Fideicomisos";
import { AvisoPrivacidad } from "../checador/hojas/avisoprivacidad/AvisoPrivacidad";
import DeclarationDocument from "../checador/hojas/BajoProtesta";

const Checador = ({ type, testada, myRow, pdfData, open, setOpen, setPdfData, PdfWrapper = PdfDeclaracion // <-- componente por defecto
}) => {

   const cleanFileName = (text) => {
      if (!text) return text;
      return text
         .normalize("NFD")
         .replace(/[\u0300-\u036f]/g, "")
         .replace(/[^a-zA-Z0-9]/g, "")
         .toUpperCase();
   };

   useEffect(() => {

   }, [pdfData]);

   if (!pdfData) return null; // evita renderizar si no hay datos
   return (
      <>
         {pdfData.map((it, index) => (
            <>
               <PagePdf title={`I. DATOS GENERALES  ${myRow?.Tipo_declaracion?.toUpperCase()}`} nota>

                  <DatosGenerales data={it.declaracion.situacionPatrimonial.datosGenerales} testada={testada} />
                  <Notas
                     testada={testada}
                     message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                  />
               </PagePdf>
               <PagePdf title={"II. DOMICILIO DEL DECLARANTE"}>
                  <DomiDeclarante data={it.declaracion.situacionPatrimonial.domicilioDeclarante} testada={testada} />
                  <Notas
                     testada={testada}
                     message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                  />
               </PagePdf>
               <PagePdf title={"III. DATOS CURRICULARES DEL DECLARANTE"}>
                  <DatosCurriculares
                     data={it.declaracion.situacionPatrimonial.datosCurricularesDeclarante}

                     testada={testada}
                  />
               </PagePdf>
               <PagePdf title={"IV. DATOS DEL EMPLEO CARGO O COMISIÓN"}>
                  <DatosEmpleoCargo
                     testada={testada}
                     data={it.declaracion.situacionPatrimonial.datosEmpleoCargoComision}

                  />
               </PagePdf>

               {Array.isArray(it?.declaracion?.situacionPatrimonial?.experienciaLaboral?.experiencia) &&
                  it.declaracion.situacionPatrimonial.experienciaLaboral.experiencia.length > 0 ? (
                  it.declaracion.situacionPatrimonial.experienciaLaboral.experiencia.map((item, index) => (
                     <PagePdf key={index} title="V. EXPERIENCIA LABORAL">
                        <ExperienciaLaboral data={item} testada={testada} />
                     </PagePdf>
                  ))
               ) : (
                  <PagePdf title="V. EXPERIENCIA LABORAL (NINGUNO)" />
               )}
               <Ngif condition={myRow.Declaracion == "Simplificada"}>

               <PagePdf title={`${myRow.Declaracion == "Simplificada" ? "VI" : "VIII"}. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS`}>
                  <IngresosNetos
                     data={it.declaracion.situacionPatrimonial.ingresos}
                     metaData={it.metadata}
                     testada={testada}
                  />
                  <Notas
                     testada={testada}
                     message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                  />
               </PagePdf>
               </Ngif>  
               <Ngif condition={myRow.Declaracion != "Simplificada"}>
                  <PagePdf title={`VI. DATOS DE LA PAREJA ${it.declaracion.situacionPatrimonial.datosPareja.ninguno ? " NINGUNO" : ""}`}>
                     {!it.declaracion.situacionPatrimonial.datosPareja.ninguno ? <DatosPareja data={it.declaracion.situacionPatrimonial.datosPareja} testada={testada} /> : <></>}
                     <Notas
                        testada={testada}
                        message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                     />
                  </PagePdf>

                  {Array.isArray(it?.declaracion?.situacionPatrimonial?.datosDependienteEconomicos?.experiencia) &&
                     it.declaracion.situacionPatrimonial.datosDependienteEconomicos.experiencia.length > 0 ? (
                     it.declaracion.situacionPatrimonial.datosDependienteEconomicos.experiencia.map((item, index) => (
                        <PagePdf key={index} title="V. EXPERIENCIA LABORAL">
                           <ExperienciaLaboral data={item} testada={testada} />
                        </PagePdf>
                     ))
                  ) : (
                     <PagePdf title="V. EXPERIENCIA LABORAL (NINGUNO)" />
                  )}

                  {Array.isArray(it?.declaracion?.situacionPatrimonial?.datosDependienteEconomico?.dependienteEconomico) &&
                     it.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico.length > 0 ? (
                     it.declaracion.situacionPatrimonial.datosDependienteEconomico.dependienteEconomico.map((item, index) => (
                        <PagePdf key={index} title="VII. DATOS DEL DEPENDIENTE ECONOMICO">
                           <DependientesEconomicos data={item} testada={testada} />
                        </PagePdf>
                     ))
                  ) : (
                     <PagePdf title="VII. DATOS DEL DEPENDIENTE ECONOMICO       (NINGUNO)" />
                  )}
                  <PagePdf title={`${myRow.Declaracion == "Simplificada" ? "VI" : "VIII"}. INGRESOS NETOS DEL DECLARANTE, PAREJA Y/O DEPENDIENTES ECONÓMICOS`}>
                     <IngresosNetos
                        data={it.declaracion.situacionPatrimonial.ingresos}
                        metaData={it.metadata}
                        testada={testada}
                     />
                     <Notas
                        testada={testada}
                        message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                     />
                  </PagePdf>
                  <Ngif condition={it?.metadata?.Id_Plazo != 2}>

                     actividadAnualAnterior
                     <PagePdf title={`IX. ¿TE DESEMPEÑASTE COMO SERVIDOR PÚBLICO EN EL AÑO INMEDIATO ANTERIOR? ${it.declaracion.situacionPatrimonial.actividadAnualAnterior?.servidorPublicoAnioAnterior ? "" : "NO"} `}>
                        {it.declaracion.situacionPatrimonial.actividadAnualAnterior?.actividadAnual && (
                           <ServidorPublico data={it.declaracion.situacionPatrimonial.actividadAnualAnterior?.actividadAnual} testada={testada} />
                        )}
                     </PagePdf>
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.bienesInmuebles?.bienInmueble) &&
                        it.declaracion.situacionPatrimonial.bienesInmuebles?.bienInmueble.length > 0 ? (
                        it.declaracion.situacionPatrimonial.bienesInmuebles?.bienInmueble.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "IX" : "X"}. BIENES INMUEBLES `}>
                              <BienesInmuebles data={item} testada={testada} />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "IX" : "X"}. BIENES INMUEBLES   (NINGUNO) `} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.vehiculos?.vehiculo) &&
                        it.declaracion.situacionPatrimonial.vehiculos?.vehiculo.length > 0 ? (
                        it.declaracion.situacionPatrimonial.vehiculos?.vehiculo.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "X" : "XI"}. VEHÍCULOS`}>
                              <Vehiculos data={item} testada={testada} />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "X" : "XI"}. VEHÍCULOS   (NINGUNO) `} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.bienesMuebles?.bienMueble) &&
                        it.declaracion.situacionPatrimonial.bienesMuebles?.bienMueble.length > 0 ? (
                        it.declaracion.situacionPatrimonial.bienesMuebles?.bienMueble.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XI" : "XII"}. BIENES MUEBLES`}>
                              <BienesMuebles data={item} testada={testada} />
                              <Notas
                                 testada={testada}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XI" : "XII"}. BIENES MUEBLES`} />
                     )}
                  </Ngif>

                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.inversionesCuentasValores?.inversion) &&
                        it.declaracion.situacionPatrimonial.inversionesCuentasValores?.inversion.length > 0 ? (
                        it.declaracion.situacionPatrimonial.inversionesCuentasValores?.inversion.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XII" : "XIII"}. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS `}>
                              <CuentasValores data={item} testada={testada} />
                              <Notas
                                 testada={testada}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XII" : "XIII"}. INVERSIONES, CUENTAS BANCARIAS Y OTRO TIPO DE VALORES / ACTIVOS (NINGUNO)`} />
                     )}
                  </Ngif>


                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.adeudos?.adeudo) &&
                        it.declaracion.situacionPatrimonial.adeudos?.adeudo.length > 0 ? (
                        it.declaracion.situacionPatrimonial.adeudos?.adeudo.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XIII" : "XIV"}. ADEUDOS PASIVOS`}>
                              <AdeudosPasivos data={item} testada={testada} />
                              <Notas
                                 testada={testada}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XIII" : "XIV"}. ADEUDOS PASIVOS (NINGUNO)`} />
                     )}
                  </Ngif>

                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.prestamoOComodato?.prestamo) &&
                        it.declaracion.situacionPatrimonial.prestamoOComodato?.prestamo.length > 0 ? (
                        it.declaracion.situacionPatrimonial.prestamoOComodato?.prestamo.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XIV" : "XV"}. PRESTAMO O COMODATO POR TERCEROS`}>
                              <PrestamoComodato data={item} testada={testada} />
                              <Notas
                                 testada={testada}
                                 message={`VERSIÓN PÚBLICA ELABORADA CON ATENCIÓN A LAS DISPOSICIONES ESTABLECIDAS POR EL ARTÍCULO 29 DE LA LEY GENERAL DE RESPONSABILIDADES ADMINISTRATIVAS, ASÍ COMO POR LA DÉCIMO OCTAVA Y DÉCIMO NOVENA DE LAS NORMAS E INSTRUCTIVO PARA EL LLENADO Y PRESENTACIÓN DELFORMATO DE DECLARACIONES: DE SITUACIÓN PATRIMONIAL Y DE INTERESES, EMITIDAS MEDIANTE ACUERDO DEL COMITÉ COORDINADOR DELSISTEMA NACIONAL ANTICORRUPCIÓN, PUBLICADO EN EL DIARIO OFICIAL DE LA FEDERACIÓN EL 23 DE SEPTIEMBRE DE 2019.`}
                              />
                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XIV" : "XV"}. PRESTAMO O COMODATO POR TERCEROS (NINGUNO)`} />
                     )}
                  </Ngif>

                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.declaracion?.situacionPatrimonial?.participacion?.participacion) &&
                        it.declaracion.situacionPatrimonial.participacion?.participacion.length > 0 ? (
                        it.declaracion.situacionPatrimonial.participacion?.participacion.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XV" : "XVI"}. PARTICIPACION `}>
                              <Participacion data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XV" : "XVI"}. PARTICIPACION (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.participacion?.participacion) &&
                        it.intereses.participacion?.participacion.length > 0 ? (
                        it.intereses.participacion?.participacion.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XV" : "XVI"}. PARTICIPACION `}>
                              <Participacion data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XV" : "XVI"}. PARTICIPACION (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.participacion?.participacionTomaDecisiones) &&
                        it.intereses.participacion?.participacionTomaDecisiones.length > 0 ? (
                        it.intereses.participacion?.participacionTomaDecisiones.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XVI" : "XVII"}. PARTICIPACION TOMA DE DECISIONES `}>
                              <ParticipacionTomaDecisiones data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XVI" : "XVII"}. PARTICIPACION TOMA DE DECISIONES (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.apoyos?.apoyo) &&
                        it.intereses.apoyos?.apoyo.length > 0 ? (
                        it.intereses.apoyos?.apoyo.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XVII" : "XVIII"}. APOYOS `}>
                              <Apoyos data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XVII" : "XVIII"}. APOYOS (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.representacion?.representacion) &&
                        it.intereses.representacion?.representacion.length > 0 ? (
                        it.intereses.representacion?.representacion.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XVIII" : "XIX"}. REPRESENTACIÓN `}>
                              <Representacion data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XVIII" : "XIX"}. REPRESENTACIÓN (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.clientesPrincipales?.cliente) &&
                        it.intereses.clientesPrincipales?.cliente.length > 0 ? (
                        it.intereses.clientesPrincipales?.cliente.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XIX" : "XX"}. CLIENTES PRINCIPALES `}>
                              <Clientes data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XIX" : "XX"}. CLIENTES PRINCIPALES (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.beneficiosPrivados?.beneficio) &&
                        it.intereses.beneficiosPrivados?.beneficio.length > 0 ? (
                        it.intereses.beneficiosPrivados?.beneficio.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XX" : "XXI"}. BENEFICIARIOS PRIVADOS `}>
                              <BeneficiariosPrivados data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XX" : "XXI"}. BENEFICIARIOS PRIVADOS (NINGUNO)`} />
                     )}
                  </Ngif>
                  <Ngif condition={it?.metadata?.Id_Plazo < 4}>
                     {Array.isArray(it?.intereses?.fideicomisos?.fideicomiso) &&
                        it.intereses.fideicomisos?.fideicomiso.length > 0 ? (
                        it.intereses.fideicomisos?.fideicomiso.map((item, index) => (
                           <PagePdf key={index} title={`${it?.metadata?.Id_Plazo != 2 ? "XXI" : "XXII"}. FIDEICOMISOS `}>
                              <Fideicomisos data={item} testada={testada} />

                           </PagePdf>
                        ))
                     ) : (
                        <PagePdf title={`${it?.metadata?.Id_Plazo != 2 ? "XXI" : "XXII"}. FIDEICOMISOS (NINGUNO)`} />
                     )}
                  </Ngif>
                  <AvisoPrivacidad />
                  <DeclarationDocument
                     row={myRow}
                     message={
                        it?.metadata?.Id_Plazo == 1 || it?.metadata?.Id_Plazo == 3
                           ? "INICIAL"
                           : it?.metadata?.Id_Plazo == 2 || it?.metadata?.Id_Plazo == 4
                              ? "MODIFICACION"
                              : "CONCLUSION"
                     }
                  />
               </Ngif>
            </>
         ))}
      </>
   );
};

export default Checador;
