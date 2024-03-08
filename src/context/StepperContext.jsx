import { createContext, useContext, useEffect, useState } from "react";

const StepperContext = createContext();

const initialState = {
   checkedpass:false,
};

export default function StepperContextProvider({ children }) {
//    const { auth } = useAuthContext();
   const [checked, setChecked] = useState(false);
   const [selected, setSelected] = useState(null);
   const [checkedPlazo, setCheckedPlazo] = useState(false);
   const [checkedProtesta, setCheckedProtesta] = useState(false);
   const [dialog,setDialog] = useState(false);
   const resetStepper=()=>{
      setChecked(false)
      setSelected(null)
      setCheckedPlazo(false)
      setCheckedProtesta(false)
   }



   return (
      <StepperContext.Provider
         value={{
           selected,setSelected,
            checked, setChecked,
            checkedPlazo,setCheckedPlazo,
            checkedProtesta, setCheckedProtesta,
            dialog,setDialog,
            resetStepper,
         }}
      >
         {children}
      </StepperContext.Provider>
   );
}
export const useStepperContext = () => useContext(StepperContext);
