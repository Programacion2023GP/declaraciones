import { useEffect, useRef, useState } from "react";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../Reusables/request/Request";
import * as Yup from "yup";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { VehiculoComponent } from "./components/VehiculoComponent";
import { ComponentStepper } from "../../Reusables/componentstepper/ComponentStepper";
import { useParams } from "react-router-dom";
import { Adquisicion } from "./components/Adquisicion";
import DataTable from "../../Reusables/table/DataTable";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";
import { addVehiculo } from "../../../redux/VehiculosHoja11/VehiculosHoja11";
import { Axios } from "../../../services/services";

export const TipoVehiculo = ({ loading, data, next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.Vehiculos.initialState);
   const validations = useSelector((state) => state.Vehiculos.validationSchema);
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdunique] = useState(0);
   const [dataTable, setDataTable] = useState([]);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [otroVehiculo, setOtroVehiculo] = useState(true);
   const [titularVehiculo, seTitularVehiculo] = useState(0);
   const dispatch = useDispatch();
   const formik = useRef(null);
   let { declaracion } = useParams();
   declaracion = parseInt(declaracion);
   const { vehiculos, titularVehiculos, adquisicion, pago, monedas, motivobaja, relacion } = Request({
      peticiones: ["vehiculos", "titularVehiculos", "adquisicion", "pago", "monedas", "motivobaja", "relacion"]
   });
   const [postStepper, setPostStepper] = useState(false);
   const [otroMotivoBaja, SetMotivoBaja] = useState(true);
   const [checked, setChecked] = useState(true);
   const [update, setUpdate] = useState(loading);

   const message = ` Todos los datos de Vehículos declarados a nombre de la pareja, dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos. `;
   const submit = async (values) => {
      setPostStepper(!postStepper);
      values.identificador = idUnique;
      setDatas(datas.concat(values));
      const json = {
         identificador: values.identificador,
         "Tipo de Vehículo": values.Id_TipoVehiculo != 4 ? vehiculos.filter((item) => item.id === values.Id_TipoVehiculo)[0]?.text : values.EspecifiqueVehiculo,
         "Forma de Adquisición": adquisicion.filter((item) => item.id === values.Id_FormaAdquisicion)[0]?.text,
         "Forma de Pago": pago.filter((item) => item.id === values.Id_FormaPago)[0]?.text
      };
      setDataTable(dataTable.concat(json));
      setIdunique(idUnique + 1);
      Success("Se agrego a la tabla");

      formik.current.resetForm();
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.Vehiculos.validationSchema), useSelector((state) => state.Vehiculos.initialState), useSelector((state) => state.Vehiculos.datas)]);
   useEffect(() => {
      if (vehiculos.length > 0 && adquisicion.length > 0 && pago.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            setDatas([]);
            setDataTable([]);
            // setUpdate(true);
            data.forEach((values, index) => {
               delete values.Id_Vehiculos;
               addDataTableModified(values, index);
            });
            // modifiedDataEmpleosCargos();
         }
      }
   }, [data, vehiculos, adquisicion, pago]);
   const addDataTableModified = (values, index) => {
      values.identificador = index;
      const newDatas = [...datas, values];

      const newData = {
         identificador: index,
         "Tipo de Vehículo":
            values.Id_TipoVehiculo != 4 ? vehiculos.filter((item) => item.id === parseInt(values.Id_TipoVehiculo))[0]?.text : values.EspecifiqueVehiculo,
         "Forma de Adquisición": adquisicion.filter((item) => item.id === parseInt(values.Id_FormaAdquisicion))[0]?.text,
         "Forma de Pago": pago.filter((item) => item.id === parseInt(values.Id_FormaPago))[0]?.text
      };

      setDataTable((prevDatasTable) => prevDatasTable.concat(newData));
      setDatas((prevDatas) => prevDatas.concat(newDatas));
      setIdunique(index + 1);
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
   const yearOptions = generateYearOptions();
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDataTable(dataTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };

   // Obtener el array de años
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const sendData = async () => {
      if (datas.length > 0) {
         const newDatas = [...datas];
         const url = `vehiculos/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;

         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               dispatch(addVehiculo(newDatas[i]));
               // delete newDatas[i].identificador;
            }
            await Post(url, newDatas, next);
         };
         await sendApi();
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${11}/1`);
            Success(response.data.data.message);

            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
      // next();
      // setSend(true);

      // newDatas.forEach(element => {

      // });

      // next()
   };

   const steps = [
      {
         label: "Tipo de vehiculo",
         component: (
            <VehiculoComponent
               validations={validations}
               seTitularVehiculo={seTitularVehiculo}
               titularVehiculo={titularVehiculo}
               otroVehiculo={otroVehiculo}
               setOtroVehiculo={setOtroVehiculo}
               vehiculos={vehiculos}
               titularVehiculos={titularVehiculos}
               yearOptions={yearOptions}
               relacion={relacion}
            />
         )
      },
      {
         label: "Forma de adquisicion",
         component: (
            <Adquisicion
               monedas={monedas}
               adquisicion={adquisicion}
               pago={pago}
               motivobaja={motivobaja}
               otroMotivoBaja={otroMotivoBaja}
               SetMotivoBaja={SetMotivoBaja}
            />
         )
      }
   ];
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  // loading={loading && datas.length > 0}
                  dataHidden={["identificador"]}
                  data={dataTable}
                  headers={["Tipo de Vehículo", "Forma de Adquisición", "Forma de Pago"]}
                  deleteButton={true}
                  handleDelete={deleteRow}
               />
            </Card>
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={dataTable.length > 0 ? "secondary" : "primary"} />}
               label={dataTable.length > 0 ? "¿Deseas seguir agregando vehiculos?" : "¿Tiene vehiculo?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm
               ref={formik}
               submit={submit}
               previousButton={true}
               handlePrevious={previous}
               initialValues={dataForm}
               validationSchema={validationSchema}
               title={title}
               message={message}
               button={false}
            >
               <ComponentStepper postStepper={postStepper} steps={steps} buttonContinue={"Continuar"} endButton={"agregar a la tabla"} buttonAfter={"regresar"} />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "2rem" }} onClick={sendData} type="submit" variant="contained" color="primary">
               {loading ? "Actualizar y Continuar" : datas.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};


