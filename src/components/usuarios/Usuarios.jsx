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
      Nomina: Yup.number("el formato es numerico").min(1000, "El numero de nomina requiere 4 numeros").required("El numero de nomina es requerido"),
      PaternalSurname: Yup.string("El formato es texto").required("El apellido paterno es requerido"),
      // Gender: Yup.string("").required("El sexo es ob"),
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
      if (value === "999999") {
         formik.current.setFieldValue("Name", "Enlance");
         formik.current.setFieldValue("PaternalSurname", "Enlance");
         formik.current.setFieldValue("MaternalSurname", "Enlance");
         formik.current.setFieldValue("DenominacionPuesto", "Enlance");
         formik.current.setFieldValue("DenominacionCargo", "Enlance");
         formik.current.setFieldValue("Id_Role", 4);
         return;
      }
      if (value.length >= 4) {
         try {
            const response = await GetAxios(`compaq/show/${value}`);

            if (response.length > 0) {
               const { nombreE, apellidoP, apellidoM, puesto } = response[0];

               formik.current.setFieldValue("Name", nombreE || "");
               formik.current.setFieldValue("PaternalSurname", apellidoP || "");
               formik.current.setFieldValue("MaternalSurname", apellidoM || "");
               formik.current.setFieldValue("DenominacionPuesto", puesto || "");
            } else {
               Error("No existe el número de nómina");
               clearFields();
            }
         } catch (err) {
            Error("Error en la solicitud, intenta nuevamente.");
            console.error(err);
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
      useEffect(() => {}, []);
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
               <Text type={"number"} col={6} name={"Nomina"} label={"N° de Nomina"} handleGetValue={handleNomina} />
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
                  options={roles.filter((r) => (parseInt(localStorage.getItem("Id_Role")) == 4 ? [2, 3].includes(r.id) : true))}
               />
               <AutoComplete col={12} name={"Id_TipoIntegrante"} label={"Tipo de integrante del sujeto obligado"} options={intengrantes} />
               <AutoComplete
                  col={12}
                  name={"organismo"}
                  label={"Organismo"}
                  options={[
                     { id: "Presidencia", text: "Presidencia" },
                     { id: "SIDEAPAAR", text: "SIDEAPAAR" },
                     { id: "SIDEAPA", text: "SIDEAPA" },

                     { id: "DIF", text: "DIF" },
                     { id: "EXPOFERIA", text: "EXPOFERIA" }
                  ]}
                  handleGetValue={handleEmpleos}
               />
               <AutoComplete
                  col={12}
                  name={"ClaseNivelPuesto"}
                  label={"Clase o nivel del puesto"}
                  options={[
                     { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
                     { id: 2, text: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
                     { id: 3, text: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." }
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
         ? [ "Nomina", "Nombre", "Apellido Paterno", "Apellido Materno", "Nombre Completo", "Rol", "Correo"]
         : ["Nomina", "Nombre", "Apellido Paterno", "Nombre Completo", "Apellido Materno", "Rol", "Correo"];
   const dataHiddenDatable =
      parseInt(localStorage.getItem("Id_Role")) == 10
         ? ["storedCertificatePath","Id_User", "DenominacionCargo", "Id_Role", "Id_TipoIntegrante", "ClaseNivelPuesto", "AreaAdscripcion", "Gender", "organismo", "DenominacionPuesto"]
         : [
              "storedCertificatePath",
              "Id_User",
              "DenominacionCargo",
              "Id_Role",
              "Id_TipoIntegrante",
              "ClaseNivelPuesto",
              "AreaAdscripcion",
              "Gender",
              "organismo",
              "DenominacionPuesto"
           ];
   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table, key, parameter, filterColumns, link };
};
export default Usuarios;
