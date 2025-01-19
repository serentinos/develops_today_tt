import CountriesList from "../countriesList";
import { getCountriesList } from "@/api/countriesApi";

export default async function CountryListLoader() {
  const countries = await getCountriesList();
  return <CountriesList countries={countries} />;
}
