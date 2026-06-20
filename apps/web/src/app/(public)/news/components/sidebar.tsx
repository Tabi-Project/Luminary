export default function Aside() {
  return (
    <>
      <aside className="news-results__sidebar">
        <section
          className="news-widget roundup-card"
          aria-labelledby="weeklyRoundupTitle"
        >
          <div className="widget-heading">
            <span className="widget-heading__icon" aria-hidden="true">
              <i className="fa-regular fa-lightbulb"></i>
            </span>
            <h2 id="weeklyRoundupTitle">Weekly Roundup</h2>
          </div>
          <ol id="roundupList" className="roundup-list"></ol>
        </section>

        <section
          className="news-widget tip-card"
          aria-labelledby="newsTipTitle"
        >
          <span className="tip-card__icon" aria-hidden="true">
            ?
          </span>
          <h2 id="newsTipTitle">Have a News Tip?</h2>
          <p>
            Know a story about a woman making impact that we should cover? Send
            it to our editorial desk for review.
          </p>
          <a className="tip-card__button" href="../main/submit-story.html">
            Submit a Story
          </a>
        </section>
      </aside>
    </>
  );
}
