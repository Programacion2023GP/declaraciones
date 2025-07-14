import React, { useEffect, useState, useRef } from "react";
import DataTable from "../Reusables/table/DataTable";
import { GetAxios } from "../../services/services";
import { CiEdit } from "react-icons/ci";
import { ModalComponent } from "../Reusables/modal/Modal";
import { DatosGeneral } from "../declaraciones/datosgenerales/components/DatosGenerales";
import { DatosGenerales } from "../declaraciones/datosgenerales/DatosGenerales";
import { Box, Button, ButtonBase, Chip, Dialog, Paper, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { DomicilioDeclarante } from "../declaraciones/domiciliodeclarante/DomicilioDeclarante";
import { DatosCurriculares } from "../declaraciones/datoscurriculares/DatosCurriculares";
import { DatosEmpleo } from "../declaraciones/datosempleo/DatosEmpleo";
import { ExperienciaLaboral } from "../declaraciones/experiencialaboral/ExperienciaLaboral";
import { DependientesEconomicos } from "../declaraciones/dependienteseconomicos/DependientesEconomicos";
import { IngresosNetos } from "../declaraciones/ingresosnetos/IngresosNetos";
import { ServidorPublico } from "../declaraciones/servidorpublico/ServidorPublico";
import { BienesInmuebles } from "../declaraciones/bienesinmuebles/BienesInmuebles";
import { TipoVehiculo } from "../declaraciones/tipodevehiculo/TipoVehiculo";
import { BienesMuebles } from "../declaraciones/bienesmuebles/BienesMuebles";
import { InversionesCuentasValores } from "../declaraciones/inversionescuentasvalores/InversionesCuentasValores";
import { AdeudosPasivos } from "../declaraciones/adeudospasivos/AdeudosPasivos";
import { PrestamosComodatos } from "../declaraciones/prestamos/PrestamosComodatos";
import { DatosParejas } from "../declaraciones/datospareja/DatosPareja";

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});
const Administrativo = () => {
   const [declaraciones, setDeclaraciones] = useState([]);
   const [loading, setLoading] = useState(false);
   const [menuState, setMenuState] = useState({
      open: false,
      declaracion: null
   });
   const [hoja, setHoja] = useState(0);
   const [modal, setModal] = useState(false);
   const [data, setData] = useState(null);
   const init = async () => {
      setLoading(true);
      try {
        let response = await GetAxios(`apartados/show`);
        
        const processedResponse = response.map(item => {
          // 1. Extraer campos y crear nombrecompleto
          const { Nombre, ApMaterno, ApPaterno, ...rest } = item;
          const nombrecompleto = `${Nombre || ''} ${ApPaterno || ''} ${ApMaterno || ''}`.trim();
          
          // 2. Obtener las dos primeras claves del objeto original
          const keys = Object.keys(item);
          const firstKey = keys[0]; 
          const secondKey = keys[1];
          
          // 3. Reconstruir el objeto con el orden deseado
          return {
            [firstKey]: item[firstKey],    // Primera posición original
            [secondKey]: item[secondKey],  // Segunda posición original
            nombrecompleto: nombrecompleto, // Tercera posición (nuevo campo)
            Nombre:Nombre,
            ApPaterno:ApPaterno,
            ApMaterno:ApMaterno,
            ...rest                        // Resto de propiedades
          };
        });
    
        setDeclaraciones(processedResponse);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

   useEffect(() => {
      init();
   }, []);

   const handleEdit = (row) => {
      if (!tableRef.current) return;

      // Obtener posición de la tabla
      const tableRect = tableRef.current.getBoundingClientRect();

      // Posicionar el menú en la parte superior de la tabla
      setMenuState({
         open: true,
         declaracion: row,
         position: {
            top: tableRect.top + window.scrollY + 10, // 10px de margen
            left: tableRect.left + window.scrollX + tableRect.width / 2 - 150 // Centrado
         }
      });
   };
   const Declara = (tipo_declaracion, declaracion) => {
      let number = 0;
      if (declaracion == "Inicial") {
         number = tipo_declaracion == "Simplificada" ? 4 : 1;
      } else if (declaracion == "Modificación") {
         number = tipo_declaracion == "Simplificada" ? 5 : 2;
      } else if (declaracion == "Conclusión") {
         number = tipo_declaracion == "Simplificada" ? 6 : 3;
      }
      return number;
   };
   const handleDatosGenerales = async (row) => {
      setLoading(true);
      const { Folio, Tipo_declaracion, Declaracion, Hoja, Nombre, ApPaterno, ApMaterno } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      console.log(Nombre)
      localStorage.setItem("Name", Nombre);
      localStorage.setItem("PaternalSurname", ApPaterno);
      localStorage.setItem("MaternalSurname", ApMaterno);
      const response = await GetAxios(`datosgenerales/index/${Folio}`);
      setData(response[0] || null);
      setHoja(1);
      setModal(true);
      setLoading(false);

      //  window.location.hash = `dashboard/declaraciones/${number}/${parseInt(page) - 1}`;
   };
   const handleDomiciloDeclarante = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`domiciliodeclarante/index/${Folio}`);
      setData(response[0] || null);
      setHoja(2);
      setModal(true);

      setLoading(false);
   };
   const handleDatosCurriculares = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`datoscurriculares/index/${Folio}`);
      setData(response[0] || null);
      setHoja(3);
      setModal(true);
      setLoading(false);
   };
   const handleDatosEmpleo = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`datoscargoscomision/index/${Folio}`);
      setData(response[0] || null);
      setHoja(4);
      setModal(true);
      setLoading(false);
   };
   const handleDatosExperiencia = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`experiencialaboral/index/${Folio}`);
      setData(response || null);
      setHoja(5);
      setModal(true);
      setLoading(false);
   };
   const handleDatosPareja = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`datospareja/index/${Folio}`);
      setData(response[0] || null);
      setHoja(6);
      setModal(true);
      setLoading(false);
   };
   const handleDependientesEconomicos = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`dependienteseconomicos/index/${Folio}`);
      setData(response || null);
      setHoja(7);
      setModal(true);
      setLoading(false);
   };
   const handleIngresos = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`ingresos/index/${Folio}`);
      setData(response[0] || null);
      setHoja(8);
      setModal(true);
      setLoading(false);
   };
   const handleServidorPublico = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`servidorpublico/index/${Folio}`);
      setData(response[0] || null);
      setHoja(9);
      setModal(true);
      setLoading(false);
   };

   const handleBienesInmuebles = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`bienesinmuebles/index/${Folio}`);
      setData(response || null);
      setHoja(10);
      setModal(true);
      setLoading(false);
   };
   const handleVehiculos = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`vehiculos/index/${Folio}`);
      setData(response || null);
      setHoja(11);
      setModal(true);
      setLoading(false);
   };

   const handleBienesMuebles = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`bienesmuebles/index/${Folio}`);
      setData(response || null);
      setHoja(12);
      setModal(true);
      setLoading(false);
   };
   const handleInversiones = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`inversionescuentas/index/${Folio}`);
      setData(response || null);
      setHoja(13);
      setModal(true);
      setLoading(false);
   };
   const handleAdeudosPasivos = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`adeudospasivos/index/${Folio}`);
      setData(response || null);
      setHoja(14);
      setModal(true);
      setLoading(false);
   };
   const handlePrestamosComodatos = async (row) => {
      setLoading(true);

      const { Folio, Tipo_declaracion, Declaracion, Hoja } = row;
      localStorage.setItem(Declaracion == "Interes" ? "id_Intereses" : "id_SituacionPatrimonial", Folio);
      const response = await GetAxios(`prestamoscomodatos/index/${Folio}`);
      setData(response || null);
      setHoja(15);
      setModal(true);
      setLoading(false);
   };
   
   const moreButtons = [
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDatosGenerales,
         message: "Datos Generales",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDomiciloDeclarante,
         message: "Domicilio Declarante",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDatosCurriculares,
         message: "Datos Curriculares",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDatosEmpleo,
         message: "Empleo/Cargo Actual",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDatosExperiencia,
         message: "Experiencia laboral",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDatosPareja,
         message: "Datos de Pareja",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleDependientesEconomicos,
         message: "Dependientes Económicos",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleIngresos,
         message: "Ingresos Netos",
         conditions: ["Declaracion != 'Interes'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleServidorPublico,
         message: "Servidor Público",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'", "Tipo_declaracion=='Modificación'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleBienesInmuebles,
         message: "Bienes Inmuebles",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleVehiculos,
         message: "Vehículos",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleBienesMuebles,
         message: "Bienes Muebles",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleInversiones,
         message: "Cuentas/Valores",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handleAdeudosPasivos,
         message: "Adeudos/Pasivos",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      },
      {
         color: "#4285F4",
         icon: CiEdit,
         toltip: "Editar",
         handleButton: handlePrestamosComodatos,
         message: "Préstamos/Comodatos",
         conditions: ["Declaracion != 'Interes'", "Declaracion =='Completa'"]
      }
   ];

   return (
      <div className="relative min-h-screen">
         <div>
         <Box sx={{ 
  width: '100%',
  mb: 3,
  p: 3,
  backgroundColor: '#f8f9fa',
  borderRadius: 2,
  border: '1px solid #e0e0e0'
}}>
  {/* Encabezado */}

    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
      Hojas de la Declaración Completa/Simplificada
    </Typography>

  {/* Listado de hojas */}
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 1.5
  }}>
    {[
      '1. Datos Generales',
      '2. Domicilio Declarante',
      '3. Datos Curriculares',
      '4. Empleo/Cargo Actual',
      '5. Experiencia Laboral',
      '6. Datos de Pareja',
      '7. Dependientes Económicos',
      '8. Ingresos Netos',
      '9. Servidor Público',
      '10. Bienes Inmuebles',
      '11. Vehículos',
      '12. Bienes Muebles',
      '13. Cuentas/Valores',
      '14. Adeudos/Pasivos',
      '15. Préstamos/Comodatos'
    ].map((item, index) => (
      <Paper 
        key={index}
        elevation={0}
        sx={{
          p: 1.5,
          borderLeft: '4px solid',
          borderColor:  '#4285F4',
          backgroundColor:  'white',
          '&:hover': { backgroundColor: '#f5f5f5' }
        }}
      >
        <Typography 
          variant="body2"
          sx={{ 
            fontWeight:  'normal',
            color:  'inherit'
          }}
        >
          {item}
        
        </Typography>
      </Paper>
    ))}
  </Box>
  <Box sx={{ 
    display: 'flex',
    alignItems: 'center',
    mb: 2,
    mt:4
  }}>
    <Button 
    onClick={init}
      variant="outlined" 
      size="small"
      sx={{ 
        borderColor: '#4285F4',
        color: '#4285F4',
        '&:hover': { borderColor: '#3367D6' }
      }}
    >
      Actualizar tabla 
    </Button>
  </Box>
  {/* Nota al pie */}
  
</Box>


            <DataTable
               moreButtons={moreButtons}
               buttonsMenu={true}
               loading={loading}
               filterGlobal={true}
               filter={true}
               headers={["Folio","Hoja en la que va", "Nombre completo", "Tipo declaración", "Declaracion", "Fecha", "Tipo de declaración"]}
               data={declaraciones}
               dataHidden={["fechaAlta","Nombre","ApMaterno","ApPaterno"]}
               pagination={[10, 25, 50, 100, 200]}
            />
         </div>

         <Dialog fullScreen open={modal} style={{'overflow':'auto'}} onClose={setModal} TransitionComponent={Transition}>
            {hoja == 1 && <DatosGenerales data={data} loading={true}  next={()=>{setModal(false)}}/>}
            {hoja == 2 && <DomicilioDeclarante data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 3 && <DatosCurriculares data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 4 && <DatosEmpleo data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 5 && <ExperienciaLaboral data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 6 && <DatosParejas data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 7 && <DependientesEconomicos data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 8 && <IngresosNetos data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 9 && <ServidorPublico data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 10 && <BienesInmuebles data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 11 && <TipoVehiculo data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 12 && <BienesMuebles data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 13 && <InversionesCuentasValores data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 14 && <AdeudosPasivos data={data} loading={true}  next={()=>{setModal(false)}} />}
            {hoja == 15 && <PrestamosComodatos data={data} loading={true}  next={()=>{setModal(false)}} />}

            <Button
               onClick={() => {
                  setModal(false);
               }}
            >
               Cancelar
            </Button>
         </Dialog>
      </div>
   );
};

export default Administrativo;
