const getDaysAgo = (value: number) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - new Date(value).getTime()) / msPerDay);
};

export const matchesTimeRange = (articleDate: number, range: string) => {
  if (range === "all") return true;
  const age = getDaysAgo(articleDate);
  if (range === "last-7") return age <= 7;
  if (range === "last-30") return age <= 30;
  if (range === "last-90") return age <= 90;
  if (range === "this-year")
    return new Date(articleDate).getFullYear() === new Date().getFullYear();
  return true;
};

export const formatDate = (value: number) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
