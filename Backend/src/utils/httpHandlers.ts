import { ServiceResponse } from "@/models/serviceResponse";
import { Response } from "express";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};
