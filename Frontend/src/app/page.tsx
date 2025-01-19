import CountryListLoader from "@/components/loaders/countryListLoader";
import CountriesListSkeleton from "@/components/skeletons/countriesListSkeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="h-full p-4">
      <Suspense fallback={<CountriesListSkeleton />}>
        <CountryListLoader />
      </Suspense>
    </main>
  );
}
