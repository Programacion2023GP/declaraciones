export const testField = (field, testada) => {
   return testada == true ? "XXXXXXXXXX" : field == null || field == "" ? vacio() : field;
};
export const vacio = () => {
   return "-----------------------";
};
export const field = (field) => {
   return field == null || field == "" ? vacio() : field;
};
// Función para probar un campo en el array
export const testArrayField = (array, searchId, testeada, field = "id", textField = "text") => {
   if (Array.isArray(array) && parseInt(searchId) >= 0) {
      const item = array.find((item) => item[field] === parseInt(searchId));
      if (item) {
         return testField(item[textField], testeada);
      }
   }
   return vacio();
};

// Función para obtener un campo en el array
export const arrayField = (array, searchId, id = "id", textField = "text") => {
   if (Array.isArray(array) && parseInt(searchId) >= 0) {
      const item = array.find((item) => item[id] === parseInt(searchId));
      if (item) {
         return field(item[textField]);
      }
   }
   return vacio();
};
