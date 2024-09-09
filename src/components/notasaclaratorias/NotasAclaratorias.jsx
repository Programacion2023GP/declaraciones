import * as Yup from "yup";
import { Text } from "../Reusables/input/Input";
import { FormikForm } from "../Reusables/formik/FormikForm";
import { useEffect, useRef, useState } from "react";
import DatePickerComponentV2 from "../Reusables/datepicker/DatePickerComponentV2";
import { Box, Card, Grid } from "@mui/material";
import DataTable from "../Reusables/table/DataTable";
import { Ngif } from "../Reusables/conditionals/Ngif";
import { Axios, GetAxios, PostAxios } from "../../services/services";
import { Error, Success } from "../../toasts/toast";
import { Print } from "@mui/icons-material";
import { PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";
import { AutoComplete } from "../Reusables/autocomplete/autocomplete";
import { Nota } from "./Nota";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

export const NotasAclaratorias = ({}) => {
   const [datas, setDatas] = useState([]);
   const [situaciones, setSituaciones] = useState([]);
   const [loading, setLoading] = useState(false);

   const [data, setData] = useState();
   const [print, setPrint] = useState(false);
   const formik = useRef(null);
   const initialValues = {
      Id_user: parseInt(localStorage.getItem("Id_User")),
      Description: "",
      Title: "",
      Id_SituacionPatrimonial: 0,
      Date: ""
   };
   const validationSchema = Yup.object().shape({
      Date: Yup.date().required("La fecha es requerida"),
      Title: Yup.string().required("El asunto es requerido"),
      Description: Yup.string().required("La nota aclaratoria es requerida"),
      Id_SituacionPatrimonial: Yup.number().min(1, "selecciona una opcion valida").required("selecciona una opcion valida")
   });
   const submit = async (values) => {
      formik.current.resetForm();
      try {
         const sendApi = async () => {
            const response = await PostAxios("notasaclaratorias/create", values);
            Success(response.data.message);
         };
         await sendApi();
      } catch (error) {
         if (error.response?.data?.message) {
            console.log("ee", error);
            Error(error.response.data.message);
         } else {
            console.error("error", error);
            Error("Ocurrio un error");
         }
         // dispatch(clearData());
         // setDatasTable([]);
      }
      init();
   };
   const handlePrintPDF = async (row) => {
      setData(row);
      setPrint(true);
   };
   const moreButtons = [
      parseInt(localStorage.getItem("Id_Role")) === 1 && {
         toltip: "Imprimir",
         color: "#27AE60",
         icon: Print,
         handleButton: handlePrintPDF,
         conditions: []
      }
   ].filter(Boolean);
   const handleDelete = async (row) => {
      console.log(row);
      setLoading(true);

      try {
         const response = await Axios.delete(`notasaclaratorias/delete/${row.Id_nota}`);
         init();
         setLoading(false);

         Success(response.data.data.message);
      } catch (error) {
         setLoading(false);

         Error(error.response.data.data.message);
      }
      init();
   };
   const init = async () => {
      console.log("init");
      setLoading(true);

      setDatas(
         await GetAxios(`notasaclaratorias/show${[3, 2].includes(parseInt(localStorage.getItem("Id_Role"))) ? `/${parseInt(localStorage.getItem("Id_User"))}` : ""}`)
      );
      setLoading(false);

      setSituaciones(await GetAxios(`situacionpatrimonial/user/${parseInt(localStorage.getItem("Id_User"))}`));
   };
   useEffect(() => {
      init();
   }, []);
   return (
      <>
         <Grid container spacing={4} style={{ overflow: "hidden" }}>
            <Grid item xs={12} lg={12}>
               <Ngif condition={[3, 2].includes(parseInt(localStorage.getItem("Id_Role")))}>
                  <FormikForm
                     ref={formik}
                     maxWidth={"80%"}
                     messageButton={"Registrar"}
                     title={"Nota aclaratoria"}
                     button
                     initialValues={initialValues}
                     validationSchema={validationSchema}
                     submit={submit}
                  >
                     <Text col={12} name={"Title"} label={"Asunto"} />
                     <DatePickerComponentV2 name={"Date"} label={"Fecha de la Aclaración"} format={"DD/MM/YYYY"} />
                     <AutoComplete col={12} name={"Id_SituacionPatrimonial"} label={"Relacion a la Declaracion"} options={situaciones} />
                     <Text col={12} name={"Description"} label={"Nota aclaratoria"} rows={12} />
                     <Box width={"100%"} padding={"1.5em"}></Box>
                  </FormikForm>
               </Ngif>
            </Grid>
            <Grid item xs={12} lg={12}>
               <Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
                  <Card sx={{ maxWidth: "90%", margin: "auto", padding: ".8rem" }}>
                     <DataTable
                        filter
                        speakRow
                        filterGlobal
                        moreButtons={moreButtons}
                        loading={loading}
                        // dataHidden={["identificador"]}
                        // loading={loading && datas.length > 0}
                        deleteButton={[3, 4].includes(parseInt(localStorage.getItem("Id_Role"))) ? true : false}
                        handleDelete={handleDelete}
                        dataHidden={["Id_SituacionPatrimonial", "Id_nota", "AreaAdscripcion", "Gender"]}
                        headers={["Folio", "Nombre", "Apellido Paterno", "Apellido Materno", "Fecha", "Asunto", "Descripcion", "Correo"]}
                        data={datas}
                        pagination={[10, 20, 30, 50, 100, 200, 500]}
                        // handleDelete={deleteRow}
                        // deleteButton={true}
                     />
                  </Card>
               </Box>
            </Grid>
         </Grid>

         <PdfDeclaracion title={"Nota Aclaratoria"} open={print} setOpen={setPrint} formTitle={"Nota Aclaratoria"}>
            <Nota data={data}></Nota>
         </PdfDeclaracion>
      </>
   );
};
