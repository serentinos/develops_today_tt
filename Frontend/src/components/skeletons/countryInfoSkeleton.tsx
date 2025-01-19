import React from "react";

export default function CountryInfoSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-40 bg-gray-300 rounded w-full mb-2"></div>
    </div>
  );
}
