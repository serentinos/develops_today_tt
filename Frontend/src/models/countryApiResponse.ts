import { IBaseServiceResponse } from "./apiServiceResponse";

// export interface ICountryLIstItem extends IBaseServiceResponse {}

interface IAllCountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

interface ICountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IPopulationCount[];
}

export interface IPopulationCount {
  year: number;
  value: number;
}

export interface ICountryLIstItem {
  countryCode: string;
  name: string;
  flagData?: IAllCountryFlag;
}

export interface IFullCountryInfo {
  populationCounts: ICountryPopulation;
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders:
    | {
        commonName: string;
        officialName: string;
        countryCode: string;
        region: string;
      }[]
    | null;
  flagData?: IAllCountryFlag;
}

export interface ICountryLIstItemResponse extends IBaseServiceResponse {
  responseObject: ICountryLIstItem[];
}

export interface IFullCountryInfoResponse extends IBaseServiceResponse {
  responseObject: IFullCountryInfo;
}
