import { CustomError } from "../../utils/custom.error.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      error: err.error,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  });
}
