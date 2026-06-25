import { type State, type Article } from "@/types/news.types";
import { fetchCategories, getCategoryLabel } from "@/utils/news";
import { useEffect, useState } from "react";

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
    async function getCat() {
      try {
        const cat = await fetchCategories(articles);
        if (cat) {
          setCategories(cat);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getCat();
  }, []);

  let count = 0;

  return (
    <>
      <form
        id="newsFilters"
        className="news-toolbar"
        aria-label="Filter news articles"
        onSubmit={onSubmit}
      >
        <label className="toolbar-select" htmlFor="fieldFilter">
          <span className="visually-hidden">Filter by field</span>
          <select
            id="fieldFilter"
            name="field"
            value={state.field}
            onChange={(e) => setState({ ...state, field: e.target.value })}
          >
            <option value="all">All Fields</option>
            {categories.map((cat: string) => {
              const label = getCategoryLabel(cat);
              if (!label) return;
              return (
                <option value={label} key={count++}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>

        <label className="toolbar-select" htmlFor="regionFilter">
          <span className="visually-hidden">Filter by region</span>
          <select
            id="regionFilter"
            name="region"
            value={state.region}
            onChange={(e) => setState({ ...state, region: e.target.value })}
          >
            <option value="all">All Regions</option>
            <option value="Global">Global</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Latin America">Latin America</option>
            <option value="Middle East">Middle East</option>
          </select>
        </label>

        <label className="toolbar-select" htmlFor="timeFilter">
          <span className="visually-hidden">Filter by time period</span>
          <select
            id="timeFilter"
            name="time"
            value={state.time}
            onChange={(e) => setState({ ...state, time: e.target.value })}
          >
            <option value="all">Any Time</option>
            <option value="last-7">Last 7 days</option>
            <option value="last-30">Last 30 days</option>
            <option value="last-90">Last 90 days</option>
            <option value="this-year">This year</option>
          </select>
        </label>

        <button className="news-search-btn" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search News</span>
        </button>
      </form>
    </>
  );
}
