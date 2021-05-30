import Episode from './Episode/Episode';
import classes from './Episodes.module.css';

const Episodes = (props) => {
  let season = null;
  let seasonObj = props.seasonsObj;
  let episodeComponents = props.data.map((element, mapIndex) => {
    let seasonHeader = null;
    if (element.season !== season) {
      let date = new Date(element.airdate);
      date.setDate(date.getDate() + 1);
      const shortDate =
        date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear();

      season = element.season;
      let seasonSubHeader = [];
      seasonSubHeader.push(seasonObj[season].length + ' episodes');
      if (!isNaN(date.getDate())) {
        seasonSubHeader.push(`Aired ${shortDate}`);
      }
      seasonHeader = (
        <div className={classes.SeasonHeader}>
          <h2 key={'season ' + season}>Season {season}</h2>
          <div class="text-muted">{seasonSubHeader.join(' | ')}</div>
          <hr />
        </div>
      );
    }
    return (
      <div key={mapIndex}>
        {seasonHeader}
        <Episode
          title={element.name}
          episode={element.number}
          season={element.season}
          airDate={element.airdate}
          description={element.summary}
          image={element.image ? element.image.medium : null}
        />
      </div>
    );
  });
  return episodeComponents;
};

export default Episodes;
