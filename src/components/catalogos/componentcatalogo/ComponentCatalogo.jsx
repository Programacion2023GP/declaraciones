import { useEffect, useRef, useState } from "react";
import { Catalogo } from "../../Reusables/catalogo/Catalogo";
import { useParams } from "react-router-dom";
import { Creacion } from "../creacion/Creacion";

export const ComponentCatalogo = ({pagina}) => {
   const { catalogo } = useParams();
   const [initialized, setInitialized] = useState(false);
   const formik = useRef(null);

   useEffect(() => {
      if (!initialized && formik.current !== null) {
         setInitialized(true);
      }
   }, [catalogo,pagina]);
   
   const { dataForm, handleDelete, handleEdit, validationSchema, action, Form, title, headersDatable, urlData, dataHiddenDatable, id, setId, table } = Creacion({
      catalogo: (pagina ? pagina : catalogo),
      formik
});


   return (
      <Catalogo
      key={"catalogo" + (pagina ? pagina : catalogo)} // Utiliza el parámetro 'pagina' si existe, de lo contrario, utiliza 'catalogo'
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
