import express from "express";
import { countriesController } from "./countriesController";

export const countriesRouter = express.Router();

countriesRouter.get("/", countriesController.getCountriesList);
countriesRouter.get("/:countryCode", countriesController.getCountryByCode);
