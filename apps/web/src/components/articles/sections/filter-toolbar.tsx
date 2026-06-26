import { type State, type Article } from "@/types/articles.types";
import { getCategoryLabel } from "@/utils/article";
import { Button } from "@/components/common/button";
import { SelectField } from "@/components/common/form";
import {
  regionFilterOptions,
  timeFilterOptions,
  categoryFilterOptions,
} from "@/data/articles";
import type { SelectOption } from "@/types/form.type";
import { endpoints } from "@/data/endpoints";
import { axiosGet } from "@/utils/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

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

interface FilterToolbarProps {
  state: State;
  setState: (state: State) => void;
  articles: Article[];
}

export default function FilterToolbar({
  state,
  setState,
  articles,
}: FilterToolbarProps) {
  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const field = formData.get("field") as string;
    const region = formData.get("region") as string;
    const time = formData.get("time") as string;
    setState({ field, region, time });
  };

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error,
  } = useQuery<SelectOption[]>({
    queryKey: ["categories", articles.length],
    queryFn: () =>
      fetchCategories(articles).then((cat) => {
        return cat.map((each: string) => {
          const label = getCategoryLabel(each);
          return { value: label, label: label };
        });
      }),
  });

  if (isLoadingCategories) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading categories</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <form
        id="newsFilters"
        className="news-toolbar"
        aria-label="Filter news articles"
        onSubmit={onSubmit}
      >
        <div className="toolbar-select">
          <SelectField
            label=""
            htmlFor="fieldFilter"
            required={false}
            name="field"
            value={state.field}
            onChange={(value) => setState({ ...state, field: value })}
            options={categoryFilterOptions(categories)}
          />
        </div>

        <div className="toolbar-select">
          <SelectField
            label=""
            htmlFor="regionFilter"
            required={false}
            name="region"
            value={state.region}
            onChange={(value) => setState({ ...state, region: value })}
            options={regionFilterOptions}
          />
        </div>

        <div className="toolbar-select">
          <SelectField
            label=""
            htmlFor="timeFilter"
            required={false}
            name="time"
            value={state.time}
            onChange={(value) => setState({ ...state, time: value })}
            options={timeFilterOptions}
          />
        </div>

        <Button
          text="Clear filters"
          className="news-search-btn"
          type="submit"
          onClick={() => setState({ field: "all", region: "all", time: "all" })}
        />
      </form>
    </QueryClientProvider>
  );
}
