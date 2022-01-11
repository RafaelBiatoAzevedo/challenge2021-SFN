module.exports = (err: any, _req: any, _res: any, next: any) => {
  if (err.message === 'Invalid body schema. Correct and try again.') {
    const newError: any = new Error(err.message);
    newError.status = 400;
    return next(newError);
  }

  if (err.message === 'No created article') {
    const newError: any = new Error(err.message);
    newError.status = 409;
    return next(newError);
  }

  if (err.message === 'No found article') {
    const newError: any = new Error(err.message);
    newError.status = 404;
    return next(newError);
  }

  return next(err);
};
