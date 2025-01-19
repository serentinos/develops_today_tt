import CountryButton from "./ui/countryButton";
import { ICountryLIstItem } from "../models/countryApiResponse";

export default async function CountriesList({
  countries,
}: {
  countries: ICountryLIstItem[];
}) {
  return (
    <section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => {
          return <CountryButton countryItem={country} key={country.name} />;
        })}
      </section>
    </section>
  );
}
