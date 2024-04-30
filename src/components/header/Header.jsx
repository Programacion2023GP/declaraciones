import { Button } from "@mui/material";
import "./Header.scss";
import { Link } from "react-router-dom"; // Importa Link si estás utilizando React Router
import { MenuContext } from "react-pro-sidebar";
import { useMenuContext } from "../../context/MenuContext";

export const Header = () => {
  const { open, setOpen } = useMenuContext();
  const handleChangeSiderbar = () => {
    setOpen(!open);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Button
            to="/"
            onClick={() => handleChangeSiderbar()}
            className="navbar-logo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </Button>
        </div>
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li className="navbar-item">
              {/* <Link to="/contact" className="navbar-link">
                
              </Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
