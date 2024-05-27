import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const TitularBien = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de titular de bienes";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Titular de bienes"];
    const urlData = "titularbien";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El titular de bienes es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el titular de bienes"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TitularBien;
