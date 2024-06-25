export const testField = (field, testada) => {
   return testada == true ? "XXXXXXXXXX" : field == null || field == "" ? vacio() : field;
};
export const vacio = () => {
   return "-----------------------";
};
export const field = (field) => {
   return field == null || field == "" ? vacio() : field;
};
export const testArrayField = (array, searchId, testeada) => {
   if (Array.isArray(array) && parseInt(searchId) > 0) {
      const text = array.filter((item) => item.id === parseInt(searchId))[0]?.text;

     return testField(text, testeada);
   } else {

      return "";
   }
};
//@params hola
export const arrayField = (array, searchId) => {
   if (Array.isArray(array) && parseInt(searchId) > 0) {
      const text = array.filter((item) => item.id === parseInt(searchId))[0]?.text;
      return field(text);
   } else {
      return "";
   }
};
