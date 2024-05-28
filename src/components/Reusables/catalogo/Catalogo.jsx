import { Box, Grid, Paper } from "@mui/material";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FormikForm } from "../formik/FormikForm";
import DataTable from "../table/DataTable";
import { Axios, GetAxios, PostAxios } from "../../../services/services";
import { Error, Success } from "../../../toasts/toast";
import { Ngif } from "../conditionals/Ngif";

export const Catalogo = forwardRef(
   (
      {
         urlData = "",
         headersDatable = [],
         dataHiddenDatable = [],
         titleForm = "",
         messageButton = "",
         children,
         initialValuesForm,
         handleEdit,
         validationSchema,
         catalogo,
         id,
         setId,
         table = true
      },
      ref
   ) => {
      const submit = async (values, { resetForm }) => {
         ref.current, resetForm();
         try {
            let response;
            if (id > 0) {
               response = await Axios.put(`${urlData}/update/${id}`, values);
            } else {
               response = await Axios.post(`${urlData}/create`, values);
            }
            init();
            Success(response.data.data.message);
            setId(0);

            return response.data;
         } catch (error) {
            setId(0);
            if (error.message == "Network Error") {
               Error("Comunicate al aerea de sistemas");
            } else if (error.message == "Request failed with status code 400") {
               Error("Ocurrio un error");
            } else {
               Error(error.response.data.message);
            }
         }
         // resetForm()
      };
      const [data, setData] = useState([]);
      const init = async () => {
         setData(await GetAxios(`${urlData}/index`));
      };
      useEffect(() => {

         init();
      }, [catalogo]);
   
      // useEffect(() => {}, [children, urlData, headersDatable, dataHiddenDatable, titleForm, initialValuesForm, handleEdit]);

      const handleDelete = async (row) => {
         try {
            const response = await Axios.delete(`${urlData}/delete/${row.id}`);

            Success(response.data.data.message);
            init();
            return response.data;
         } catch (error) {
            if (error.message == "Network Error") {
               Error("Comunicate al aerea de sistemas");
            } else if (error.message == "Request failed with status code 400") {
               Error("Ocurrio un error");
            } else {
               Error(error.response.data.message);
            }
         }
      };

      return (
         <Paper key={catalogo} elevation={12} sx={{ padding: "2rem", marginRight: "3rem", marginBottom: "3rem" }}>
            <Grid container spacing={4}>
               <Grid item xs={12} xl={table ? 6 : 12}>
                  <Box
                     sx={{
                        overflow: "auto",
                        border: "2px solid #007bff",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                     }}
                  >
                     <FormikForm
                        validationSchema={validationSchema}
                        initialValues={initialValuesForm}
                        ref={ref}
                        sizeTitle={"h4"}
                        title={titleForm}
                        button
                        submit={submit}
                        messageButton={messageButton}
                     >
                        {children}
                     </FormikForm>
                  </Box>
               </Grid>
               <Ngif condition={table}>
                  <Grid item xs={12} xl={6}>
                     <Box
                        alignItems={"center"}
                        justifyContent={"center"}
                        display={"flex"}
                        sx={{
                           overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
                           border: "2px solid #007bff",
                           borderRadius: "10px",
                           padding:"1rem",
                           boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                           
                        }}
                     >
                        <Box sx={{ minWidth: "100%",overflowX: "auto" }}>
                           {" "}
                           {/* Añadir minWidth para que la tabla use todo el espacio disponible */}
                           <DataTable
                              handleEdit={handleEdit}
                              pagination={[5, 10]}
                              filterGlobal={true}
                              headers={headersDatable}
                              dataHidden={dataHiddenDatable}
                              editButton={true}
                              deleteButton={true}
                              handleDelete={handleDelete}
                              data={data}
                           />
                        </Box>
                     </Box>
                  </Grid>
               </Ngif>
            </Grid>
         </Paper>
      );
   }
);
