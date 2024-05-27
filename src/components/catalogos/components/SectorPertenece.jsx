import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const SectorPertenece = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de sector que pertenece";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Sectores que pertenece"];
    const urlData = "sectores";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El sector que pertenece es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el sector que pertenece"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
 };
export default SectorPertenece;