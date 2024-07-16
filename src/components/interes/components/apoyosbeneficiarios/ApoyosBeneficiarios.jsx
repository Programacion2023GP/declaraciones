import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";
import * as Yup from "yup";
import { Request } from "../../../Reusables/request/Request";
import { AutoComplete } from "../../../Reusables/autocomplete/autocomplete";
import { useRef, useState } from "react";
import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { Error, Success } from "../../../../toasts/toast";
import DataTable from "../../../Reusables/table/DataTable";
import { Axios, PostAxios } from "../../../../services/services";

export const ApoyosBeneficiarios = ({ loading, data, next, previous, title }) => {
   const { relacion, nivelOrdenGobierno,tipoApoyos,formaRecepcion } = Request({ peticiones: ["relacion", "nivelOrdenGobierno",'tipoApoyos','formaRecepcion'] });
   const formik = useRef();
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [checked, setChecked] = useState(true);
   const [idUnique, setIdUnique] = useState(1);
   const [update, setUpdate] = useState(loading);
   const initialValue = {
      Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
      Id_BeneficiarioPrograma: 0,
      NombrePrograma: "",
      InstitucionOtorgante: "",
      Id_NivelOrdenGobierno: 0,
      Id_TipoApoyo: 0,
      Id_FormaRecepcion: 0,
      MontoApoyoMensual: 0,
      Id_MontoApoyoMensual: 0,
      EspecifiqueApoyo: "",
      Aclaraciones: "",
      Id_TipoRelacion: 0,
      Id_MonedaApoyoMensual: 0
      // Aquí se deben agregar los valores iniciales del formulario
      // por ejemplo:
      // nombre: '',
      // apellido: '',
      // //...
   };
   const validationSchema = {};
   const handleChange = (event) => {
    setChecked(event.target.checked);
 };
 const submit = async (values, { resetForm }) => {
    formik.current.resetForm();

    Success("se agrego a la tabla");
    values.id = idUnique;

    setDatas(datas.concat(values));
    // dispatch(addDatosDependiente(values));
    adDataTable(values);
 };
 const adDataTable = (values) => {
    const newDatasVisuales = [
       ...datasTable,
       {
          id: values.id,
          beneficiario: relacion.find((item) => item.id === parseInt(values.Id_BeneficiarioPrograma))?.text,
          "Nombre de Programa":values.NombrePrograma,
          'Nivel u Orden': nivelOrdenGobierno.find((item) => item.id === parseInt(values.Id_NivelOrdenGobierno))?.text,
          "Tipo de apoyo":tipoApoyos.find((item) => item.id === parseInt(values.Id_TipoApoyo))?.text
       }
    ];
    setDatasTable(newDatasVisuales);
    setIdUnique(idUnique + 1);
    setRenalize(reinilaize + 1);
 };
 const sendDatas = async () => {
    const newDatas = [...datas];
    const url = `apoyos/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
    // console.log(newDatas,url);
    if (newDatas.length > 0) {
       try {
          const sendApi = async () => {
             for (let i = 0; i < newDatas.length; i++) {
                //   dispatch(addDatosDependiente(newDatas[i]));
                // delete newDatas[i].identificador;
             }
             const response = await PostAxios(url, newDatas);
             // localStorage.setItem("id_Intereses", response.data.result);
             Success(response.data.message);
             setDatasTable([]);
             setDatas([]);
             next();
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
        const response = await Axios.post(`apartados/interes/${parseInt(localStorage.getItem("id_Intereses"))}/3/1/${parseInt(localStorage.getItem("Id_User"))}`);
        Success("Continuemos llenando los formularios");
          setDatasTable([]);
          next();
       } catch (error) {
        console.log("error", error);
          Error(error.response.data.message);
       }
    }
 };
 const deleteRow = (row) => {
    // dispatch(deleteDatosDependiente({ id: row.id }));
    setDatas(datas.filter((item) => item.id != row.id));
    const itemTable = datasTable.filter((item) => item.id != row.id);
    setDatasTable(itemTable);
    Success("se elimino de la tabla");
 };
   return (
      <>
       <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  headers={["Beneficiario", "Nombre de Programa	", "Nivel u Orden", "Tipo de Apoyo"]}
                  dataHidden={["id"]}
                  data={datasTable}
                  //   data={datasTable}
                  //   loading={loading && datas.length > 0}
                  // handleEdit={edit}
                  // editButton={true}
                  deleteButton={true}
                  handleDelete={deleteRow}
               />
            </Card>
         </Box>
      <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={datasTable.length > 0 ? "secondary" : "primary"} />}
               label={datasTable.length > 0 ? "¿desea seguir agregando mas?" : "¿Tiene apoyos o beneficios públicos?"}
            />
         </FormGroup>
         <Ngif condition={checked}>

         <FormikForm ref={formik} initialValues={initialValue}  submit={submit} button>
            <AutoComplete col={6} name={"Id_BeneficiarioPrograma"} label={`Beneficiario de algún programa publico`} options={relacion} />
            <Text col={6} name={"NombrePrograma"} label={`Nombre del Programa`} />
            <Text col={6} name={"InstitucionOtorgante"} label={`Institución que otorga el apoyo`} />
            <AutoComplete col={6} name={"Id_NivelOrdenGobierno"} label={`Nivel u orden de gobierno`} options={nivelOrdenGobierno} />
            <AutoComplete col={6} name={"Id_TipoApoyo"} label={`Tipo de apoyo`} options={tipoApoyos} />
            <AutoComplete col={6} name={"Id_FormaRecepcion"} label={`Forma de recepcion del apoyo`} options={formaRecepcion} />
            <Text col={6} name={"MontoApoyoMensual"} label={`Monto aproximado del apoyo mensual`} type={'number'}/>
            <Text col={6} name={"EspecifiqueApoyo"} label={`Especifique el apoyo`}/>
            <Text col={12} name={"Aclaraciones"} label={`Aclaraciones/Observaciones`} rows={10}/>

         </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "1rem" }} type="submit" variant="contained" color="primary" onClick={sendDatas}>
               {loading ? "Actualizar y Continuar" : datasTable.length > 0 ? "Registrar y Continuar" : "Continuar"}
            </Button>
         </Ngif>
      </>
   );
};
