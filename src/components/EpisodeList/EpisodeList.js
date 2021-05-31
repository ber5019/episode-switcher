import Episodes from './Episodes/Episodes';

const EpisodeList = (props) => {
  return <Episodes data={props.episodeData} seasonsObj={props.seasonsObj} />;
};

export default EpisodeList;
