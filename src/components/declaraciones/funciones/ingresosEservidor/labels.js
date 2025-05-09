export const labelRenumeracion = (declaracion) => {
    return `
      Remuneración ${
        declaracion === 1 || declaracion === 4
          ? `
          mensual neta del declarante por su cargo público (por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones) (cantidades netas después de impuestos)
          `
          : declaracion === 2 || declaracion === 5
            ? `
            Anual neta del declarante por su cargo público (por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones) (cantidades netas después de impuestos)
            `
            : `
            del año en curso a la fecha de conclusión del empleo, cargo o comisión del declarante por su cargo público (por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones) (cantidades netas después de impuestos)
            `
      }
    `;
  };
  export const labelSumaIyII=(declaracion)=>{
    return `
     ${
      declaracion === 1 || declaracion === 4
        ? `
        A. Ingresos mensual neto del declarante (Suma del numeral I y II).`
        : declaracion === 2 || declaracion === 5
          ? `
          A. Ingreso anual neto del declarante (suma del numeral I y II).`
          : `
          A. Ingresos del declarante del año en curso a la fecha de Conclusión del empleo, cargo o comisión de la pareja y/o dependientes económicos (despues de impuestos) `
    }
  `;
  }
  
  export const labelPareja =(declaracion)=>{
    return`
    ${
     declaracion === 1 || declaracion === 4
       ? `
       B. Ingresos mensual neto de la pareja y o dependientes economicos (despues de impuestos)`
       : declaracion === 2 || declaracion === 5
         ? `
         B. Ingresos anual neto de la pareja y o dependientes economicos (despues de impuestos).`
         : `
         B. Ingresos del año en curso a la fecha de conclusión del empleo, cargo o comisión de la pareja y/o dependientes económicos`
        }
      `;
  }
  export const labelTotal=(declaracion)=>{
    return`
    ${
     declaracion === 1 || declaracion === 4
       ? `
       C. Total de ingresos mensuales netos percibidos por el declarante, pareja y/o dependientes económicos (suma de numerales A y B).`
       : declaracion === 2 || declaracion === 5
         ? `
         C. Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes economicos (suma de los apartados A y B).`
         : `
         C. Total de ingresos netos del año en curso a la fecha de Conclusión del empleo, cargo o comisión percibidos por el declarante, pareja y/o dependientes económicos (Suma de los apartados A y B)`
        }
      `;
  }
  