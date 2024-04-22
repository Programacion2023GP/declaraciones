import { useEffect, useState } from "react";
import Interface from "../../../services/interface";
import { FormikForm } from "../../Reusables/formik/FormikForm";
import { InitialValues } from "./components/InitialValues";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Request } from "../../Reusables/request/Request";
import DataTable from "../../Reusables/table/DataTable";
import { Box } from "@mui/material";

export const BienesInmuebles = ({ next, previous, title }) => {
   const validations = useSelector((state) => state.BienesInmuebles.validationSchema);
   const dataForm = useSelector((state) => state.BienesInmuebles.initialState);
   const dispatch = useDispatch();
   const [validationSchema, setValidationSchema] = useState(() => Yup.object().shape(validations));
   const { inmuebles, titular, relacion, adquisicion, pago, monedas, conforme, motivobaja } = Request();
   const [datas,setData]=useState([])
   const props = { next, previous, title };
   const message = `Todos los datos de Bienes Inmuebles declarados a nombre de la pareja, 
   dependientes económicos y/o terceros o que sean en copropiedad con el declarante no serán públicos.`;
   useEffect(() => {
      setValidationSchema(Yup.object().shape(validations));
      // console.log("rende");
   }, [useSelector((state) => state.IngresosNetos.validationSchema), useSelector((state) => state.IngresosNetos.initialState)]);
   const submit = async (values) => {
      console.log(values)
      
   };
   return (
      <>
         <Box  alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <DataTable headers={["Tipo de Inmueble	","Forma de Adquisición","Nombre Tercero"]} data={datas} editButton={true} />
         </Box>
         <FormikForm submit={submit} initialValues={dataForm} validationSchema={validationSchema} title={title} message={message} button={false}>
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
