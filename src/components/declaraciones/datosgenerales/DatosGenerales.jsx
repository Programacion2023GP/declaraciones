import { useState } from "react";

import { Text } from "../../Reusables/input/Input";
import { Formulario } from "../../Reusables/formulario/Formulario";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Number } from "../../Reusables/number/Number";
import { Password } from "../../Reusables/password/Password";
import { TextArea } from "../../Reusables/textaerea/TextAerea";
import { Phone } from "../../Reusables/phone/Phone";
import { Email } from "../../Reusables/email/Email";
import { Curp } from "../../Reusables/curp/Curp";
import { Rfc } from "../../Reusables/rfc/rfc";
import { useEffect } from "react";
import { Date } from "../../Reusables/date/Date";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { CustomCheckbox } from "../../Reusables/checkbox/Inpcheckbox";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Nacionalidad, Paises, Regimenes, estadoCivil } from "./datas";
import { useParams } from "react-router-dom";

//regex min max validaciones
//optional indica que no tiene validaciones
// hidden lo desaparece del dom
//validations son las validaciones

export const DatosGenerales = ({ next, previous }) => {
  let { declaracion } = useParams();
  declaracion = parseInt(declaracion);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [activeRegimen, setActiveReginen] = useState(true);
  const [errorActive, setActiveError] = useState(false);
  const [valor, setValor] = useState(true);
  const getData = (data) => {
    if (data.situacion == 2) {
      setActiveReginen(false);
      setActiveError(false);
    } else {
      setActiveReginen(true);
      setActiveError(true);
    }
    // else{
    //   setValor(true);
    // }
  };

  useEffect(() => {}, []);
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
            Los datos que no serán públicos estarán resaltados de color verde
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            <Grid container spacing={2}>
              <Formulario
                // submit= {}
                getData={getData}
                action={""}
                submit={next}
                // post={""}
                // put={""}
                // get={""}
                textButton={"Registrar"}
                title={"Declaración de situación patrimonial - Inicial"}
              >
                <Text
                  col={12}
                  name="nombre"
                  label={"Nombre(s)"}
                  helperText={
                    "Sin abreviaturas, sin acentos, ni signos especiales"
                  }
                  optional={true}
                />
                <Text
                  col={12}
                  name="apellido"
                  label={"Primer apellido"}
                  helperText={
                    "Sin abreviaturas, sin acentos, ni signos especiales"
                  }
                  optional={true}
                />
                <Text
                  col={12}
                  name="segundo"
                  label={"Segundo apellido"}
                  helperText={`Si se tiene un solo apellido debera colocarse en el espacio de "Primer apellido" y dejar el espacio 
            "Segundo apellido" en blanco. Sin abreviaturas, sin acentos, ni signos especiales`}
                  optional={true}
                />
                <Curp
                  col={12}
                  name="curp"
                  label={"CURP (Clave Única de Registro de Población)"}
                  optional={true}
                />
                <Rfc
                  col={12}
                  name="rfc"
                  label={"RFC (Registro Federal de Contribuyentes)"}
                  optional={true}
                />
                <Text
                  col={12}
                  name="homoclave"
                  label={"Homoclave"}
                  optional={true}
                />

                <Email
                  col={12}
                  name="email"
                  label={"Correo electrónico institucional"}
                  helperText={
                    "En caso de no contar con correo institucional ingresar el correo personal."
                  }
                  optional={true}
                />
                <Email
                  col={12}
                  name="alterno"
                  label={"Correo electrónico personal/alterno"}
                  helperText={
                    "Es importante considerar que en la cuenta que proporcione le será enviada la declaración patrimonial y de interés que haya presentado y el acuse"
                  }
                  optional={true}
                />
                <Text
                  col={12}
                  name="number"
                  label={"Número telefónico de casa"}
                  helperText={
                    "En caso de no contar con teléfono de casa, ingresar número de celular."
                  }
                  optional={true}
                />
                <Phone
                  col={12}
                  name="phone"
                  label={"Número celular personal"}
                  optional={true}
                />
                <AutoComplete
                  col={12}
                  label="Situación personal / Estado civil"
                  name="situacion"
                  loading={false}
                  // onChange={handleMovieChange}
                  options={estadoCivil}
                  optional={true}
                />
                <AutoComplete
                  col={12}
                  label="Régimen matrimonial"
                  name="regimen"
                  loading={activeRegimen}
                  optional={true}
                  // optional={activeRegimen}
                  helperText={
                    errorActive && "la situacion patrimonial es requerida"
                  }
                  // onChange={handleMovieChange}
                  options={Regimenes}
                />
                <AutoComplete
                  col={12}
                  label="País de nacimiento"
                  name="pais"
                  optional={true}
                  // onChange={handleMovieChange}
                  options={Paises}
                />
                <AutoComplete
                  col={12}
                  label="Nacionalidad"
                  name="nacionalidad"
                  optional={true}
                  // onChange={handleMovieChange}
                  options={Nacionalidad}
                />
                <TextArea
                  placeholder={"Otros motivos"}
                  col={12}
                  rows={10}
                  name="aclaraciones"
                  optional={true}
                  color="green"
                  label={"Aclaraciones/Observaciones"}
                />
                <CustomRadio
                  rowLayout={true}
                  title={
                    "¿Te desempeñaste como servidor publico el año inmediato anterior?"
                  }
                  message={"Es requerido que seleccione una opción"}
                  hidden={declaracion == 2 ? false : true}
                  col={5}
                  name="radio"
                  label={"radio"}
                  data={["Si", "No"]}
                  optional={true}
                />
              </Formulario>
            </Grid>
          </Typography>
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
        hidden={true}
        optional
        value={valor}
        validations={{
          max:12,
          min:4,
        }}
      /> */}
      {/* <Text col={5} name="d" label={"d"}  loading={valor}/>
        <Number col={3} label={"carlos"} name="carlos" value={100} loading={true} />
        <Phone col={5} label="telefono" name="phone" hidden={valor}/> */}
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
