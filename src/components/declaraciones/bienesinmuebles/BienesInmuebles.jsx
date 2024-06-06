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
   const [checked, setChecked] = useState(true);
   const [sendDatas, setSendDatas] = useState([]);
   const [update, setUpdate] = useState(loading);

   const message = `Todos los datos de Bienes Inmuebles declarados a nombre de la pareja, 
   dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos.`;
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.BienesInmuebles.validationSchema), useSelector((state) => state.BienesInmuebles.initialState)]);
   useEffect(() => {}, []);
   useEffect(() => {
      if (adquisicion.length > 0 && inmuebles.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            setDatas([]);
            setSendDatas([]);
            setUpdate(true);
            data.forEach((values, index) => {
               delete values.Id_BienesInmuebles;
               addDataTableModified(values, index);
            });
         }
      }
   }, [data, inmuebles, adquisicion]);
   const addDataTableModified = (values, index) => {
      values.identificador = index;
      const newDatas = [...sendDatas, values];

      const inmueble = inmuebles.filter((item) => item.id === parseInt(values.Id_TipoInmueble))[0]?.text;
      const adquirir = adquisicion.filter((item) => item.id === parseInt(values.Id_FormaAdquisicion))[0]?.text;
      const tercero = values.T_Id_TipoPersona == 1 ? "Persona Física" : "Persona Moral";
      const newData = {
         identificador: index,
         tipo_inmueble: inmueble,
         "forma adquisicion": adquirir,
         tercero: tercero
      };

      setDatas((prevDatasTable) => prevDatasTable.concat(newData));
      setSendDatas((prevDatas) => prevDatas.concat(newDatas));

      setIdUnique(index + 1);
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
               <DataTable
                  loading={loading && datas.length > 0}
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
            <Button sx={{ ml: 2 }} type="button" variant="contained" onClick={sendData} color="primary">
               {loading?"Actualizar y Continuar":sendDatas.length > 0 ? "Registrar y Continuar" : "Continuar"}

            </Button>
         </Ngif>
      </>
   );
};
