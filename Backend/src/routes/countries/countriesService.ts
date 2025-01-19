import { CacheKeys } from "@/constants";
import { ServiceResponse } from "@/models/serviceResponse";
import { logger } from "@/server";
import cache from "@/utils/cache";
import { StatusCodes } from "http-status-codes";

class CountriesService {
  private fetchCountryPopulation = async (country: string) => {
    const fetchUrl = `https://countriesnow.space/api/v0.1/countries/population`;
    const body = {
      country: country,
    };

    try {
      const responsePromise = await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const countryPopulation =
        (await responsePromise.json()) as ICountryPopulationResponse;

      return countryPopulation.data;
    } catch (error) {
      throw new Error(
        `Issue while fetching country population info, ${(error as Error).message}`
      );
    }
  };

  private fetchAllCountries = async (): Promise<ICountryInfo[]> => {
    const allCountriesURL = "https://date.nager.at/api/v3/AvailableCountries";

    const cachedResponse = cache.get<ICountryInfo[]>(CacheKeys.ALL_COUNTRIES);

    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const responsePromise = await fetch(allCountriesURL);
      const responseJson = (await responsePromise.json()) as ICountryInfo[];

      cache.set(CacheKeys.ALL_COUNTRIES, responseJson);

      return responseJson;
    } catch (error) {
      throw new Error("Error while fetching all country info");
    }
  };

  private fetchCountryBorderInfo = async (
    countryCode: string
  ): Promise<ISeparateCountryInfo | null> => {
    const fetchUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;

    try {
      const responsePromise = await fetch(fetchUrl);

      const rawData = await responsePromise.json();
      if (rawData.status && rawData.status === 404) {
        return null;
      }
      const countryBorderInfo = rawData as ISeparateCountryInfo;

      const flagsData = await this.fetchCountryFlags();
      const borders = countryBorderInfo.borders?.map((border) => ({
        ...border,
        flagData: flagsData.find(({ iso2 }) => border.countryCode === iso2),
      }));

      return {
        ...countryBorderInfo,
        borders,
      };
    } catch (error) {
      throw new Error(
        `Issue while fetching border info, ${(error as Error).message}`
      );
    }
  };

  private fetchCountryFlags = async () => {
    const allFlagsURL =
      "https://countriesnow.space/api/v0.1/countries/flag/images";
    const cachedResponse = cache.get<IAllCountryFlagResponse>(
      CacheKeys.COUNTRY_FLAGS
    );

    if (cachedResponse) {
      return cachedResponse.data;
    }

    try {
      const responsePromise = await fetch(allFlagsURL);
      const responseJson =
        (await responsePromise.json()) as IAllCountryFlagResponse;

      cache.set(CacheKeys.COUNTRY_FLAGS, responseJson);

      return responseJson.data;
    } catch (error) {
      throw new Error("Error while fetching all country flags images");
    }
  };

  getAll = async (): Promise<
    ServiceResponse<ICountryInfoFormated[] | null>
  > => {
    try {
      const [allCountriesData, flagsData] = await Promise.all([
        this.fetchAllCountries(),
        this.fetchCountryFlags(),
      ]);

      const formatedCountryInfo = allCountriesData.map(
        (countryInfo): ICountryInfoFormated => ({
          ...countryInfo,
          flagData: flagsData.find(
            ({ iso2 }) => countryInfo.countryCode === iso2
          ),
        })
      );

      return ServiceResponse.success(
        "Success",
        formatedCountryInfo,
        StatusCodes.OK
      );
    } catch (error) {
      return ServiceResponse.failure(
        (error as Error).message,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };

  getInfoByCode = async (
    countryCode: string
  ): Promise<ServiceResponse<IFullCountryInfo | null>> => {
    try {
      const [borderInfo, flagsData] = await Promise.all([
        this.fetchCountryBorderInfo(countryCode),
        this.fetchCountryFlags(),
      ]);

      if (!borderInfo) {
        return ServiceResponse.failure("Success", null, StatusCodes.NOT_FOUND);
      }

      const countryPopulation = await this.fetchCountryPopulation(
        borderInfo.commonName
      );

      const formatedData: IFullCountryInfo = {
        ...borderInfo,
        flagData: flagsData.find(({ iso2 }) => borderInfo.countryCode === iso2),
        populationCounts: countryPopulation,
      };

      return ServiceResponse.success("Success", formatedData, StatusCodes.OK);
    } catch (error) {
      return ServiceResponse.failure(
        (error as Error).message,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default new CountriesService();
