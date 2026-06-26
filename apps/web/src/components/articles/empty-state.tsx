export default function EmptyState() {
  return (
    <section id="emptyState" className="news-empty">
      <p className="news-empty__title">No articles match those filters yet.</p>
      <p className="news-empty__copy">
        Try broadening the field, region, or time range to see more stories.
      </p>
    </section>
  );
}
