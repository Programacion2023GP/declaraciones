import { Page, Text, View, Document, Font, StyleSheet } from "@react-pdf/renderer";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useState } from "react";

export const AvisoPrivacidad = ({ testada = false}) => {
   Font.register({
      family: "Open Sans",
      fonts: [{ src: "https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bbck.woff2" }]
   });

   const styles = StyleSheet.create({
      page: {
         padding: 30,
         fontFamily: "Open Sans"
      },
      title: {
         fontSize: 18,
         textAlign: "center",
         marginBottom: 10
      },
      subtitle: {
         fontSize: 14,
         marginVertical: 8
      },
      text: {
         fontSize: 12,
         textAlign: "justify",
         marginVertical: 4
      },
      listItem: {
         fontSize: 12,
         marginVertical: 2,
         marginLeft: 10
      }
   });
   const [fontSize, setFontSize] = useState(12);

   return (
      <Ngif condition={testada}>
         <Page size="A4" style={styles.page}>
            <Text style={styles.title}>AVISO DE PRIVACIDAD INTEGRAL</Text>
            <Text style={styles.text}>Sistema Declara Gómez del Republicano Ayuntamiento de Gómez Palacio, Durango</Text>
            <Text style={styles.subtitle}>Responsable del Tratamiento de los Datos Personales</Text>
            <Text style={styles.text}>
               El H. Ayuntamiento de Gómez Palacio, Durango, con domicilio en Avenida Francisco I. Madero 400 Nte, Col. Centro, Gómez Palacio, Durango, C.P. 35000, es
               el responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de
               Protección de Datos Personales en Posesión de Sujetos Obligados, la Ley de Protección de Datos Personales en Posesión de Sujetos Obligados del Estado de
               Durango, y demás normatividad que resulte aplicable.
            </Text>
            <Text style={styles.subtitle}>Finalidades para las que se Recaban los Datos Personales</Text>
            <Text style={styles.text}>Los datos personales que nos proporcione se tratarán para las siguientes finalidades:</Text>
            <Text style={styles.listItem}>
               1. Generar un registro de identificación que le permita ingresar al Sistema Declara Gómez, contenido en la página de internet
               www.declaraciones.gomezpalacio.gob.mx y dar cumplimiento a la obligación consistente en presentar declaraciones de situación patrimonial y de intereses,
               establecida en los artículos 163, tercer párrafo y 173 de la Constitución Política del Estado Libre y Soberano de Durango; así como en los diversos 32 y
               46, primer párrafo de la Ley General de Responsabilidades Administrativas.
            </Text>
            <Text style={styles.listItem}>
               2. Analizar la evolución de su patrimonio, y en su caso, iniciar la investigación por presuntas faltas administrativas que correspondan, conforme a lo
               establecido por el artículo 94 de la Ley General de Responsabilidades Administrativas.
            </Text>
            <Text style={styles.subtitle}>Datos Personales que se Recaban</Text>
            <Text style={styles.text}>
               Para las finalidades antes señaladas, se solicitan los siguientes datos personales: nombre, fecha de nacimiento, sexo, registro federal de
               contribuyentes (RFC), clave única de registro de población (CURP), estado civil, lugar de nacimiento (país, entidad federativa, nacionalidad), domicilio
               actual (país, entidad federativa, delegación o municipio, calle, número exterior, número interior, código postal, localidad o colonia), teléfono, correo
               electrónico, información laboral, información financiera, datos e información relacionada con el patrimonio, datos curriculares, información de
               particulares y terceros relacionados con la persona servidora pública e información adicional que la persona servidora pública desee manifestar en su
               declaración de situación patrimonial.
            </Text>
            <Text style={styles.subtitle}>Fundamento Legal para el Tratamiento de Datos Personales</Text>
            <Text style={styles.text}>
               Los datos anteriormente citados, serán protegidos, incorporados y tratados de conformidad a lo dispuesto por los artículos 163 y 173 de la Constitución
               Política del Estado Libre y Soberano de Durango; por los artículos 9 fracción II, 27, 29, 32, 33, 34, 36, 37, 41, 46 primer párrafo, 47 y 48 segundo
               párrafo de la Ley General de Responsabilidades Administrativas.
            </Text>
            <Text style={styles.subtitle}>Transferencia de Datos Personales</Text>
            <Text style={styles.text}>
               Los datos que los servidores públicos manifiesten en cualquiera de los formatos en sus tres modalidades (inicio/modificación/conclusión), así como en
               los avisos de cambio, notas aclaratorias o actualización de intereses, se almacenarán dentro del sistema Declara Gómez y se publicitará su versión
               pública conforme al artículo 29 de la Ley General de Responsabilidades Administrativas y las Normas e Instructivo para el Llenado y Presentación del
               Formato de Declaraciones: de Situación Patrimonial y de Intereses, emitidas mediante acuerdo del Comité Coordinador del Sistema Nacional Anticorrupción.
            </Text>
            <Text break style={styles.subtitle}>
               Mecanismos, Medios y Procedimientos Disponibles para Ejercer los Derechos de Acceso, Rectificación, Cancelación u Oposición de Datos Personales
               (Derechos ARCO)
            </Text>
            <Text style={styles.text}>
               El titular de los datos personales o su representante legal, podrá ejercer su derecho de: conocer qué datos personales nos ha proporcionado, para qué
               los utilizamos y las condiciones del uso que les damos (Acceso); de solicitar la corrección de su información personal cuando esté incompleta, sea
               inexacta, inadecuada o excesiva (Rectificación); de que se elimine de nuestros registros o bases de datos cuando considere que su tratamiento
               contraviene lo dispuesto por la Ley de Protección de Datos Personales en Posesión de los Sujetos Obligados del Estado de Durango o porque dejó de ser
               necesaria para el cumplimiento de la finalidad o finalidades de dicha base (Cancelación); así como oponerse al uso de sus datos personales para fines
               específicos (Oposición).
            </Text>
            <Text style={styles.text}>
               Es importante señalar que para el ejercicio de los derechos ARCO, el titular de datos personales podrá realizarlo mediante: correo electrónico a
               transparencia@gomezpalacio.gob.mx o bien personalmente en la Unidad de Transparencia del H. Ayuntamiento de Gómez Palacio, Durango ubicada en Avenida
               Francisco I. Madero, 400 Nte, Colonia Centro de Gómez Palacio, Durango, así como mediante la Plataforma Nacional de Transparencia
               www.plataformadetransparencia.org.mx.
            </Text>
            <Text style={styles.text}>Los requisitos que debe cumplir para presentar una solicitud de Derechos ARCO, son los siguientes:</Text>
            <Text style={styles.listItem}>1. El nombre del titular y su domicilio o cualquier otro medio para recibir notificaciones.</Text>
            <Text style={styles.listItem}>
               2. Los documentos que acrediten la identidad del titular y, en su caso, la personalidad e identidad de su representante.
            </Text>
            <Text style={styles.listItem}>3. De ser posible, el área responsable que trata los datos personales, y ante el cual se presenta la solicitud.</Text>
            <Text style={styles.listItem}>
               4. La descripción clara y precisa de los datos personales respecto de los que se busca ejercer alguno de los derechos ARCO, salvo que se trate del
               derecho de acceso.
            </Text>
            <Text style={styles.listItem}>5. La descripción del derecho ARCO que se pretende ejercer o, bien, lo que solicita el titular.</Text>
            <Text style={styles.listItem}>6. Cualquier otro elemento o documento que facilite la localización de los datos personales, de ser necesario.</Text>
            <Text style={styles.text}>
               En caso de solicitar la rectificación, adicionalmente deberá indicar las modificaciones a realizar y aportar la documentación oficial necesaria que
               sustente su petición. En el derecho de cancelación debe expresar las causas que motivan la eliminación. Y en el derecho de oposición debe señalar los
               motivos que justifican se finalice el tratamiento de los datos personales y el daño o perjuicio que le causaría o, bien, si la oposición es parcial,
               debe indicar las finalidades específicas con las que no está de acuerdo, siempre que no sea un requisito obligatorio. La Unidad de Transparencia
               responderá en el domicilio o medio que el titular de los datos personales designe en su solicitud, en un plazo de 20 días hábiles, que puede ser
               ampliado por 10 días hábiles más previa notificación.
            </Text>
         </Page>
      </Ngif>
   );
};
