import { useEffect, useRef, useState } from "react";
import { Catalogo } from "../../Reusables/catalogo/Catalogo";
import { useParams } from "react-router-dom";
import { Create } from "../create/Create";
import { Request } from "../../Reusables/request/Request";
const ComponentCatalogo = ({ pagina }) => {
   let { tipoinversion, roles, intengrantes, adscripcion, organismo, empleos,adscripcionOrganismo } = Request({
      peticiones: ["tipoinversion", "roles", "intengrantes", "adscripcion", "organismo", "empleos","adscripcionOrganismo"]
   });
   const [children, setChildren] = useState(<></>);
   const { catalogo } = useParams();
   const [initialized, setInitialized] = useState(false);
   const formik = useRef(null);
   const [change, setChange] = useState(0);
   // const peticiones = {
   //    tipoinversion: tipoinversion,
   //    roles: roles,
   //    intengrantes: intengrantes,
   //    adscripcion: adscripcion
   // };

   const {
      dataForm,
      handleDelete,
      handleEdit,
      validationSchema,
      action,
      Form,
      title,
      headersDatable,
      urlData,
      dataHiddenDatable,
      id,
      setId,
      table,
      key,
      param,
      filter,
      links
   } = Create({
      catalogo: pagina ? pagina : catalogo,
      formik,
      peticiones: {
         organismo: organismo,
         tipoinversion: tipoinversion,
         roles: roles,
         intengrantes: intengrantes,
         adscripcion: adscripcion,
         adscripcionOrganismo:adscripcionOrganismo,
         empleos: empleos
      }
   });
   const formulario = () => {
      setChildren(<Form />);
   };

   useEffect(() => {
      if (!initialized && formik.current !== null) {
         setInitialized(true);
      }
      setChange(change + 1);
   }, [catalogo, pagina]);
   useEffect(() => {
      formulario();
   }, [catalogo]);
   useEffect(() => {
      formulario();
   }, [tipoinversion.length > 0 && roles.length > 0 && intengrantes.length > 0 && adscripcion.length > 0]);

   return (
      <Catalogo
         links={links}
         filter={filter}
         param={param}
         key={change}
         idTable={key == undefined ? "id" : key}
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
      >
         {children}
      </Catalogo>
   );
};

export default ComponentCatalogo;
