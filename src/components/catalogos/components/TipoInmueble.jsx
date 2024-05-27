import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const TipoInmueble = ({ formik, setId }) => {
    const table = true;
 
    const title = "Formulario de tipo de inmueble";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["tipo de inmueble"];
    const urlData = "tipoinmueble";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El tipo de inmueble es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el tipo de inmueble"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoInmueble;
