import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { FormikDependientes } from "./components/FormikDependientes";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import DataTable from "../../Reusables/table/DataTable";
import { InitialValuesFormik } from "./components/InitialValuesFormik";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { DomicilioDeclarante } from "./components/DomicilioDeclarante";
import { Sectores } from "./components/Sectores";
import { addDatosDependiente, clearData, configValidationsDependiente, deleteDatosDependiente } from "../../../redux/DependientesEconomicos7/DependientesEconomicos";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Success } from "../../../toasts/toast";
import { Post } from "../funciones/post";
import { FormikForm } from "../../Reusables/formik/FormikForm";

export const DependientesEconomicos = ({ loading, data, next, previous, title }) => {
   let { declaracion } = useParams();
   const [save, setSave] = useState(true);
   const [idRow, setIdRow] = useState(null);
   const dataForm = useSelector((state) => state.DependientesEconomicos.initialState);
   const validations = useSelector((state) => state.DependientesEconomicos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [domicilioDeclarante, setDomicilioDeclarante] = useState(true);
   const dispatch = useDispatch();
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [parentescos, setParentescos] = useState([]);
   const [checked, setChecked] = useState(false);
   const [reinilaize, setRenalize] = useState(1);
   const datasRedux = useSelector((state) => state.DependientesEconomicos.datas);
   const [update, setUpdate] = useState(loading);
   const formik = useRef();
   const [loadData, setLoadData] = useState(data);

   const submit = async (values, { resetForm }) => {
      formik.current.resetForm();
      setChecked(false);

      values.id = idUnique;
      setDatas(datas.concat(values));
      // dispatch(addDatosDependiente(values));
      adDataTable(values);
      Success("se agrego a la tabla");
   };
   useEffect(() => {
      const init = async () => {
         const relacionData = await GetAxios("relacioncondeclarante/show");
         setParentescos(relacionData);
         // getParentescos(relacionData);
      };
      init();
   }, []);
   useEffect(() => {
      console.log("data", parentescos);
      if (parentescos.length > 0) {
         if (typeof data !== "undefined" && Array.isArray(loadData) && loadData.length > 0) {
            let newDatasArray = [];
            let newDataTableArray = [];

            loadData.forEach((values, index) => {
               delete values.Id_DatosDependienteEconomico;
               const modifiedData = addDataTableModified(values, index);
               newDatasArray.push(modifiedData.newData);
               newDataTableArray.push(modifiedData.newDataTable);
            });

            setDatas(newDatasArray);
            setDatasTable(newDataTableArray);
         }
      }
   }, [data, parentescos]);

   const addDataTableModified = (values, index) => {
      values.id = index;

      const parentesco = parentescos.find((item) => item.id === parseInt(values.Id_ParentescoRelacion))?.text;
      const newData = {
         ...values,
         id: index
      };

      const newDataTable = {
         id: index,
         Parentesco: parentesco,
         RFC: values.RfcDependiente,
         Empleo: values.EmpleoCargoComision
      };

      setIdUnique(index + 1);

      return { newData, newDataTable };
   };

   const sendDatass = async () => {
      const newDatas = [...datas];
      const url = `dependienteseconomicos/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
      if (newDatas.length > 0) {
         try {
            const sendApi = async () => {
               for (let i = 0; i < newDatas.length; i++) {
                  dispatch(addDatosDependiente(newDatas[i]));
                  // delete newDatas[i].identificador;
               }
               await Post(url, newDatas, next);
            };
            await sendApi();

            // dispatch(clearData());
            // setDatasTable([]);
            // next();
         } catch (error) {
            if (error.response?.data?.message) {
               Error(error.response.data.message);
            } else {
               console.error("error", error);
               Error("Ocurrio un error");
            }
            // dispatch(clearData());
            // setDatasTable([]);
         }
      } else {
         try {
            const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${7}/1`);
            Success(response.data.message);
            dispatch(clearData());
            setDatasTable([]);
            next();
            Success("Continuemos llenando los formularios");
         } catch (error) {
            Error(error.response.data.message);
         }
      }
   };
   const adDataTable = (values) => {
      // addDataTableModified(values,idUnique)
      const parentesco = parentescos.find((item) => item.id === values.Id_ParentescoRelacion)?.text;
      const newDatasVisuales = [
         ...datasTable,
         {
            id: idUnique,
            Parentesco: parentesco,
            RFC: values.RfcDependiente,
            Empleo: values.EmpleoCargoComision
         }
      ];
      setDatasTable(newDatasVisuales);
      setIdUnique(idUnique + 1);
      // setRenalize(reinilaize + 1);
   };
   const handleGetValue = (name, value) => {
      // console.log("aquiiiiiiiiii");
      if (name == "HabitaDomicilioDeclarante" && value == 0) {
         setDomicilioDeclarante(true);
         dispatch(configValidationsDependiente({ tipo: "DomicilioDeclarante" }));
         // dispatch(configValidationsDependiente("DomicilioDeclarante"));
      } else if (name == "HabitaDomicilioDeclarante" && value == 1) {
         dispatch(configValidationsDependiente({ tipo: "DomicilioDeclaranteNULL" }));
         setDomicilioDeclarante(false);
      }
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const edit = (row) => {
      const item = datasRedux.filter((item) => item.id == row.id);

      handleChange("HabitaDomicilioDeclarante", item.HabitaDomicilioDeclarante);
   };
   const deleteRow = (row) => {
      // dispatch(deleteDatosDependiente({ id: row.id }));
      setDatas(datas.filter((item) => item.id != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DependientesEconomicos.validationSchema), datasRedux]);

   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  headers={["Parentesco o relación con el declarante", "RFC", "Empleo, cargo o comisión"]}
                  dataHidden={["id"]}
                  data={datasTable}
                  // loading={loading && datas.length > 0}
                  // handleEdit={edit}
                  // editButton={true}
                  deleteButton={true}
                  handleDelete={deleteRow}
               />
            </Card>
         </Box>
         <br />
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando dependientes economicos?" : "¿Tiene dependientes economicos?"}
            />
         </FormGroup>
         {/* key={"Formik"}
               ref={formik}
               submit={submit}
               initialValues={dataForm}
               validationSchema={validationSchema}
               title={title}
               message={message}
               button={false} */}
         <Ngif condition={checked}>
            <FormikForm
               ref={formik}
               previousButton
               handlePrevious={previous}
               messageButton={"Agregar a la tabla"}
               // key={reinilaize}
               validationSchema={validationSchema}
               initialValues={dataForm}
               submit={submit}
               title={title}
               button={true}
            >
               <InitialValuesFormik handleGetValue={handleGetValue} />
               <Ngif condition={domicilioDeclarante}>
                  <DomicilioDeclarante />
               </Ngif>
               <Sectores validations={validations} />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginRight: "1rem", marginTop: "1rem" }} type="button" onClick={previous} variant="text" color="inherit">
               Regresar a la pagina anterior
            </Button>
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatass}>
               {loading ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
