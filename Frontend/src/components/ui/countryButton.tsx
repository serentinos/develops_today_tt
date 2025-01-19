import Image from "next/image";
import React from "react";
import { ICountryLIstItem } from "../../models/countryApiResponse";
import Link from "next/link";
import { Card } from "./card";

export default function CountryButton({
  countryItem,
}: {
  countryItem: ICountryLIstItem;
}) {
  const imageURL = countryItem.flagData?.flag;
  return (
    <Card className="active:bg-slate-100 hover:bg-slate-50 transition">
      <Link
        href={`/country/${countryItem.countryCode}`}
        key={countryItem.name}
        className="flex items-center p-4 gap-2"
      >
        {imageURL ? (
          <Image
            src={imageURL}
            alt={`${countryItem.name} flag`}
            className="w-6 h-6 object-contain object-center"
            width={24}
            height={24}
          />
        ) : null}
        <h2 className="text-xl font-semibold">{countryItem.name}</h2>
      </Link>
    </Card>
  );
}
