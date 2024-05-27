import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
const NivelOrdenGobierno = ({ formik, setId }) => {
    const table = true;
    const title = "Formulario de nivel de orden del gobierno";
    const initialState = {
       valor: ""
    };
    const headersDatable = ["Niveles de orden del gobierno"];
    const urlData = "nivelordengobierno";
    const dataHiddenDatable = ["id"];
 
    const validator = {
       valor: Yup.string("El formato es texto").required("El nivel de orden del gobierno es requerido")
    };
 
    const handleEdit = (row) => {
       formik.current.setFieldValue("valor", row["text"]);
       setId(row.id);
    };
 
    const Form = () => {
       return (
          <>
             <Text col={12} name={"valor"} label={"Escribe el nivel de orden del gobierno"} />
          </>
       );
    };
 
    return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default NivelOrdenGobierno;