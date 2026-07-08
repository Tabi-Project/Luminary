export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== "string") return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitName(value: string): {
  firstName: string;
  lastName: string;
} {
  const parts = value.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

export const escapeHtml = (value: string) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
