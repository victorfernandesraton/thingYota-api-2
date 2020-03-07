/**
 * @description Fnção que trata os errors e retrotna um objeto
 * @example try {teste()} catch(error) { errorHandler(err)}
 * @param {Error} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next)=> {
  res.status(500);
  res.render('error', { error: err });
}

/**
 * @description Função que trata a pilha de erro no console
 * @param {Error} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
}


/**
 * @description Função que trata errors do cliente
 * @param {Error} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({ error: 'An error has ocurred!' });
  } else {
    next(err);
  }
}


module.exports = {
  errorHandler,
  logErrors,
  clientErrorHandler
}
