export const errorMiddleware = (error, req, res, next) => {
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};
