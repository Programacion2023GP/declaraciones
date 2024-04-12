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
import { PostAxios } from "../../../services/services";

export const DependientesEconomicos = ({ next, previous, title }) => {
   let { declaracion } = useParams();
   const [save, setSave] = useState(true);
   const [idRow, setIdRow] = useState(null);
   const dataForm = useSelector((state) => state.DependientesEconomicos.initialState);
   const validations = useSelector((state) => state.DependientesEconomicos.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [domicilioDeclarante, setDomicilioDeclarante] = useState(false);
   const dispatch = useDispatch();
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [idUnique, setIdUnique] = useState(1);
   const [parentescos, setParentescos] = useState([]);
   const [checked, setChecked] = useState(true);
   const [reinilaize, setRenalize] = useState(1);
   const datasRedux = useSelector((state) => state.DependientesEconomicos.datas);

   const submit = async (values, { resetForm }) => {
      values.id = idUnique;
      dispatch(addDatosDependiente(values));
      adDataTable(values);
   };

   const sendData = async () => {
      if (datasTable.length > 0) {
         try {
            const newDatas = datasRedux.map((item) => {
               const newItem = { ...item };
               delete newItem.id;
               return newItem;
            });

            const response = await PostAxios("/dependienteseconomicos/create", newDatas);
            dispatch(clearData());
            setDatasTable([]);
            next();
            Success(response.data.message);

            return response.data;
         } catch (error) {
            if (error.response?.data?.data?.message) {
               Error(error.response.data.data.message);
            } else {
               console.error("error", error);
               Error("NO EXISTE CONEXION A LA DB");
            }
            dispatch(clearData());
            setDatasTable([]);
         }
      } else {
         dispatch(clearData());
         setDatasTable([]);
         next();

         Success("Continuemos llenando los formularios");

      }
   };
   const adDataTable = (values) => {
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
      setRenalize(reinilaize + 1);
   };
   const handleGetValue = (name, value) => {
      if (name == "HabitaDomicilioDeclarante" && value == 0) {
         setDomicilioDeclarante(true);
         dispatch(configValidationsDependiente({ tipo: "DomicilioDeclarante" }));
         dispatch(configValidationsDependiente("DomicilioDeclarante"));
      } else if (name == "HabitaDomicilioDeclarante") {
         dispatch(configValidationsDependiente({ tipo: "DomicilioDeclaranteNULL" }));
         setDomicilioDeclarante(false);
      }
   };
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };setValidationSchema
   const edit = (row) => {
      const item = datasRedux.filter((item) => item.id == row.id);
      handleChange("HabitaDomicilioDeclarante", item.HabitaDomicilioDeclarante);
   };
   const deleteRow = (row) => {
      dispatch(deleteDatosDependiente({ id: row.id }));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.DependientesEconomicos.validationSchema), datasRedux]);
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable
               headers={["Parentesco o relación con el declarante", "RFC", "Empleo, cargo o comisión"]}
               dataHidden={["id"]}
               data={datasTable}
               // handleEdit={edit}
               // editButton={true}
               deleteButton={true}
               handleDelete={deleteRow}
            />
         </Box>
         <br />
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿Deseas seguir agregando dependientes economicos?" : "¿Tiene dependientes economicos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikDependientes key={reinilaize} validationSchema={validationSchema} initialValues={dataForm} submit={submit} title={title}>
               <InitialValuesFormik handleGetValue={handleGetValue} getParentescos={setParentescos} />
               <Ngif condition={domicilioDeclarante}>
                  <DomicilioDeclarante />
               </Ngif>
               <Sectores validations={validations} />
            </FormikDependientes>
         </Ngif>
         <Ngif condition={!checked}>
            <Button type="submit" variant="contained" color="primary" onClick={sendData}>
               Continuar
            </Button>
         </Ngif>
      </>
   );
};
