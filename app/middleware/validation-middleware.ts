import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendResponse } from "../util/sendResponse";
import { StatusCodes } from "http-status-codes";

export const validationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendResponse(res, "error", StatusCodes.BAD_REQUEST, "Error de validación", null);
    throw new Error("Error de validación");
  }
  next();
};
