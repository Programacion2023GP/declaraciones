import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { ComponentStepper } from "../../Reusables/componentstepper/ComponentStepper";
import { Request } from "../../Reusables/request/Request";
import { TipoBien } from "./components/TipoBien";
import { FormaAdquisicion } from "./components/FormaAdquisicion";
import DataTable from "../../Reusables/table/DataTable";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Success } from "../../../toasts/toast";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { addValidacionesBienesMuebles } from "../../../redux/BienesMueblesHoja12/BienesMuebles";
import { Post } from "../funciones/post";
import { Axios } from "../../../services/services";

export const BienesMuebles = ({ loading, data, next, previous, title, setSend }) => {
   const dataForm = useSelector((state) => state.BienesMuebles.initialState);
   const validations = useSelector((state) => state.BienesMuebles.validationSchema);
   const [datas, setDatas] = useState([]);
   const [idUnique, setIdunique] = useState(0);
   const [dataTable, setDataTable] = useState([]);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [postStepper, setPostStepper] = useState(false);
   const [checked, setChecked] = useState(true);
   const [update, setUpdate] = useState(loading);

   // actives (activaciones de campos)
   const [tercero, setTercero] = useState(false);
   const [tiposBienes, setTiposBienes] = useState(false);

   const dispatch = useDispatch();
   const formik = useRef(null);
   let { declaracion } = useParams();
   const { titular, tiposbienesmuebles, pago, adquisicion, monedas } = Request({ peticiones: ["titular", "tiposbienesmuebles", "pago", "adquisicion", "monedas"] });
   const submit = async (values) => {
      setPostStepper(!postStepper);
      values.identificador = idUnique;
      setDatas(datas.concat(values));
      setDataTable(
         dataTable.concat({
            identificador: values.identificador,
            "Tipo de bien": tiposbienesmuebles.filter((item) => item.id === values.Id_TipoBien)[0]?.text,
            "Titular del bien": titular.filter((item) => item.id === values.Id_Titular)[0]?.text,
            "Descripción del Bien": values.DescripcionGeneralBien
         })
      );
      setIdunique(idUnique + 1);
      formik.current.resetForm();
      Success("Se agrego a la tabla");
   };
   useEffect(() => {
      if (tiposbienesmuebles.length > 0 && titular.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(data) && data.length > 0) {
            setDatas([]);
            setDataTable([]);
            // setUpdate(true);
            data.forEach((values, index) => {
               delete values.Id_BienesMuebles;
               addDataTableModified(values, index);
            });
         }
      }
   }, [data, tiposbienesmuebles, titular]);

   const addDataTableModified = (values, index) => {
      const valuesCopy = { ...values, identificador: index };

      const newDatas = [...datas, valuesCopy];

      const newData = {
         identificador: index,
         "Tipo de bien": tiposbienesmuebles.filter((item) => item.id === parseInt(values.Id_TipoBien))[0]?.text,
         "Titular del bien": titular.filter((item) => item.id === parseInt(values.Id_Titular))[0]?.text,
         "Descripción del Bien": values.DescripcionGeneralBien
      };

      setDataTable((prevDatasTable) => prevDatasTable.concat(newData));
      setDatas((prevDatas) => prevDatas.concat(newDatas));

      setIdunique(index + 1);
   };
   const sendData = async () => {
      if (datas.length > 0) {
         const newDatas = [...datas];
         const url = `bienesmuebles/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;

         const sendApi = async () => {
            for (let i = 0; i < newDatas.length; i++) {
               dispatch(addValidacionesBienesMuebles(newDatas[i]));
               // delete newDatas[i].identificador;
            }
            await Post(url, newDatas, next);
         };
         await sendApi();

         setDatas([]);
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${12}/1`);
            Success(response.data.data.message);

            next();
         } catch (error) {
            Error(error.response.data.data.message);
         }
      }
      // next();
   };
   const steps = [
      {
         label: "Tipo de bien",
         component: (
            <TipoBien
               tiposBienes={tiposBienes}
               setTiposBienes={setTiposBienes}
               tercero={tercero}
               titular={titular}
               tiposbienesmuebles={tiposbienesmuebles}
               setTercero={setTercero}
            />
         )
      },
      {
         label: "Forma de adquisicion",
         component: <FormaAdquisicion pago={pago} adquisicion={adquisicion} monedas={monedas} />
      }
   ];
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [
      useSelector((state) => state.BienesMuebles.validationSchema),
      useSelector((state) => state.BienesMuebles.initialState),
      useSelector((state) => state.BienesMuebles.datas)
   ]);
   // const errors = () => {
   //    console.log(formik.current.errors);
   // };
   const deleteRow = (row) => {
      setDatas(datas.filter((element) => element.identificador != row.identificador));
      setDataTable(dataTable.filter((element) => element.identificador != row.identificador));
      Success("Se borro de la tabla");
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  dataHidden={["identificador"]}
                  loading={loading && datas.length > 0}
                  headers={["Tipo de Bien", "Titular del Bien", "Descripción del Bien"]}
                  data={dataTable}
                  handleDelete={deleteRow}
                  deleteButton={true}
               />
            </Card>
         </Box>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={dataTable.length > 0 ? "secondary" : "primary"} />}
               label={dataTable.length > 0 ? "¿Deseas seguir agregando bienes muebles?" : "¿Tiene bienes muebles?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm previousButton={true} handlePrevious={previous} ref={formik} initialValues={dataForm} validationSchema={validationSchema} submit={submit}>
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
