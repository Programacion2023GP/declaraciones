import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

const Title = ({ titles, data, filterData, previousData, filter }) => {
   const [titlesMap, setTitlesMap] = useState([]);
   const [headersMap, setHeadersMap] = useState([]);
   useEffect(() => {
      if (titles && titles.length > 0) {
         const initialTitles = titles[0].titles || [];
         const initialHeaders = titles[0].headers && titles[0].headers.length > 0 ? titles[0].headers[0] : initialTitles;

         setTitlesMap(initialTitles);
         setHeadersMap(initialHeaders);
      }
      // Manejar el caso cuando titles no tiene elementos
   }, [titles, titlesMap, headersMap]);
   return (
      <>
         <thead>
            <tr style={{ background: "#F9FAFB", width: "100%" }}>
               {headersMap.map((title) => {
                  return <th style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>{title.charAt(0).toUpperCase() + title.slice(1)}</th>;
               })}
               {headersMap.length > 0 && <th style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>Acciones</th>}
            </tr>
            <tr>
               {filter &&
                  titlesMap.map((title) => {
                     return (
                        <th style={{ border: "1px solid #BDBDBD", padding: ".5rem .5rem" }}>
                           <SearchInput previousData={previousData} column={title} data={data} getData={filterData} />
                        </th>
                     );
                  })}
            </tr>
         </thead>
      </>
   );
};

const Paginator = ({ pagination, handleChange, page, pages, previous, next }) => {
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
         <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ marginRight: ".5rem" }}>
            <Typography variant="subtitle2">
               Pagina {page} de {pages}
            </Typography>
            <Stack spacing={1} direction="row" alignItems="center">
               <Button onClick={() => previousPage()} variant="outlined">
                  Anterior
               </Button>
               <Button onClick={() => nextPage()} variant="outlined">
                  Siguiente
               </Button>
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

const DataTable = ({ data = [], dataHidden = [], pagination, headers, filter, editButton, deleteButton, handleEdit, handleDelete }) => {
   const [totalData, setTotalData] = useState(data);
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
         // Verificamos si todos los criterios de filtro se cumplen para este elemento
         return Object.entries(objectValues).every(([col, val]) => {
            // Convertimos el valor de la propiedad a cadena y lo normalizamos (mayúsculas y minúsculas, sin espacios en blanco al principio o al final)
            const itemValue = String(item[col]).toUpperCase().trim();
            const filterValue = String(val).toUpperCase().trim();
            // Comparamos el valor del elemento con el valor del filtro
            return itemValue.includes(filterValue);
         });
      });
      if (page > 0) {
         modifiedData(filters, page);
      } else {
         modifiedData(filters);
      }
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
      }
   };

   const modifiedData = (data, pagina = 1) => {
      let newTitles = [];
      if (data.length > 0) {
         const firstItem = data[0];

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

         let index = 0;
         let page = 0;
         const datas = [];
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
      }
   };

   useEffect(() => {
      console.log("data cambiada", data);
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
      console.log("renderizado");
   }, [loading, selectRow, pagination, headers, objectValues, data, dataFilter]);

   return (
      <>
         {data.length === 0 ? (
            <div className="" style={{ maxWidth: "fit-content", display: "flex", flexDirection: "column" }}>
               <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                     <tr style={{ background: "#F9FAFB" }}>
                        <th style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}>No hay información suficiente no hay registros</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td style={{ border: "1px solid #BDBDBD", padding: "1rem 1rem", textAlign: "center" }}> No hay información suficiente no hay registros</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         ) : (
            <div className="" style={{ maxWidth: "fit-content", display: "flex", flexDirection: "column", overflow: "auto" }}>
               <table style={{ borderCollapse: "collapse" }}>
                  <Title titles={titles} previousData={data} data={dataFilter} filterData={filterData} filter={filter}></Title>
                  <tbody>
                     {dataTable.map((item, index) => {
                        return (
                           <tr key={index} style={{}}>
                              {Object.entries(item).map(([key, value]) => {
                                 if (dataHidden) {
                                    if (!dataHidden.includes(key)) {
                                       return (
                                          <td style={{ textAlign: "center", border: "1px solid #BDBDBD", padding: 0, margin: 0 }} key={key} cols={value}>
                                             {value}
                                          </td>
                                       );
                                    }
                                 } else {
                                    return (
                                       <td style={{ textAlign: "center", borderBottom: "1px solid", padding: 0, margin: 0 }} key={key} cols={value}>
                                          {value}
                                       </td>
                                    );
                                 }
                              })}
                              {(editButton || deleteButton) && (
                                 <td style={{ textAlign: "center", border: "1px solid #BDBDBD", padding: 0, margin: 0 }}>
                                    {editButton && (
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
               </table>

               {pagination && (
                  <div style={{ minWidth: "100%", padding: "0.5rem 1rem", alignSelf: "flex-end", border: "1px solid #BDBDBD", background: "#F9FAFB" }}>
                     <Paginator pagination={pagination} handleChange={handleSeparateData} pages={totalPages} previous={previous} next={next} page={numberShowPage} />
                  </div>
               )}
            </div>
         )}
      </>
   );
};

export default DataTable;
