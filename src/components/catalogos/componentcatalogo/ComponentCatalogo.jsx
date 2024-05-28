import { useEffect, useRef, useState } from "react";
import { Catalogo } from "../../Reusables/catalogo/Catalogo";
import { useParams } from "react-router-dom";
import { Create } from "../create/Create";
import { Request } from "../../Reusables/request/Request";
export const ComponentCatalogo = ({ pagina }) => {
   const { catalogo } = useParams();
   const [initialized, setInitialized] = useState(false);
   const formik = useRef(null);
   const [change, setChange] = useState(0);
   let { tipoinversion, roles, intengrantes, adscripcion } = Request({ peticiones: ["tipoinversion", "roles", "intengrantes", "adscripcion"] });
   const peticiones = {
      tipoinversion: tipoinversion,
      roles: roles,
      intengrantes: intengrantes,
      adscripcion: adscripcion
   };
   useEffect(() => {
      if (!initialized && formik.current !== null) {
         setInitialized(true);
      }
      setChange(change + 1);
   }, [catalogo, pagina]);

   const { dataForm, handleDelete, handleEdit, validationSchema, action, Form, title, headersDatable, urlData, dataHiddenDatable, id, setId, table } = Create({
      catalogo: pagina ? pagina : catalogo,
      formik,
      peticiones
   });

   return (
      <Catalogo
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
      >
         <Form />
      </Catalogo>
   );
};
