import { useEffect, useState } from "react";
import * as Yup from "yup";
import Usuarios from "../../usuarios/Usuarios";
import EstadoCivil from "../components/EstadoCivil";
import RegimenMatrimonial from "../components/RegimenMatrimonial";
import Status from "../components/Status";
import NivelEstudios from "../components/NivelEstudios";
import DocumentoObtenido from "../components/DocumentoObtenido";
import NivelOrdenGobierno from "../components/NivelOrdenGobierno";
import AmbitoPublico from "../components/AmbitoPublico";
import AereaAdscripcion from "../components/AereaAdscripcion";
import RelacionDeclarante from "../components/RelacionDeclarante";
import Monedas from "../components/Monedas";
import SectorPertenece from "../components/SectorPertenece";
import TipoInstrumento from "../components/TipoInstrumento";
import TipoBienEnajenado from "../components/TipoBienEnajenado";
import TitularBien from "../components/TitularBien";
import TipoInmueble from "../components/TipoInmueble";
import Vehiculo from "../components/Vehiculo";
import FormaPago from "../components/FormaPago";
import Adqusicion from "../components/Adqusicion";
import MotivoBaja from "../components/MotivoBaja";
import TipoInversion from "../components/TipoInversion";
import TipoSubInversion from "../components/TipoSubInversion";
import TipoBien from "../components/TipoBIen";
import TipoAdeudo from "../components/TipoAdeudo";
export const Create = ({ catalogo, formik,peticiones }) => {
   const [id, setId] = useState(0);
   useEffect(() => {}, [formik.current == undefined]);
   const methods = [
      { key: "usuarios", instance: Usuarios },
      { key: "estadocivil", instance: EstadoCivil },
      { key: "regimenmatrimonial", instance: RegimenMatrimonial },
      { key: "estatus", instance: Status },
      { key: "nivelestudios", instance: NivelEstudios },
      { key: "documentoobtenido", instance: DocumentoObtenido },
      { key: "nivelordengobierno", instance: NivelOrdenGobierno },
      { key: "ambitopublico", instance: AmbitoPublico },
      { key: "aereaadscripcion", instance: AereaAdscripcion },
      { key: "relaciondeclarante", instance: RelacionDeclarante },
      { key: "monedas", instance: Monedas },
      { key: "sectorpertenece", instance: SectorPertenece },
      { key: "tipoinstrumento", instance: TipoInstrumento },
      { key: "tipoenajenado", instance: TipoBienEnajenado },
      { key: "titularbienes", instance: TitularBien },
      { key: "vehiculo", instance: Vehiculo },
      { key: "pago", instance: FormaPago },
      { key: "adquisicion", instance: Adqusicion },
      { key: "baja", instance: MotivoBaja },
      { key: "tipoinmueble", instance: TipoInmueble },
      { key: "tipoinversion", instance: TipoInversion },
      { key: "tiposubinversion", instance: TipoSubInversion },
      { key: "tipobien", instance: TipoBien },
      { key: "tipoadeudo", instance: TipoAdeudo },
      
   ];
   const foundMethod = methods.find((element) => element.key === catalogo);
   const { instance } = foundMethod;
   const { validator, initialState, handleEdit, Form, title, headersDatable, urlData, dataHiddenDatable, table } = instance({ formik, setId,peticiones });
   const dataForm = initialState;
   const validationSchema = Yup.object().shape(validator);

   return {
      id,
      dataForm,
      validationSchema,
      handleEdit,
      Form,
      headersDatable,
      urlData,
      dataHiddenDatable,
      title,
      headersDatable,
      urlData,
      dataHiddenDatable,
      setId,
      table
   };
};
