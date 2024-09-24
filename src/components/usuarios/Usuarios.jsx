import { useEffect } from "react";
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
   const { roles, intengrantes, adscripcion } = peticiones;
   const key = "Id_User";
   const table = true;
   const filterColumns = true;
   const title = "Registro de usuarios";
   const urlData = "usuarios";
   const parameter =parseInt(localStorage.getItem("Id_Person"));
   const validator = {
      Name: Yup.string("El formato es texto").required("El nombre es requerido"),
      Email: Yup.string("El formato es texto").required("El correo es requerido"),
      Nomina: Yup.number("el formato es numerico").min(100000, "El numero de nomina requiere 6 numeros").required("El numero de nomina es requerido"),
      PaternalSurname: Yup.string("El formato es texto").required("El apellido paterno es requerido"),
      // Gender: Yup.string("").required("El sexo es ob"),
      MaternalSurname: Yup.string("El formato es texto").required("El apellido materno es requerido"),
      DenominacionCargo: Yup.string("El formato es texto").required("La Denominación del cargo es requerida"),
      DenominacionPuesto: Yup.string("el formato es texto").required("La Denominación del puesto es requerida"),
      Id_TipoIntegrante: Yup.number("el valor es numerico").min(1, "El tipo de integrante es requerido").required("El tipo de integrante es requerido"),
      ClaseNivelPuesto: Yup.string("el formato es texto").required("El Clase o nivel del puesto es requerido"),
      Id_Role: Yup.number("el formato es numerico").min(1, "El tipo de rol es requerido").required("El tipo de rol es requerido"),
      AreaAdscripcion: Yup.number("el formato es numerico").min(1, "El tipo de adscripcion es requerido").required("El tipo de adscripcion es requerido")
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
      Id_Role: 0
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
      if (value.length >= 6) {
         const response = await GetAxios(`compaq/show/${value}`);
         if (response.length > 0) {
            const { nombreE, apellidoP, apellidoM, puesto } = response[0];
            formik.current.setFieldValue("Name", nombreE);
            formik.current.setFieldValue("PaternalSurname", apellidoP);
            formik.current.setFieldValue("MaternalSurname", apellidoM);
            formik.current.setFieldValue("DenominacionPuesto", puesto);
         } else {
            Error("No existe el numero de nomina");
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

   const Form = () => {
      useEffect(() => {}, []);
      return (
         <>
            <Ngif condition={roles.length > 0 && intengrantes.length > 0 && adscripcion.length > 0}>
               <Text col={6} name={"Nomina"} label={"N° de Nomina"} handleGetValue={handleNomina} />
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
                  name={"ClaseNivelPuesto"}
                  label={"Clase o nivel del puesto"}
                  options={[
                     { id: 1, text: "1 Presidente Municipal,Regidores,Tesorero,Contralor, Oficil Mayor." },
                     { id: 2, text: "2 Encargados, Jefes, Supervisores,Administradores, Sub Directores, Directores, Juez, Coordinadores." },
                     { id: 3, text: "3 Operativos(secretaría,auxiliares,limpieza,administrativos,veladores,chofer,intendencia,fajineros, etc.)." }
                  ]}
               />
               <AutoComplete col={12} name={"AreaAdscripcion"} label={"Área de adscripción"} options={adscripcion} />

               <Text col={12} label={"Denominación del cargo"} name={"DenominacionCargo"} />
               <Text col={12} label={"Denominación del puesto"} name={"DenominacionPuesto"} />
            </Ngif>
            <Ngif condition={roles.length < 1 || intengrantes.length < 1 || adscripcion.length < 1}>
               <Loading />
            </Ngif>
         </>
      );
   };
   const handleEdit = (row) => {
      formik.current.resetForm();
      formik.current.setValues(row);
      setId(row.Id_User);

      formik.current.setFieldValue("Id_Role", parseInt(row.Id_Role));
      formik.current.setFieldValue("Id_TipoIntegrante", parseInt(row.Id_TipoIntegrante));
      formik.current.setFieldValue("ClaseNivelPuesto", parseInt(row.ClaseNivelPuesto));
      formik.current.setFieldValue("AreaAdscripcion", parseInt(row.AreaAdscripcion));
   };
   const headersDatable = ["Nomina", "Nombre", "Apellido Paterno", "Apellido Materno", "Rol", "Puesto"];
   const dataHiddenDatable = ["Id_User", "Email", "DenominacionCargo", "Id_Role", "Id_TipoIntegrante", "ClaseNivelPuesto", "AreaAdscripcion", "Gender"];
   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table, key,parameter,filterColumns };
};
export default Usuarios;
