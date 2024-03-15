import { useState } from "react";

import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Number } from "../../Reusables/number/Number";
import { Password } from "../../Reusables/password/Password";
import { TextArea } from "../../Reusables/textaerea/TextAerea";
import { Phone } from "../../Reusables/phone/Phone";
import { Email } from "../../Reusables/email/Email";
// import { Curp } from "../../Reusables/curp/Curp";
import { Rfc } from "../../Reusables/rfc/rfc";
import { useEffect } from "react";
import { Date } from "../../Reusables/date/Date";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { CustomCheckbox } from "../../Reusables/checkbox/Inpcheckbox";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Axios, GetAxios } from "../../../services/services";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";

//regex min max validaciones
//optional indica que no tiene validaciones
// exist lo desaparece del dom
//validations son las validaciones

export const DatosGenerales = ({ next, previous }) => {
  let { declaracion } = useParams();

  declaracion = parseInt(declaracion);
  const [estadocivil, setEstadoCivil] = useState(null);
  const [regimenes, setRegimenes] = useState(null);
  const [paises, setPaises] = useState(null);
  const [nacionalidades, setNacionalidades] = useState(null);
  const [messages, setMessages] = useState(false);

  useEffect(() => {
    const init = async () => {
      setEstadoCivil(await GetAxios("/estadoCivil/show"));
      setRegimenes(await GetAxios("/regimenes/show"));
      setPaises(await GetAxios("/paises/show"));
      setNacionalidades(await GetAxios("/paises/showNacionalidad"));
    };
    init();
  }, []);

  const dataForm = {
    Nombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    Curp: "",
    Rfc: "",
    Homoclave: "",
    CorreoInstitucional: "",
  };

  const validationSchema = Yup.object().shape({
    Nombre: Yup.string().required("El Nombre es obligatorio"),
    PrimerApellido: Yup.string().required("El Primer apellido es obligatorio"),
    SegundoApellido: Yup.string().required(
      "El Segundo apellido es obligatorio"
    ),
    Curp: Yup.string()
      .required("El CURP es requerido")
      .matches(
        /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/,
        "El CURP no cumple el formato válido"
      )
      .length(18, "El CURP debe tener exactamente 18 caracteres"),

    Rfc: Yup.string()
      .required("El rfc es requerido")
      .matches(
        /^[A-ZÑ&]{3,4}\d{6}(?:[A-Z\d]{3})?$/,
        "El rfc no cumple el formato"
      )
      .length(13, "El rfc debe contar con 13 caracteres"),

    Homoclave: Yup.string()
      .required("La Homoclave es requerida")
      .length(3, "La Homoclave debe tener exactamente 3 caracteres"),
    CorreoInstitucional: Yup.string()
      .email("El formato de correo es inválido")
      .required("El correo es necesario"),
  });
  return (
    <>
      {/* Invoca correctamente la función submit */}
      <Card
        sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}
        TouchRippleProps={{ disabled: true }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="start"
            color="textPrimary"
            style={{ fontWeight: "500" }}
          >
            Los datos que no serán públicos estarán resaltados de color{" "}
            <span style={{ color: "green" }}>verde</span>
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            <Grid container spacing={2}></Grid>
          </Typography>
          <Formik
            initialValues={dataForm}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => {
              {
                // console.log("touched", touched);
              }
              return (
                <Box component={"form"} onSubmit={handleSubmit}>
                  <Text
                    col={12}
                    name="Nombre"
                    label="Nombre(s)"
                    value={setNestedObjectValues}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    placeholder={
                      "Sin abreviaturas, sin acentos, ni signos especiales"
                    }
                  />
                  <Text
                    col={12}
                    name="PrimerApellido"
                    label="Primer apellido"
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    placeholder={
                      "Sin abreviaturas, sin acentos, ni signos especiales"
                    }
                  />
                  <Text
                    col={12}
                    name="SegundoApellido"
                    label="Segundo apellido"
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    placeholder={`
                    Si se tiene un solo apellido debera colocarse en el espacio de "Primer apellido" y dejar el espacio
                     "Segundo apellido" en blanco. Sin abreviaturas, sin acentos, ni signos especiales

                    `}
                  />
                  <Text
                    col={12}
                    name="Curp"
                    label="Curp"
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <Text
                    col={12}
                    name="Rfc"
                    label="Rfc"
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <Text
                    col={12}
                    name="Homoclave"
                    label="Homoclave"
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                  />
                  <Text
                    col={12}
                    name="CorreoInstitucional"
                    label="Correo electrónico institucional"
                    type={"email"}
                    value={values}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    placeholder={
                      "En caso de no contar con correo institucional ingresar el correo personal."
                    }
                  />
                  {/* <Curp
                  col={12}
                  name="Curp"
                  label="Curp"
                  value={values["Curp"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <Rfc
                  col={12}
                  name="Rfc"
                  label="Rfc"
                  value={values["Rfc"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <Text
                  col={12}
                  name="Homoclave"
                  label="Homoclave(s)"
                  value={values["Homoclave"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <Email
                  col={12}
                  name="CorreoInstitucional"
                  label="Correo electrónico institucional"
                  value={values["CorreoInstitucional"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                  helperText={
                    "En caso de no contar con correo institucional ingresar el correo personal."
                  }
                />
                <Email
                  col={12}
                  name="CorreoPersonal"
                  label="Correo electrónico personal/alterno"
                  value={values["CorreoPersonal"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                  helperText={
                    "Es importante considerar que en la cuenta que proporcione le será enviada la declaración patrimonial y de interés que haya presentado y el acuse"
                  }
                />
                <Text
                  col={12}
                  name="TelefonoCasa"
                  label="Número telefónico de casa"
                  value={values["TelefonoCasa"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                <Phone
                  col={12}
                  name="TelefonoCelularPersonal"
                  label="Número celular personal"
                  value={values["TelefonoCelularPersonal"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                />
                 <AutoComplete
                  col={12}
                  label="Situación personal / Estado civil"
                  name="Id_EstadoCivil"
                  options={estadocivil}
                  value={values["Id_EstadoCivil"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  message={messages}
                /> */}
                  <Button
                    type="submit"
                    // onClick={() => {
                    //   setMessages(true);
                    // }}
                    variant="contained"
                    color="primary"
                  >
                    Enviar
                  </Button>
                </Box>
              );
            }}
          </Formik>
        </CardContent>
      </Card>

      {/* <CustomCheckbox
          rowLayout={false}
          col={2}
          name="checbox"
          label={"checbox"}
          data={{ text: "Option 1", id: "option1" }}
        /> */}
      {/* <Curp col={5} label="Curp" name="curp" />
        <Rfc col={5} label="rfc" name="rfc" />

        <TextArea
          col={12}
          rows={20}
          label="info"
          name="info"
          validations={{ min: 40, max: 90 }}
        />
        <Date col={12} label="Fecha de nacimiento" name="fechaNacimiento" /> */}
      {/* <Number
          col={3}
          label={"carlos"}
          name="carlos"
          id={100}
          loading={true}
        />

        <Text col={6} name="texto" label={"nestor"} loading={true} />
        <Phone col={6} name="telefono" label={"phone"}></Phone>
        <Password
          col={5}
          label="contraseña"
          name="password"
          validations={{
            regex:
            max: 12,
            min: 6,
          }}
        /> */}
      {/* <CustomRadio
          rowLayout={false}
          col={5}
          name="radio"
          label={"radio"}
          data={["a", "b", "c", "d"]}
        />
        <AutoComplete
          disabled={true}
          col={12}
          label="Selecciona una película"
          name="movie"
          loading={false}
          // onChange={handleMovieChange}
          options={[
            { text: "The Shawshank Redemption", id: 1 },
            { text: "The Godfather", id: 2 },
            { text: "The Godfather: Part II", id: 3 },
            { text: "The Dark Knight", id: 4 },
            { text: "12 Angry Men", id: 5 },
            { text: "Schindler's List", id: 6 },
            { text: "Pulp Fiction", id: 7 },
          ]}
        /> */}
      {/* <CustomRadio
          rowLayout={true}
          col={5}
          name="radio"
          label={"radio"}
          data={["a", "b", "c", "d"]}
        /> */}
      {/* <CustomCheckbox
          rowLayout={false}
          col={2}
          name="checbox"
          label={"checbox"}
          data={{ text: "Option 1", id: "option1" }}
        />
        <CustomCheckbox
          rowLayout={false}
          col={2}
          name="other"
          label={"other"}
          data={{ text: "Option 1", id: "option1" }}
        /> */}
      {/* <Date
        col={12}
        label="Fecha de nacimiento"
        name="fechaNacimiento"
      /> */}
      {/* <Number 
        col={5} 
        label="Edade(s)" name="age"
        exist={true}
        optional
        value={valor}
        validations={{
          max:12,
          min:4,
        }}
      /> */}
      {/* <Text col={5} name="d" label={"d"}  loading={valor}/>
        <Number col={3} label={"carlos"} name="carlos" value={100} loading={true} />
        <Phone col={5} label="telefono" name="phone" exist={valor}/> */}
      {/* 
        <Password col={5} label="contraseña" name="password"/>
        <Email col={5} label="Correo" name="email" value="" />
        <Curp col={5} label="Curp" name="curp"/>
        <Rfc col={5} label="rfc" name="rfc"/>

        <TextArea col={12} rows={10} label="info" name="info"
                validations={{min:40,max:90}}

        /> 
        */}
      {/* <AutoComplete/> */}
    </>
  );
};
// Checkbox RadioButton  file(upload)
// message toasts
// clear data
// URL POST PUT GET
