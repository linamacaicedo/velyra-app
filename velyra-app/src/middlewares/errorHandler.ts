import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (Boom.isBoom(error)) {
    return res.status(error.output.statusCode).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
  });
};
