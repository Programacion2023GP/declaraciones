import React, { Children, cloneElement } from "react";

export const Ngfor = ({ data = [], children }) => {
   return (
      <>
         {data.map((item, itemIndex) => {
            const itemKeys = Object.keys(item);

            return Children.map(children, (child, childIndex) => {
               const childContent = getChildContent(child);
               if (itemKeys.includes(childContent)) {
                  return cloneElement(child, {}, item[childContent]);
               }
               return child;
            });
         })}
      </>
   );
};

const getChildContent = (child) => {
   if (typeof child.props.children === "string") {
      return child.props.children;
   } else {
      return Children.map(child.props.children, (nestedChild) => nestedChild.props.children);
   }
};
