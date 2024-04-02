import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import * as Yup from "yup";
import { Formik } from "formik";
import { Text } from "../../Reusables/input/Input";
import DatePickerComponent from "../../Reusables/datepicker/DatePickerComponent";
import { useDispatch, useSelector } from "react-redux";
import { addDatosPareja, configValidations, validationDatosPareja } from "../../../redux/DatosParejaHoja6/DatosPareja";
import { useEffect, useRef, useState } from "react";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { GetAxios } from "../../../services/services";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Ngif } from "../../Reusables/conditionals/Ngif";

export const DatosParejas = ({ next, previous, title, debugerClear }) => {
   const dataForm = useSelector((state) => state.DatosPareja.initialState);
   const validations = useSelector((state) => state.DatosPareja.validationSchema);

   const formik = useRef(null);
   const dispatch = useDispatch();
   const submit = async (values, { resetForm }) => {
      console.log("INNNNNNNNNNNNNNNNNNNNNNNNSERTTTTTTTTTTTTTTTT");
      dispatch(addDatosPareja(values));
   };
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [relacionDeclarante, setRelacionDeclarante] = useState([]);
   const [domicilioPareja, setDomicilioPareja] = useState(false);
   const [mexico, setMexico] = useState(false);
   const [start, setStart] = useState(true);
   const [entidades, setEntidades] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [paises, setPaises] = useState([]);
   const [activeMunicipios, setActiveMunicipios] = useState(true);
   const [loadingMuncipios, setLoadingMunicipios] = useState(false);
   const [ambitoTrabajo, setAmbitoTrabajo] = useState(1);
   const [sectores, setSectores] = useState([]);
   const [monedas, setMonedas] = useState([]);
   const [ambitosPublicos, setAmbitosPublicos] = useState([]);
   const [nivelGobierno, setNivelGobiernos] = useState([]);

   useEffect(() => {
      const init = async () => {
         setRelacionDeclarante(await GetAxios("/relacioncondeclarante/show"));
         setEntidades(await GetAxios("/entidades/show"));
         setPaises(await GetAxios("/paises/show"));
         setSectores(await GetAxios("/sectores/show"));
         setMonedas(await GetAxios("/monedas/show"));
         setAmbitosPublicos(await GetAxios("/ambitospublicos/show"));
         setNivelGobiernos(await GetAxios("/nivelordengobierno/show"));

         setStart(false);
      };
      if (start) {
         init();
      }

      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DatosPareja.validationSchema)]);
   const handleGetValue = async (name, value) => {
      if (name == "HabitaDomicilioDeclarante" && value == 0) {
         setDomicilioPareja(true);
         dispatch(configValidations("DomicilioDeclarante"));
      } else if (name == "HabitaDomicilioDeclarante") {
         dispatch(configValidations("DomicilioDeclaranteNULL"));

         setDomicilioPareja(false);
      }
      if (name == "EsEnMexico" && value == 1) {
         setMexico(true);
         dispatch(configValidations("Mexico"));
      } else if (name == "EsEnMexico") {
         dispatch(configValidations("NoesMexico"));
         setMexico(false);
      }
      if (name == "Id_EntidadFederativa") {
         setActiveMunicipios(false);
         setLoadingMunicipios(true);
         setMunicipios(await GetAxios(`municipios/show/${value}`));
         setLoadingMunicipios(false);
      }
      if (name == "Id_ActividadLaboral") {
         switch (value) {
            case 1:
               setAmbitoTrabajo(1);
               break;
            case 2:
               setAmbitoTrabajo(2);
               break;
            case 3:
               setAmbitoTrabajo(3);
               break;
            case 4:
               setAmbitoTrabajo(4);
               break;
         }
      }
   };
   return (
      <>
         <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }} TouchRippleProps={{ disabled: true }}>
            <CardContent>
               <Typography variant="h3" align="center" color="textPrimary" style={{ fontWeight: "500" }}>
                  {title}
               </Typography>
               <Typography variant="h6" align="start" color="textPrimary" style={{ fontWeight: "500" }}>
                  Los datos que no serán públicos estarán resaltados de color
                  <span style={{ color: "green" }}>verde</span>
               </Typography>
               <br />
               <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={2}></Grid>
               </Typography>
               <Formik innerRef={formik} initialValues={dataForm} validationSchema={validationSchema} onSubmit={submit}>
                  {({ values, handleSubmit, handleChange, errors, touched, handleBlur, setFieldValue, setValues }) => {
                     {
                     }
                     return (
                        <Box component={"form"} onSubmit={handleSubmit}>
                           <Text col={12} name="Nombre" label="Nombre (s)" placeholder="Sin abreviaturas, sin acentos, ni signos especiales." color={"green"} />
                           <Text
                              col={12}
                              name="PrimerApellido"
                              label="Primer apellido"
                              placeholder="Sin abreviaturas, sin acentos, ni signos especiales. "
                              color={"green"}
                           />
                           <Text
                              col={12}
                              name="SegundoApellido"
                              label="Segundo apellido"
                              placeholder={`
                              Si se tiene un sólo apellido deberá colocarse en el espacio del “primer apellido” y dejar el espacio del “segundo apellido” 
                              en blanco. Sin abreviaturas, sin acentos, ni signos especiales.`}
                              color={"green"}
                           />
                           <DatePickerComponent
                              idName={"FechaNacimiento"}
                              label={"Fecha de nacimiento"}
                              format={"DD/MM/YYYY"}
                              setFieldValue={setFieldValue}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              //   value={values.FechaEngreso}
                              //   error={errors.FechaEngreso}
                              //   touched={touched.FechaEngreso}
                              showErrorInput={null}
                           />
                           <Text col={12} name="RfcPareja" label="RFC" color={"green"} />
                           <Text col={12} name="Curp" label="Curp" color={"green"} />
                           <Text col={12} name="Homoclave" label="Homoclave" color={"green"} />

                           {/* <Text col={12} name="Homoclave" label="Homoclave" color={"green"} />
                           <Text col={12} name="curp" label="Curp" color={"green"} /> */}
                           <AutoComplete col={12} label="Relación con el declarante" name="Id_RelacionDeclarante" options={relacionDeclarante} />
                           <CustomRadio
                              col={12}
                              name="EsCiudadanoExtranjero"
                              title="¿Es ciudadano extranjero?"
                              options={[
                                 { value: 1, label: "Si" },
                                 { value: 0, label: "No" }
                              ]} // Opciones para los radio buttons
                           />
                           <CustomRadio
                              col={12}
                              name="EsDependienteEconomico"
                              title="¿Es dependiente económico?"
                              options={[
                                 { value: 1, label: "Si" },
                                 { value: 0, label: "No" }
                              ]}
                           />

                           <CustomRadio
                              col={12}
                              name="HabitaDomicilioDeclarante"
                              title="¿Habita en el domicilio del declarante?"
                              options={[
                                 { value: 1, label: "Si" },
                                 { value: 0, label: "No" }
                              ]}
                              handleGetValue={handleGetValue}
                           />
                           <Ngif condition={domicilioPareja}>
                              <CustomRadio
                                 hidden={false}
                                 col={12}
                                 name="EsEnMexico" // Nombre del campo en el formulario
                                 title="¿Es de México?"
                                 options={[
                                    { value: 1, label: "Si" },
                                    { value: 0, label: "No" }
                                 ]} // Opciones para los radio buttons
                                 handleGetValue={handleGetValue}
                              />
                              <Text
                                 col={12}
                                 name="Calle"
                                 label="Calle"
                                 color={"green"}
                                 // Otras props opcionales como color, mask, etc., si es necesario
                              />
                              <Text col={12} name="NumeroExterior" label="Número Exterior" type={"number"} color={"green"} />
                              <Text col={12} name="NumeroInterior" label="Número Interior" type={"number"} color={"green"} />
                              <Text col={12} name="CodigoPostal" label="Código Postal" type={"number"} color={"green"} />
                              <AutoComplete
                                 hidden={mexico}
                                 col={12}
                                 label="Entidad Federativa"
                                 name="Id_EntidadFederativa"
                                 options={entidades}
                                 color="green"
                                 handleGetValue={handleGetValue}
                              />
                              <AutoComplete
                                 hidden={mexico}
                                 disabled={activeMunicipios}
                                 loading={loadingMuncipios}
                                 col={12}
                                 otro={23}
                                 label="Municipio / Alcaldía"
                                 name="Id_MunicipioAlcaldia"
                                 options={municipios}
                                 color="green"
                                 // getValue={getValue}
                              />
                              <AutoComplete hidden={!mexico} col={12} label="Pais de nacimiento" name="Id_Pais" options={paises} color="green" />
                              <Text hidden={!mexico} col={12} name="EstadoProvincia" label="Estado / Provincia" type={"number"} color={"green"} />

                              <Text col={12} name="ColoniaLocalidad" label="Colonia / Localidad" color={"green"} />
                              <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />
                           </Ngif>
                           <CustomRadio
                              hidden={false}
                              col={12}
                              name="Id_ActividadLaboral" // Nombre del campo en el formulario
                              title="Actividad laboral de la pareja"
                              options={[
                                 { value: 1, label: "Privado" },
                                 { value: 2, label: "Público" },
                                 { value: 3, label: "Ninguno" },
                                 { value: 4, label: "Otro" }
                              ]} // Opciones para los radio buttons
                              handleGetValue={handleGetValue}
                           />
                           <Ngif condition={ambitoTrabajo == 1 || ambitoTrabajo == 4}>
                              <Text col={12} name="NombreEmpresaSociedadAsociacion" label="Nombre de la empresa, sociedad o asociación" color={"green"} />
                              <Text col={12} name="RfcEmpresa" label="RFC (empresa)" color={"green"} />
                              <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" color={"green"} />
                              <AutoComplete col={12} label="Sector al que pertenece" name="Id_Sector" options={sectores} color="green" />
                              <DatePickerComponent
                                 idName={"FechaIngreso"}
                                 label={"Fecha de ingreso"}
                                 format={"DD/MM/YYYY"}
                                 // value={values.FechaIngreso}
                                 setFieldValue={setFieldValue}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors.FechaIngreso}
                                 touched={touched.FechaIngreso}
                                 showErrorInput={null}
                              />
                            
                              <CustomRadio
                                 hidden={false}
                                 col={12}
                                 name="EsProveedorContratistaGobierno" // Nombre del campo en el formulario
                                 title="¿Es proveedor o contratista del gobierno?"
                                 options={[
                                    { value: 1, label: "Si" },
                                    { value: 0, label: "No" }
                                 ]} // Opciones para los radio buttons
                              />
                           </Ngif>
                           <Ngif condition={ambitoTrabajo == 2}>
                              <AutoComplete col={12} label="Nivel / orden de gobierno" name="Id_NivelOrdenGobierno" options={nivelGobierno} color="green" />
                              <AutoComplete col={12} label="Ámbito público" name="Id_AmbitoPublico" options={ambitosPublicos} color="green" />
                              <Text col={12} name="NombreEntePublico" label="Nombre del ente público" color={"green"} />
                              <Text col={12} name="AreaAdscripcion" label="Área de adscripción" color={"green"} />
                              <Text col={12} name="EmpleoCargoComision" label="Empleo, cargo o comisión" color={"green"} />
                              <Text col={12} name="FuncionPrincipal" label="Especifique función principal" color={"green"} />
                              <DatePickerComponent
                                 idName={"FechaIngreso"}
                                 label={"Fecha de ingreso"}
                                 format={"DD/MM/YYYY"}
                                 // value={values.FechaIngreso}
                                 setFieldValue={setFieldValue}
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 error={errors.FechaIngreso}
                                 touched={touched.FechaIngreso}
                                 showErrorInput={null}
                              />
                            
                           </Ngif>
                           <Ngif condition={ambitoTrabajo == 1 || ambitoTrabajo == 2 || ambitoTrabajo == 4}>
                              <Text
                                 col={12}
                                 type={"number"}
                                 name="ValorSalarioMensualNeto"
                                 label="Salario mensual neto"
                                 color={"green"}
                                 placeholder={"No debe llevar centavos"}
                              />
                              <AutoComplete col={12} label="Moneda" name="Id_MonedaSalarioMensualNeto" options={monedas} color="green" />
                           </Ngif>

                           <Text col={12} name="Aclaraciones" label="Aclaraciones/Observaciones" rows={10} color={"green"} />

                           <Button type="submit" variant="contained" color="primary">
                              Registrar y Continuar
                           </Button>
                        </Box>
                     );
                  }}
               </Formik>
               <button variant="contained" color="secondary" onClick={next}>
                  CONTINUAR DESAROLLO DE PAGINA
               </button>
            </CardContent>
         </Card>
      </>
   );
};
