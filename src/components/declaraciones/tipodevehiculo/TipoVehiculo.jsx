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
import { Box, Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";
import { addVehiculo } from "../../../redux/VehiculosHoja11/VehiculosHoja11";

export const TipoVehiculo = ({ next, previous, title, setSend }) => {
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
   const { vehiculos, titularVehiculos, adquisicion, pago, monedas, motivobaja, relacion } = Request();
   const [postStepper, setPostStepper] = useState(false);
   const [otroMotivoBaja, SetMotivoBaja] = useState(true);
   const [checked, setChecked] = useState(true);

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
      const newDatas = [...datas];
      const sendApi = async () => {
         for (let i = 0; i < newDatas.length; i++) {
            console.log("durante");
            dispatch(addVehiculo(newDatas[i]));
            // delete newDatas[i].identificador;
            await Post("/vehiculos/create", newDatas[i]);
         }
      };
      console.log("antes");
      await sendApi();
      next();
      console.log("final");
      // setSend(true);
      console.log("termino");

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
         <Box key={"box"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable
               dataHidden={["identificador"]}
               data={dataTable}
               headers={["Tipo de Vehículo", "Forma de Adquisición", "Forma de Pago"]}
               deleteButton={true}
               handleDelete={deleteRow}
            />
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
               <ComponentStepper postStepper={postStepper} steps={steps} buttonContinue={"Continuar"} endButton={"finalizar"} buttonAfter={"regresar"} />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button onClick={sendData} type="submit" variant="contained" color="primary">
               {sendData.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
