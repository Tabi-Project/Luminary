import { type State, type Article } from "@/types/news.types";
import { fetchCategories, getCategoryLabel } from "@/utils/article";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/button";
import { SelectField, FormLabel } from "@/components/common/form";

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategory() {
      try {
        const cat = await fetchCategories(articles);
        if (cat) {
          setCategories(cat);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getCategory();
  }, []);

  return (
    <>
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
            options={[
              { value: "all", label: "All Fields" },
              ...categories.map((cat: string) => {
                const label = getCategoryLabel(cat);
                return { value: label, label: label };
              }),
            ]}
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
            options={[
              { value: "all", label: "All Regions" },
              { value: "Global", label: "Global" },
              { value: "Africa", label: "Africa" },
              { value: "North America", label: "North America" },
              { value: "Europe", label: "Europe" },
              { value: "Asia", label: "Asia" },
              { value: "Latin America", label: "Latin America" },
              { value: "Middle East", label: "Middle East" },
            ]}
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
            options={[
              { value: "all", label: "Any Time" },
              { value: "last-7", label: "Last 7 days" },
              { value: "last-30", label: "Last 30 days" },
              { value: "last-90", label: "Last 90 days" },
              { value: "this-year", label: "This year" },
            ]}
          />
        </div>

        <Button text="Search News" className="news-search-btn" type="submit" />
      </form>
    </>
  );
}
