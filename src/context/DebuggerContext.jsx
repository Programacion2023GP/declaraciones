import { createContext, useContext, useEffect, useState } from "react";

export const DebugerContext = createContext();

export default function DebugerContextProvider({ children }) {
   const [variables, setVariables] = useState([]);
   const [eventos, setEventos] = useState([]);
   const agregarVariables = (key, value) => {
      const existingIndex = variables.findIndex((variable) => variable.key === key);

      if (existingIndex !== -1) {
         // Si ya existe una variable con la misma clave, actualiza su valor
         const newData = [...variables];
         newData[existingIndex].value = value;
         setVariables(newData);
      } else {
         // Si no existe una variable con la misma clave, agrega una nueva entrada
         if (variables.length === 20) {
            setVariables([]);
         }
         const newData = [
            ...variables,
            {
               key,
               value
            }
         ];
         setVariables(newData);
      }
   };

   const agregarEventos = (key, action) => {
      const existingIndex = eventos.findIndex((evento) => evento.key === key);

      if (existingIndex !== -1) {
         // Si ya existe un evento con la misma clave, actualiza su acción
         const newData = [...eventos];
         newData[existingIndex].action = action;
         setEventos(newData);
      } else {
         // Si no existe un evento con la misma clave, agrega una nueva entrada
         if (eventos.length === 20) {
            setEventos([]);
         }
         const newData = [
            ...eventos,
            {
               key,
               action
            }
         ];
         setEventos(newData);
      }
   };

   return (
      <DebugerContext.Provider
         value={{
            variables,
            agregarVariables,
            eventos, // Aquí proporcionas la lista de eventos
            agregarEventos
         }}
      >
         {children}
      </DebugerContext.Provider>
   );
}
// export const useDebugerContext = () => useContext(DebugerContext);
