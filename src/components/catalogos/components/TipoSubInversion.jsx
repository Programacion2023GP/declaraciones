import * as Yup from "yup";
import { Text } from "../../Reusables/input/Input";
import { AutoComplete } from "../../Reusables/autocomplete/autocomplete";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import Loading from "../../Reusables/loading/Loading";

const TipoSubInversion = ({ formik, setId, peticiones }) => {
   const { tipoinversion } = peticiones;
   const table = true;
   const title = "Formulario de tipo de subinversión";
   const initialState = {
      valor: "",
      tipoInversion: ""
   };
   const headersDatable = ["tipo de inversión", "subtipo de inversion"];
   const urlData = "subtiposinversion";
   const dataHiddenDatable = ["id", "id_tipoinversion"];

   const validator = {
      valor: Yup.string("El formato es texto").required("El tipo de subinversión es requerido"),
      tipoInversion: Yup.number("El formato es numerico").min(1, "El tipo de inversion es requerida").required("El tipo de inversion es requerida")
   };
   const handleEdit = (row) => {
      formik.current.setFieldValue("tipoInversion", tipoinversion.filter((item) => item.id == parseInt(row.id_tipoinversion))[0].id);
      formik.current.setFieldValue("valor", row["text"]);
      setId(row.id);
   };

   const Form = () => {
      return (
         <>
            <Ngif condition={tipoinversion.length > 0}>
               <AutoComplete col={12} name={"tipoInversion"} label={"Tipo de inversión"} options={tipoinversion} />
               <Text col={12} name={"valor"} label={"Escribe el tipo de subinversión"} />
            </Ngif>
            <Ngif condition={tipoinversion.length < 1}>
               <Loading />
            </Ngif>
         </>
      );
   };
   return { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table };
};
export default TipoSubInversion;
