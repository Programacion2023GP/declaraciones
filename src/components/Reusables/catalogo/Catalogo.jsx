import { Box, Grid, Paper } from "@mui/material";
import { cloneElement, forwardRef, useEffect, useState } from "react";
import { FormikForm } from "../formik/FormikForm";
import DataTable from "../table/DataTable";
import { Axios, GetAxios } from "../../../services/services";
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
         table = true,
         idTable,
         param = null,
         filter = false,
         links = [],
      },
      ref
   ) => {
      const [loadForm, setLoadForm] = useState(false);
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState([]);

      const init = async () => {
         setLoading(true);
         setData(await GetAxios(`${urlData}/index${param ? "/" + param : ""}`));
         setLoading(false);
      };

      useEffect(() => {
         init();
         setLoadForm(true);
      }, []);

      const submit = async (values, { resetForm }) => {
         try {
            let response;
            if (id > 0) {
               response = await Axios.put(
                  `${urlData}/update/${idTable == "id" ? id : values[idTable]}`,
                  values
               );
            } else {
               response = await Axios.post(`${urlData}/create`, values);
            }

            init();
            Success(response.data.data.message);
            setId(0);
            resetForm();
            return response.data;
         } catch (error) {
            setId(0);
            if (error.response?.data?.data?.message) {
               Error(error.response.data.data.message);
            } else if (error.message === "Network Error") {
               Error("Comunícate con el área de sistemas");
            } else {
               Error("Ocurrió un error al guardar");
            }
         }
      };

      const handleDelete = async (row) => {
         try {
            const response = await Axios.delete(`${urlData}/delete/${row[idTable]}`);
            Success(response.data.data.message);
            init();
            return response.data;
         } catch (error) {
            if (error.message === "Network Error") {
               Error("Comunícate con el área de sistemas");
            } else {
               Error(error.response?.data?.message || "Ocurrió un error al eliminar");
            }
         }
      };

      return (
         <Paper
            key={catalogo}
            elevation={0}
            sx={{
               background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
               borderRadius: "32px",
               border: "1px solid rgba(226, 232, 240, 0.8)",
               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
               "&:hover": {
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
               },
            }}
            className="!p-6 !md:!p-8 !mb-8 !mr-6"
         >
            <Grid container spacing={4}>
               {/* FORMULARIO */}
               <Grid item xs={12} xl={table ? 6 : 12}>
                  <Box
                     sx={{
                        borderRadius: "24px",
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        transition: "all 0.2s ease",
                        overflow: "hidden",
                        "&:hover": {
                           borderColor: "#818cf8",
                           boxShadow: "0 10px 40px -12px rgba(79, 70, 229, 0.2)",
                        },
                     }}
                  >
                     <Box className="!p-6 !md:!p-8">
                        <FormikForm
                           validationSchema={validationSchema}
                           initialValues={initialValuesForm}
                           ref={ref}
                           sizeTitle="h4"
                           title={titleForm}
                           button
                           submit={submit}
                           messageButton={messageButton}
                        >
                           <Ngif condition={loadForm}>{children}</Ngif>
                           <Box width="100%" padding="1.5em" />
                        </FormikForm>
                     </Box>
                  </Box>
               </Grid>

               {/* TABLA */}
               <Ngif condition={table}>
                  <Grid item xs={12} xl={6}>
                     <Box
                        sx={{
                           borderRadius: "24px",
                           background: "#ffffff",
                           border: "1px solid #e2e8f0",
                           transition: "all 0.2s ease",
                           height: "100%",
                           display: "flex",
                           flexDirection: "column",
                           "&:hover": {
                              borderColor: "#818cf8",
                              boxShadow: "0 10px 40px -12px rgba(79, 70, 229, 0.2)",
                           },
                        }}
                     >
                        <Box
                           className="!p-4 !md:!p-6 !overflow-x-auto !scrollbar-thin !scrollbar-thumb-[#cbd5e1] !scrollbar-track-[#f1f5f9]"
                           sx={{
                              flex: 1,
                              "&::-webkit-scrollbar": {
                                 height: "6px",
                                 width: "6px",
                              },
                              "&::-webkit-scrollbar-track": {
                                 background: "#f1f5f9",
                                 borderRadius: "10px",
                              },
                              "&::-webkit-scrollbar-thumb": {
                                 background: "#cbd5e1",
                                 borderRadius: "10px",
                                 "&:hover": {
                                    background: "#94a3b8",
                                 },
                              },
                           }}
                        >
                           <DataTable
                              filter={filter}
                              link={[links]}
                              loading={loading}
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