import { endpoints } from "@/data/endpoints";
import { axiosGet } from "@/utils/api";

export const fetchCategories = async (
  browseableArticles: { field: string }[],
) => {
  const endpoint = endpoints.categories.get;
  try {
    const res = await axiosGet<{ data: { data: unknown } }>(endpoint, {});
    const result = res.data;
    if (!res) throw new Error();
    const categories = Array.isArray(result.data) ? result.data : [];
    return categories;
  } catch {
    // Fallback: populate from article data
    const fields = [
      ...new Set(browseableArticles.map((a) => a.field).filter(Boolean)),
    ].sort();
    return fields;
  }
};
