import { Response } from "express";
export const ApiResponse = (
  res: Response,
  code: number,
  success: boolean,
  message: string,
  data?: any
) => {
  return res.status(code).json({
    status: code,
    success,
    message,
    data,
  });
};
