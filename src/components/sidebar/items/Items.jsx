import {  Tooltip } from "@mui/material";
import { MdOutlineArrowDropDown, MdOutlineGridView } from "react-icons/md";
import { Link } from "react-router-dom";

export const Items = ({
   text,
   path = "#",
   childrens = false,
   active = false,
   classprop = "",
   index = null,
   indexChild = undefined,
   handleClickContinue,
   message = "",
   id = null,
}) => {
   const onHandleClick = () => {
      handleClickContinue(index, indexChild);
   };

   return (
      <Tooltip title={message} placement="right" arrow>
         <Link
            to={path}
            onClick={onHandleClick}
            id={id || path}
            className={`
          !flex !items-center !justify-between !px-4 !py-2 !rounded-md
          !transition-colors !duration-200
          ${active && classprop === "active"
                  ? "!bg-rose-50 !text-rose-700 !font-medium !border-l-4 !border-rose-700"
                  : "!text-gray-700 hover:!bg-gray-100"
               }
          ${active && classprop === "subactive"
                  ? "!text-rose-600 !bg-rose-50/50 !font-medium"
                  : ""
               }
        `}
         >
            <div className="!flex !items-center !gap-3">
               <MdOutlineGridView className="!text-lg" />
               <span className="!text-sm">{text}</span>
            </div>
            {childrens && <MdOutlineArrowDropDown className="!text-xl" />}
         </Link>
      </Tooltip>
   );
};
