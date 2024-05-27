import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const Vehiculo = ({ formik, setId }) => {
   const table = true;

   const title = "Formulario de vehiculo";
   const initialState = {
      valor: ""
   };
   const headersDatable = ["Vehiculos"];
   const urlData = "tipovehiculos";
   const dataHiddenDatable = ["id"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El vehiculo es requerido")
   };

   const handleEdit = (row) => {
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Text col={12} name={"valor"} label={"Escribe el vehiculo"} />
         </>
      );
   };

   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};

export default Vehiculo;
