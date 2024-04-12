const Interface = (props, schema) => {
  // Itera sobre cada propiedad del esquema
  for (const prop in schema) {
    // Verifica si la propiedad es opcional
    const esOpcional = schema[prop].endsWith('?');
    const propName = esOpcional ? prop.slice(0, -1) : prop;

    // Verifica si la propiedad está presente en las props
    if (!props.hasOwnProperty(propName)) {
      // Si es opcional y no está presente, pasa a la siguiente propiedad
      if (esOpcional) continue;

      // Si no es opcional y no está presente, lanza un error a menos que sea de tipo 'any'
      if (schema[prop] !== 'any') {
        throw new Error(`La propiedad '${propName}' es requerida.`);
      }
    }

    // Si la propiedad es de tipo 'any', verifica si tiene algún valor
    if (schema[prop] === 'any' && props.hasOwnProperty(propName) && props[propName] === undefined) {
      throw new Error(`La propiedad '${propName}' debe tener algún valor.`);
    }

    // Verifica el tipo de la propiedad si tiene un valor definido, excepto si es de tipo 'any'
    if (schema[prop] !== 'any' && props.hasOwnProperty(propName)) {
      const propType = typeof props[propName];
      const expectedType = schema[prop];

      // Si el tipo de la propiedad no coincide con el tipo esperado, lanza un error
      if (propType !== expectedType && !(esOpcional && props[propName] === undefined)) {
        throw new Error(`La propiedad '${propName}' debe ser de tipo '${expectedType}'.`);
      }
    }
  }
};

export default Interface;
