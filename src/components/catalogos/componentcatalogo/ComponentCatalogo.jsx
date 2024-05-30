import { useEffect, useRef, useState } from "react";
import { Catalogo } from "../../Reusables/catalogo/Catalogo";
import { useParams } from "react-router-dom";
import { Create } from "../create/Create";
import { Request } from "../../Reusables/request/Request";
export const ComponentCatalogo = ({ pagina }) => {
   let { tipoinversion, roles, intengrantes, adscripcion } = Request({ peticiones: ["tipoinversion", "roles", "intengrantes", "adscripcion"] });
   const { catalogo } = useParams();
   const [initialized, setInitialized] = useState(false);
   const formik = useRef(null);
   const [change, setChange] = useState(0);
   const peticiones = {
      tipoinversion: tipoinversion,
      roles: roles,
      intengrantes: intengrantes,
      adscripcion: adscripcion
   };
   const [dataForm, setDataForm] = useState(null);
   const [handleDelete, setHandleDelete] = useState(null);
   const [handleEdit, setHandleEdit] = useState(null);
   const [validationSchema, setValidationSchema] = useState(null);
   const [action, setAction] = useState(null);
   const [Form, setForm] = useState(null);
   const [title, setTitle] = useState('');
   const [headersDatable, setHeadersDatable] = useState([]);
   const [urlData, setUrlData] = useState('');
   const [dataHiddenDatable, setDataHiddenDatable] = useState([]);
   const [id, setId] = useState(null);
   const [table, setTable] = useState(null);
   const [key, setKey] = useState('');

   useEffect(() => {
      if (!initialized && formik.current !== null) {
         setInitialized(true);
      }
      setChange(change + 1);
      const initialize = async () => {
         const catalog = pagina ? pagina : catalogo;
         setDataForm();
         setHandleDelete();
         setHandleEdit();
         setValidationSchema();
         setAction();
         setForm();
         setTitle();
         setHeadersDatable();
         setUrlData();
         setDataHiddenDatable();
         setTable();
         setKey();

         const response = await peticiones.fetchData();
         setDataForm(response.data);
     };

     initialize();
   }, [catalogo, pagina]);

   // const { dataForm, handleDelete, handleEdit, validationSchema, action, Form, title, headersDatable, urlData, dataHiddenDatable, id, setId, table, key } = Create({
   //    catalogo: pagina ? pagina : catalogo,
   //    formik,
   //    peticiones
   // });

   return (
      <Catalogo
         idTable={key == undefined ? "id" : key}
         key={"catalogo" + (pagina ? pagina : catalogo)}
         id={id}
         setId={setId}
         catalogo={catalogo}
         ref={formik}
         validationSchema={validationSchema}
         titleForm={title}
         messageButton={id > 0 ? "Actualizar" : "Registrar"}
         initialValuesForm={dataForm}
         headersDatable={headersDatable}
         urlData={urlData}
         dataHiddenDatable={dataHiddenDatable}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
         table={table}
         Form={Form}
   >
      </Catalogo>
   );
};
