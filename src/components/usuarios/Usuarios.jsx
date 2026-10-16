import { useEffect, useState } from "react";
import { GetAxios } from "../../services/services";
import { Error } from "../../toasts/toast";
import { AutoComplete } from "../Reusables/autocomplete/autocomplete";
import { CustomRadio } from "../Reusables/radiobutton/Radio";

import { Ngif } from "../Reusables/conditionals/Ngif";
import { Text } from "../Reusables/input/Input";
import Loading from "../Reusables/loading/Loading";
import { Request } from "../Reusables/request/Request";
import * as Yup from "yup";

const Usuarios = ({ formik, setId, peticiones }) => {
   const { roles, intengrantes, adscripcion, empleos, adscripcionOrganismo } = peticiones;
   const key = "Id_User";
   const table = true;
   const filterColumns = true;
   const title = "Registro de usuarios";
   const urlData = "usuarios";
   const parameter = parseInt(localStorage.getItem("Id_Person"));
   const link = 0;
   const validator = {
      Name: Yup.string("El formato es texto").required("El nombre es requerido"),
      Email: Yup.string("El formato es texto").required("El correo es requerido"),
      Nomina: Yup.string()
         .matches(/^\d+$/, "El formato debe ser numérico")
         .required("El número de nómina es requerido"),
      PaternalSurname: Yup.string().test(
         'al-menos-un-apellido',
         'Es requerido al menos un apellido (Paterno o Materno)',
         function (value) {
            const { MaternalSurname } = this.parent;
            return !!(value?.trim() || MaternalSurname?.trim());
         }
      ),      // Gender: Yup.string("").required("El sexo es ob"),
      // MaternalSurname: Yup.string("El formato es texto").required("El apellido materno es requerido"),
      DenominacionCargo: Yup.number("El formato es texto").required("La Denominación del cargo es requerida"),
      DenominacionPuesto: Yup.number("el formato es numerico").required("La Denominación del puesto es requerida"),
      Id_TipoIntegrante: Yup.number("el valor es numerico").min(1, "El tipo de integrante es requerido").required("El tipo de integrante es requerido"),
      ClaseNivelPuesto: Yup.string("el formato es texto").required("El Clase o nivel del puesto es requerido"),
      Id_Role: Yup.number("el formato es numerico").min(1, "El tipo de rol es requerido").required("El tipo de rol es requerido"),
      AreaAdscripcion: Yup.number("el formato es numerico").min(1, "El tipo de adscripcion es requerido").required("El tipo de adscripcion es requerido"),
      organismo: Yup.string("El formato es texto").required("El organismo es requerido")
   };
   const initialState = {
      Nomina: 0,
      Name: "",
      PaternalSurname: "",
      MaternalSurname: "",
      Gender: "",
      Email: "",
      AreaAdscripcion: 0,
      DenominacionCargo: "",
      DenominacionPuesto: "",
      Id_TipoIntegrante: 0,
      ClaseNivelPuesto: "",
      Id_Role: 0,
      organismo: ""
   };
   const handleNomina = async (name, value) => {
      // 1. Obtener el organismo desde formik
      const organismo = formik?.current?.values?.['organismo'];

      // 2. Validar que existe organismo
      if (!organismo) {
         Error("Es necesario seleccionar la dependencia");
         return;
      }

      // 3. Caso especial para 999999
      if (value === "999999") {
         formik.current.setFieldValue("Name", "Enlance");
         formik.current.setFieldValue("PaternalSurname", "Enlance");
         formik.current.setFieldValue("MaternalSurname", "Enlance");
         formik.current.setFieldValue("DenominacionPuesto", "Enlance");
         formik.current.setFieldValue("DenominacionCargo", "Enlance");
         formik.current.setFieldValue("Id_Role", 4);
         return;
      }

      // 4. Validar longitud mínima
      if (value.length >= 4) {
         try {
            let apiUrl = '';
            let apiMethod = 'GET'; // Método por defecto

            // Determinar URL según organismo
            apiUrl = `compaq/show/${value}`;


            // Hacer la petición para Presidencia y EXPOFERIA
            if (organismo !="") {
               const response = await GetAxios(apiUrl);

               if (response?.length > 0) {
                  const { nombreE, apellidoP, apellidoM, puesto } = response[0];

                  formik.current.setFieldValue("Name", nombreE || "");
                  formik.current.setFieldValue("PaternalSurname", apellidoP || "");
                  formik.current.setFieldValue("MaternalSurname", apellidoM || "");
                  formik.current.setFieldValue("DenominacionPuesto", puesto || "");
                  // También podrías necesitar setear DenominacionCargo
               } else {
                  Error("No existe el número de nómina");
                  clearFields();
               }
            } else if (organismo =="DIF") {
               const response = await fetch("https://dif.gomezpalacio.gob.mx/empleados/",
               {
                  headers:{
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                  },
                  mode:"cors"
               }
               );
               const data = await response.json();
               console.log(data);
            } {
               // Para otros organismos (SIDEAPAAR, SIDEAPA, DIF)
               // Aquí deberías implementar la lógica específica para cada uno
               // Ejemplo:
               // const response = await axios.get(apiUrl, { params: { nomina: value } });
               // Procesar respuesta...
            }

         } catch (err) {
            Error("Error en la solicitud, intenta nuevamente.");
            console.error("Error en handleNomina:", err);
            clearFields();
         }
      } else {
         clearFields();
      }
   };

   const clearFields = () => {
      formik.current.setFieldValue("Name", "");
      formik.current.setFieldValue("PaternalSurname", "");
      formik.current.setFieldValue("MaternalSurname", "");
      formik.current.setFieldValue("DenominacionPuesto", "");
   };
   const CargoPuesto = (name, value) => {
      formik.current.setFieldValue("DenominacionCargo", value);
   };
   const handleEdit = (row) => {
      // formik.current.setFieldValue("DenominacionCargo", "");
      formik.current.resetForm();
      formik.current.setValues(row);
      setId(row.Id_User);
      formik.current.setFieldValue("organismo", row.organismo === "PR" ? "Presidencia" : row.organismo);

      formik.current.setFieldValue("Id_Role", parseInt(row.Id_Role));
      formik.current.setFieldValue("Id_TipoIntegrante", parseInt(row.Id_TipoIntegrante));
      formik.current.setFieldValue("ClaseNivelPuesto", parseInt(row.ClaseNivelPuesto));
      formik.current.setFieldValue("AreaAdscripcion", parseInt(row.AreaAdscripcion));
      formik.current.setFieldValue("DenominacionCargo", parseInt(row?.AreaAdscripcion));
      formik.current.setFieldValue("DenominacionPuesto", parseInt(row?.DenominacionPuesto));
   };
   const Form = () => {
      const [dataEmpleos, setDataEmpleos] = useState(empleos);
      const [aereas, setAereas] = useState(adscripcionOrganismo);
      
      const handleEmpleos = (name, value) => {
         formik.current.setFieldValue("AreaAdscripcion", "");
         formik.current.setFieldValue("DenominacionPuesto", "");
         formik.current.setFieldValue("DenominacionCargo", "");

         setAereas([]);
         setDataEmpleos([]);

         setAereas(adscripcionOrganismo.filter((item) => item.organismo == value));
         setDataEmpleos(empleos.filter((item) => item.organismo == (value === "Presidencia" ? "PR" : value)));
      };

      return (
         <>
            <Ngif condition={roles.length > 0 && intengrantes.length > 0 && adscripcionOrganismo.length > 0}>
               <AutoComplete
                  col={12}
                  name={"organismo"}
                  label={"Dependencia"}
                  options={[
                     { id: "Presidencia", text: "Presidencia" },
                     { id: "SIDEAPAAR", text: "SIDEAPAAR" },
                     { id: "SIDEAPA", text: "SIDEAPA" },

                     { id: "DIF", text: "DIF" },
                     { id: "EXPOFERIA", text: "EXPOFERIA" }
                  ]}
                  handleGetValue={handleEmpleos}
               />
               <Text type={"text"} col={6} name={"Nomina"} label={"N° de Nomina"} handleGetValue={handleNomina} />
               <Text col={6} disabled={true} name={"Name"} label={"Nombre(s)"} />
               <Text col={6} disabled={true} name={"PaternalSurname"} label={"Apellido Paterno"} />
               <Text col={6} disabled={true} name={"MaternalSurname"} label={"Apellido Materno"} />
               <CustomRadio
                  col={12}
                  title={"Sexo"}
                  name={"Gender"}
                  options={[
                     { value: "Masculino", label: "Masculino" },
                     { value: "Femenino", label: "Femenino" }

                     // Agrega más opciones aquí según sea necesario
                  ]}
               />
               <Text type={"email"} col={12} name={"Email"} label={"Correo"} />
               <AutoComplete
                  col={12}
                  name={"Id_Role"}
                  label={"Rol del usuario en el sistema"}
                  options={roles.filter((r) => {
                     const roleId = parseInt(localStorage.getItem("Id_Role"));
                   
                     if (roleId === 10) {
                      return ![1].includes(r.id); // no muestra ninguno
                     } else if (roleId === 1 || roleId === 12) {
                       return ![1, 10, 12].includes(r.id); // todos excepto 1, 10 y 12
                     } else {
                       return [2, 3].includes(r.id); // solo 2 y 3
                     }
                   })}
                   
                   
               />
               <AutoComplete col={12} name={"Id_TipoIntegrante"} label={"Tipo de integrante del sujeto obligado"} options={intengrantes} />
              
               <AutoComplete
                  col={12}
                  name={"ClaseNivelPuesto"}
                  label={"Clase o nivel del puesto"}
                  options={[
                     { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor, Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
                     { id: 3, text: "2 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." }
                  ]}
               />
               <AutoComplete col={12} name={"AreaAdscripcion"} label={"Área de adscripción"} options={aereas} handleGetValue={CargoPuesto} />

               <AutoComplete col={12} label={"Denominación del cargo"} name={"DenominacionCargo"} disabled={true} options={adscripcion} />
               <AutoComplete col={12} label={"Denominación del puesto"} name={"DenominacionPuesto"} disabled={dataEmpleos.length == 0} options={dataEmpleos} />
            </Ngif>
            <Ngif condition={roles.length < 1 || intengrantes.length < 1 || adscripcion.length < 1}>
               <Loading />
            </Ngif>
         </>
      );
   };

   const headersDatable =
      parseInt(localStorage.getItem("Id_Role")) == 10
         ? ["Nomina", "Nombre", "Apellido Paterno", "Apellido Materno", "Nombre Completo", "Rol", "Correo", "Dependencia"]
         : ["Nomina", "Nombre", "Apellido Paterno", "Nombre Completo", "Apellido Materno", "Rol", "Correo", "Dependencia"];
   const dataHiddenDatable =
      parseInt(localStorage.getItem("Id_Role")) == 10
         ? [
              "storedCertificatePath",
              "Id_User",
              "DenominacionCargo",
              "Id_Role",
              "Id_TipoIntegrante",
              "ClaseNivelPuesto",
              "AreaAdscripcion",
              "Gender",
              "DenominacionPuesto"
           ]
         : [
              "storedCertificatePath",
              "Id_User",
              "DenominacionCargo",
              "Id_Role",
              "Id_TipoIntegrante",
              "ClaseNivelPuesto",
              "AreaAdscripcion",
              "Gender",

              "DenominacionPuesto"
           ];
   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table, key, parameter, filterColumns, link };
};
export default Usuarios;
