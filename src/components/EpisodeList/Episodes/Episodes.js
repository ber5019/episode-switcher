import Episode from './Episode/Episode';

const Episodes = (props) => {
  let season = null;
  let episodeComponents = props.data.map((element, mapIndex) => {
    let seasonHeader = null;
    if (element.season !== season) {
      season = element.season;
      seasonHeader = <h2 key={'season ' + season}>Season: {season}</h2>;
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
