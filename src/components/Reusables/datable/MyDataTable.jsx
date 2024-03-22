import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useState, useEffect } from "react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Ngfor } from "../conditionals/Ngfor";
import { Ngif } from "../conditionals/Ngif";
export const MyDataTable = ({ showcolumns = true }) => {
   const [products, setProducts] = useState([
      {
         id: "1000",
         code: "f230fh0g3",
         name: "Bamboo Watch",
         description: "Product Description",
         image: "bamboo-watch.jpg",
         price: 65,
         category: "Accessories",
         quantity: 24,
         inventoryStatus: "INSTOCK",
         rating: 5
      },
      {
         id: "1000",
         code: "f230fh0g3",
         name: "Bamboo Watch",
         description: "Product Description",
         image: "bamboo-watch.jpg",
         price: 65,
         category: "Accessories",
         quantity: 24,
         inventoryStatus: "INSTOCK",
         rating: 5
      }
   ]);

   return (
      <>
         <div className="card">
            <Ngif condition={showcolumns}>
               <Ngfor data={products}>
                  <p>name</p>
                     <p>code</p>
               </Ngfor>
            </Ngif>
            <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
               <Column field="code" header="Code"></Column>
               <Column field="name" header="Name"></Column>
               <Column field="category" header="Category"></Column>
               <Column field="quantity" header="Quantity"></Column>
            </DataTable>
         </div>
      </>
   );
};
