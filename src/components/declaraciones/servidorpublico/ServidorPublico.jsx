import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { FormikServidorPublico } from "./formik/FormikServidorPublico";
import { CustomRadio } from "../../Reusables/radiobutton/Radio";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { FormikInitialValues } from "./components/FormikInitialValues";
import { Axios, PostAxios } from "../../../services/services";
import { Success } from "../../../toasts/toast";
import { addServidorPublico } from "../../../redux/ServidorPublicoHoja9/ServidorPublicoHoja9";
import { Post } from "../funciones/post";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { insertFormik } from "../../FuncionesFormik";

export const ServidorPublico = ({ loading, data, next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const dispatch = useDispatch();
   const dataForm = useSelector((state) => state.ServidorPublico.initialState);
   const validations = useSelector((state) => state.ServidorPublico.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const [id, setID] = useState(0);

   const formik = useRef(null);
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const continuar = async () => {
      try {
         const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${9}/1`);

         Success(response.data.data.message);
         // setDatasTable([]);
         Success("Continuemos llenando los formularios");
         next();
      } catch (error) {
         if (error.response?.data?.data?.message) {
            Error(error.response.data.data.message);
         } else {
            Error("Ocurrio un error");
         }
      }
   };
   useEffect(() => {
      if (data?.constructor === Object && Object.keys(data).length > 0) {
         modifiedDataServidor();
      }
   }, [data]);
   const modifiedDataServidor = () => {
      setID(parseInt(data.Id_ActividadAnualAnterior));
      delete data.Id_ActividadAnualAnterior;
      insertFormik(formik, data);
   };
   const submit = async (values, { resetForm }) => {
      const url = `servidorpublico/${id > 0 ? `update/${id}` : "create"}`;

      if (checked) {
         dispatch(addServidorPublico(values));
         try {
            const response = await Post(url, values, next);
            // next();
            // Success(response.data.message);

            return response.data;
         } catch (error) {
            if (error.response?.data?.data?.message) {
               Error(error.response.data.data.message);
            } else {
               Error("Ocurrio un error");
            }
         }
      }
   };
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
   }, [useSelector((state) => state.ServidorPublico.validationSchema), useSelector((state) => state.ServidorPublico.initialState)]);
   return (
      <>
         <FormGroup sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <FormControlLabel
               control={<Switch checked={checked} onChange={handleChange} name="gilad" color={"secondary"} />}
               label={"¿Te desempeñaste como servidor público en el año inmediato anterior?"}
            />
         </FormGroup>

         <Ngif condition={checked}>
            <FormikForm
               messageButton={data ? (Object.keys(data).length > 0 ? "Actualizar" : "Registrar") + " y continuar" : "Registrar y continuar"}
               previousButton
               handlePrevious={previous}
               button={true}
               ref={formik}
               previous={previous}
               submit={submit}
               validationSchema={validationSchema}
               initialValues={dataForm}
               title={title}
            >
               <FormikInitialValues />
            </FormikForm>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "2rem" }} onClick={continuar} type="submit" variant="contained" color="primary">
               {loading?'Actualizar y continuar':'Continuar'}
            </Button>
         </Ngif>
      </>
   );
};
