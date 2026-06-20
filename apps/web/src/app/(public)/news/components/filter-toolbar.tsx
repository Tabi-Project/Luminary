export default function FilterToolbar() {
  return (
    <>
      <form
        id="newsFilters"
        className="news-toolbar"
        aria-label="Filter news articles"
      >
        <label className="toolbar-select" htmlFor="fieldFilter">
          <span className="visually-hidden">Filter by field</span>
          <select id="fieldFilter" name="field">
            <option value="all">All Fields</option>
          </select>
        </label>

        <label className="toolbar-select" htmlFor="regionFilter">
          <span className="visually-hidden">Filter by region</span>
          <select id="regionFilter" name="region">
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
          <select id="timeFilter" name="time">
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
