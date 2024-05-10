export const loggerMiddleware = storeAPI => next => action => {
    console.log('Estado actual:', action);
    return next(action);
  };
  