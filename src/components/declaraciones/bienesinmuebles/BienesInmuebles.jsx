import { useEffect, useRef, useState } from "react";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/InitialValues";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Request } from "../../Reusables/request/Request";
import DataTable from "../../Reusables/table/DataTable";
import { Box, FormControlLabel, FormGroup, Switch, Button, Card } from "@mui/material";
import { addBienesInmuebles, restartBienesInmuebles, validationBienesInmuebles } from "../../../redux/BienesInmueblesHoja10/BienesInmueblesHoja10";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";
import { Axios } from "../../../services/services";
import Loading from "../../Reusables/loading/Loading";

export const BienesInmuebles = ({ loading, data, next, previous, title, setSend }) => {
   const validations = useSelector((state) => state.BienesInmuebles.validationSchema);
   const dataForm = useSelector((state) => state.BienesInmuebles.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const { inmuebles, titular, relacion, adquisicion, pago, monedas, conforme, motivobaja } = Request({
      peticiones: ["inmuebles", "titular", "relacion", "adquisicion", "pago", "monedas", "conforme", "motivobaja"]
   });
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formik = useRef(null);
   const [postStepper, setPostStepper] = useState(false);
   const [animateSend, setAnimateSend] = useState(false);
   const [animateDelete, setAnimateDelete] = useState(false);
   const [checked, setChecked] = useState(false);
   const [sendDatas, setSendDatas] = useState([]);
   const [update, setUpdate] = useState(loading);
   const [loadData, setLoadData] = useState(data);
   const [loadings, setLoadings] = useState(false);
   const message = `Todos los datos de Bienes Inmuebles declarados a nombre de la pareja, 
   dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos.`;
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.BienesInmuebles.validationSchema), useSelector((state) => state.BienesInmuebles.initialState)]);
   useEffect(() => {}, []);
   useEffect(() => {
      if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
         setLoadings(true);
      }
      if (adquisicion.length > 0 && inmuebles.length > 0) {
         if (typeof loadData !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
            let newDatasArray = [];
            let newSendDatasArray = [];
            loadData.forEach((values, index) => {
               delete values.Id_BienesInmuebles;
               const modifiedData = addDataTableModified(values, index);
               newDatasArray.push(modifiedData.newData);
               newSendDatasArray.push(modifiedData.newSendData);
            });

            setDatas(newDatasArray); // Actualizamos con el array completo
            setSendDatas(newSendDatasArray); // Actualizamos con el array completo
            setLoadings(false);
         }
      }
   }, [data, inmuebles, adquisicion]);

   const addDataTableModified = (values, index) => {
      // Crear una copia del objeto values
      const valuesCopy = { ...values, identificador: index };

      // Obtener los textos correspondientes
      const inmueble = inmuebles.find((item) => item.id === parseInt(values.Id_TipoInmueble))?.text;
      const adquirir = adquisicion.find((item) => item.id === parseInt(values.Id_FormaAdquisicion))?.text;
      const tercero = values.T_Id_TipoPersona === 1 ? "Persona Física" : "Persona Moral";

      // Crear el nuevo objeto de datos visuales
      const newData = {
         identificador: index,
         tipo_inmueble: inmueble,
         "forma adquisicion": adquirir,
         tercero: tercero
      };
      setIdUnique(index + 1);

      // Retornar ambos objetos: uno para visualización y otro para el envío de datos
      return { newData, newSendData: valuesCopy };
   };

   const submit = async (values) => {
      dispatch(validationBienesInmuebles({ tipo: "restart" }));
      setAnimateSend(true);
      values.identificador = idUnique;
      setSendDatas(sendDatas.concat(values));
      const inmueble = inmuebles.filter((item) => item.id === values.Id_TipoInmueble)[0]?.text;
      const adquirir = adquisicion.filter((item) => item.id === values.Id_FormaAdquisicion)[0]?.text;

      const tercero = values.T_Id_TipoPersona == 1 ? "Persona Física" : "Persona Moral";
      setDatas(
         datas.concat({
            identificador: values.identificador,
            tipo_inmueble: inmueble,
            "forma adquisicion": adquirir,
            tercero: tercero
         })
      );
      dispatch(restartBienesInmuebles());
      formik.current.resetForm();

      setPostStepper(!postStepper);
      setIdUnique(idUnique + 1);
      Success("Se agrego a la tabla");
      setTimeout(() => {
         setAnimateSend(false);
      }, 1000);
      // setAnimate(false)
   };
   const sendData = async () => {
      const url = `bienesinmuebles/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;

      if (sendDatas.length > 0) {
         const newDatas = [...sendDatas];

         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               dispatch(addBienesInmuebles(newDatas[i]));
               // delete newDatas[i].identificador;
            }
            await Post(url, newDatas, next);
         };
         await sendApi();
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${10}/1`);
            Success(response.data.data.message);

            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
   };

   const deleteRow = (row) => {
      setAnimateDelete(true);
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setSendDatas(sendDatas.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
      setTimeout(() => {
         setAnimateDelete(false);
      }, 1000);
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               {loadings && <Loading />}
               <DataTable
                  // loading={}
                  dataHidden={["identificador"]}
                  headers={["Tipo de Inmueble", "Forma de Adquisición", "Nombre Tercero"]}
                  data={datas}
                  handleDelete={deleteRow}
                  deleteButton={true}
               />
            </Card>
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datas.length > 0 ? "secondary" : "primary"} />}
               label={datas.length > 0 ? "¿Deseas seguir agregando bienes inmuebles?" : "¿Tiene bienes inmuebles?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm
               previousButton
               handlePrevious={previous}
               key={"Formik"}
               ref={formik}
               submit={submit}
               initialValues={dataForm}
               validationSchema={validationSchema}
               title={title}
               message={message}
               button={false}
            >
               <InitialValues
                  key={"InitialValues"}
                  postStepper={postStepper}
                  inmuebles={inmuebles}
                  titular={titular}
                  relacion={relacion}
                  adquisicion={adquisicion}
                  pago={pago}
                  monedas={monedas}
                  conforme={conforme}
                  motivobaja={motivobaja}
               />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
               Regresar a la pagina anterior
            </Button>
            <Button sx={{ ml: 2 }} type="button" variant="contained" onClick={sendData} color="primary">
               {loading ? "Actualizar y Continuar" : sendDatas.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
