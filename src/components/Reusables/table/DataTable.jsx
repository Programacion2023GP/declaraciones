// import { Checkbox, FormControlLabel, FormGroup, Grid, IconButton, ListItem, ListItemText, Paper, Tooltip, Typography } from "@mui/material";
// import { forwardRef, useEffect, useRef, useState } from "react";
// import Box from "@mui/material/Box";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { v4 as uuidv4 } from "uuid";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import Slide from "@mui/material/Slide";
// import { Chart } from "../charts/Charts";
// import { Ngif } from "../../Reusables/conditionals/Ngif";
// import Loading from "../loading/Loading";
// import DehazeIcon from "@mui/icons-material/Dehaze";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import BasicMenu from "../basicmenu/BasicMenu";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import { Voice } from "../formik/FormikForm";
// import { lightBlue } from "@mui/material/colors";
// import Alert from "@mui/material/Alert";
// import ColorLensIcon from "@mui/icons-material/ColorLens";
// import Swal from "sweetalert2";
// import { isArray } from "highcharts";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import MinimizeIcon from "@mui/icons-material/Minimize";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// const SearchInput = ({ column, data, getData, previousData }) => {
//    const [searchText, setSearchText] = useState("");
//    const [previousDataFilter, setPreviousDataFilter] = useState(data);
//    useEffect(() => {});
//    const searchData = (event) => {
//       const newValue = event.target.value;
//       setSearchText(newValue);

//       if (getData) {
//          getData(column, event.target.value);
//       }
//    };

//    const handleClear = () => {
//       setSearchText("");
//       if (previousData) {
//          getData(previousData);
//       }
//    };

//    return (
//       <Box sx={{ width: "100%", height: "100%" }}>
//          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
//             <SearchIcon sx={{ color: "action.active", mr: 0.5, my: 0.5 }} />
//             <TextField
//                fullWidth // Asegura que el TextField ocupe todo el ancho disponible
//                value={searchText}
//                onChange={searchData}
//                id="input-with-sx"
//                label="Buscar"
//                variant="standard"
//                InputProps={{
//                   endAdornment: (
//                      <InputAdornment position="end">
//                         <IconButton onClick={handleClear}>{/* <ClearIcon /> Descomenta esto si quieres el icono de borrar */}</IconButton>
//                      </InputAdornment>
//                   )
//                }}
//             />
//          </Box>
//       </Box>
//    );
// };

// const Title = ({ headers, titles, data, filterData, previousData, filter, editButton, deleteButton, speakRow, moreButtons, responsive, setResponsive, parent }) => {
//    const [titlesMap, setTitlesMap] = useState([]);
//    const [headersMap, setHeadersMap] = useState([]);
//    const thead = useRef(null);

//    useEffect(() => {
//       let initialHeaders = null;
//       if (titles && titles.length > 0) {
//          const initialTitles = titles[0].titles || [];
//          initialHeaders = titles[0].headers && titles[0].headers.length > 0 ? titles[0].headers[0] : initialTitles;

//          setTitlesMap(initialTitles);
//       }
//       setHeadersMap(headers ? headers : initialHeaders);
//    }, [titles, headers]);

//    // Función para truncar texto
//    const truncateText = (value) => {
//       if (!value || typeof value !== "string") {
//          return ""; // Retorna una cadena vacía si no es válida
//       }
//       return value.length > 20 ? value.substring(0, 20) + "..." : value;
//    };

//    return (
//       <>
//          <thead>
//             <tr ref={thead} style={{ background: "black", color: "white", width: "100%" }}>
//                {speakRow && (
//                   <th key={uuidv4()} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
//                      Leer
//                   </th>
//                )}
//                {responsive < 1000 && <th style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}></th>}
//                {headersMap.map((title, id) => {
//                   return (
//                      <>
//                         {responsive >= id + (editButton || deleteButton || moreButtons ? 3 : 2) && (
//                            <Tooltip title={title.charAt(0).toUpperCase() + title.slice(1)} placement="top">
//                               <th key={"headers" + title} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
//                                  {truncateText(title.charAt(0).toUpperCase() + title.slice(1))}
//                               </th>
//                            </Tooltip>
//                         )}
//                      </>
//                   );
//                })}
//                {headersMap.length > 0 && (editButton || deleteButton || moreButtons) && responsive > 1000 && (
//                   <th key={"headersMap" + uuidv4()} style={{ padding: "1rem 1rem", textAlign: "center", fontSize: "14px" }}>
//                      Acciones
//                   </th>
//                )}
//             </tr>
//             <tr>
//                {speakRow && <th key={"titlesMap" + uuidv4()} style={{ border: "1px solid #BDBDBD", height: "fit-content" }}></th>}
//                {responsive < 1000 && <th key={"titlesMap" + uuidv4()} style={{ border: "1px solid #BDBDBD", height: "fit-content" }}></th>}
//                {filter &&
//                   titlesMap.map((title, id) => (
//                      <>
//                         {responsive >= id + (editButton || deleteButton || moreButtons ? 3 : 2) && (
//                            <th
//                               key={"titlesMap" + title}
//                               style={{
//                                  marginLeft: "15rem",
//                                  marginRight: "15rem",
//                                  border: "1px solid #BDBDBD",
//                                  height: "fit-content"
//                               }}
//                            >
//                               <SearchInput previousData={previousData} column={title} data={data} getData={filterData} />
//                            </th>
//                         )}
//                      </>
//                   ))}
//                {filter && (editButton || deleteButton || moreButtons) && responsive > 1000 && (
//                   <th key={uuidv4()} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}></th>
//                )}
//             </tr>
//          </thead>
//       </>
//    );
// };

// const neon = {
//    color: "#00f0ff", // Color más brillante
//    border: "1px solid rgba(0, 240, 255, 0.5)",
//    textShadow: `
//      0 0 5px #00f0ff,
//      0 0 10px rgba(0, 240, 255, 0.5),
//      0 0 20px rgba(0, 240, 255, 0.3)
//    `,
//    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
//    position: "relative",
//    overflow: "hidden",
//    "&:hover": {
//      color: "#fff",
//      backgroundColor: "rgba(0, 240, 255, 0.15)",
//      boxShadow: `
//        0 0 10px #00f0ff,
//        0 0 20px rgba(0, 240, 255, 0.5),
//        0 0 30px rgba(0, 240, 255, 0.3)
//      `,
//      transform: "translateY(-1px)",
//      "&::before": {
//        content: '""',
//        position: "absolute",
//        top: "-50%",
//        left: "-50%",
//        width: "200%",
//        height: "200%",
//        background: `
//          linear-gradient(
//            45deg,
//            transparent 25%,
//            rgba(0, 240, 255, 0.1) 25%,
//            rgba(0, 240, 255, 0.1) 50%,
//            transparent 50%,
//            transparent 75%,
//            rgba(0, 240, 255, 0.1) 75%,
//            rgba(0, 240, 255, 0.1)
//          )
//        `,
//        backgroundSize: "4px 4px",
//        animation: "neonShine 2s linear infinite",
//        zIndex: "-1"
//      }
//    },
//    "@keyframes neonShine": {
//      "0%": {
//        transform: "rotate(0deg)"
//      },
//      "100%": {
//        transform: "rotate(360deg)"
//      }
//    }
//  };
 
//  const neonText = {
//    color: "#00f0ff",
//    textShadow: `
//      0 0 5px #00f0ff,
//      0 0 15px rgba(0, 240, 255, 0.7),
//      0 0 25px rgba(0, 240, 255, 0.3)
//    `,
//    transition: "all 0.4s ease-out",
//    position: "relative",
//    display: "inline-block",
//    padding: "0.5rem 1rem",
//    "&:hover": {
//      textShadow: `
//        0 0 10px #00f0ff,
//        0 0 20px rgba(0, 240, 255, 0.8),
//        0 0 30px rgba(0, 240, 255, 0.4)
//      `,
//      transform: "scale(1.02)",
//      "&::after": {
//        content: '""',
//        position: "absolute",
//        bottom: "0",
//        left: "0",
//        width: "100%",
//        height: "2px",
//        background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
//        animation: "neonLine 1.5s ease-in-out infinite"
//      }
//    },
//    "@keyframes neonLine": {
//      "0%": {
//        transform: "translateX(-100%)"
//      },
//      "100%": {
//        transform: "translateX(100%)"
//      }
//    }
//  };

// const Paginator = ({ pagination, handleChange, page, pages, previous, next, dataFilter, selectRow, setMoreItems }) => {
//    useEffect(() => {}, [pagination]);
//    const pagesOfItems = (option) => {
//       handleChange(option);
//    };
//    const previousPage = () => {
//       previous();
//    };
//    const nextPage = () => {
//       setMoreItems([]);
//       next();
//    };

//    return (
//       <>
//          <Stack color={"white"} spacing={1} direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
//             <Typography variant="subtitle2" sx={neonText}>
//                Pagina {dataFilter == 0 ? "0" : page} de {pages}
//             </Typography>
//             <Stack spacing={1} direction="row" alignItems="center">
//                <NeonButton onClick={previousPage}>Anterior</NeonButton>
//                <NeonButton onClick={nextPage}>Siguiente</NeonButton>
//                <Typography variant="subtitle2" sx={neonText}>
//                   Mostrando {selectRow >= dataFilter ? dataFilter : selectRow} de {dataFilter}
//                </Typography>
//             </Stack>
//             {pagination && <PaginatorSelect pagination={pagination} selectOption={pagesOfItems} />}
//          </Stack>
//       </>
//    );
// };
// const NeonButton = ({ onClick, children }) => {
//    return (
//       <Button size="small" onClick={onClick} variant="text" sx={neon}>
//          {children}
//       </Button>
//    );
// };
// const PaginatorSelect = ({ pagination, selectOption }) => {
//    const [select, setSelect] = useState(pagination[0]);
//    const handleChange = (event) => {
//       setSelect(event.target.value);
//       selectOption(event.target.value);
//    };
//    const neonFormalSelect = {
//       color: "#00e6e6", // Color del texto neón brillante
//       border: "1px solid #00e6e6", // Borde neón
//       textShadow: "0 0 3px #00e6e6", // Sombra del texto neón
//       transition: "all 0.3s ease",
//       fontSize: "16px", // Tamaño del texto
//       fontWeight: "bold", // Negrita
//       backgroundColor: "#102840", // Azul oscuro para mejor contraste

//       "&:hover": {
//          color: "#ffffff",
//          backgroundColor: "#10355A",
//          boxShadow: "0 0 10px #00e6e6, 0 0 20px #00e6e6" // Resplandor más sutil en hover
//       }
//    };

//    const neonFormalInputLabel = {
//       color: "#00e6e6", // Color del texto neón brillante
//       fontSize: "16px", // Tamaño del texto
//       fontWeight: "bold" // Negrita
//    };

//    const neonFormalMenuItem = {
//       color: "#00e6e6", // Color del texto neón brillante
//       // backgroundColor: "#102840", // Azul oscuro para mejor contraste
//       textShadow: "0 0 3px #00e6e6", // Sombra del texto neón
//       fontSize: "16px", // Tamaño del texto
//       fontWeight: "bold" // Negrita
//       // "&:hover": {
//       //    backgroundColor: "#10355A" // Cambiar el fondo en hover
//       // }
//    };

//    return (
//       <Box sx={{ minWidth: 120 }}>
//          <FormControl fullWidth>
//             <InputLabel id="demo-simple-select-label" sx={neonFormalInputLabel}>
//                Mostrar
//             </InputLabel>
//             <Select
//                size="small"
//                labelId="demo-simple-select-label"
//                id="demo-simple-select"
//                value={select}
//                label="Mostrar"
//                onChange={handleChange}
//                sx={neonFormalSelect}
//             >
//                {pagination.map((item) => (
//                   <MenuItem key={item} value={item} sx={neonFormalMenuItem}>
//                      {item}
//                   </MenuItem>
//                ))}
//             </Select>
//          </FormControl>
//       </Box>
//    );
// };

// const FilterGlobal = ({ data = [], setFilteredData, dataHidden = [] }) => {
//    const [searchText, setSearchText] = useState("");
//    useEffect(() => {}, []);
//    const searchData = (event) => {
//       const newValue = event.target.value;
//       if (event.target.value.length < 0) {
//          setFilteredData(newFilteredData);
//          return;
//       }
//       setSearchText(newValue);
//       const normalizeString = (str) => {
//          return str
//             .normalize("NFD") // Normaliza acentos
//             .replace(/[\u0300-\u036f]/g, "") // Remueve diacríticos (acentos)
//             .trim() // Elimina espacios adicionales
//             .replace(/\s+/g, " ") // Reemplaza múltiples espacios por uno
//             .toLowerCase(); // Convierte a minúsculas para búsqueda insensible a mayúsculas
//       };

//       // Filtrar los datos basados en el texto de búsqueda
//       const newFilteredData = data.filter((item) => {
//          const normalizedSearchValue = normalizeString(newValue); // Normalizar una vez el valor de búsqueda
//          for (const key in item) {
//             if (item.hasOwnProperty(key) && !dataHidden.includes(key)) {
//                const normalizedItemValue = normalizeString(String(item[key])); // Normalizar solo una vez el valor del item
//                if (normalizedItemValue.includes(normalizedSearchValue)) {
//                   return true; // Si el valor del item normalizado contiene el valor de búsqueda normalizado
//                }
//             }
//          }
//          return false;
//       });

//       setFilteredData(newFilteredData);
//    };

//    const handleClear = () => {
//       setSearchText("");
//       if (previousData) {
//          getData(previousData);
//       }
//    };

//    return (
//       <Box sx={{ "& > :not(style)": { m: 1 }, width: "100%" }}>
//          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
//             <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
//             <TextField
//                fullWidth
//                size="small"
//                value={searchText}
//                onChange={searchData}
//                id="input-with-sx"
//                label="Buscador"
//                variant="standard"
//                InputProps={{
//                   endAdornment: (
//                      <InputAdornment position="end">
//                         {/* <IconButton onClick={handleClear}>
//                   <ClearIcon />
//                 </IconButton> */}
//                      </InputAdornment>
//                   )
//                }}
//             />
//          </Box>
//       </Box>
//    );
// };

// const DataTable = ({
//    excelLayoutDownRowsStart = 0,
//    excelLayout = [],
//    data = [],
//    dataHidden = [],
//    headers = [],
//    pagination,
//    options = [],
//    filter,
//    editButton,
//    deleteButton,
//    handleEdit,
//    handleDelete,
//    captionButtons = [],
//    captionFilters = <></>,
//    filterGlobal,
//    conditionExistEditButton = [],
//    conditionExistDeleteButton = [],
//    loading,
//    moreButtons = [],
//    Trbacground = [],
//    link = [],
//    buttonsMenu = false,
//    speakRow = false,
//    fileName = null,
//    parent = null
// }) => {
//    const [reinitializedData, setReinitializedData] = useState(data);
//    const [dataFilter, setDataFilter] = useState(data);
//    const [titles, setTitles] = useState([]);
//    const [dataTable, setDataTable] = useState([]);
//    const [totalPages, setTotalPages] = useState([]);
//    const [numberShowPage, setNumberShowPage] = useState(1);
//    const [selectRow, setSelectRow] = useState(pagination ? pagination[0] : 100000);
//    const [objectValues, setObjectValues] = useState({});
//    const [tdRead, setTdRead] = useState(null);
//    const [line, setLine] = useState(null);
//    const [responsive, setResponsive] = useState(10000);
//    const handleSeparateData = async (option) => {
//       // modifiedData(dataFilter);
//       console.log(option);
//       setSelectRow(option);
//    };
//    const handleDeleteSecurity = (item) => {
//       Swal.fire({
//          title: "¿Estás seguro?",
//          text: "Una vez eliminado, ¡no podrás recuperar la informacion!",
//          icon: "warning",
//          showCancelButton: true,
//          confirmButtonText: "Sí, eliminarlo",
//          cancelButtonText: "No, cancelar",
//          target: 'body', // Renderiza directamente en el body
//          reverseButtons: true,
//          willOpen: () => {
//             const popup = Swal.getPopup();
//             popup.style.zIndex = '2147483647';
//             // Asegúrate de que el contenedor padre también tenga z-index alto
//             document.querySelector('.swal2-container').style.zIndex = '2147483647';
//          }
//       }).then((result) => {
//          if (result.isConfirmed) {
//             // Aquí pones la lógica para eliminar el elemento, por ejemplo, una llamada a una API

//             handleDelete(item);
//          } else if (result.dismiss === Swal.DismissReason.cancel) {
//             Swal.fire("Cancelado", "", "error");
//          }
//       });
//    };

//    const applyFilters = (page = null) => {
//       const filters = data.filter((item) => {
//          return Object.entries(objectValues).every(([col, val]) => {
//             if (dataHidden.includes(col)) {
//                return true; // Ignora esta columna para el filtro
//             }
//             const itemValue = String(item[col]).toUpperCase().trim();
//             const filterValue = String(val).toUpperCase().trim();
//             return itemValue.includes(filterValue);
//          });
//       });

//       // console.log(filters)
//       setDataFilter(filters);

//       // if (page > 0) {
//       //    modifiedData(filters, page);
//       // } else {
//       //    modifiedData(filters);
//       // }
//    };
//    const applyfilterGlobal = (data, page = null) => {
//       setDataFilter(data);
//       // modifiedData(data,1);
//    };
//    const filterData = (column, value) => {
//       // Actualizamos el estado de objectValues con los nuevos valores de filtro
//       setObjectValues((prevState) => ({
//          ...prevState,
//          [column]: value
//       }));
//    };
//    // setDataFilter(dataSelected)
//    // modifiedData(dataSelected)

//    const previous = () => {
//       if (numberShowPage > 1) {
//          const page = numberShowPage - 1;

//          setNumberShowPage(page);
//          if (Object.keys(objectValues).length !== 0) {
//             applyFilters(page);
//          } else {
//             modifiedData(dataFilter, page);
//          }
//       }
//    };

//    const next = () => {
//       if (numberShowPage < totalPages) {
//          const page = numberShowPage + 1;
//          setNumberShowPage(page);
//          if (Object.keys(objectValues).length !== 0) {
//             applyFilters(page);
//          } else {
//             modifiedData(dataFilter, page);
//          }
//       }
//    };

//    const handleShowData = (page = 1, data = false) => {
//       const showData = data.filter((column) => column.page === page);
//       if (showData.length > 0 && showData[0].hasOwnProperty("items")) {
//          setDataTable(showData[0].items);
//          // setLoading(false);
//       } else {
//          setDataTable([]);
//       }
//    };

//    const modifiedData = (data, pagina = 1) => {
//       let newTitles = [];
//       const firstItem = data[0];

//       if (firstItem) {
//          if (dataHidden) {
//             newTitles = Object.keys(firstItem).filter((item) => !dataHidden.includes(item));
//          } else {
//             newTitles = Object.keys(firstItem);
//          }
//          if (headers) {
//             const titlesHeaders = [{ titles: newTitles, headers: [headers] }];
//             setTitles(titlesHeaders);
//          } else {
//             setTitles([{ titles: newTitles, headers: [] }]);
//          }
//       }

//       let index = 0;
//       let page = 0;
//       const datas = [];

//       if (!Array.isArray(data)) {
//          return;
//       }

//       data.map((item, i) => {
//          if (selectRow === index || i === 0) {
//             index = 0;
//             page++;
//             datas.push({ page, items: [] });
//          }
//          const pageIndex = datas.findIndex((data) => data.page === page);
//          datas[pageIndex].items.push(item);
//          index++;
//       });
//       const totalPages = datas.length; // Calcular el total de páginas aquí
//       setTotalPages(totalPages);
//       handleShowData(pagina, datas);
//    };
//    const handleOptions = () => {};
//    const [textModal, setTextModal] = useState("");
//    const [openModal, setOpenModal] = useState(false);
//    const handleTextModal = (event) => {
//       setTextModal(event.target.value);
//    };

//    const checkConditions = (item) => {
//       return conditionExistEditButton.every((condition) => {
//          const match = condition.match(/(.+?)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'/);
//          if (!match) return false;

//          const [, key, operator, value] = match;
//          const itemValue = item[key.trim()];

//          switch (operator) {
//             case "!=":
//                return itemValue != value;
//             case "==":
//                return itemValue == value;
//             case ">=":
//                return itemValue >= value;
//             case "<=":
//                return itemValue <= value;
//             case ">":
//                return itemValue > value;
//             case "<":
//                return itemValue < value;
//             default:
//                return false;
//          }
//       });
//    };
//    const checkConditionsMoreButton = (item, conditions) => {
//       // Si no hay condiciones, devolver true
//       if (!Array.isArray(conditions) || conditions.length === 0) {
//          return true;
//       }

//       // Función auxiliar para evaluar una sola condición
//       const evaluateCondition = (condition) => {
//          // Verificar si la condición utiliza operadores lógicos AND (&&) o OR (||)
//          if (condition.includes("&&")) {
//             // Se utilizó AND
//             const andParts = condition.split("&&").map((part) => part.trim());
//             return andParts.every((andCondition) => evaluateSimpleCondition(andCondition));
//          } else if (condition.includes("||")) {
//             // Se utilizó OR
//             const orParts = condition.split("||").map((part) => part.trim());
//             return orParts.some((orCondition) => evaluateSimpleCondition(orCondition));
//          } else {
//             // Sin operadores lógicos específicos, se asume una única condición
//             return evaluateSimpleCondition(condition);
//          }
//       };

//       // Función para evaluar una condición simple (sin operadores lógicos)
//       const evaluateSimpleCondition = (condition) => {
//          const match = condition.match(/^\s*([^!=<>]+)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'\s*$/);
//          if (!match) return false;

//          const [, key, operator, value] = match;
//          const trimmedKey = key.trim();
//          const trimmedValue = value.trim();
//          const itemValue = item[trimmedKey];

//          switch (operator) {
//             case "!=":
//                return itemValue != trimmedValue; // Comparación de desigualdad
//             case "==":
//                return itemValue == trimmedValue; // Comparación de igualdad
//             case ">=":
//                return itemValue >= trimmedValue; // Mayor o igual que
//             case "<=":
//                return itemValue <= trimmedValue; // Menor o igual que
//             case ">":
//                return itemValue > trimmedValue; // Mayor que
//             case "<":
//                return itemValue < trimmedValue; // Menor que
//             default:
//                return false;
//          }
//       };

//       // Evaluar todas las condiciones con operadores lógicos AND y OR
//       return conditions.every((condition) => evaluateCondition(condition));
//    };
//    const [expanded, setExpanded] = useState([]);

//    const moreViewItems = (id) => {
//       console.log(id);
//       setExpanded((prev) => {
//          if (prev.includes(id)) {
//             // Si el id ya existe, lo eliminamos
//             return prev.filter((item) => item !== id);
//          } else {
//             // Si el id no existe, lo agregamos
//             return [...prev, id];
//          }
//       });
//    };

//    const checkConditionsDelete = (item) => {
//       return conditionExistDeleteButton.every((condition) => {
//          const match = condition.match(/(.+?)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'/);
//          if (!match) return false;

//          const [, key, operator, value] = match;
//          const itemValue = item[key.trim()];

//          switch (operator) {
//             case "!=":
//                return itemValue != value;
//             case "==":
//                return itemValue == value;
//             case ">=":
//                return itemValue >= value;
//             case "<=":
//                return itemValue <= value;
//             case ">":
//                return itemValue > value;
//             case "<":
//                return itemValue < value;
//             default:
//                return false;
//          }
//       });
//    };
//    useEffect(() => {
//       // if (dataFilter.length == 0) {
//       //    setDataFilter(data);
//       // }

//       setNumberShowPage(1);
//    }, [selectRow, pagination, headers, objectValues, dataFilter]);

//    useEffect(() => {
//       modifiedData(dataFilter);
//    }, [dataFilter, selectRow]);

//    useEffect(() => {
//       if (Object.keys(objectValues).length !== 0) {
//          applyFilters(objectValues);
//       }
//    }, [objectValues]);
//    useEffect(() => {}, [loading, Trbacground, responsive]);
//    useEffect(() => {
//       setDataFilter(data);
//       const init = () => {
//          if (Object.keys(objectValues).length !== 0) {
//             applyFilters(objectValues);
//          } else {
//             modifiedData(dataFilter);
//          }
//       };
//       init();
//       setNumberShowPage(1);
//    }, [data]);
//    const modal = (event) => {
//       setOpenModal(true);
//    };
//    const speakingRow = (arr1, obj, arr3) => {
//       const filteredValues = Object.entries(obj)
//          .filter(([key, value]) => !arr3.includes(key))
//          .map(([key, value]) => value);

//       let intercalado = [];
//       let maxLength = Math.max(arr1.length, filteredValues.length);

//       for (let i = 0; i < maxLength; i++) {
//          if (i < arr1.length) {
//             intercalado.push(arr1[i]);
//          }
//          if (i < filteredValues.length) {
//             intercalado.push(filteredValues[i]);
//          }
//       }

//       return intercalado;
//    };
//    const size = useRef(null);
//    useEffect(() => {
//       if (!parent) return;
//       if (!size.current || !parent.current) return; // Asegurarse de que existan las referencias

//       // Obtener todos los elementos `th` dentro del `size`
//       const thElements = size.current.querySelectorAll("th");

//       // Obtener el ancho del contenedor padre de la tabla
//       const parentWidth = parent.current.offsetWidth;

//       // Obtener los anchos de cada `th`
//       const anchos = Array.from(thElements).map((th) => th.getBoundingClientRect().width);

//       console.log(parentWidth);
//       console.log("Número de columnas:", anchos.length);
//       console.log("Anchos:", anchos);

//       let total = 0;
//       let responsiveIndex = -1;

//       // Recorrer los anchos de las columnas y acumular el ancho total
//       for (let index = 0; index < anchos.length; index++) {
//          let item = anchos[index];

//          // Sumar el ancho de cada columna

//          if (total + item > parentWidth) {
//             responsiveIndex = index;
//             break; // Detener el ciclo una vez que se ha excedido el ancho
//          }
//          total += item;
//          // Verificar si el ancho acumulado supera el ancho del contenedor padre
//       }

//       // Si se detecta que las columnas no caben, aplicar la lógica responsive
//       if (responsiveIndex !== -1) {
//          console.log("Se debe aplicar el modo responsive a partir del índice:", responsiveIndex);

//          // Actualizar el estado `responsive` con el índice calculado
//          setResponsive(responsiveIndex);
//       } else {
//          console.log("No se necesita modo responsive. Todas las columnas caben en el contenedor.");
//       }
//    }, [parent, size, setResponsive, titles]);

//    const bacgroundColor = (item) => {
//       let result = ""; // Inicializamos una variable para almacenar el resultado

//       Trbacground.some((color) => {
//          // Utilizamos .some() en lugar de .map()
//          if (checkConditionsMoreButton(item, color.conditions)) {
//             result = color.color; // Asignamos el color si la condición es verdadera
//             return true; // Terminamos la iteración con .some()
//          }
//          return false; // Continuamos la iteración con .some()
//       });

//       return result; // Devolvemos el resultado encontrado (o cadena vacía si no se encontró nada)
//    };
//    const truncateText = (value) => {
//       if (!value || typeof value !== "string") {
//          return ""; // Retorna una cadena vacía si no es válida
//       }
//       return value.length > 40 ? value.substring(0, 40) + "..." : value;
//    };
//    return (
//       <>
//          <table ref={size} width={"100%"} style={{ borderCollapse: "collapse", paddingRight: "2rem" }}>
//             <caption>
//                <div style={{ marginLeft: "2rem", marginTop: ".5rem", display: "flex", justifyContent: "flex-start" }}>
//                   <Ngif condition={captionFilters}> {captionFilters}</Ngif>

//                   <Ngif condition={captionButtons.length > 0}>
//                      {captionButtons.map((item, index) => {
//                         return (
//                            <Button
//                               key={index} // Añadir una key única
//                               variant="outlined"
//                               startIcon={<item.icon />}
//                               onClick={() => {
//                                  item.handleButton(dataFilter);
//                               }}
//                            >
//                               {item.text}
//                            </Button>
//                         );
//                      })}
//                   </Ngif>
//                </div>
//                <div style={{ display: "flex", alignItems: "center" }}>
//                   {filterGlobal && <FilterGlobal data={data} setFilteredData={applyfilterGlobal} dataHidden={dataHidden} onChange={handleOptions} />}
//                   <Ngif condition={options.length > 0}>
//                      <Box sx={{ minWidth: 120, marginLeft: "auto", marginTop: "1rem", marginBottom: ".5rem" }}>
//                         <FormControl fullWidth>
//                            <InputLabel id="demo-simple-select-label">Opciones</InputLabel>
//                            <Select
//                               labelId="demo-simple-select-label"
//                               id="demo-simple-select"
//                               value={textModal}
//                               onChange={handleTextModal}
//                               onClick={modal}
//                               label="Opciones"
//                            >
//                               {options.includes("COLORS") && (
//                                  <MenuItem sx={{ textAlign: "center" }} key="colors" value="colors">
//                                     <Tooltip placement="left" title="PDF">
//                                        <ColorLensIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//                                        PALETA DE COLORES
//                                     </Tooltip>
//                                  </MenuItem>
//                               )}
//                               {options.includes("CHARTS") && (
//                                  <MenuItem key="grafica" value="grafica">
//                                     <Tooltip placement="left" title="GRAFICAS">
//                                        <BarChartIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//                                        Graficas
//                                     </Tooltip>
//                                  </MenuItem>
//                               )}
//                               {options.includes("EXCEL") && (
//                                  <MenuItem sx={{ textAlign: "center" }} key="excel" value="excel">
//                                     <Tooltip placement="left" title="EXCEL">
//                                        <svg
//                                           style={{ verticalAlign: "middle", marginRight: 1 }}
//                                           xmlns="http://www.w3.org/2000/svg"
//                                           width="25"
//                                           height="25"
//                                           fill="currentColor"
//                                           className="bi bi-file-earmark-excel"
//                                           viewBox="0 0 16 16"
//                                        >
//                                           <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
//                                           <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
//                                        </svg>
//                                        Excel
//                                     </Tooltip>
//                                  </MenuItem>
//                               )}
//                               {/* {options.includes("PDF") && (
//                                  <MenuItem sx={{ textAlign: "center" }} key="pdf" value="pdf">
//                                     <Tooltip placement="left" title="PDF">
//                                        <PictureAsPdfIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//                                        PDF
//                                     </Tooltip>
//                                  </MenuItem>
//                               )} */}
//                            </Select>
//                         </FormControl>
//                      </Box>
//                   </Ngif>
//                </div>
//             </caption>

//             {titles.length > 0 || headers.length > 0 ? (
//                <Title
//                   parent={parent}
//                   setResponsive={setResponsive}
//                   responsive={responsive}
//                   speakRow={speakRow}
//                   editButton={editButton}
//                   deleteButton={deleteButton}
//                   moreButtons={moreButtons.length > 0 ? true : false}
//                   headers={headers}
//                   titles={titles}
//                   previousData={data}
//                   data={dataFilter}
//                   filterData={filterData}
//                   filter={filter}
//                ></Title>
//             ) : (
//                <thead>
//                   <tr>
//                      <th>No hay titulos cargados ...</th>
//                   </tr>
//                </thead>
//             )}

//             {data.length === 0 || dataTable.length === 0 ? (
//                <tbody style={{ position: "relative" }}>
//                   <tr>
//                      <Ngif condition={loading}>
//                         <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, top: -10 }}>
//                            <Loading />
//                         </Box>
//                      </Ngif>
//                      <td colSpan={headers.length + 1 + (speakRow ? 1 : 0)} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>
//                         <Ngif condition={!loading}>No hay información suficiente no hay registros</Ngif>
//                      </td>
//                   </tr>
//                </tbody>
//             ) : (
//                <tbody>
//                   {dataTable.map((item, index) => {
//                      return (
//                         <>
//                            <tr
//                               key={index}
//                               style={{
//                                  position: "relative",
//                                  background: bacgroundColor(item)
//                               }}
//                            >
//                               <Ngif condition={speakRow}>
//                                  <td
//                                     style={{
//                                        textAlign: "center",
//                                        border: "1px solid #BDBDBD",
//                                        fontSize: "13px",

//                                        // paddingLeft: "5px",
//                                        // paddingRight: "5px",
//                                        margin: 0
//                                     }}
//                                     key={"voice" + index}
//                                     cols={1}
//                                  >
//                                     <Voice
//                                        setLine={setLine}
//                                        line={index}
//                                        message={speakingRow(headers, item, dataHidden)}
//                                        title="Formulario"
//                                        flex={false}
//                                        velocity={1.45}
//                                        setSpeaking={setTdRead}
//                                     />
//                                  </td>
//                               </Ngif>
//                               {Object.entries(item).map(([key, value], id) => {
//                                  if (dataHidden) {
//                                     if (!dataHidden.includes(key)) {
//                                        return (
//                                           <>
//                                              <Ngif condition={responsive < 1000 && id == 0}>
//                                                 <td
//                                                    style={{
//                                                       textAlign: "center",
//                                                       border: "1px solid #e0e0e0",
//                                                       fontSize: tdRead === id && line == index ? "16px" : "14px",
//                                                       padding: "8px 12px",
//                                                       margin: 0,
//                                                       color: tdRead === id && line == index ? lightBlue[600] : "#424242",
//                                                       fontWeight: tdRead === id && line == index ? "bold" : "normal",
//                                                       backgroundColor: expanded.includes(index) ? "#f5f5f5" : "white",
//                                                       transition: "all 0.2s ease",
//                                                       cursor: "pointer",
//                                                       position: "relative",
//                                                       ":hover": {
//                                                          backgroundColor: "#fafafa"
//                                                       }
//                                                    }}
//                                                 >
//                                                    <IconButton
//                                                       onClick={(e) => {
//                                                          e.stopPropagation();
//                                                          moreViewItems(index);
//                                                       }}
//                                                       color={expanded.includes(index) ? "primary" : "default"}
//                                                       size="small"
//                                                       sx={{
//                                                          transition: "transform 0.2s ease",
//                                                          transform: expanded.includes(index) ? "rotate(180deg)" : "rotate(0deg)",
//                                                          "&:hover": {
//                                                             backgroundColor: "rgba(0, 0, 0, 0.04)"
//                                                          }
//                                                       }}
//                                                    >
//                                                       {expanded.includes(index) ? <MinimizeIcon fontSize="small" /> : <AddCircleIcon fontSize="small" />}
//                                                    </IconButton>
//                                                 </td>
//                                              </Ngif>
//                                              <Ngif condition={responsive >= id + 2}>
//                                                 <td
//                                                    style={{
//                                                       textAlign: "center",
//                                                       border: "1px solid #BDBDBD",
//                                                       fontSize: tdRead === id && line == index ? "16px" : "13px",
//                                                       paddingLeft: "5px",
//                                                       paddingRight: "5px",
//                                                       margin: 0,
//                                                       color: tdRead === id && line == index && lightBlue[600],
//                                                       fontWeight: tdRead === id && line == index && "bold"
//                                                    }}
//                                                    cols={value}
//                                                 >
//                                                    {link.includes(id) ? (
//                                                       <a href={value} download>
//                                                          {value}
//                                                       </a>
//                                                    ) : (
//                                                       <Tooltip title={value} placement="top">
//                                                          {typeof(value)=='string'? truncateText(value):value}
//                                                           {/* {String(truncateText(value))}
//                                                           {console.log(value)} */}
//                                                       </Tooltip>
//                                                    )}
//                                                 </td>
//                                              </Ngif>
//                                           </>
//                                        );
//                                     }
//                                  } else {
//                                     return (
//                                        <>
//                                           <Ngif condition={responsive < 1000 && id == 0}>
//                                              <td
//                                                 style={{
//                                                    textAlign: "center",
//                                                    border: "1px solid #BDBDBD",
//                                                    fontSize: tdRead === id && line == index ? "16px" : "13px",
//                                                    paddingLeft: "5px",
//                                                    paddingRight: "5px",
//                                                    margin: 0,
//                                                    color: tdRead === id && line == index && lightBlue[600],
//                                                    fontWeight: tdRead === id && line == index && "bold"
//                                                 }}
//                                              >
//                                                 <IconButton
//                                                    onClick={() => {
//                                                       moreViewItems(index);
//                                                    }}
//                                                    color="primary"
//                                                    size="small"
//                                                    variant="text"
//                                                 >
//                                                    {expanded.includes(index) ? <MinimizeIcon /> : <AddCircleIcon />}
//                                                 </IconButton>
//                                              </td>
//                                           </Ngif>
//                                           <Ngif condition={responsive >= Object.keys(item).length + 2}>
//                                              <td
//                                                 style={{
//                                                    textAlign: "center",
//                                                    border: "1px solid #BDBDBD",
//                                                    fontSize: tdRead === id && line == index ? "16px" : "13px",
//                                                    paddingLeft: "5px",
//                                                    paddingRight: "5px",
//                                                    margin: 0,
//                                                    color: tdRead === id && line == index && lightBlue[600],
//                                                    fontWeight: tdRead === id && line == index && "bold"
//                                                 }}
//                                                 cols={value}
//                                              >
//                                                 {link.includes(id) ? (
//                                                    <a href={value} download>
//                                                       {value}
//                                                    </a>
//                                                 ) : (
//                                                    <Tooltip title={value} placement="top">
//                                                          {typeof(value)=='string'? truncateText(value):value}
//                                                    </Tooltip>
//                                                 )}
//                                              </td>
//                                           </Ngif>
//                                        </>
//                                     );
//                                  }
//                               })}
//                               {(editButton || deleteButton || moreButtons) && (
//                                  <Ngif condition={responsive >= Object.keys(item).length + 2}>
//                                     <td style={{ textAlign: "center", border: "1px solid #BDBDBD", padding: 0, margin: 0 }}>
//                                        <Ngif condition={buttonsMenu}>
//                                           <BasicMenu>
//                                              <Ngif condition={editButton && checkConditions(item)}>
//                                                 <MenuItem
//                                                    onClick={() => {
//                                                       handleEdit(item);
//                                                    }}
//                                                 >
//                                                    <EditButton handleEdit={handleEdit} item={item} />
//                                                 </MenuItem>
//                                              </Ngif>
//                                              <Ngif condition={deleteButton && checkConditionsDelete(item) || moreButtons.length > 0}>
//                                                 {deleteButton && checkConditionsDelete(item) && (

//                                                 <MenuItem
//                                                    onClick={() => {
//                                                       handleDeleteSecurity(item);
//                                                    }}
//                                                 >
//                                                    <DeleteButton handleDelete={handleDelete} item={item} />
//                                                 </MenuItem>
//                                                 )}
//                                                 <MoreButtons
//                                                    item={item}
//                                                    moreButtons={moreButtons}
//                                                    checkConditionsMoreButton={checkConditionsMoreButton}
//                                                    buttonsMenu={buttonsMenu}
//                                                 />
//                                              </Ngif>
//                                           </BasicMenu>
//                                        </Ngif>
//                                        <Ngif condition={!buttonsMenu}>
//                                           <Ngif condition={editButton && checkConditions(item)}>
//                                              <EditButton handleEdit={handleEdit} item={item} />
//                                           </Ngif>
//                                           <Ngif condition={deleteButton && checkConditionsDelete(item)}>
//                                              <DeleteButton handleDelete={handleDeleteSecurity} item={item} />
//                                           </Ngif>

//                                           <Ngif condition={moreButtons.length > 0}>
//                                              <MoreButtons item={item} moreButtons={moreButtons} checkConditionsMoreButton={checkConditionsMoreButton} />
//                                           </Ngif>
//                                        </Ngif>
//                                     </td>
//                                  </Ngif>
//                               )}
//                               <Ngif condition={loading && index === Math.floor(dataTable.length / 2)}>
//                                  <Box sx={{ position: "absolute", left: 0, right: 0, bottom: -10, top: 0 }}>
//                                     <Loading />
//                                  </Box>
//                               </Ngif>
//                            </tr>
//                            <tr>
//                               {expanded.includes(index) && (
//                                  <td colSpan={responsive}>
//                                     <ul>
//                                        {Object.entries(item).map(([key, value], id) => (
//                                           // Siempre mostramos la condición, ya que 'true' es innecesaria

//                                           <Ngif condition={id + 1 >= responsive && dataHidden && !dataHidden.includes(key)}>
//                                              <ListItem
//                                                 key={id}
//                                                 sx={{
//                                                    margin: "5px 0",
//                                                    padding: "5px",
//                                                    borderRadius: "8px",
//                                                    backgroundColor: "#fff",
//                                                    boxShadow: 2, // equivalente a `0 4px 8px rgba(0, 0, 0, 0.1)`
//                                                    display: "flex",
//                                                    alignItems: "center",
//                                                    justifyContent: "space-between"
//                                                 }}
//                                              >
//                                                 <ListItemText
//                                                    primary={
//                                                       <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
//                                                          {titles[0]?.headers[0][id]}
//                                                       </Typography>
//                                                    }
//                                                    secondary={
//                                                       <Typography variant="body2" sx={{ color: "#666" }}>
//                                                          {link.includes(id) ? (
//                                                             <a target="_blank" href={value}>
//                                                                {value}
//                                                             </a>
//                                                          ) : (
//                                                             value
//                                                          )}
//                                                       </Typography>
//                                                    }
//                                                 />
//                                              </ListItem>
//                                           </Ngif>
//                                        ))}
//                                     </ul>
//                                  </td>
//                               )}
//                            </tr>
//                         </>
//                      );
//                   })}
//                </tbody>
//             )}
//             {pagination && (
//                <tfoot>
//                   <tr>
//                      <td
//                         colSpan={headers.length + (editButton || deleteButton || moreButtons.length > 0 ? 1 : 0) + (speakRow ? 1 : 0)}
//                         style={{ border: "1px solid #BDBDBD", padding: "0.5rem", textAlign: "center", background: "black" }}
//                      >
//                         <Paginator
//                            setMoreItems={setExpanded}
//                            selectRow={selectRow}
//                            dataFilter={dataFilter.length}
//                            pagination={pagination}
//                            handleChange={handleSeparateData}
//                            pages={totalPages}
//                            previous={previous}
//                            next={next}
//                            page={numberShowPage}
//                         />
//                      </td>
//                   </tr>
//                </tfoot>
//             )}
//          </table>
//          {/* {pagination && (
//                <div
//                style={{
//                   width: "100%", // Asegura que el paginator ocupe todo el ancho del contenedor
//                   alignSelf: "center", // Centra el paginator
//                   border: "1px solid #BDBDBD",
//                   background: "#F9FAFB",
//                   display: "flex", // Asegura que los elementos internos se alineen correctamente
//                   justifyContent: "center" // Centra los elementos internos
//                }}
//                >
//                <Paginator
//                   selectRow={selectRow}
//                   dataFilter={dataFilter.length}
//                   pagination={pagination}
//                   handleChange={handleSeparateData}
//                   pages={totalPages}
//                   previous={previous}
//                   next={next}
//                   page={numberShowPage}
//                />
//                 </div>
//             )} */}
//          <Ngif condition={options}>
//             <Modal openModal={openModal} setText={setTextModal} setOpenModal={setOpenModal}>
//                <Component
//                   excelLayoutDownRowsStart={excelLayoutDownRowsStart}
//                   excelLayout={excelLayout}
//                   option={textModal}
//                   titles={headers}
//                   dataFilter={dataFilter}
//                   dataHidden={dataHidden}
//                   headers={headers}
//                   colors={Trbacground}
//                   fileName={fileName}
//                />
//             </Modal>
//          </Ngif>
//       </>
//       // (
//       //    <div className="" style={{ maxWidth: "fit-content", display: "flex", flexDirection: "column", overflow: "auto" }}>
//       //       <table style={{ borderCollapse: "collapse" }}>
//       //          <tbody>

//       //          </tbody>
//       //       </table>

//       // )
//    );
// };

// const MoreButtons = ({ item, moreButtons, checkConditionsMoreButton, buttonsMenu = false }) => {
//    useEffect(() => {}, [moreButtons]);
//    return (
//       <>
//          {moreButtons.map((element, i) => {
//             if (checkConditionsMoreButton(item, element.conditions)) {
//                if (!checkConditionsMoreButton(item, element.conditions)) {
//                   return null;
//                }
//                return (
//                   <>
//           <Ngif condition={buttonsMenu}>
//   <MenuItem
//     onClick={(e) => {
//       e.stopPropagation();
//       element.handleButton(item);
//     }}
//     sx={{
//       padding: '8px 16px',
//       '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//       }
//     }}
//   >
//     <Tooltip title={element.toltip} placement="top-start" arrow>
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         width: '100%',
//         gap: '12px',
//         padding: '4px 0'
//       }}>
//         <IconButton
//           size="small"
//           style={{ 
//             color: element.color,
//             marginRight: '8px'
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             element.handleButton(item);
//           }}
//         >
//           <element.icon style={{ fontSize: '1.2rem' }} />
//         </IconButton>
        
//         {element.message && (
//           <span style={{
//             flex: 1,
//             fontSize: '0.875rem',
//             fontWeight: 400,
//             color: 'inherit'
//           }}>
//             {element.message}
//           </span>
//         )}
//       </div>
//     </Tooltip>
//   </MenuItem>
// </Ngif>
//                      <Ngif condition={!buttonsMenu}>
//                         <Tooltip title={element.toltip} placement="top-start">
//                            <IconButton
//                               style={{ color: element.color }}
//                               onClick={() => {
//                                  element.handleButton(item);
//                               }}
//                               variant="outlined"
//                            >
//                               <element.icon />
//                               {element.message}
//                            </IconButton>
//                         </Tooltip>
//                      </Ngif>
//                   </>
//                );
//             }
//          })}
//       </>
//    );
// };

// const EditButton = ({ handleEdit, item }) => {
//    return (
//       <IconButton
//          aria-label="edit"
//          color="warning"
//          onClick={() => {
//             handleEdit(item);
//          }}
//       >
//          <EditIcon style={{ color: "orange" }} />
//       </IconButton>
//    );
// };
// const DeleteButton = ({ handleDelete, item }) => {
//    return (
//       <IconButton
//          aria-label="delete"
//          color="warning"
//          onClick={() => {
//             handleDelete(item);
//          }}
//       >
//          <DeleteIcon style={{ color: "red" }} />
//       </IconButton>
//    );
// };

// const Transition = forwardRef(function Transition(props, ref) {
//    return <Slide direction="up" ref={ref} {...props} />;
// });

// export const Modal = ({ children, openModal, setOpenModal, setText, close = true }) => {
//    useEffect(() => {}, [openModal]);
//    const handleClose = () => {
//       setOpenModal(false);
//       if (setText) {
//          setText("");
//       }
//    };
//    return (
//       <>
//          <Dialog
//             fullWidth
//             maxWidth={"xl"}
//             open={openModal}
//             TransitionComponent={Transition} // Corregir la asignación de la transición
//             keepMounted
//             onClose={openModal}
//             aria-describedby="alert-dialog-slide-description"
//          >
//             {/* <DialogTitle>{"Se a presentado un error"}</DialogTitle> */}
//             <DialogContent>
//                <DialogContentText id="alert-dialog-slide-description">{children}</DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                <Ngif condition={close}>
//                   <Button onClick={handleClose}>Cerrar</Button>
//                </Ngif>
//             </DialogActions>
//          </Dialog>
//       </>
//    );
// };

// const Charts = ({ titles, dataFilter, headers, dataHidden }) => {
//    const [keys, setKeys] = useState([]);
//    const [counts, setCounts] = useState([]);
//    const [message, setMessage] = useState("");
//    useEffect(() => {}, [keys, counts]);
//    const [chart, setChart] = useState(null);
//    const [name, setName] = useState(null);
//    const handleChangeChart = (event) => {
//       setChart(event.target.value);
//    };
//    const countOccurrences = (array) => {
//       const occurrences = {};

//       // Contar las ocurrencias de cada valor en el array
//       array.forEach((value) => {
//          occurrences[value] = (occurrences[value] || 0) + 1;
//       });

//       // Convertir el objeto de ocurrencias en dos arrays separados
//       const values = Object.keys(occurrences);
//       const counts = values.map((value) => occurrences[value]);

//       return { values, counts };
//    };

//    const handleChangeName = (event) => {
//       setName(event.target.value);
//       const index = titles.indexOf(event.target.value);

//       // Filtrar los datos primero
//       const filteredData = dataFilter.map((item) => {
//          const newItem = { ...item };

//          // Eliminar las claves especificadas en dataHidden
//          dataHidden.forEach((key) => {
//             delete newItem[key];
//          });

//          return newItem;
//       });

//       // Extraer los valores correspondientes del array de objetos filtrados
//       const values = filteredData.map((item) => {
//          // Obtener las claves del objeto como un array
//          const keys = Object.keys(item);

//          // Usar el índice para seleccionar la clave correcta y extraer el valor correspondiente
//          return item[keys[index]];
//       });

//       // Contar las ocurrencias de cada valor y separar en dos arrays
//       const { values: uniqueValues, counts } = countOccurrences(values);

//       // Ordenar por counts de forma descendente
//       const sortedIndices = counts.map((_, index) => index).sort((a, b) => counts[b] - counts[a]);

//       // Obtener los 20 valores más altos
//       sortedIndices.length > 20 ? setMessage("Se han mostrado solo los 20 valores más altos.") : setMessage("");
//       const limitedIndices = sortedIndices.slice(0, 20);

//       const limitedUniqueValues = limitedIndices.map((index) => uniqueValues[index]);
//       const limitedCounts = limitedIndices.map((index) => counts[index]);

//       // Hacer lo que necesites con uniqueValues y counts limitados a los 20 más altos
//       setKeys(limitedUniqueValues);
//       setCounts(limitedCounts);

//       // setData(values);
//    };

//    const filterData = (dataFilter, dataHidden) => {
//       return dataFilter.map((item) => {
//          const newItem = { ...item };
//          dataHidden.forEach((key) => {
//             delete newItem[key];
//          });
//          return newItem;
//       });
//    };

//    return (
//       <Grid container spacing={1} sx={{ marginTop: "2rem" }}>
//          <Grid
//             item
//             xs={12}
//             lg={5}
//             sx={{
//                marginBottom: "2rem",
//                marginLeft: "2rem",
//                marginRight: "2rem",
//                overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
//                border: "2px solid #007bff",
//                borderRadius: "10px",
//                padding: "1rem",
//                paddingRight: "2rem",
//                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
//             }}
//          >
//             <Box sx={{ minWidth: 120, marginLeft: "auto" }}>
//                <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">Selecciona la grafica</InputLabel>
//                   <Select
//                      labelId="demo-simple-select-label"
//                      id="demo-simple-select"
//                      // value={textModal}

//                      // onChange={handleTextModal}
//                      onChange={handleChangeChart}
//                      label="Selecciona la grafica"
//                   >
//                      <MenuItem key={"column"} selected value={"column"}>
//                         {"columna"}
//                      </MenuItem>
//                      <MenuItem key={"bar"} selected value={"bar"}>
//                         {"barra"}
//                      </MenuItem>
//                      <MenuItem key={"pie"} selected value={"pie"}>
//                         {"pastel"}
//                      </MenuItem>
//                      <MenuItem key={"area"} selected value={"area"}>
//                         {"area"}
//                      </MenuItem>
//                      <MenuItem key={"line"} selected value={"line"}>
//                         {"linea"}
//                      </MenuItem>
//                   </Select>
//                </FormControl>
//             </Box>
//             <Box sx={{ minWidth: 120, marginLeft: "auto", marginTop: "1rem" }}>
//                <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">¿Qué quieres graficar?</InputLabel>
//                   <Select
//                      labelId="demo-simple-select-label"
//                      id="demo-simple-select"
//                      // value={textModal}
//                      onChange={handleChangeName}
//                      label="¿Qué quieres graficar?"
//                   >
//                      {titles.map((item) => (
//                         <MenuItem key={item} value={item}>
//                            {item}
//                         </MenuItem>
//                      ))}
//                   </Select>
//                </FormControl>
//             </Box>
//          </Grid>
//          <Grid
//             item
//             xs={12}
//             lg={6}
//             sx={{
//                marginBottom: "2rem",

//                overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
//                border: "2px solid #007bff",
//                borderRadius: "10px",
//                padding: "1rem",
//                paddingRight: "2rem",
//                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
//             }}
//          >
//             <Ngif condition={chart != null && name != null}>
//                <Ngif condition={message != ""}>
//                   <Alert severity="info">{message}</Alert>
//                </Ngif>

//                <Chart chart={chart} name={name} titles={keys} values={counts} card={true} width={12} />
//             </Ngif>
//          </Grid>
//       </Grid>
//    );
// };
// const Component = ({ option, titles, dataFilter, headers, dataHidden, colors, fileName, excelLayout = [], excelLayoutDownRowsStart = 0 }) => {
//    switch (option) {
//       case "grafica":
//          return <Charts titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />;
//          break;
//       case "excel":
//          return (
//             <Excel
//                titles={titles}
//                dataFilter={dataFilter}
//                dataHidden={dataHidden}
//                headers={headers}
//                fileName={fileName}
//                excelLayout={excelLayout}
//                excelLayoutDownRowsStart={excelLayoutDownRowsStart}
//             />
//          );
//       case "colors":
//          return <Colors colors={colors} />;
//          break;
//    }
// };

// const Colors = ({ colors }) => {
//    useEffect(() => {}, []);
//    return (
//       <Grid container>
//          <Typography variant="h2" color="initial" width={"100%"} textAlign={"center"}>
//             Paleta de colores
//          </Typography>
//          {colors.map((color) => {
//             return (
//                <Paper
//                   elevation={3}
//                   sx={{
//                      width: "8rem",
//                      borderRadius: "20%",
//                      transition: "transform 0.3s ease-in-out",
//                      "&:hover": {
//                         transform: "scale(1.05)",
//                         boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//                      },
//                      height: "8rem",
//                      margin: "1rem",
//                      background: color.color,
//                      display: "flex",
//                      justifyContent: "center",
//                      alignItems: "center"
//                   }}
//                >
//                   <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} display="flex" textAlign="center">
//                      {color.text}
//                   </Typography>
//                </Paper>
//             );
//          })}
//       </Grid>
//    );
// };

// const Excel = ({ titles, dataFilter, dataHidden, headers, fileName, excelLayout, excelLayoutDownRowsStart }) => {
//    const [keys, setKeys] = useState([]);
//    const [counts, setCounts] = useState([]);
//    const [checkeds, setCheckeds] = useState(headers);

//    useEffect(() => {}, [keys, counts]);
//    const [chart, setChart] = useState(null);
//    const [name, setName] = useState(null);
//    const handleChangeChart = (event) => {
//       setChart(event.target.value);
//    };
//    const countOccurrences = (array) => {
//       const occurrences = {};

//       // Contar las ocurrencias de cada valor en el array
//       array.forEach((value) => {
//          occurrences[value] = (occurrences[value] || 0) + 1;
//       });

//       // Convertir el objeto de ocurrencias en dos arrays separados
//       const values = Object.keys(occurrences);
//       const counts = values.map((value) => occurrences[value]);

//       return { values, counts };
//    };

//    const handleExportClick = () => {
//       const filteredData = filterData(dataFilter, dataHidden);
//       // headers;

//       const checkedKeys = checkeds;
//       const filteredDataWithHeaders = filteredData.map((obj) => {
//          const newObj = {};
//          Object.keys(obj).forEach((key, index) => {
//             const header = headers[index]; // Obtiene el título correspondiente
//             newObj[header] = obj[key]; // Asigna el valor del objeto a la clave correspondiente del título
//          });
//          return newObj;
//       });

//       const filteredDataWithCheckedKeys = filteredDataWithHeaders.map((obj) => {
//          const newObj = {};
//          checkedKeys.forEach((key) => {
//             if (obj.hasOwnProperty(key)) {
//                newObj[key] = obj[key];
//             }
//          });
//          return newObj;
//       });

//       exportToExcel(filteredDataWithCheckedKeys, fileName, excelLayoutDownRowsStart, excelLayout);
//    };

//    const filterData = (dataFilter, dataHidden) => {
//       return dataFilter.map((item) => {
//          const newItem = { ...item };
//          dataHidden.forEach((key) => {
//             delete newItem[key];
//          });
//          return newItem;
//       });
//    };

//    const exportToExcel = async (data, fileName, emptyRows = 0, rowStyles = []) => {
//       if (data.length === 0 || Object.keys(data[0]).length === 0) {
//          return;
//       }

//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet("Sheet1");

//       // Crear filas vacías antes de los encabezados
//       for (let i = 0; i < emptyRows; i++) {
//          worksheet.addRow([]); // Añadir filas vacías
//       }

//       // Obtener los encabezados
//       const headers = Object.keys(data[0]);
//       worksheet.addRow(headers); // Añadir los encabezados

//       // Añadir los datos
//       data.forEach((row) => {
//          worksheet.addRow(Object.values(row));
//       });

//       // Ajustar el ancho de las columnas basado en el contenido
//       headers.forEach((key, index) => {
//          const maxLength = Math.max(...data.map((row) => (row[key] ? row[key].toString().length : 0)), key.length);
//          worksheet.getColumn(index + 1).width = maxLength + 2; // Ajustar con un pequeño margen
//       });
//       // Aplicar estilos personalizados a las filas
//       rowStyles.forEach((style) => {
//          const { row, color, finish, textColor, write, height } = style;
//          const worksheetRow = worksheet.getRow(row);

//          if (height) {
//             worksheetRow.height = height;
//          }
//          if (finish) {
//             const endColIndex = finish.charCodeAt(0) - 65; // Convertir la letra a índice (A=0, B=1, ...)

//             // Aplicar estilo a la fila
//             for (let C = 0; C <= endColIndex; ++C) {
//                const cell = worksheet.getRow(row).getCell(C + 1); // Ajustar fila
//                cell.fill = {
//                   type: "pattern",
//                   pattern: "solid",
//                   fgColor: { argb: color.replace("#", "") }
//                };
//                cell.font = {
//                   bold: true,
//                   color: { argb: textColor ? textColor.replace("#", "") : "" }
//                };
//                cell.alignment = { horizontal: "center" };
//             }
//          }

//          // Escribir texto específico en las celdas
//          if (write) {
//             write.forEach(({ letter, write: cellWrite, spacing }) => {
//                if (letter) {
//                   const cellIndex = letter.charCodeAt(0) - 65; // Convertir la letra a índice
//                   const writeCell = worksheet.getRow(row).getCell(cellIndex + 1);
//                   writeCell.value = cellWrite;

//                   // Combinar celdas si hay spacing
//                   if (spacing) {
//                      const startCellIndex = letter.charCodeAt(0) - 65;
//                      const endCellIndex = spacing.map((l) => l.charCodeAt(0) - 65).reduce((a, b) => Math.max(a, b), startCellIndex);
//                      worksheet.mergeCells(row, startCellIndex + 1, row, endCellIndex + 1); // Combinar celdas
//                      writeCell.alignment = { horizontal: "center" }; // Centrar el texto en la celda combinada
//                   }
//                }
//             });
//          }
//       });

//       // Estilo para el encabezado
//       const headerRow = worksheet.getRow(emptyRows + 1);
//       headerRow.eachCell((cell) => {
//          cell.font = { bold: true };
//          cell.fill = {
//             type: "pattern",
//             pattern: "solid",
//             fgColor: { argb: "E1E1E1" }
//          };
//          cell.alignment = { horizontal: "center" };
//       });

//       // Aplicar autofiltro a los encabezados
//       worksheet.autoFilter = {
//          from: {
//             row: emptyRows + 1,
//             column: 1
//          },
//          to: {
//             row: emptyRows + 1,
//             column: headers.length
//          }
//       };

//       // Generar el archivo Excel y guardarlo
//       const buffer = await workbook.xlsx.writeBuffer();
//       const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//       saveAs(blob, `${fileName ? fileName : "exportacion"}.xlsx`);
//    };

//    const handleExport = () => {
//       exportToExcel(data, "mi_exportacion", 2);
//    };

//    const handleChange = (item) => {
//       setCheckeds((prevCheckeds) => {
//          if (prevCheckeds.includes(item)) {
//             return prevCheckeds.filter((checkedItem) => checkedItem !== item);
//          } else {
//             return [...prevCheckeds, item];
//          }
//       });
//    };

//    const handleSelectAll = (event) => {
//       if (event.target.checked) {
//          setCheckeds(headers);
//       } else {
//          setCheckeds([]);
//       }
//    };
//    return (
//       <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
//          <Typography variant="h5" display="flex" mb="1.5rem" minWidth="100%" justifyContent="center" color="initial">
//             EXPORTAR A EXCEL
//          </Typography>

//          <Grid
//             item
//             xs={12}
//             sx={{
//                position: "relative",
//                marginLeft: "1rem",
//                marginRight: "1rem",
//                overflow: "hidden",
//                border: "2px solid #007bff",
//                borderRadius: "10px",
//                padding: "1.5rem",
//                paddingRight: "2.5rem",
//                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
//             }}
//          >
//             <FormControlLabel
//                sx={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center"
//                }}
//                control={
//                   <Checkbox
//                      checked={checkeds.length === headers.length}
//                      indeterminate={checkeds.length > 0 && checkeds.length < headers.length}
//                      onChange={handleSelectAll}
//                   />
//                }
//                label={checkeds.length < headers.length ? "Marcar todos" : "Desmarcar todos"}
//             />
//             <FormGroup sx={{ marginBottom: "2rem" }}>
//                <Grid container spacing={2}>
//                   {headers.map((item, index) => (
//                      <Grid item xs={12} sm={3} key={index}>
//                         <FormControlLabel control={<Checkbox checked={checkeds.includes(item)} name={item} onChange={() => handleChange(item)} />} label={item} />
//                      </Grid>
//                   ))}
//                </Grid>
//             </FormGroup>
//             <Button sx={{ position: "absolute", bottom: "1rem", right: "1rem" }} variant="contained" disableElevation onClick={handleExportClick}>
//                Exportar
//             </Button>
//          </Grid>
//       </Grid>
//    );
// };

// export default DataTable;
import React, { forwardRef, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
   Checkbox,
   FormControlLabel,
   FormGroup,
   Grid,
   IconButton,
   ListItem,
   ListItemText,
   Paper,
   Tooltip,
   Typography,
   Box,
   MenuItem,
   FormControl,
   Select,
   Button,
   InputLabel,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   Slide,
   Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import BarChartIcon from "@mui/icons-material/BarChart";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Chart } from "../charts/Charts";
import { Ngif } from "../../Reusables/conditionals/Ngif";
import Loading from "../loading/Loading";
import BasicMenu from "../basicmenu/BasicMenu";
import { Voice } from "../formik/FormikForm";
import Swal from "sweetalert2";

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

const normalizeStr = (str) =>
   String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();

const evaluateCondition = (item, condition) => {
   if (!condition) return true;
   const andParts = condition.includes("&&") ? condition.split("&&") : null;
   const orParts = condition.includes("||") ? condition.split("||") : null;
   const evalSimple = (cond) => {
      const m = cond.trim().match(/^(.+?)\s*(==|!=|>=|<=|>|<)\s*'([^']+)'$/);
      if (!m) return false;
      const [, key, op, val] = m;
      const iv = item[key.trim()];
      switch (op) {
         case "==": return iv == val;
         case "!=": return iv != val;
         case ">=": return iv >= val;
         case "<=": return iv <= val;
         case ">": return iv > val;
         case "<": return iv < val;
         default: return false;
      }
   };
   if (andParts) return andParts.every(evalSimple);
   if (orParts) return orParts.some(evalSimple);
   return evalSimple(condition);
};

const checkConditions = (item, conditions = []) =>
   conditions.every((c) => evaluateCondition(item, c));

const truncate = (val, max = 40) => {
   if (typeof val !== "string") return val;
   return val.length > max ? val.substring(0, max) + "…" : val;
};

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents (styled with Tailwind)
// ─────────────────────────────────────────────────────────────────────────────

const SearchInput = ({ column, getData }) => {
   const [val, setVal] = useState("");
   const onChange = (e) => {
      setVal(e.target.value);
      getData?.(column, e.target.value);
   };
   return (
      <div className="flex items-center gap-1 w-full">
         <SearchIcon className="text-slate-400 shrink-0" style={{ fontSize: 14 }} />
         <input
            value={val}
            onChange={onChange}
            placeholder="Filtrar…"
            className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 border-b border-slate-200 focus:border-indigo-400 focus:outline-none py-0.5 transition-colors"
         />
      </div>
   );
};

const GlobalFilter = ({ data, dataHidden, setFilteredData }) => {
   const [val, setVal] = useState("");
   const onChange = (e) => {
      const q = e.target.value;
      setVal(q);
      if (!q) { setFilteredData(data); return; }
      const norm = normalizeStr(q);
      setFilteredData(
         data.filter((row) =>
            Object.entries(row).some(([k, v]) =>
               !dataHidden.includes(k) && normalizeStr(String(v ?? "")).includes(norm)
            )
         )
      );
   };
   return (
      <div className="relative flex items-center max-w-xs w-full">
         <SearchIcon className="absolute left-2.5 text-slate-400 pointer-events-none" style={{ fontSize: 16 }} />
         <input
            value={val}
            onChange={onChange}
            placeholder="Buscar en tabla…"
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
         />
      </div>
   );
};

const Btn = ({ onClick, children, variant = "ghost", size = "sm", className = "" }) => {
   const base = "inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 disabled:opacity-40";
   const sizes = { xs: "px-2 py-1 text-xs", sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
   const variants = {
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200",
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm",
      outline: "border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
      danger: "text-red-500 hover:bg-red-50 active:bg-red-100",
      warning: "text-amber-500 hover:bg-amber-50 active:bg-amber-100",
   };
   return (
      <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
         {children}
      </button>
   );
};

const Pagination = ({ page, totalPages, total, perPage, onPrev, onNext, onPerPageChange, pagination }) => {
   const start = total === 0 ? 0 : (page - 1) * perPage + 1;
   const end = Math.min(page * perPage, total);

   return (
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-white border-t border-slate-200 rounded-b-xl">
         <p className="text-xs text-slate-500 tabular-nums">
            {total === 0 ? "Sin resultados" : `${start}–${end} de ${total}`}
         </p>
         <div className="flex items-center gap-1.5">
            <Btn variant="outline" size="xs" onClick={onPrev} disabled={page <= 1}>
               ← Anterior
            </Btn>
            <span className="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md tabular-nums">
               {page} / {totalPages || 1}
            </span>
            <Btn variant="outline" size="xs" onClick={onNext} disabled={page >= totalPages}>
               Siguiente →
            </Btn>
         </div>
         {pagination && (
            <div className="flex items-center gap-2">
               <span className="text-xs text-slate-500">Filas:</span>
               <select
                  value={perPage}
                  onChange={(e) => onPerPageChange(Number(e.target.value))}
                  className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
               >
                  {pagination.map((n) => <option key={n} value={n}>{n}</option>)}
               </select>
            </div>
         )}
      </div>
   );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main DataTable (UI mejorada)
// ─────────────────────────────────────────────────────────────────────────────

const DataTable = ({
   excelLayoutDownRowsStart = 0,
   excelLayout = [],
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
   speakRow = false,
   fileName = null,
   parent = null,
}) => {
   // ── State ──
   const [filteredData, setFilteredData] = useState(data);
   const [columnFilters, setColumnFilters] = useState({});
   const [page, setPage] = useState(1);
   const [perPage, setPerPage] = useState(pagination ? pagination[0] : 1e6);
   const [expanded, setExpanded] = useState([]);
   const [optionModal, setOptionModal] = useState("");
   const [openModal, setOpenModal] = useState(false);
   const [tdRead, setTdRead] = useState(null);
   const [readLine, setReadLine] = useState(null);

   // ── Sync when data changes ──
   useEffect(() => {
      setFilteredData(data);
      setColumnFilters({});
      setPage(1);
   }, [data]);

   // ── Apply column filters ──
   const visibleData = useMemo(() => {
      if (Object.keys(columnFilters).length === 0) return filteredData;
      return filteredData.filter((row) =>
         Object.entries(columnFilters).every(([col, val]) => {
            if (!val) return true;
            if (dataHidden.includes(col)) return true;
            return normalizeStr(String(row[col] ?? "")).includes(normalizeStr(val));
         })
      );
   }, [filteredData, columnFilters, dataHidden]);

   // ── Pagination ──
   const totalPages = pagination ? Math.max(1, Math.ceil(visibleData.length / perPage)) : 1;
   const pageData = useMemo(() => {
      if (!pagination) return visibleData;
      const start = (page - 1) * perPage;
      return visibleData.slice(start, start + perPage);
   }, [visibleData, page, perPage, pagination]);

   const handlePrev = () => setPage((p) => Math.max(1, p - 1));
   const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
   const handlePerPageChange = (val) => {
      setPerPage(val);
      setPage(1);
   };
   const handleColumnFilter = useCallback((col, val) => {
      setColumnFilters((prev) => ({ ...prev, [col]: val }));
      setPage(1);
   }, []);

   // ── Headers derivation ──
   const visibleHeaders = useMemo(() => {
      if (headers && headers.length > 0) return headers;
      if (data.length === 0) return [];
      return Object.keys(data[0]).filter((k) => !dataHidden.includes(k));
   }, [headers, data, dataHidden]);

   const visibleKeys = useMemo(() => {
      if (data.length === 0) return [];
      return Object.keys(data[0]).filter((k) => !dataHidden.includes(k));
   }, [data, dataHidden]);

   // ── Row background ──
   const rowBg = (item) => {
      for (const c of Trbacground) {
         if (checkConditions(item, c.conditions)) return c.color;
      }
      return "";
   };

   // ── Delete confirm ──
   const handleDeleteSecurity = (item) => {
      Swal.fire({
         title: "¿Estás seguro?",
         text: "Una vez eliminado, ¡no podrás recuperar la información!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Sí, eliminarlo",
         cancelButtonText: "Cancelar",
         reverseButtons: true,
      }).then((res) => {
         if (res.isConfirmed) handleDelete(item);
      });
   };

   // ── Expand rows ──
   const toggleExpand = (idx) =>
      setExpanded((prev) =>
         prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );

   // ── Options modal ──
   const openOption = (val) => {
      setOptionModal(val);
      setOpenModal(true);
   };

   const hasActions = editButton || deleteButton || moreButtons.length > 0;

   return (
      <div className="w-full flex flex-col gap-4 font-sans">
         {/* ── Toolbar ── */}
         <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex flex-wrap items-center gap-2">
               {captionFilters}
               {captionButtons.map((btn, i) => (
                  <Btn key={i} variant="outline" size="sm" onClick={() => btn.handleButton(filteredData)}>
                     <btn.icon style={{ fontSize: 16 }} />
                     {btn.text}
                  </Btn>
               ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 ml-auto">
               {filterGlobal && (
                  <GlobalFilter data={data} dataHidden={dataHidden} setFilteredData={(d) => { setFilteredData(d); setPage(1); }} />
               )}
               {options.length > 0 && (
                  <div className="flex items-center gap-1.5">
                     {options.includes("CHARTS") && (
                        <Btn variant="outline" size="sm" onClick={() => openOption("grafica")}>
                           <BarChartIcon style={{ fontSize: 16 }} /> Gráficas
                        </Btn>
                     )}
                     {options.includes("EXCEL") && (
                        <Btn variant="outline" size="sm" onClick={() => openOption("excel")}>
                           <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z" />
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                           </svg>
                           Excel
                        </Btn>
                     )}
                     {options.includes("COLORS") && (
                        <Btn variant="outline" size="sm" onClick={() => openOption("colors")}>
                           <ColorLensIcon style={{ fontSize: 16 }} /> Colores
                        </Btn>
                     )}
                  </div>
               )}
            </div>
         </div>

         {/* ── Table card ── */}
         <div className="w-full rounded-xl border border-slate-200 shadow-md overflow-hidden bg-white">
            <div className="overflow-x-auto">
               <table className="w-full border-collapse text-sm">
                  {/* HEADER con gradiente y bordes */}
                  <thead>
                     <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white border-b-2 border-slate-600">
                        {speakRow && (
                           <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-r border-slate-600">
                              Leer
                           </th>
                        )}
                        <th className="w-8 px-3 py-3 border-r border-slate-600">
                           <span className="sr-only">Expandir</span>
                        </th>
                        {visibleHeaders.map((h, i) => (
                           <th
                              key={i}
                              className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${i < visibleHeaders.length - 1 ? 'border-r border-slate-600' : ''}`}
                           >
                              <Tooltip title={h} placement="top" arrow>
                                 <span>{truncate(h.charAt(0).toUpperCase() + h.slice(1), 22)}</span>
                              </Tooltip>
                           </th>
                        ))}
                        {hasActions && (
                           <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                              Acciones
                           </th>
                        )}
                     </tr>

                     {/* Column filters row con fondo gris claro y bordes */}
                     {filter && (
                        <tr className="bg-slate-100 border-b border-slate-200">
                           {speakRow && <th className="px-4 py-2 border-r border-slate-200"></th>}
                           <th className="px-2 py-2 border-r border-slate-200"></th>
                           {visibleKeys.map((key, i) => (
                              <th key={i} className={`px-3 py-2 ${i < visibleKeys.length - 1 ? 'border-r border-slate-200' : ''}`}>
                                 <SearchInput column={key} getData={handleColumnFilter} />
                              </th>
                           ))}
                           {hasActions && <th className="px-4 py-2"></th>}
                        </tr>
                     )}
                  </thead>

                  {/* BODY con filas zebra y hover */}
                  <tbody className="divide-y divide-slate-100">
                     {loading && pageData.length === 0 ? (
                        <tr>
                           <td colSpan={visibleHeaders.length + (speakRow ? 1 : 0) + (hasActions ? 1 : 0) + 1} className="py-16 text-center">
                              <Loading />
                           </td>
                        </tr>
                     ) : pageData.length === 0 ? (
                        <tr>
                           <td colSpan={visibleHeaders.length + (speakRow ? 1 : 0) + (hasActions ? 1 : 0) + 1} className="py-12 text-center text-slate-400 text-sm">
                              <div className="flex flex-col items-center gap-2">
                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300">
                                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                                 </svg>
                                 No hay registros para mostrar
                              </div>
                           </td>
                        </tr>
                     ) : (
                        pageData.map((item, rowIdx) => {
                           const bg = rowBg(item);
                           const isExpanded = expanded.includes(rowIdx);
                           const itemEntries = Object.entries(item).filter(([k]) => !dataHidden.includes(k));

                           return (
                              <React.Fragment key={rowIdx}>
                                 <tr
                                    className={`group transition-all duration-150 ease-in-out ${!bg ? (rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50") : ""
                                       } ${!bg ? "hover:bg-slate-100" : "hover:brightness-95"}`}
                                    style={bg ? { backgroundColor: bg } : {}}
                                 >
                                    {speakRow && (
                                       <td className="px-4 py-2.5 text-center border-r border-slate-100">
                                          <Voice
                                             setLine={setReadLine}
                                             line={rowIdx}
                                             message={Object.entries(item)
                                                .filter(([k]) => !dataHidden.includes(k))
                                                .flatMap(([k, v]) => [k, v])}
                                             title="Fila"
                                             flex={false}
                                             velocity={1.45}
                                             setSpeaking={setTdRead}
                                          />
                                       </td>
                                    )}

                                    {/* Expand toggle */}
                                    <td className="w-8 px-2 py-2.5 text-center border-r border-slate-100">
                                       <button
                                          onClick={() => toggleExpand(rowIdx)}
                                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                       >
                                          {isExpanded
                                             ? <MinimizeIcon style={{ fontSize: 14 }} />
                                             : <AddCircleIcon style={{ fontSize: 14 }} />}
                                       </button>
                                    </td>

                                    {itemEntries.map(([key, value], colIdx) => (
                                       <td
                                          key={colIdx}
                                          className={`px-4 py-2.5 text-slate-700 text-sm tabular-nums border-r border-slate-100 last:border-r-0 ${tdRead === colIdx && readLine === rowIdx
                                             ? "text-indigo-600 font-semibold bg-indigo-50"
                                             : ""
                                             }`}
                                       >
                                          {link.includes(colIdx) ? (
                                             <a href={value} download className="text-indigo-500 underline underline-offset-2 hover:text-indigo-700 text-xs">
                                                {truncate(String(value ?? ""), 30)}
                                             </a>
                                          ) : (
                                             <Tooltip title={String(value ?? "")} placement="top" arrow>
                                                <span className="break-words">
                                                   {typeof value === "string"
                                                      ? truncate(value, 40)
                                                      : value ?? "—"}
                                                </span>
                                             </Tooltip>
                                          )}
                                       </td>
                                    ))}

                                    {/* Actions */}
                                    {hasActions && (
                                       <td className="px-3 py-2 text-center">
                                          {buttonsMenu ? (
                                             <BasicMenu>
                                                {editButton && checkConditions(item, conditionExistEditButton) && (
                                                   <MenuItem onClick={() => handleEdit(item)}>
                                                      <EditIcon style={{ color: "orange", marginRight: 8, fontSize: 18 }} />
                                                      Editar
                                                   </MenuItem>
                                                )}
                                                {deleteButton && checkConditions(item, conditionExistDeleteButton) && (
                                                   <MenuItem onClick={() => handleDeleteSecurity(item)}>
                                                      <DeleteIcon style={{ color: "red", marginRight: 8, fontSize: 18 }} />
                                                      Eliminar
                                                   </MenuItem>
                                                )}
                                                {moreButtons.map((btn, bi) =>
                                                   checkConditions(item, btn.conditions) ? (
                                                      <MenuItem key={bi} onClick={() => btn.handleButton(item)}>
                                                         <btn.icon style={{ color: btn.color, marginRight: 8, fontSize: 18 }} />
                                                         {btn.message}
                                                      </MenuItem>
                                                   ) : null
                                                )}
                                             </BasicMenu>
                                          ) : (
                                             <div className="flex items-center justify-center gap-1">
                                                {editButton && checkConditions(item, conditionExistEditButton) && (
                                                   <Tooltip title="Editar" arrow>
                                                      <button
                                                         onClick={() => handleEdit(item)}
                                                         className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                      >
                                                         <EditIcon style={{ fontSize: 17 }} />
                                                      </button>
                                                   </Tooltip>
                                                )}
                                                {deleteButton && checkConditions(item, conditionExistDeleteButton) && (
                                                   <Tooltip title="Eliminar" arrow>
                                                      <button
                                                         onClick={() => handleDeleteSecurity(item)}
                                                         className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                                                      >
                                                         <DeleteIcon style={{ fontSize: 17 }} />
                                                      </button>
                                                   </Tooltip>
                                                )}
                                                {moreButtons.map((btn, bi) =>
                                                   checkConditions(item, btn.conditions) ? (
                                                      <Tooltip key={bi} title={btn.toltip} arrow>
                                                         <button
                                                            onClick={() => btn.handleButton(item)}
                                                            className="p-1.5 rounded-lg transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                                            style={{ color: btn.color }}
                                                         >
                                                            <btn.icon style={{ fontSize: 17 }} />
                                                            {btn.message && (
                                                               <span className="text-xs ml-1">{btn.message}</span>
                                                            )}
                                                         </button>
                                                      </Tooltip>
                                                   ) : null
                                                )}
                                             </div>
                                          )}
                                       </td>
                                    )}
                                 </tr>

                                 {/* Expanded detail row */}
                                 {isExpanded && (
                                    <tr className="bg-indigo-50/30 border-t border-indigo-100">
                                       <td colSpan={visibleHeaders.length + (speakRow ? 1 : 0) + (hasActions ? 1 : 0) + 1} className="px-6 py-4">
                                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                             {itemEntries.map(([key, value], ci) => (
                                                <div key={ci} className="bg-white rounded-lg border border-slate-200 px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                                                   <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                                      {visibleHeaders[ci] ?? key}
                                                   </p>
                                                   {link.includes(ci) ? (
                                                      <a href={value} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 underline break-all">
                                                         {String(value ?? "")}
                                                      </a>
                                                   ) : (
                                                      <p className="text-sm text-slate-700 break-words">{String(value ?? "—")}</p>
                                                   )}
                                                </div>
                                             ))}
                                          </div>
                                       </td>
                                    </tr>
                                 )}
                              </React.Fragment>
                           );
                        })
                     )}
                  </tbody>
               </table>
            </div>

            {/* Pagination */}
            {pagination && (
               <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={visibleData.length}
                  perPage={perPage}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onPerPageChange={handlePerPageChange}
                  pagination={pagination}
               />
            )}
         </div>

         {/* Options Modal */}
         <Ngif condition={options.length > 0}>
            <Modal openModal={openModal} setOpenModal={setOpenModal} setText={setOptionModal}>
               <Component
                  excelLayoutDownRowsStart={excelLayoutDownRowsStart}
                  excelLayout={excelLayout}
                  option={optionModal}
                  titles={headers}
                  dataFilter={filteredData}
                  dataHidden={dataHidden}
                  headers={headers}
                  colors={Trbacground}
                  fileName={fileName}
               />
            </Modal>
         </Ngif>
      </div>
   );
};

// ─────────────────────────────────────────────────────────────────────────────
// Modal (MUI Dialog with slide transition)
// ─────────────────────────────────────────────────────────────────────────────

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({ children, openModal, setOpenModal, setText, close = true }) => {
   const handleClose = () => {
      setOpenModal(false);
      setText?.("");
   };
   return (
      <Dialog fullWidth maxWidth="xl" open={openModal} TransitionComponent={Transition} keepMounted onClose={handleClose}>
         <DialogContent>
            <DialogContentText component="div">{children}</DialogContentText>
         </DialogContent>
         <DialogActions>
            {close && <Button onClick={handleClose}>Cerrar</Button>}
         </DialogActions>
      </Dialog>
   );
};

// ─────────────────────────────────────────────────────────────────────────────
// Component switcher
// ─────────────────────────────────────────────────────────────────────────────

const Component = ({ option, titles, dataFilter, headers, dataHidden, colors, fileName, excelLayout, excelLayoutDownRowsStart }) => {
   switch (option) {
      case "grafica": return <Charts titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />;
      case "excel": return <Excel titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} fileName={fileName} excelLayout={excelLayout} excelLayoutDownRowsStart={excelLayoutDownRowsStart} />;
      case "colors": return <Colors colors={colors} />;
      default: return null;
   }
};

// ─────────────────────────────────────────────────────────────────────────────
// Colors Component
// ─────────────────────────────────────────────────────────────────────────────

const Colors = ({ colors }) => (
   <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Paleta de Colores</h2>
      <div className="flex flex-wrap gap-4 justify-center">
         {colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
               <div
                  className="w-20 h-20 rounded-2xl shadow-md ring-1 ring-black/10 transition-transform hover:scale-105"
                  style={{ background: c.color }}
               />
               <span className="text-xs font-medium text-slate-600">{c.text}</span>
            </div>
         ))}
      </div>
   </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Charts Component
// ─────────────────────────────────────────────────────────────────────────────

const Charts = ({ titles, dataFilter, headers, dataHidden }) => {
   const [chartType, setChartType] = useState(null);
   const [fieldName, setFieldName] = useState(null);
   const [keys, setKeys] = useState([]);
   const [counts, setCounts] = useState([]);
   const [message, setMessage] = useState("");

   const handleField = (e) => {
      const name = e.target.value;
      setFieldName(name);
      const idx = titles.indexOf(name);
      const filtered = dataFilter.map((row) => {
         const r = { ...row };
         dataHidden.forEach((k) => delete r[k]);
         return r;
      });
      const vals = filtered.map((row) => Object.values(row)[idx]);
      const occ = {};
      vals.forEach((v) => (occ[v] = (occ[v] || 0) + 1));
      const sorted = Object.entries(occ).sort((a, b) => b[1] - a[1]).slice(0, 20);
      setMessage(Object.keys(occ).length > 20 ? "Se muestran solo los 20 valores más altos." : "");
      setKeys(sorted.map(([k]) => k));
      setCounts(sorted.map(([, v]) => v));
   };

   const chartOptions = ["column", "bar", "pie", "area", "line"];
   const chartLabels = ["Columna", "Barra", "Pastel", "Área", "Línea"];

   return (
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="border border-blue-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-700">Configurar gráfica</h3>
            <div>
               <label className="text-xs font-medium text-slate-500 mb-1 block">Tipo de gráfica</label>
               <select onChange={(e) => setChartType(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                  <option value="">Seleccionar…</option>
                  {chartOptions.map((o, i) => <option key={o} value={o}>{chartLabels[i]}</option>)}
               </select>
            </div>
            <div>
               <label className="text-xs font-medium text-slate-500 mb-1 block">Columna a graficar</label>
               <select onChange={handleField} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                  <option value="">Seleccionar…</option>
                  {titles.map((t) => <option key={t} value={t}>{t}</option>)}
               </select>
            </div>
         </div>
         <div className="border border-blue-200 rounded-xl p-5 shadow-sm">
            {chartType && fieldName ? (
               <>
                  {message && <Alert severity="info" className="mb-3 text-xs">{message}</Alert>}
                  <Chart chart={chartType} name={fieldName} titles={keys} values={counts} card={true} width={12} />
               </>
            ) : (
               <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  Selecciona tipo y columna para ver la gráfica
               </div>
            )}
         </div>
      </div>
   );
};

// ─────────────────────────────────────────────────────────────────────────────
// Excel Component
// ─────────────────────────────────────────────────────────────────────────────

const Excel = ({ titles, dataFilter, dataHidden, headers, fileName, excelLayout, excelLayoutDownRowsStart }) => {
   const [checked, setChecked] = useState(headers);

   const toggle = (item) =>
      setChecked((prev) =>
         prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );

   const toggleAll = (e) => setChecked(e.target.checked ? headers : []);

   const handleExport = async () => {
      const filtered = dataFilter.map((row) => {
         const r = { ...row };
         dataHidden.forEach((k) => delete r[k]);
         return r;
      });
      const withHeaders = filtered.map((obj) => {
         const n = {};
         Object.keys(obj).forEach((k, i) => { n[headers[i]] = obj[k]; });
         return n;
      });
      const withChecked = withHeaders.map((obj) => {
         const n = {};
         checked.forEach((k) => { if (k in obj) n[k] = obj[k]; });
         return n;
      });
      await exportToExcel(withChecked, fileName, excelLayoutDownRowsStart, excelLayout);
   };

   return (
      <div className="p-6">
         <h3 className="text-xl font-bold text-slate-800 text-center mb-6">Exportar a Excel</h3>
         <div className="border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="flex justify-center mb-4">
               <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                     type="checkbox"
                     checked={checked.length === headers.length}
                     ref={(el) => { if (el) el.indeterminate = checked.length > 0 && checked.length < headers.length; }}
                     onChange={toggleAll}
                     className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  {checked.length < headers.length ? "Marcar todos" : "Desmarcar todos"}
               </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
               {headers.map((h, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm  text-slate-700 cursor-pointer">
                     <input
                        type="checkbox"
                        checked={checked.includes(h)}
                        onChange={() => toggle(h)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                     />
                     {h}
                  </label>
               ))}
            </div>
            <div className="flex justify-end">
               <Btn variant="primary" size="md" onClick={handleExport}>
                  Exportar
               </Btn>
            </div>
         </div>
      </div>
   );
};

// ─────────────────────────────────────────────────────────────────────────────
// exportToExcel (unchanged logic)
// ─────────────────────────────────────────────────────────────────────────────

const exportToExcel = async (data, fileName, emptyRows = 0, rowStyles = []) => {
   if (!data.length || !Object.keys(data[0]).length) return;
   const workbook = new ExcelJS.Workbook();
   const worksheet = workbook.addWorksheet("Sheet1");

   for (let i = 0; i < emptyRows; i++) worksheet.addRow([]);

   const hdrs = Object.keys(data[0]);
   worksheet.addRow(hdrs);
   data.forEach((row) => worksheet.addRow(Object.values(row)));

   hdrs.forEach((k, i) => {
      const max = Math.max(...data.map((r) => (r[k] ? String(r[k]).length : 0)), k.length);
      worksheet.getColumn(i + 1).width = max + 2;
   });

   rowStyles.forEach(({ row, color, finish, textColor, write, height }) => {
      const wsRow = worksheet.getRow(row);
      if (height) wsRow.height = height;
      if (finish) {
         const endCol = finish.charCodeAt(0) - 65;
         for (let C = 0; C <= endCol; C++) {
            const cell = wsRow.getCell(C + 1);
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: color.replace("#", "") } };
            cell.font = { bold: true, color: { argb: (textColor || "").replace("#", "") } };
            cell.alignment = { horizontal: "center" };
         }
      }
      if (write) {
         write.forEach(({ letter, write: cellWrite, spacing }) => {
            if (!letter) return;
            const ci = letter.charCodeAt(0) - 65;
            const wc = wsRow.getCell(ci + 1);
            wc.value = cellWrite;
            if (spacing) {
               const endIdx = spacing.map((l) => l.charCodeAt(0) - 65).reduce((a, b) => Math.max(a, b), ci);
               worksheet.mergeCells(row, ci + 1, row, endIdx + 1);
               wc.alignment = { horizontal: "center" };
            }
         });
      }
   });

   const headerRow = worksheet.getRow(emptyRows + 1);
   headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "E1E1E1" } };
      cell.alignment = { horizontal: "center" };
   });
   worksheet.autoFilter = { from: { row: emptyRows + 1, column: 1 }, to: { row: emptyRows + 1, column: hdrs.length } };

   const buffer = await workbook.xlsx.writeBuffer();
   saveAs(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${fileName ?? "exportacion"}.xlsx`);
};

export default DataTable;