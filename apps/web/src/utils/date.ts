export const getDaysAgo = (value: number) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - new Date(value).getTime()) / msPerDay);
};

export function formatDate(value: number): string;
export function formatDate(value: Date | string): string;
export function formatDate(value: number | Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
