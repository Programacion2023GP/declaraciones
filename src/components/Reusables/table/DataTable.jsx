import { Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { Chart } from "../charts/Charts";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import Loading from "../loading/Loading";
import DehazeIcon from "@mui/icons-material/Dehaze";
import BarChartIcon from "@mui/icons-material/BarChart";
import BasicMenu from "../basicmenu/BasicMenu";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import * as XLSX from "xlsx";
import { Voice } from "../formik/FormikForm";
import { lightBlue } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Swal from "sweetalert2";

const SearchInput = ({ column, data, getData, previousData }) => {
   const [searchText, setSearchText] = useState("");
   const [previousDataFilter, setPreviousDataFilter] = useState(data);
   useEffect(() => {});
   const searchData = (event) => {
      const newValue = event.target.value;
      setSearchText(newValue);

      if (getData) {
         getData(column, event.target.value);
      }
   };

   const handleClear = () => {
      setSearchText("");
      if (previousData) {
         getData(previousData);
      }
   };

   return (
      <Box sx={{ width: "100%", height: "100%" }}>
         <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <SearchIcon sx={{ color: "action.active", mr: 0.5, my: 0.5 }} />
            <TextField
               fullWidth // Asegura que el TextField ocupe todo el ancho disponible
               value={searchText}
               onChange={searchData}
               id="input-with-sx"
               label="Buscar"
               variant="standard"
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        <IconButton onClick={handleClear}>{/* <ClearIcon /> Descomenta esto si quieres el icono de borrar */}</IconButton>
                     </InputAdornment>
                  )
               }}
            />
         </Box>
      </Box>
   );
};

const Title = ({ headers, titles, data, filterData, previousData, filter, editButton, deleteButton, speakRow, moreButtons }) => {
   const [titlesMap, setTitlesMap] = useState([]);
   const [headersMap, setHeadersMap] = useState([]);
   useEffect(() => {
      let initialHeaders = null;
      if (titles && titles.length > 0) {
         const initialTitles = titles[0].titles || [];
         initialHeaders = titles[0].headers && titles[0].headers.length > 0 ? titles[0].headers[0] : initialTitles;

         setTitlesMap(initialTitles);
      }
      setHeadersMap(headers ? headers : initialHeaders);
      // Manejar el caso cuando titles no tiene elementos
   }, [titles, titlesMap, headersMap, headers, editButton, deleteButton]);
   return (
      <>
         <thead>
            <tr style={{ background: "black", color: "white", width: "100%" }}>
               <Ngif condition={speakRow}>
                  <th key={uuidv4()} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
                     Leer
                  </th>
               </Ngif>
               {headersMap.map((title) => {
                  return (
                     <th key={"headers" + title} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                     </th>
                  );
               })}
               {headersMap.length > 0 && (editButton || deleteButton || moreButtons) && (
                  <th key={"headersMap" + uuidv4()} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
                     Acciones
                  </th>
               )}
            </tr>
            <tr>
               <Ngif condition={speakRow}>
                  <th
                     key={"titlesMap" + uuidv4()}
                     style={{
                        border: "1px solid #BDBDBD",
                        height: "fit-content"
                     }}
                  ></th>
               </Ngif>
               {filter &&
                  titlesMap.map((title) => {
                     return (
                        <th
                           key={"titlesMap" + title}
                           style={{
                              marginLeft: "15rem",
                              marginRight: "15rem",
                              // paddingLeft: ".3rem",
                              // paddingRight: ".3rem",

                              border: "1px solid #BDBDBD",
                              height: "fit-content"
                           }}
                        >
                           <SearchInput previousData={previousData} column={title} data={data} getData={filterData} />
                        </th>
                     );
                  })}
               {filter && (editButton || deleteButton || moreButtons) && (
                  <th key={uuidv4()} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}></th>
               )}
            </tr>
         </thead>
      </>
   );
};
const neon = {
   color: "#00e6e6",
   border: "1px solid #00e6e6",
   textShadow: "0 0 5px #00e6e6",
   transition: "all 0.3s ease",
   "&:hover": {
      color: "#fff",
      backgroundColor: "#00e6e6",
      boxShadow: "0 0 10px #00e6e6, 0 0 20px #00e6e6, 0 0 30px #00e6e6"
   }
};
const neonText = {
   color: "#00e6e6",
   // border: "1px solid #00e6e6",
   textShadow: "0 0 30px #00e6e6",
   transition: "all 0.3s ease",
   padding: ".5rem"
   // "&:hover": {
   //    color: "#fff",
   //    backgroundColor: "#00e6e6",
   //    boxShadow: "0 0 10px #00e6e6, 0 0 20px #00e6e6, 0 0 30px #00e6e6"
   // }
};

const Paginator = ({ pagination, handleChange, page, pages, previous, next, dataFilter, selectRow }) => {
   useEffect(() => {}, [pagination]);
   const pagesOfItems = (option) => {
      handleChange(option);
   };
   const previousPage = () => {
      previous();
   };
   const nextPage = () => {
      next();
   };

   return (
      <>
         <Stack color={"white"} spacing={1} direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
            <Typography variant="subtitle2" sx={neonText}>
               Pagina {dataFilter == 0 ? "0" : page} de {pages}
            </Typography>
            <Stack spacing={1} direction="row" alignItems="center">
               <NeonButton onClick={previousPage}>Anterior</NeonButton>
               <NeonButton onClick={nextPage}>Siguiente</NeonButton>
               <Typography variant="subtitle2" sx={neonText}>
                  Mostrando {selectRow >= dataFilter ? dataFilter : selectRow} de {dataFilter}
               </Typography>
            </Stack>
            {pagination && <PaginatorSelect pagination={pagination} selectOption={pagesOfItems} />}
         </Stack>
      </>
   );
};
const NeonButton = ({ onClick, children }) => {
   return (
      <Button size="small" onClick={onClick} variant="text" sx={neon}>
         {children}
      </Button>
   );
};
const PaginatorSelect = ({ pagination, selectOption }) => {
   const [select, setSelect] = useState(pagination[0]);
   const handleChange = (event) => {
      setSelect(event.target.value);
      selectOption(event.target.value);
   };
   const neonFormalSelect = {
      color: "#00e6e6", // Color del texto neón brillante
      border: "1px solid #00e6e6", // Borde neón
      textShadow: "0 0 3px #00e6e6", // Sombra del texto neón
      transition: "all 0.3s ease",
      fontSize: "16px", // Tamaño del texto
      fontWeight: "bold", // Negrita
      backgroundColor: "#102840", // Azul oscuro para mejor contraste

      "&:hover": {
         color: "#ffffff",
         backgroundColor: "#10355A",
         boxShadow: "0 0 10px #00e6e6, 0 0 20px #00e6e6" // Resplandor más sutil en hover
      }
   };

   const neonFormalInputLabel = {
      color: "#00e6e6", // Color del texto neón brillante
      fontSize: "16px", // Tamaño del texto
      fontWeight: "bold" // Negrita
   };

   const neonFormalMenuItem = {
      color: "#00e6e6", // Color del texto neón brillante
      // backgroundColor: "#102840", // Azul oscuro para mejor contraste
      textShadow: "0 0 3px #00e6e6", // Sombra del texto neón
      fontSize: "16px", // Tamaño del texto
      fontWeight: "bold" // Negrita
      // "&:hover": {
      //    backgroundColor: "#10355A" // Cambiar el fondo en hover
      // }
   };

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx={neonFormalInputLabel}>
               Mostrar
            </InputLabel>
            <Select
               size="small"
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               value={select}
               label="Mostrar"
               onChange={handleChange}
               sx={neonFormalSelect}
            >
               {pagination.map((item) => (
                  <MenuItem key={item} value={item} sx={neonFormalMenuItem}>
                     {item}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   );
};

const FilterGlobal = ({ data = [], setFilteredData, dataHidden = [] }) => {
   const [searchText, setSearchText] = useState("");
   useEffect(() => {}, []);
   const searchData = (event) => {
      const newValue = event.target.value;
      if (event.target.value.length < 0) {
         setFilteredData(newFilteredData);
         return;
      }
      setSearchText(newValue);

      // Filtrar los datos basados en el texto de búsqueda
      const newFilteredData = data.filter((item) => {
         for (const key in item) {
            if (item.hasOwnProperty(key) && !dataHidden.includes(key) && String(item[key]).toLowerCase().includes(newValue.toLowerCase())) {
               return true;
            }
         }
         return false;
      });

      setFilteredData(newFilteredData);
   };

   const handleClear = () => {
      setSearchText("");
      if (previousData) {
         getData(previousData);
      }
   };

   return (
      <Box sx={{ "& > :not(style)": { m: 1 }, width: "100%" }}>
         <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
               fullWidth
               size="small"
               value={searchText}
               onChange={searchData}
               id="input-with-sx"
               label="Buscador"
               variant="standard"
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        {/* <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton> */}
                     </InputAdornment>
                  )
               }}
            />
         </Box>
      </Box>
   );
};

const DataTable = ({
   data = [],
   dataHidden = [],
   headers = [],
   pagination,
   options = [],
   filter,
   editButton,
   deleteButton,
   handleEdit,
   handleDelete,
   captionButtons = [],
   captionFilters = <></>,
   filterGlobal,
   conditionExistEditButton = [],
   conditionExistDeleteButton = [],
   loading,
   moreButtons = [],
   Trbacground = [],
   link = [],
   buttonsMenu = false,
   speakRow = false
}) => {
   const [reinitializedData, setReinitializedData] = useState(data);
   const [dataFilter, setDataFilter] = useState(data);
   const [titles, setTitles] = useState([]);
   const [dataTable, setDataTable] = useState([]);
   const [totalPages, setTotalPages] = useState([]);
   const [numberShowPage, setNumberShowPage] = useState(1);
   const [selectRow, setSelectRow] = useState(pagination ? pagination[0] : 100000);
   const [objectValues, setObjectValues] = useState({});
   const [tdRead, setTdRead] = useState(null);
   const [line, setLine] = useState(null);

   const handleSeparateData = async (option) => {
      modifiedData(dataFilter);
      setSelectRow(option);
   };
   const handleDeleteSecurity = (item) => {
      Swal.fire({
         title: "¿Estás seguro?",
         text: "Una vez eliminado, ¡no podrás recuperar la informacion!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Sí, eliminarlo",
         cancelButtonText: "No, cancelar",
         reverseButtons: true
      }).then((result) => {
         if (result.isConfirmed) {
            // Aquí pones la lógica para eliminar el elemento, por ejemplo, una llamada a una API

            handleDelete(item);
         } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelado", "", "error");
         }
      });
   };

   const applyFilters = (page = null) => {
      const filters = data.filter((item) => {
         return Object.entries(objectValues).every(([col, val]) => {
            if (dataHidden.includes(col)) {
               return true; // Ignora esta columna para el filtro
            }
            const itemValue = String(item[col]).toUpperCase().trim();
            const filterValue = String(val).toUpperCase().trim();
            return itemValue.includes(filterValue);
         });
      });
      if (page > 0) {
         modifiedData(filters, page);
      } else {
         modifiedData(filters);
      }
   };
   const applyfilterGlobal = (data, page = null) => {
      setDataFilter(data);
      // modifiedData(data,1);
   };
   const filterData = (column, value) => {
      // Actualizamos el estado de objectValues con los nuevos valores de filtro
      setObjectValues((prevState) => ({
         ...prevState,
         [column]: value
      }));
   };
   // setDataFilter(dataSelected)
   // modifiedData(dataSelected)

   const previous = () => {
      if (numberShowPage > 1) {
         const page = numberShowPage - 1;

         setNumberShowPage(page);
         if (Object.keys(objectValues).length !== 0) {
            applyFilters(page);
         } else {
            modifiedData(dataFilter, page);
         }
      }
   };

   const next = () => {
      if (numberShowPage < totalPages) {
         const page = numberShowPage + 1;
         setNumberShowPage(page);
         if (Object.keys(objectValues).length !== 0) {
            applyFilters(page);
         } else {
            modifiedData(dataFilter, page);
         }
      }
   };

   const handleShowData = (page = 1, data = false) => {
      const showData = data.filter((column) => column.page === page);
      if (showData.length > 0 && showData[0].hasOwnProperty("items")) {
         setDataTable(showData[0].items);
         // setLoading(false);
      } else {
         setDataTable([]);
      }
   };

   const modifiedData = (data, pagina = 1) => {
      let newTitles = [];
      const firstItem = data[0];

      if (firstItem) {
         if (dataHidden) {
            newTitles = Object.keys(firstItem).filter((item) => !dataHidden.includes(item));
         } else {
            newTitles = Object.keys(firstItem);
         }
         if (headers) {
            const titlesHeaders = [{ titles: newTitles, headers: [headers] }];
            setTitles(titlesHeaders);
         } else {
            setTitles([{ titles: newTitles, headers: [] }]);
         }
      }

      let index = 0;
      let page = 0;
      const datas = [];

      if (!Array.isArray(data)) {
         return;
      }

      data.map((item, i) => {
         if (selectRow === index || i === 0) {
            index = 0;
            page++;
            datas.push({ page, items: [] });
         }
         const pageIndex = datas.findIndex((data) => data.page === page);
         datas[pageIndex].items.push(item);
         index++;
      });
      const totalPages = datas.length; // Calcular el total de páginas aquí
      setTotalPages(totalPages);
      handleShowData(pagina, datas);
   };
   const handleOptions = () => {};
   const [textModal, setTextModal] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const handleTextModal = (event) => {
      setTextModal(event.target.value);
   };

   const checkConditions = (item) => {
      return conditionExistEditButton.every((condition) => {
         const match = condition.match(/(.+?)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'/);
         if (!match) return false;

         const [, key, operator, value] = match;
         const itemValue = item[key.trim()];

         switch (operator) {
            case "!=":
               return itemValue != value;
            case "==":
               return itemValue == value;
            case ">=":
               return itemValue >= value;
            case "<=":
               return itemValue <= value;
            case ">":
               return itemValue > value;
            case "<":
               return itemValue < value;
            default:
               return false;
         }
      });
   };
   const checkConditionsMoreButton = (item, conditions) => {
      // Si no hay condiciones, devolver true
      if (conditions.length === 0) {
         return true;
      }

      // Función auxiliar para evaluar una sola condición
      const evaluateCondition = (condition) => {
         // Verificar si la condición utiliza operadores lógicos AND (&&) o OR (||)
         if (condition.includes("&&")) {
            // Se utilizó AND
            const andParts = condition.split("&&").map((part) => part.trim());
            return andParts.every((andCondition) => evaluateSimpleCondition(andCondition));
         } else if (condition.includes("||")) {
            // Se utilizó OR
            const orParts = condition.split("||").map((part) => part.trim());
            return orParts.some((orCondition) => evaluateSimpleCondition(orCondition));
         } else {
            // Sin operadores lógicos específicos, se asume una única condición
            return evaluateSimpleCondition(condition);
         }
      };

      // Función para evaluar una condición simple (sin operadores lógicos)
      const evaluateSimpleCondition = (condition) => {
         const match = condition.match(/^\s*([^!=<>]+)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'\s*$/);
         if (!match) return false;

         const [, key, operator, value] = match;
         const trimmedKey = key.trim();
         const trimmedValue = value.trim();
         const itemValue = item[trimmedKey];

         switch (operator) {
            case "!=":
               return itemValue != trimmedValue; // Comparación de desigualdad
            case "==":
               return itemValue == trimmedValue; // Comparación de igualdad
            case ">=":
               return itemValue >= trimmedValue; // Mayor o igual que
            case "<=":
               return itemValue <= trimmedValue; // Menor o igual que
            case ">":
               return itemValue > trimmedValue; // Mayor que
            case "<":
               return itemValue < trimmedValue; // Menor que
            default:
               return false;
         }
      };

      // Evaluar todas las condiciones con operadores lógicos AND y OR
      return conditions.every((condition) => evaluateCondition(condition));
   };

   const checkConditionsDelete = (item) => {
      return conditionExistDeleteButton.every((condition) => {
         const match = condition.match(/(.+?)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'/);
         if (!match) return false;

         const [, key, operator, value] = match;
         const itemValue = item[key.trim()];

         switch (operator) {
            case "!=":
               return itemValue != value;
            case "==":
               return itemValue == value;
            case ">=":
               return itemValue >= value;
            case "<=":
               return itemValue <= value;
            case ">":
               return itemValue > value;
            case "<":
               return itemValue < value;
            default:
               return false;
         }
      });
   };
   useEffect(() => {
      // if (dataFilter.length == 0) {
      //    setDataFilter(data);
      // }
      const init = () => {
         if (Object.keys(objectValues).length !== 0) {
            applyFilters(objectValues);
         } else {
            modifiedData(dataFilter);
         }
      };
      init();
      setNumberShowPage(1);
   }, [selectRow, pagination, headers, objectValues, dataFilter]);
   useEffect(() => {}, [loading, Trbacground]);
   useEffect(() => {
      setDataFilter(data);
      const init = () => {
         if (Object.keys(objectValues).length !== 0) {
            applyFilters(objectValues);
         } else {
            modifiedData(dataFilter);
         }
      };
      init();
      setNumberShowPage(1);
   }, [data]);
   const modal = (event) => {
      setOpenModal(true);
   };
   const speakingRow = (arr1, obj, arr3) => {
      const filteredValues = Object.entries(obj)
         .filter(([key, value]) => !arr3.includes(key))
         .map(([key, value]) => value);

      let intercalado = [];
      let maxLength = Math.max(arr1.length, filteredValues.length);

      for (let i = 0; i < maxLength; i++) {
         if (i < arr1.length) {
            intercalado.push(arr1[i]);
         }
         if (i < filteredValues.length) {
            intercalado.push(filteredValues[i]);
         }
      }

      return intercalado;
   };

   const bacgroundColor = (item) => {
      let result = ""; // Inicializamos una variable para almacenar el resultado

      Trbacground.some((color) => {
         // Utilizamos .some() en lugar de .map()
         if (checkConditionsMoreButton(item, color.conditions)) {
            result = color.color; // Asignamos el color si la condición es verdadera
            return true; // Terminamos la iteración con .some()
         }
         return false; // Continuamos la iteración con .some()
      });

      return result; // Devolvemos el resultado encontrado (o cadena vacía si no se encontró nada)
   };

   return (
      <>
         <table width={"100%"} style={{ borderCollapse: "collapse" }}>
            <caption>
               <div style={{ marginLeft: "2rem", marginTop: ".5rem", display: "flex", justifyContent: "flex-start" }}>
                  <Ngif condition={captionFilters}> {captionFilters}</Ngif>

                  <Ngif condition={captionButtons.length > 0}>
                     {captionButtons.map((item, index) => {
                        console.log(item);
                        return (
                           <Button
                              key={index} // Añadir una key única
                              variant="outlined"
                              startIcon={<item.icon />}
                              onClick={() => {
                                 item.handleButton(dataFilter);
                              }}
                           >
                              {item.text}
                           </Button>
                        );
                     })}
                  </Ngif>
               </div>
               <div style={{ display: "flex", alignItems: "center" }}>
                  {filterGlobal && <FilterGlobal data={data} setFilteredData={applyfilterGlobal} dataHidden={dataHidden} onChange={handleOptions} />}
                  <Ngif condition={options.length > 0}>
                     <Box sx={{ minWidth: 120, marginLeft: "auto", marginTop: "1rem", marginBottom: ".5rem" }}>
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Opciones</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={textModal}
                              onChange={handleTextModal}
                              onClick={modal}
                              label="Opciones"
                           >
                              {options.includes("COLORS") && (
                                 <MenuItem sx={{ textAlign: "center" }} key="colors" value="colors">
                                    <Tooltip placement="left" title="PDF">
                                       <ColorLensIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                                       PALETA DE COLORES
                                    </Tooltip>
                                 </MenuItem>
                              )}
                              {options.includes("CHARTS") && (
                                 <MenuItem key="grafica" value="grafica">
                                    <Tooltip placement="left" title="GRAFICAS">
                                       <BarChartIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                                       Graficas
                                    </Tooltip>
                                 </MenuItem>
                              )}
                              {options.includes("EXCEL") && (
                                 <MenuItem sx={{ textAlign: "center" }} key="excel" value="excel">
                                    <Tooltip placement="left" title="EXCEL">
                                       <svg
                                          style={{ verticalAlign: "middle", marginRight: 1 }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          fill="currentColor"
                                          className="bi bi-file-earmark-excel"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                                          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                                       </svg>
                                       Excel
                                    </Tooltip>
                                 </MenuItem>
                              )}
                              {/* {options.includes("PDF") && (
                                 <MenuItem sx={{ textAlign: "center" }} key="pdf" value="pdf">
                                    <Tooltip placement="left" title="PDF">
                                       <PictureAsPdfIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                                       PDF
                                    </Tooltip>
                                 </MenuItem>
                              )} */}
                           </Select>
                        </FormControl>
                     </Box>
                  </Ngif>
               </div>
            </caption>

            {titles.length > 0 || headers.length > 0 ? (
               <Title
                  speakRow={speakRow}
                  editButton={editButton}
                  deleteButton={deleteButton}
                  moreButtons={moreButtons.length > 0 ? true : false}
                  headers={headers}
                  titles={titles}
                  previousData={data}
                  data={dataFilter}
                  filterData={filterData}
                  filter={filter}
               ></Title>
            ) : (
               <thead>
                  <tr>
                     <th>No hay titulos cargados ...</th>
                  </tr>
               </thead>
            )}

            {data.length === 0 || dataTable.length === 0 ? (
               <tbody style={{ position: "relative" }}>
                  <tr>
                     <Ngif condition={loading}>
                        <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, top: -10 }}>
                           <Loading />
                        </Box>
                     </Ngif>
                     <td colSpan={headers.length + 1 + (speakRow ? 1 : 0)} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>
                        <Ngif condition={!loading}>No hay información suficiente no hay registros</Ngif>
                     </td>
                  </tr>
               </tbody>
            ) : (
               <tbody>
                  {dataTable.map((item, index) => {
                     return (
                        <>
                           <tr
                              key={index}
                              style={{
                                 position: "relative",
                                 background: bacgroundColor(item)
                              }}
                           >
                              <Ngif condition={speakRow}>
                                 <td
                                    style={{
                                       textAlign: "center",
                                       border: "1px solid #BDBDBD",
                                       fontSize: "13px",

                                       // paddingLeft: "5px",
                                       // paddingRight: "5px",
                                       margin: 0
                                    }}
                                    key={"voice" + index}
                                    cols={1}
                                 >
                                    <Voice
                                       setLine={setLine}
                                       line={index}
                                       message={speakingRow(headers, item, dataHidden)}
                                       title="Formulario"
                                       flex={false}
                                       velocity={1.45}
                                       setSpeaking={setTdRead}
                                    />
                                 </td>
                              </Ngif>
                              {Object.entries(item).map(([key, value], id) => {
                                 if (dataHidden) {
                                    if (!dataHidden.includes(key)) {
                                       return (
                                          <td
                                             style={{
                                                textAlign: "center",
                                                border: "1px solid #BDBDBD",
                                                fontSize: tdRead === id && line == index ? "16px" : "13px",
                                                paddingLeft: "5px",
                                                paddingRight: "5px",
                                                margin: 0,
                                                color: tdRead === id && line == index && lightBlue[600],
                                                fontWeight: tdRead === id && line == index && "bold"
                                             }}
                                             cols={value}
                                          >
                                             {link.includes(id) ? <a href={value}>{value}</a> : <>{value}</>}
                                          </td>
                                       );
                                    }
                                 } else {
                                    return (
                                       <td
                                          style={{
                                             textAlign: "center",
                                             border: "1px solid #BDBDBD",
                                             fontSize: tdRead === id && line == index ? "16px" : "13px",
                                             paddingLeft: "5px",
                                             paddingRight: "5px",
                                             margin: 0,
                                             color: tdRead === id && line == index && lightBlue[600],
                                             fontWeight: tdRead === id && line == index && "bold"
                                          }}
                                          cols={value}
                                       >
                                          {link.includes(id) ? <a href={value}>{value}</a> : <>{value}</>}
                                       </td>
                                    );
                                 }
                              })}
                              {(editButton || deleteButton || moreButtons) && (
                                 <td style={{ textAlign: "center", border: "1px solid #BDBDBD", padding: 0, margin: 0 }}>
                                    <Ngif condition={buttonsMenu}>
                                       <BasicMenu>
                                          <Ngif condition={editButton && checkConditions(item)}>
                                             <MenuItem
                                                onClick={() => {
                                                   handleEdit(item);
                                                }}
                                             >
                                                <EditButton handleEdit={handleEdit} item={item} />
                                             </MenuItem>
                                          </Ngif>
                                          <Ngif condition={deleteButton && checkConditionsDelete(item)}>
                                             <MenuItem
                                                onClick={() => {
                                                   handleDeleteSecurity(item);
                                                }}
                                             >
                                                <DeleteButton handleDelete={handleDelete} item={item} />
                                             </MenuItem>
                                             <MoreButtons
                                                item={item}
                                                moreButtons={moreButtons}
                                                checkConditionsMoreButton={checkConditionsMoreButton}
                                                buttonsMenu={buttonsMenu}
                                             />
                                          </Ngif>
                                       </BasicMenu>
                                    </Ngif>
                                    <Ngif condition={!buttonsMenu}>
                                       <Ngif condition={editButton && checkConditions(item)}>
                                          <EditButton handleEdit={handleEdit} item={item} />
                                       </Ngif>
                                       <Ngif condition={deleteButton && checkConditionsDelete(item)}>
                                          <DeleteButton handleDelete={handleDeleteSecurity} item={item} />
                                       </Ngif>

                                       <Ngif condition={moreButtons.length > 0}>
                                          <MoreButtons item={item} moreButtons={moreButtons} checkConditionsMoreButton={checkConditionsMoreButton} />
                                       </Ngif>
                                    </Ngif>
                                 </td>
                              )}
                              <Ngif condition={loading && index === Math.floor(dataTable.length / 2)}>
                                 <Box sx={{ position: "absolute", left: 0, right: 0, bottom: -10, top: 0 }}>
                                    <Loading />
                                 </Box>
                              </Ngif>
                           </tr>
                        </>
                     );
                  })}
               </tbody>
            )}
            {pagination && (
               <tfoot>
                  <tr>
                     <td
                        colSpan={headers.length + (editButton || deleteButton || moreButtons.length > 0 ? 1 : 0) + (speakRow ? 1 : 0)}
                        style={{ border: "1px solid #BDBDBD", padding: "0.5rem", textAlign: "center", background: "black" }}
                     >
                        <Paginator
                           selectRow={selectRow}
                           dataFilter={dataFilter.length}
                           pagination={pagination}
                           handleChange={handleSeparateData}
                           pages={totalPages}
                           previous={previous}
                           next={next}
                           page={numberShowPage}
                        />
                     </td>
                  </tr>
               </tfoot>
            )}
         </table>
         {/* {pagination && (
               <div
               style={{
                  width: "100%", // Asegura que el paginator ocupe todo el ancho del contenedor
                  alignSelf: "center", // Centra el paginator
                  border: "1px solid #BDBDBD",
                  background: "#F9FAFB",
                  display: "flex", // Asegura que los elementos internos se alineen correctamente
                  justifyContent: "center" // Centra los elementos internos
               }}
               >
               <Paginator
                  selectRow={selectRow}
                  dataFilter={dataFilter.length}
                  pagination={pagination}
                  handleChange={handleSeparateData}
                  pages={totalPages}
                  previous={previous}
                  next={next}
                  page={numberShowPage}
               />
                </div>
            )} */}
         <Ngif condition={options}>
            <Modal openModal={openModal} setText={setTextModal} setOpenModal={setOpenModal}>
               <Component option={textModal} titles={headers} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} colors={Trbacground} />
            </Modal>
         </Ngif>
      </>
      // (
      //    <div className="" style={{ maxWidth: "fit-content", display: "flex", flexDirection: "column", overflow: "auto" }}>
      //       <table style={{ borderCollapse: "collapse" }}>
      //          <tbody>

      //          </tbody>
      //       </table>

      // )
   );
};

const MoreButtons = ({ item, moreButtons, checkConditionsMoreButton, buttonsMenu = false }) => {
   useEffect(() => {}, [moreButtons]);
   return (
      <>
         {moreButtons.map((element, i) => {
            if (checkConditionsMoreButton(item, element.conditions)) {
               if (!checkConditionsMoreButton(item, element.conditions)) {
                  return null;
               }
               return (
                  <>
                     <Ngif condition={buttonsMenu}>
                        <MenuItem
                           onClick={() => {
                              element.handleButton(item);
                           }}
                        >
                           Profile
                        </MenuItem>
                     </Ngif>
                     <Ngif condition={!buttonsMenu}>
                        <Tooltip title={element.toltip} placement="top-start">
                           <IconButton
                              style={{ color: element.color }}
                              onClick={() => {
                                 element.handleButton(item);
                              }}
                              variant="outlined"
                           >
                              <element.icon />
                              {element.message}
                           </IconButton>
                        </Tooltip>
                     </Ngif>
                  </>
               );
            }
         })}
      </>
   );
};

const EditButton = ({ handleEdit, item }) => {
   return (
      <IconButton
         aria-label="edit"
         color="warning"
         onClick={() => {
            handleEdit(item);
         }}
      >
         <EditIcon style={{ color: "orange" }} />
      </IconButton>
   );
};
const DeleteButton = ({ handleDelete, item }) => {
   return (
      <IconButton
         aria-label="delete"
         color="warning"
         onClick={() => {
            handleDelete(item);
         }}
      >
         <DeleteIcon style={{ color: "red" }} />
      </IconButton>
   );
};

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ children, openModal, setOpenModal, setText, close = true }) => {
   useEffect(() => {}, [openModal]);
   const handleClose = () => {
      setOpenModal(false);
      if (setText) {
         setText("");
      }
   };
   return (
      <>
         <Dialog
            fullWidth
            maxWidth={"xl"}
            open={openModal}
            TransitionComponent={Transition} // Corregir la asignación de la transición
            keepMounted
            onClose={openModal}
            aria-describedby="alert-dialog-slide-description"
         >
            {/* <DialogTitle>{"Se a presentado un error"}</DialogTitle> */}
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Ngif condition={close}>
                  <Button onClick={handleClose}>Cerrar</Button>
               </Ngif>
            </DialogActions>
         </Dialog>
      </>
   );
};

const Charts = ({ titles, dataFilter, headers, dataHidden }) => {
   const [keys, setKeys] = useState([]);
   const [counts, setCounts] = useState([]);
   const [message, setMessage] = useState("");
   useEffect(() => {}, [keys, counts]);
   const [chart, setChart] = useState(null);
   const [name, setName] = useState(null);
   const handleChangeChart = (event) => {
      setChart(event.target.value);
   };
   const countOccurrences = (array) => {
      const occurrences = {};

      // Contar las ocurrencias de cada valor en el array
      array.forEach((value) => {
         occurrences[value] = (occurrences[value] || 0) + 1;
      });

      // Convertir el objeto de ocurrencias en dos arrays separados
      const values = Object.keys(occurrences);
      const counts = values.map((value) => occurrences[value]);

      return { values, counts };
   };

   const handleChangeName = (event) => {
      setName(event.target.value);
      const index = titles.indexOf(event.target.value);

      // Filtrar los datos primero
      const filteredData = dataFilter.map((item) => {
         const newItem = { ...item };

         // Eliminar las claves especificadas en dataHidden
         dataHidden.forEach((key) => {
            delete newItem[key];
         });

         return newItem;
      });

      // Extraer los valores correspondientes del array de objetos filtrados
      const values = filteredData.map((item) => {
         // Obtener las claves del objeto como un array
         const keys = Object.keys(item);

         // Usar el índice para seleccionar la clave correcta y extraer el valor correspondiente
         return item[keys[index]];
      });

      // Contar las ocurrencias de cada valor y separar en dos arrays
      const { values: uniqueValues, counts } = countOccurrences(values);

      // Ordenar por counts de forma descendente
      const sortedIndices = counts.map((_, index) => index).sort((a, b) => counts[b] - counts[a]);

      // Obtener los 20 valores más altos
      sortedIndices.length > 20 ? setMessage("Se han mostrado solo los 20 valores más altos.") : setMessage("");
      const limitedIndices = sortedIndices.slice(0, 20);

      const limitedUniqueValues = limitedIndices.map((index) => uniqueValues[index]);
      const limitedCounts = limitedIndices.map((index) => counts[index]);

      // Hacer lo que necesites con uniqueValues y counts limitados a los 20 más altos
      setKeys(limitedUniqueValues);
      setCounts(limitedCounts);

      // setData(values);
   };

   const filterData = (dataFilter, dataHidden) => {
      return dataFilter.map((item) => {
         const newItem = { ...item };
         dataHidden.forEach((key) => {
            delete newItem[key];
         });
         return newItem;
      });
   };

   return (
      <Grid container spacing={1} sx={{ marginTop: "2rem" }}>
         <Grid
            item
            xs={12}
            lg={5}
            sx={{
               marginBottom: "2rem",
               marginLeft: "2rem",
               marginRight: "2rem",
               overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
               border: "2px solid #007bff",
               borderRadius: "10px",
               padding: "1rem",
               paddingRight: "2rem",
               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <Box sx={{ minWidth: 120, marginLeft: "auto" }}>
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Selecciona la grafica</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     // value={textModal}

                     // onChange={handleTextModal}
                     onChange={handleChangeChart}
                     label="Selecciona la grafica"
                  >
                     <MenuItem key={"column"} selected value={"column"}>
                        {"columna"}
                     </MenuItem>
                     <MenuItem key={"bar"} selected value={"bar"}>
                        {"barra"}
                     </MenuItem>
                     <MenuItem key={"pie"} selected value={"pie"}>
                        {"pastel"}
                     </MenuItem>
                     <MenuItem key={"area"} selected value={"area"}>
                        {"area"}
                     </MenuItem>
                     <MenuItem key={"line"} selected value={"line"}>
                        {"linea"}
                     </MenuItem>
                  </Select>
               </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, marginLeft: "auto", marginTop: "1rem" }}>
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">¿Qué quieres graficar?</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     // value={textModal}
                     onChange={handleChangeName}
                     label="¿Qué quieres graficar?"
                  >
                     {titles.map((item) => (
                        <MenuItem key={item} value={item}>
                           {item}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Box>
         </Grid>
         <Grid
            item
            xs={12}
            lg={6}
            sx={{
               marginBottom: "2rem",

               overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
               border: "2px solid #007bff",
               borderRadius: "10px",
               padding: "1rem",
               paddingRight: "2rem",
               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <Ngif condition={chart != null && name != null}>
               <Ngif condition={message != ""}>
                  <Alert severity="info">{message}</Alert>
               </Ngif>

               <Chart chart={chart} name={name} titles={keys} values={counts} card={true} width={12} />
            </Ngif>
         </Grid>
      </Grid>
   );
};
const Component = ({ option, titles, dataFilter, headers, dataHidden, colors }) => {
   switch (option) {
      case "grafica":
         return <Charts titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />;
         break;
      case "excel":
         return <Excel titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />;
      case "colors":
         return <Colors colors={colors} />;
         break;
   }
};

const Colors = ({ colors }) => {
   useEffect(() => {}, []);
   return (
      <Grid container>
         <Typography variant="h2" color="initial" width={"100%"} textAlign={"center"}>
            Paleta de colores
         </Typography>
         {colors.map((color) => {
            return (
               <Paper
                  elevation={3}
                  sx={{
                     width: "8rem",
                     borderRadius: "20%",
                     transition: "transform 0.3s ease-in-out",
                     "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                     },
                     height: "8rem",
                     margin: "1rem",
                     background: color.color,
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"
                  }}
               >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} display="flex" textAlign="center">
                     {color.text}
                  </Typography>
               </Paper>
            );
         })}
      </Grid>
   );
};

const Excel = ({ titles, dataFilter, dataHidden, headers }) => {
   const [keys, setKeys] = useState([]);
   const [counts, setCounts] = useState([]);
   const [checkeds, setCheckeds] = useState(headers);

   useEffect(() => {}, [keys, counts]);
   const [chart, setChart] = useState(null);
   const [name, setName] = useState(null);
   const handleChangeChart = (event) => {
      setChart(event.target.value);
   };
   const countOccurrences = (array) => {
      const occurrences = {};

      // Contar las ocurrencias de cada valor en el array
      array.forEach((value) => {
         occurrences[value] = (occurrences[value] || 0) + 1;
      });

      // Convertir el objeto de ocurrencias en dos arrays separados
      const values = Object.keys(occurrences);
      const counts = values.map((value) => occurrences[value]);

      return { values, counts };
   };

   const handleExportClick = () => {
      const filteredData = filterData(dataFilter, dataHidden);
      // headers;

      const checkedKeys = checkeds;
      const filteredDataWithHeaders = filteredData.map((obj) => {
         const newObj = {};
         Object.keys(obj).forEach((key, index) => {
            const header = headers[index]; // Obtiene el título correspondiente
            newObj[header] = obj[key]; // Asigna el valor del objeto a la clave correspondiente del título
         });
         return newObj;
      });

      const filteredDataWithCheckedKeys = filteredDataWithHeaders.map((obj) => {
         const newObj = {};
         checkedKeys.forEach((key) => {
            if (obj.hasOwnProperty(key)) {
               newObj[key] = obj[key];
            }
         });
         return newObj;
      });

      exportToExcel(filteredDataWithCheckedKeys);
   };

   const filterData = (dataFilter, dataHidden) => {
      return dataFilter.map((item) => {
         const newItem = { ...item };
         dataHidden.forEach((key) => {
            delete newItem[key];
         });
         return newItem;
      });
   };
   const exportToExcel = (data) => {
      if (Object.keys(data[0]).length === 0) {
      } else if (Object.keys(data[0]).length > 0) {
         const wb = XLSX.utils.book_new();
         const ws = XLSX.utils.json_to_sheet(data);

         // Establecer estilos para la tabla
         const range = XLSX.utils.decode_range(ws["!ref"]);
         for (let C = range.s.c; C <= range.e.c; ++C) {
            const header = XLSX.utils.encode_col(C) + "1"; // Encabezado de la columna
            ws[header].s = { font: { bold: true }, alignment: { horizontal: "center" }, fill: { bgColor: { indexed: 22 }, fgColor: { rgb: "FFCCFFCC" } } }; // Estilo del encabezado
            for (let R = range.s.r + 1; R <= range.e.r; ++R) {
               const cell = XLSX.utils.encode_col(C) + R; // Celda
               ws[cell].s = { alignment: { horizontal: "center" }, fill: { bgColor: { indexed: 18 }, fgColor: { rgb: "FFFFCCFF" } } }; // Estilo del cuerpo
            }
         }

         // Agregar la hoja de cálculo al libro de trabajo
         XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

         // Descargar el archivo
         XLSX.writeFile(wb, "exportacion.xlsx");
      }
   };

   const handleChange = (item) => {
      setCheckeds((prevCheckeds) => {
         if (prevCheckeds.includes(item)) {
            return prevCheckeds.filter((checkedItem) => checkedItem !== item);
         } else {
            return [...prevCheckeds, item];
         }
      });
   };

   const handleSelectAll = (event) => {
      if (event.target.checked) {
         setCheckeds(headers);
      } else {
         setCheckeds([]);
      }
   };
   return (
      <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
         <Typography variant="h5" display="flex" mb="1.5rem" minWidth="100%" justifyContent="center" color="initial">
            EXPORTAR A EXCEL
         </Typography>

         <Grid
            item
            xs={12}
            sx={{
               position: "relative",
               marginLeft: "1rem",
               marginRight: "1rem",
               overflow: "hidden",
               border: "2px solid #007bff",
               borderRadius: "10px",
               padding: "1.5rem",
               paddingRight: "2.5rem",
               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <FormControlLabel
               sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
               }}
               control={
                  <Checkbox
                     checked={checkeds.length === headers.length}
                     indeterminate={checkeds.length > 0 && checkeds.length < headers.length}
                     onChange={handleSelectAll}
                  />
               }
               label={checkeds.length < headers.length ? "Marcar todos" : "Desmarcar todos"}
            />
            <FormGroup sx={{ marginBottom: "2rem" }}>
               <Grid container spacing={2}>
                  {headers.map((item, index) => (
                     <Grid item xs={12} sm={3} key={index}>
                        <FormControlLabel control={<Checkbox checked={checkeds.includes(item)} name={item} onChange={() => handleChange(item)} />} label={item} />
                     </Grid>
                  ))}
               </Grid>
            </FormGroup>
            <Button sx={{ position: "absolute", bottom: "1rem", right: "1rem" }} variant="contained" disableElevation onClick={handleExportClick}>
               Exportar
            </Button>
         </Grid>
      </Grid>
   );
};

export default DataTable;
