import { axiosGet } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/types/submit-story";

export const getCategories = () => {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosGet<{ data: Category[] }>("/categories", {});
      return response.data ?? [];
    },
  });
  return { categories, isLoadingCategories };
}