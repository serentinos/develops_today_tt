import { getCountryByCode } from "@/api/countriesApi";
import CountriesList from "@/components/countriesList";
import {
  ICountryLIstItem,
  IFullCountryInfo,
} from "../../../models/countryApiResponse";
import { Suspense } from "react";
import { PopulationChart } from "@/components/ui/populationChart";
import { Card, CardHeader } from "@/components/ui/card";

const getMappedCountryBorders = (
  countryData: IFullCountryInfo
): ICountryLIstItem[] | undefined => {
  return countryData.borders?.map((borderInfo) => ({
    countryCode: borderInfo.countryCode,
    name: borderInfo.commonName,
  }));
};

async function DetailedCountryInfoLoader({
  countryCode,
}: {
  countryCode: string;
}) {
  const countryData = await getCountryByCode(countryCode);
  const bordersList = getMappedCountryBorders(countryData);
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl mb-3 font-semibold">{countryData.commonName}</h2>
      {bordersList ? (
        <>
          <p className="text-xl mb-2">
            Have borders with {bordersList.length} countries:
          </p>
          <CountriesList countries={bordersList} />
          {countryData.populationCounts ? (
            <PopulationChart
              populationData={countryData.populationCounts.populationCounts}
            />
          ) : (
            <Card>
              <CardHeader>
                There is no population data for this country
              </CardHeader>
            </Card>
          )}
        </>
      ) : (
        <p>This country does not have any borders</p>
      )}
    </div>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const countryId = (await params).id;
  return (
    <Suspense>
      <DetailedCountryInfoLoader countryCode={countryId} />
    </Suspense>
  );
}
