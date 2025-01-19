const CountrySkeleton = () => {
  return (
    <div className="animate-pulse h-16 bg-gray-300 opacity-20 rounded shadow"></div>
  );
};

export default async function CountriesListSkeleton() {
  return (
    <section>
      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <CountrySkeleton key={index} />
        ))}
      </section>
    </section>
  );
}
