export const getDaysAgo = (value: number) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - new Date(value).getTime()) / msPerDay);
};

export const formatDate = (value: number) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
