import {
  ICountryLIstItem,
  ICountryLIstItemResponse,
  IFullCountryInfoResponse,
  IFullCountryInfo,
} from "../models/countryApiResponse";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:8080";

export const getCountriesList = async (): Promise<ICountryLIstItem[]> => {
  const response = await fetch(`${BASE_URL}/countries`);
  const responseData = (await response.json()) as ICountryLIstItemResponse;

  if (!responseData.success) {
    throw new Error(`Network response was not ok: ${responseData.message}`);
  }
  return responseData.responseObject;
};

export const getCountryByCode = async (
  countryCode: string
): Promise<IFullCountryInfo | null> => {
  const response = await fetch(`${BASE_URL}/countries/${countryCode}`);
  const responseData = (await response.json()) as IFullCountryInfoResponse;

  if (responseData.statusCode === 404) {
    return null;
  }

  if (!responseData.success) {
    throw new Error(`Network response was not ok: ${responseData.message}`);
  }
  return responseData.responseObject;
};
