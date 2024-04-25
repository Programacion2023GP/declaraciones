import { useEffect, useRef, useState } from "react";
import Interface from "../../../services/interface";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/InitialValues";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Request } from "../../Reusables/request/Request";
import DataTable from "../../Reusables/table/DataTable";
import { Box, FormControlLabel, FormGroup, Switch, Button } from "@mui/material";
import { addBienesInmuebles, restartBienesInmuebles, validationBienesInmuebles } from "../../../redux/BienesInmueblesHoja10/BienesInmueblesHoja10";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Post } from "../funciones/post";

export const BienesInmuebles = ({ next, previous, title, setSend }) => {
   const validations = useSelector((state) => state.BienesInmuebles.validationSchema);
   const dataForm = useSelector((state) => state.BienesInmuebles.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const { inmuebles, titular, relacion, adquisicion, pago, monedas, conforme, motivobaja } = Request();
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const formik = useRef(null);
   const [postStepper, setPostStepper] = useState(false);
   const [animateSend, setAnimateSend] = useState(false);
   const [animateDelete, setAnimateDelete] = useState(false);
   const [checked, setChecked] = useState(true);
   const [sendDatas, setSendDatas] = useState([]);

   const message = `Todos los datos de Bienes Inmuebles declarados a nombre de la pareja, 
   dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos.`;
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.BienesInmuebles.validationSchema), useSelector((state) => state.BienesInmuebles.initialState)]);
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
      // formik.current.resetForm();

      setPostStepper(!postStepper);
      setIdUnique(idUnique + 1);
      Success("Se agrego a la tabla");
      setTimeout(() => {
         setAnimateSend(false);
      }, 1000);
      // setAnimate(false)
   };
   const sendData = async () => {
      const newDatas = [...sendDatas];
      const sendApi = async () => {
         for (let i = 0; i < newDatas.length; i++) {
            console.log("durante")
            dispatch(addBienesInmuebles(newDatas[i]));
            // delete newDatas[i].identificador;
            await Post("/bienesinmuebles/create", newDatas, next);
         }
      };
      console.log("antes")
      await sendApi();
      console.log("final")
      // setSend(true); 
      console.log("termino")

      // newDatas.forEach(element => {

      // });

      // next()
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
         <Box
            className={`${animateSend ? "animate__animated animate__backInDown" : ""} ${animateDelete ? "animate__animated animate__flash" : ""}`}
            key={"box"}
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
         >
            <DataTable
               key={"DataTable"}
               dataHidden={["identificador"]}
               headers={["Tipo de Inmueble", "Forma de Adquisición", "Nombre Tercero"]}
               data={datas}
               handleDelete={deleteRow}
               deleteButton={true}
            />
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datas.length > 0 ? "secondary" : "primary"} />}
               label={datas.length > 0 ? "¿Deseas seguir agregando bienes inmuebles?" : "¿Tiene bienes inmuebles?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm
               className={animateSend ? "animate__animated animate__backInDown" : ""}
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
               Registrar y Continuar
            </Button>
         </Ngif>
      </>
   );
};
