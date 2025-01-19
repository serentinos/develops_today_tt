interface ICountryInfo {
  countryCode: string;
  name: string;
}

interface IAllCountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

interface IAllCountryFlagResponse {
  data: IAllCountryFlag[];
}

interface ISeparateCountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: ISeparateCountryInfo[];
  flagData?: IAllCountryFlag;
}

interface ISeparateCountryInfoFormated extends ISeparateCountryInfo {
  flagData: IAllCountryFlag;
  borders?: ISeparateCountryInfoFormated[];
}

interface ICountryInfoFormated extends ICountryInfo {
  flagData?: IAllCountryFlag;
}

interface ICountryPopulationResponse {
  error: boolean;
  msg: string;
  data: ICountryPopulation;
}

interface ICountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IPopulationCount[];
}

interface IPopulationCount {
  year: number;
  value: number;
}

interface IFullCountryInfo extends ISeparateCountryInfo {
  populationCounts: ICountryPopulation;
  flagData?: IAllCountryFlag;
  borders?: ISeparateCountryInfo[];
}
