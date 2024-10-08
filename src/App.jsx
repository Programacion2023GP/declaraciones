import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route, RouterProvider } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import { router } from "./routes/Router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
dayjs.extend(isBetween);
function App() {
   const { theme, toggleTheme } = useContext(ThemeContext);

   // adding dark-mode class if the dark mode is set on to the body tag
   useEffect(() => {
      if (theme === DARK_THEME) {
         document.body.classList.add("dark-mode");
      } else {
         document.body.classList.remove("dark-mode");
      }
   }, [theme]);

   return (
      <>
         {/* <p style={{minHeight:"100vh"}}>dasd</p> */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router}></RouterProvider>
         </LocalizationProvider>
         {/* <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router> */}
      </>
   );
}

export default App;
