import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../Reusables/request/Request";
import { useParams } from "react-router-dom";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import * as Yup from "yup";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Text } from "../../Reusables/input/Input";
import { DomicilioDeclarante } from "./components/DomicilioDeclarante";
import { Box, Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { addInmueblesPrestamos, addOtroPrestamo, addPrestamos, addVehiculosPrestamos, eliminarOtroPrestamo } from "../../../redux/PrestamoComodatoHoja15/PrestamoComodatoHoja15";
import DataTable from "../../Reusables/table/DataTable";
import { Success } from "../../../toasts/toast";
import { Post } from "../funciones/post";

export const PrestamosComodatos = ({ title, previous, next, setSend }) => {
   const validations = useSelector((state) => state.PrestamoComodato.validationSchema);
   const dataForm = useSelector((state) => state.PrestamoComodato.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formik = useRef(null);
   const [checked, setChecked] = useState(true);
   const { vehiculos, inmuebles, relacion } = Request();
   const [datasTable, setDatasTable] = useState([]);
   const [especifiqueOtro, setEspecifiqueOtro] = useState(false);
   const [values, setValues] = useState(null);
   let { declaracion } = useParams();
   const [bien, setBien] = useState(1);
   const message =
      declaracion == 1 || declaracion == 3
         ? "Reportar la situación de prestamo o comodato por terceros a la fecha de ingreso al empleo, cargo o comisión"
         : declaracion == 2 || declaracion == 4
           ? "Reportar la situación de prestamo o comodato por terceros del año inmediato anterior"
           : declaracion == 5 || declaracion == 6
             ? "Reportar la situación de prestamo o comodato por terceros a la fecha de conclusión del empleo, cargo o comisión"
             : "";
   declaracion = parseInt(declaracion);
   useEffect(() => {
      // dispatch(addVehiculosPrestamos())
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.PrestamoComodato.validationSchema), useSelector((state) => state.PrestamoComodato.initialState)]);
   useEffect(() => {}, [formik.current]);

   const submit = async (values) => {
      values.indentificador = idUnique;
      setDatas(datas.concat(values));
      setDatasTable(
         datasTable.concat({
            identificador: values.indentificador,
            "Tipo de bien": values.TipoBien == 0 ? "Inmueble" : "Vehículo",
            "Especificación del bien":
               values.EspecifiqueOtro == ""
                  ? values.TipoBien == 0
                     ? inmuebles.filter((item) => item.id === values.Id_TipoInmueble)[0]?.text
                     : vehiculos.filter((item) => item.id === values.Id_TipoVehiculo)[0]?.text
                  : values.EspecifiqueOtro
         })
      );

      setIdUnique(idUnique + 1);
      Success("Se agrego a la tabla");

      formik.current.resetForm();
   };
   const generateYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const years = [];

      // Añadir 50 años hacia atrás
      for (let i = currentYear - 99; i <= currentYear + 1; i++) {
         years.push({ id: i, text: `${i}` });
      }

      return years;
   };
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDatasTable(datasTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };
   const sendData = async () => {
      const newDatas = [...datas];
      const sendApi = async () => {
         for (let i = 0; i < newDatas.length; i++) {
            dispatch(addPrestamos(newDatas[i]));
            // delete newDatas[i].identificador;

            await Post("/prestamoscomodatos/create", newDatas[i]);
         }
      };
      await sendApi();

      setDatas([]);
      setDatasTable([]);
      // next();
   };
   const yearOptions = generateYearOptions();
   const tipoBien = (name, value) => {
      setBien(value);
      dispatch(value == 1 ? addVehiculosPrestamos() : addInmueblesPrestamos());

      setEspecifiqueOtro(false);
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const otro = (name, value) => {
      setEspecifiqueOtro(name == "Id_TipoInmueble" ? (value == 9 ? true : false) : name == "Id_TipoVehiculo" ? (value == 4 ? true : false) : false);
      dispatch(
         name == "Id_TipoInmueble"
            ? value == 9
               ? addOtroPrestamo()
               : eliminarOtroPrestamo()
            : name == "Id_TipoVehiculo"
              ? value == 4
                 ? addOtroPrestamo()
                 : eliminarOtroPrestamo()
              : eliminarOtroPrestamo()
      );
   };
   return (
      <>
         <Box key={"box"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable
               dataHidden={["identificador"]}
               headers={["Tipo de bien", "Especificación del bien"]}
               data={datasTable}
               handleDelete={deleteRow}
               deleteButton={true}
            />
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando prestamos comodatos?" : "¿Tiene prestamos comodatos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm ref={formik} initialValues={dataForm} validationSchema={validationSchema} submit={submit} title={title} advertence={message}>
               <CustomRadio
                  col={12}
                  title={"Tipo de Bien"}
                  name={"TipoBien"}
                  options={[
                     { value: 0, label: "Inmueble" },
                     { value: 1, label: "Vehículo" }
                     // Agrega más opciones aquí según sea necesario
                  ]}
                  handleGetValue={tipoBien}
               />
               <Ngif condition={bien == 0}>
                  <AutoComplete col={12} name={"Id_TipoInmueble"} label={"Tipo de inmueble"} options={inmuebles} handleGetValue={otro} />
               </Ngif>
               <Ngif condition={bien == 1}>
                  <AutoComplete col={12} name={"Id_TipoVehiculo"} label={"Tipo de vehículo"} options={vehiculos} handleGetValue={otro} />
               </Ngif>
               <Ngif condition={especifiqueOtro}>
                  <Text col={12} name={"EspecifiqueOtro"} label={"Especifique otro"} />
               </Ngif>
               <Ngif condition={bien == 0}>
                  <DomicilioDeclarante />
               </Ngif>
               <Ngif condition={bien == 1}>
                  <Text col={12} name={"Marca"} label={"Marca"} />
                  <Text col={12} name={"Modelo"} label={"Modelo"} />
                  <AutoComplete col={12} name={"Anio"} label={"Año"} options={yearOptions} />
                  <Text col={12} name={"NumeroSerieRegistro"} label={"Numero de serie de registro"} />
                  <CustomRadio
                     col={12}
                     title={"¿Dónde se encuentra registrado?"}
                     name={"Id_TipoDuenoTitular"}
                     options={[
                        { value: 1, label: "Persona Física" },
                        { value: 2, label: "Persona Moral" }

                        // Agrega más opciones aquí según sea necesario
                     ]}
                  />
                  <Text col={12} name={"NombreTitular"} label={"Nombre del dueño o titular"} />
                  <Text col={12} color={"green"} name={"RfcTitular"} label={"RFC"} />
                  <AutoComplete col={12} name={"Id_Relacion"} label={"Relación con el dueño o el Titular"} options={relacion} />
               </Ngif>
               <Text col={12} name={"Aclaraciones"} label={"Aclaraciones/Observaciones"} rows={12} color={"green"} />
               <Button onClick={previous} sx={{ marginTop: "1rem", marginRight: "1rem" }} type="button" variant="contained" color="secondary">
                  Regresar
               </Button>
               <Button sx={{ marginTop: "1rem" }} type="submit" variant="contained" color="primary">
                  Agregar a la tabla
               </Button>
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button onClick={sendData} sx={{ marginTop: "1rem", marginLeft: "1rem" }} type="submit" variant="contained" color="primary">
               {datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
