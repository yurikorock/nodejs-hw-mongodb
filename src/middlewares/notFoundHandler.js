//src/middlewares/notFoundHandler.js
export const notFoundHandler = (req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(404).json({
    status: 404,
    message: 'Route not found',
    data: err.message,
  });
};
