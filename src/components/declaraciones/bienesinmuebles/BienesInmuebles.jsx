import { useEffect, useState } from "react";
import Interface from "../../../services/interface";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import DataTable from "../../Reusables/table/DataTable";
import { InitialValues } from "./components/InitialValues";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Stack } from "@mui/material";
import { Request } from "../../Reusables/request/Request";

const schema = {
   next: "function",
   previous: "function",
   title: "string"
};
export const BienesInmuebles = ({ next, previous, title }) => {
   const validations = useSelector((state) => state.BienesInmuebles.validationSchema);
   const dataForm = useSelector((state) => state.BienesInmuebles.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const { inmuebles, titular, relacion, adquisicion, pago, monedas, conforme, motivobaja } = Request();

   const props = { next, previous, title };
   const message = `Todos los datos de Bienes Inmuebles declarados a nombre de la pareja, 
   dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos.`;
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));

      Interface(props, schema);
   }, [props, useSelector((state) => state.IngresosNetos.validationSchema), useSelector((state) => state.IngresosNetos.initialState)]);

   return (
      <>
         {/* <DataTable /> */}

         <FormikForm initialValues={dataForm} validationSchema={validationSchema} title={title} message={message} button={false}>
            <InitialValues
               inmuebles={inmuebles}
               titular={titular}
               relacion={relacion}
               adquisicion={adquisicion}
               pago={pago}
               monedas={monedas}
               conforme={conforme}
               motivobaja={motivobaja}
            />
         </FormikForm>
      </>
   );
};
