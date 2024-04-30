export const loggerMiddleware = storeAPI => next => action => {
    console.log('Middleware de registro llamado');
    console.log('Estado actual:', action);
    return next(action);
  };
  