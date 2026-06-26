export function DashboardHeader({
  header,
  subHeader,
}: {
  header: string;
  subHeader: string;
}) {
  return (
    <div className="w-full flex flex-col lg:gap-4 gap-2">
      <h1 className="text-text-main font-bold text-4xl lg:text-5xl">
        {header}
      </h1>
      <p className="text-muted lg:text-lg font-light max-w-2xl">{subHeader}</p>
    </div>
  );
}
