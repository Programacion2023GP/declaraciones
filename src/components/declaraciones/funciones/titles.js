export const Titles = (id) => {
   let title = "";
   if (id > 0 && id <= 6) {
    title= `Declaración de situación ${id === 1 || id === 2 || id === 3 ? "patrimonial" : "simplificada"} - ${id === 1 || id === 4 ? "Inicial" : id === 2 || id === 5 ? "Modificación" : "Conclusión"}`;

}
   return title;
};
