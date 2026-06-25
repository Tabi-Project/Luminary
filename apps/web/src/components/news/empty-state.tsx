import { type State } from "@/types/news.types";

interface EmptyStateProps {
  setState: (state: State) => void;
}

export default function EmptyState({ setState }: EmptyStateProps) {
  return (
    <section id="emptyState" className="news-empty">
      <p className="news-empty__title">No articles match those filters yet.</p>
      <p className="news-empty__copy">
        Try broadening the field, region, or time range to see more stories.
      </p>
      <button
        id="clearFiltersButton"
        className="news-empty__action"
        type="button"
        onClick={() => setState({ field: "all", region: "all", time: "all" })}
      >
        Clear filters
      </button>
    </section>
  );
}
