import { Box, Grid } from "@mui/material";
import { AutoComplete } from "../Reusables/autocomplete/autocomplete";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { Text } from "../Reusables/input/Input";
import * as Yup from "yup";
import { GetAxios, PostAxios } from "../../services/services";
import { useFormikContext } from "formik";
import { Error } from "../../toasts/toast";
import { useRef } from "react";

export const Usuarios = ({}) => {
   const validationSchema = Yup.object().shape({
      Nomina: Yup.number("el formato es numerico").min(100000, "El numero de nomina requiere 6 numeros").required("El numero de nomina es requerido"),
      Name: Yup.string("El formato es texto").required("El nombre es requerido"),
      PaternalSurname: Yup.string("El formato es texto").required("El apellido paterno es requerido"),
      MaternalSurname: Yup.string("El formato es texto").required("El apellido materno es requerido"),
      Email: Yup.string("El formato es texto").required("El correo es requerido"),
      DenominacionCargo: Yup.string("El formato es texto").required("El correo es requerido"),
      DenominacionPuesto: Yup.string("el formato es texto").required("El Denominación del puesto es requerido"),
      Id_TipoIntegrante: Yup.number("el valor es numerico").min(1, "El tipo de rol es requerido").required("El tipo de integrante es requerido"),
      ClaseNivelPuesto: Yup.string("el formato es texto").required("El Clase o nivel del puesto es requerido"),
      Id_Role: Yup.number("el formato es numerico").min(1, "El tipo de rol es requerido").required("El tipo de rol es requerido"),
      AreaAdscripcion: Yup.string("El formato es texto").required("El aerea de adscripción es requerido")
   });
   const dataForm = {
      Nomina: 0,
      Name: "",
      PaternalSurname: "",
      MaternalSurname: "",
      Email: "",
      AreaAdscripcion: "",
      DenominacionCargo: "",
      DenominacionPuesto: "",
      Id_TipoIntegrante: 0,
      ClaseNivelPuesto: "",
      Id_Role: 0
   };
   const submit = async (values) => {
      const response = await PostAxios("/users/create", values);
      formik.current.resetForm();
      Success(response.data.message);
   };
   const formik = useRef();
   return (
      <Grid
         container
         item
         col={12}
         sx={{
            width: "90%",
            overflowX: "hidden",
            border: "2px solid #007bff",
            borderRadius: "10px",
            padding: "20px 0",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px"
         }}
      >
         <FormikForm
            ref={formik}
            initialValues={dataForm}
            validationSchema={validationSchema}
            submit={submit}
            title={"Registro de usuarios"}
            button={true}
            messageButton={"registrar"}
         >
            <FormUsuarios />
         </FormikForm>
      </Grid>
   );
};
const FormUsuarios = ({}) => {
   const formik = useFormikContext();
   const handleNomina = async (name, value) => {
      if (value.length >= 6) {
         const response = await GetAxios(`compaq/show/${value}`);
         if (response.length > 0) {
            const { nombreE, apellidoP, apellidoM } = response[0];
            formik.setFieldValue("Name", nombreE);
            formik.setFieldValue("PaternalSurname", apellidoP);
            formik.setFieldValue("MaternalSurname", apellidoM);
         } else {
            Error("No existe el numero de nomina");
            formik.setFieldValue("Name", "");
            formik.setFieldValue("PaternalSurname", "");
            formik.setFieldValue("MaternalSurname", "");
         }
      } else {
         formik.setFieldValue("Name", "");
         formik.setFieldValue("PaternalSurname", "");
         formik.setFieldValue("MaternalSurname", "");
      }
   };
   return (
      <>
         <Text col={12} name={"Nomina"} label={"N° de Nomina"} handleGetValue={handleNomina} />
         <Text col={4} disabled={true} name={"Name"} label={"Nombre(s)"} />
         <Text col={4} disabled={true} name={"PaternalSurname"} label={"Apellido Paterno"} />
         <Text col={4} disabled={true} name={"MaternalSurname"} label={"Apellido Materno"} />
         <Text type={"email"} col={6} name={"Email"} label={"Correo"} />
         <AutoComplete col={6} name={"Id_Role"} label={"Rol del usuario en el sistema"} options={[]} />
         <AutoComplete col={6} name={"Id_TipoIntegrante"} label={"Tipo de integrante del sujeto obligado"} options={[]} />
         <AutoComplete col={6} name={"ClaseNivelPuesto"} label={"Clase o nivel del puesto"} options={[]} />
         <Text col={6} label={"Área de adscripción"} name={"AreaAdscripcion"} />
         <Text col={6} label={"Denominación del cargo"} name={"DenominacionCargo"} />
         <Text col={12} label={"Denominación del puesto"} name={"DenominacionPuesto"} />
      </>
   );
};
