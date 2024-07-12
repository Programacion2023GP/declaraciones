import { Box, Button, Card, FormControlLabel, FormGroup, Switch } from "@mui/material";
import DataTable from "../../../Reusables/table/DataTable";
import { Ngif } from "../../../Reusables/conditionals/Ngif";
import { useState } from "react";
import { Success } from "../../../../toasts/toast";
import { CustomRadio } from "../../../Reusables/radiobutton/Radio";
import * as Yup from "yup";
import { FormikForm } from "../../../Reusables/formik/FormikForm";
import { Text } from "../../../Reusables/input/Input";

export const ParticipacionTomaDecisiones = ({ loading, data, next, previous, title }) => {
   const [datas, setDatas] = useState([]);
   const [datasTable, setDatasTable] = useState([]);
   const [checked, setChecked] = useState(true);
   const tipoRelaciones = [
    { value: 1, label: "Declarante" },
    { value: 2, label: "Pareja" },
    { value: 3, label: "Dependiente económico" }
 ];
 const initialValues ={
    Id_Intereses: parseInt(localStorage.getItem("id_Intereses")),
    Id_TipoRelacion: 1,
    Id_TipoInstitucion: 0,
    NombreInstitucion: '',
    RfcInstitucion: '',
    PuestoRol: '',
    FechaInicioParticipacion: '',
    RecibeRemuneracion: 0,
    MontoMensual: '',
    Id_MonedaMontoMensual: 0,
    Id_PaisUbicacion: 0,
    Id_EntidadFederativa:0,
    Aclaraciones:"",
 }
 const validationSchema = Yup.object().shape({
    NombreEmpresaSociedadAsociacion: Yup.string().required("El nombre de la empresa o asociación es requerido"),
    PorcentajeParticipacion: Yup.number()
       .required("El porcentaje de participación es requerido")
       .min(0, "El porcentaje de participación debe ser al menos 0")
       .max(100, "El porcentaje de participación no puede exceder 100"),
    // RecibeRemuneracion: Yup.number().required("La remuneración es requerida").oneOf([0, 1], "El valor debe ser 0 (No) o 1 (Sí)"),
    // Id_TipoParticipacion: Yup.number().min(1, "El tipo de participación es requerido").required("El tipo de participación es requerido"),
    // RfcEmpresa: Yup.string().min(3, "El RFC de empresa debe tener al menos 3 caracteres").required("El RFC de empresa es requerido"),
    // MontoMensual: renumeracion && Yup.number().required("El monto mensual es requerido").min(0, "El monto mensual debe ser al menos 0"),
    // Id_MonedaMontoMensual: Yup.number().min(1, "La moneda del monto mensual es requerida").required("La moneda del monto mensual es requerida"),
    // Id_PaisUbicacion: !mexico && Yup.number().min(1, "El país de ubicación es requerido").required("El país de ubicación es requerido"),
    // Id_EntidadFederativa: mexico && Yup.number().min(1, "La entidad federativa es requerida").required("La entidad federativa es requerida"),
    // Id_Sector: Yup.number().min(1, "El sector es requerido").required("El sector es requerido"),
    // EsEnMexico: Yup.number().required("Debe indicar si está en México").oneOf([0, 1], "El valor debe ser 0 (No) o 1 (Sí)"),
    // Aclaraciones: Yup.string().max(500, "Las aclaraciones no pueden exceder 500 caracteres")
 });
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const deleteRow = (row) => {
      // dispatch(deleteDatosDependiente({ id: row.id }));
      setDatas(datas.filter((item) => item.id != row.id));
      const itemTable = datasTable.filter((item) => item.id != row.id);
      setDatasTable(itemTable);
      Success("se elimino de la tabla");
   };
   const submit = async (values, { resetForm }) => {
    Success("se agrego a la tabla");
    values.id = idUnique;

    setDatas(datas.concat(values));
    // dispatch(addDatosDependiente(values));
    adDataTable(values);
 };
   const sendDatas = async () => {
      const newDatas = [...datas];
      const url = `participacionempresas/${update ? `update/${localStorage.getItem("id_SituacionPatrimonial")}` : "create"}`;
      // console.log(newDatas,url);
      if (newDatas.length > 0) {
         try {
            const sendApi = async () => {
               for (let i = 0; i < newDatas.length; i++) {
                  //   dispatch(addDatosDependiente(newDatas[i]));
                  // delete newDatas[i].identificador;
               }
               const response = await PostAxios(url, newDatas);
               localStorage.setItem("id_Intereses", response.data.result);
               Success(response.data.message);
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
            const response = await Axios.post(`apartados/interes/0/1/0/${parseInt(localStorage.getItem("Id_User"))}`);
            Success("Continuemos llenando los formularios");
            setDatasTable([]);
            next();
         } catch (error) {
            Error(error.response.data.message);
         }
      }
   };
   return (
      <>
         <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <Card sx={{ maxWidth: "90%", overflow: "auto", margin: "auto", padding: ".8rem", overflow: "auto" }}>
               <DataTable
                  headers={["Nombre empresa	", "Porcentaje", "Recibe remuneración", " Tipo", " Lugar"]}
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
               label={datasTable.length > 0 ? "¿Deseas seguir agregando participaciones?" : "¿Tiene participaciones?"}
            />
         </FormGroup>
         <Ngif condition={checked}>
            <FormikForm initialValues={initialValues} validationSchema={validationSchema} submit={submit}>
            <CustomRadio col={12} title={``} name={`Id_TipoRelacion`} options={tipoRelaciones} />
            <Text col={6} name={`NombreInstitucion`} label={`Nombre de la institucion`}  />
            <Text col={6} name={`RFC`} label={`RFC`}  />
            <Text col={6} name={`PuestoRol`} label={`Puesto/Rol`}  />

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
