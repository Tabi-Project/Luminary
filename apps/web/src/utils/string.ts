export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== "string") return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}
