import Tooltip from "@mui/material/Tooltip";

import { MdOutlineGridView, MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import "../Sidebar.scss";

export const Items = ({ text, path = null, childrens, active, classprop, index = null, indexChild = undefined, handleClickContinue,message='' }) => {
   const onHandleClick = () => {

      handleClickContinue(index, indexChild);
   };
const style ={ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', borderRadius: '4px', padding: '8px', fontSize: '14px' }
   return (
      <Tooltip title={message}  placement="right" arrow sx={active ? {} : style}>
         <Link to={path ? path : "#"} className={`menu-link ${active ? classprop : ""}`} onClick={onHandleClick}>
            <span className="menu-link-icon">
               <MdOutlineGridView size={18} />
            </span>
            <span className="menu-link-text">{text}</span>
            <span className="menu-link-icon"></span>
            {childrens && <MdOutlineArrowDropDown size={18} />}
         </Link>
      </Tooltip>
   );
};
