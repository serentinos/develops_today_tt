import { RequestHandler, Request, Response } from "express";
import countriesService from "./countriesService";
import { handleServiceResponse } from "@/utils/httpHandlers";

class CountriesController {
  getCountriesList: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await countriesService.getAll();
    handleServiceResponse(serviceResponse, res);
  };
  getCountryByCode: RequestHandler = async (req, res) => {
    const countryCode = req.params.countryCode;
    const serviceResponse = await countriesService.getInfoByCode(countryCode);
    handleServiceResponse(serviceResponse, res);
  };
}

export const countriesController = new CountriesController();
