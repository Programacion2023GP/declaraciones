import { Grid, IconButton, Typography } from "@mui/material";
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
      <Box sx={{ "& > :not(style)": { m: 1 }, width: "100%" }}>
         <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
               fullWidth
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

const Title = ({ headers, titles, data, filterData, previousData, filter, editButton, deleteButton }) => {
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
            <tr style={{ background: "#F9FAFB", width: "100%" }}>
               {headersMap.map((title) => {
                  return (
                     <th key={"headers" + title} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>
                        {title.charAt(0).toUpperCase() + title.slice(1)}
                     </th>
                  );
               })}
               {headersMap.length > 0 && (editButton || deleteButton) && (
                  <th key={"headersMap" + uuidv4()} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>
                     Acciones
                  </th>
               )}
            </tr>
            <tr>
               {filter &&
                  titlesMap.map((title) => {
                     return (
                        <th key={"titlesMap" + title} style={{ border: "1px solid #BDBDBD", padding: ".5rem .5rem" }}>
                           <SearchInput previousData={previousData} column={title} data={data} getData={filterData} />
                        </th>
                     );
                  })}
               {filter && (editButton || deleteButton) && <th key={uuidv4()} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}></th>}
            </tr>
         </thead>
      </>
   );
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
         <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" width={"100%"}>
            <Typography variant="subtitle2">
               Pagina {dataFilter == 0 ? "0" : page} de {pages}
            </Typography>
            <Stack spacing={1} direction="row" alignItems="center">
               <Button onClick={() => previousPage()} variant="outlined">
                  Anterior
               </Button>
               <Button onClick={() => nextPage()} variant="outlined">
                  Siguiente
               </Button>
               <Typography variant="subtitle2">
                  Mostrando {selectRow >= dataFilter ? dataFilter : selectRow} de {dataFilter}
               </Typography>
            </Stack>
            {pagination && <PaginatorSelect pagination={pagination} selectOption={pagesOfItems} />}
         </Stack>
      </>
   );
};
const PaginatorSelect = ({ pagination, selectOption }) => {
   const [select, setSelect] = useState(pagination[0]);
   const handleChange = (event) => {
      setSelect(event.target.value);
      selectOption(event.target.value);
   };

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mostrar</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={select} label="Mostrar" onChange={handleChange}>
               {pagination.map((item) => {
                  return (
                     <MenuItem key={item} selected value={item}>
                        {item}
                     </MenuItem>
                  );
               })}
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
   options,
   filter,
   editButton,
   deleteButton,
   handleEdit,
   handleDelete,
   filterGlobal,
   conditionExistEditButton = []
}) => {
   const [reinitializedData, setReinitializedData] = useState(data);
   const [dataFilter, setDataFilter] = useState(data);
   const [titles, setTitles] = useState([]);
   const [dataTable, setDataTable] = useState([]);
   const [totalPages, setTotalPages] = useState([]);
   const [numberShowPage, setNumberShowPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [selectRow, setSelectRow] = useState(pagination ? pagination[0] : 100000);
   const [objectValues, setObjectValues] = useState({});
   const handleSeparateData = async (option) => {
      modifiedData(dataFilter);
      setSelectRow(option);
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
         setLoading(false);
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
   }, [loading, selectRow, pagination, headers, objectValues, dataFilter]);
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
   return (
      <>
         <div
            className=""
            // style={{
            //    maxWidth: "100%",
            //    display: "flex",
            //    flexDirection: "column",
            //    overflowX: "auto", // Asegura que el contenido se ajuste sin desbordar
            //    alignItems: "center" // Asegura que el contenido esté centrado
            // }}
         >
            <table width={"100%"} style={{ borderCollapse: "collapse" }}>
               <caption>
                  <div style={{ display: "flex", alignItems: "center" }}>
                     {filterGlobal && <FilterGlobal data={data} setFilteredData={applyfilterGlobal} dataHidden={dataHidden} onChange={handleOptions} />}
                     <Ngif condition={options}>
                     <Box sx={{ minWidth: 120, marginLeft: "auto" }}>
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Opciones</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={textModal}
                              onChange={handleTextModal}
                              onClick={() => setOpenModal(true)}
                              label="Opciones"
                           >
                              <MenuItem key={"grafica"} selected value={"grafica"}>
                                 {"grafica"}
                              </MenuItem>
                           </Select>
                        </FormControl>
                     </Box>

                     </Ngif>
                  </div>
               </caption>

               {titles.length > 0 || headers.length > 0 ? (
                  <Title
                     editButton={editButton}
                     deleteButton={deleteButton}
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
                  <tbody>
                     <tr>
                        <td colSpan={headers.length + 1} style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>
                           No hay información suficiente no hay registros
                        </td>
                     </tr>
                  </tbody>
               ) : (
                  <tbody>
                     {dataTable.map((item, index) => {
                        return (
                           <tr key={index} style={{}}>
                              {Object.entries(item).map(([key, value]) => {
                                 if (dataHidden) {
                                    if (!dataHidden.includes(key)) {
                                       return (
                                          <td
                                             style={{ textAlign: "center", border: "1px solid #BDBDBD", paddingLeft: "5px", paddingRight: "5px", margin: 0 }}
                                             key={key}
                                             cols={value}
                                          >
                                             {value}
                                          </td>
                                       );
                                    }
                                 } else {
                                    return (
                                       <td
                                          style={{ textAlign: "center", borderBottom: "1px solid", paddingLeft: "5px", paddingRight: "5px", margin: 0 }}
                                          key={key}
                                          cols={value}
                                       >
                                          {value}
                                       </td>
                                    );
                                 }
                              })}
                              {(editButton || deleteButton) && (
                                 <td style={{ textAlign: "center", border: "1px solid #BDBDBD", padding: 0, margin: 0 }}>
                                    {editButton && checkConditions(item) && (
                                       <IconButton
                                          aria-label="edit"
                                          color="warning"
                                          onClick={() => {
                                             handleEdit(item);
                                          }}
                                       >
                                          <EditIcon style={{ color: "orange" }} />
                                       </IconButton>
                                    )}
                                    {deleteButton && (
                                       <IconButton
                                          aria-label="delete"
                                          color="warning"
                                          onClick={() => {
                                             handleDelete(item);
                                          }}
                                       >
                                          <DeleteIcon style={{ color: "red" }} />
                                       </IconButton>
                                    )}
                                 </td>
                              )}
                           </tr>
                        );
                     })}
                  </tbody>
               )}
               {pagination && (
                  <tfoot>
                     <tr>
                        <td
                           colSpan={headers.length + (editButton || deleteButton ? 1 : 0)}
                           style={{ border: "1px solid #BDBDBD", padding: "0.5rem", textAlign: "center" }}
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
         </div>
         <Ngif condition={options}>
            <Modal openModal={openModal} setOpenModal={setOpenModal}>
               <Component option={textModal} titles={headers} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />
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

const Transition = forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ children, openModal, setOpenModal }) => {
   useEffect(() => {}, [openModal]);
   const handleClose = () => {
      setOpenModal(false);
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
               <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

const Charts = ({ titles, dataFilter, headers, dataHidden }) => {
   const [keys, setKeys] = useState([]);
   const [counts, setCounts] = useState([]);

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

      // Filtra los datos primero
      const filteredData = filterData(dataFilter, dataHidden);

      // Extrae los valores correspondientes del array de objetos filtrados
      const values = filteredData.map((item) => {
         // Obtiene las claves del objeto como un array
         const keys = Object.keys(item);

         // Usa el índice para seleccionar la clave correcta y extraer el valor correspondiente
         return item[keys[index]];
      });

      // Contar las ocurrencias de cada valor y separar en dos arrays
      const { values: uniqueValues, counts } = countOccurrences(values);

      // Ahora uniqueValues contiene los valores únicos y counts contiene las ocurrencias de cada valor

      // Hacer lo que necesites con uniqueValues y counts
      // Por ejemplo, puedes asignarlos a variables separadas o usarlos directamente
      setKeys(uniqueValues);
      setCounts(counts);

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
               marginBottom:"2rem",
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
               marginBottom:"2rem",

               overflow: "hidden", // Cambiar overflow a "hidden" para evitar que la tabla se desborde
               border: "2px solid #007bff",
               borderRadius: "10px",
               padding: "1rem",
               paddingRight: "2rem",
               boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
            }}
         >
            <Ngif condition={chart != null && name != null}>
               <Chart chart={chart} name={name} titles={keys} values={counts} card={true} width={12} />
            </Ngif>
         </Grid>
      </Grid>
   );
};
const Component = ({ option, titles, dataFilter, headers, dataHidden }) => {
   switch (option) {
      case "grafica":
         return <Charts titles={titles} dataFilter={dataFilter} dataHidden={dataHidden} headers={headers} />;
         break;
   }
};
export default DataTable;
