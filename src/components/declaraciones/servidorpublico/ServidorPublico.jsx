import { Children, cloneElement, useEffect, useState } from "react";
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

export const ServidorPublico = ({ next, previous, title }) => {
   const [checked, setChecked] = useState(true);
   const dispatch = useDispatch();
   const dataForm = useSelector((state) => state.ServidorPublico.initialState);
   const validations = useSelector((state) => state.ServidorPublico.validationSchema);
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const handleChange = (event) => {
      setChecked(event.target.checked);
   };
   const continuar = async () => {
      try {
         const response = await Axios.post(`apartados/create/${parseInt(localStorage.getItem("id_SituacionPatrimonial"))}/${9}`);

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

   const submit = async (values, { resetForm }) => {
      if (checked) {
         dispatch(addServidorPublico(values));
         try {
            const response = await PostAxios("/servidorpublico/create", values);
            next();
            Success(response.data.message);

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
            <FormikServidorPublico previous={previous} submit={submit} validationSchema={validationSchema} initialValues={dataForm} title={title}>
               <FormikInitialValues />
            </FormikServidorPublico>
         </Ngif>
         <Ngif condition={!checked}>
            <Button sx={{ marginLeft: "2rem" }} onClick={continuar} type="submit" variant="contained" color="primary">
               Continuar
            </Button>
         </Ngif>
      </>
   );
};
