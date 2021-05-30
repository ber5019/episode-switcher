import { Fragment } from 'react';

import Episodes from './Episodes/Episodes';

const EpisodeList = (props) => {
  return (
    <Fragment>
      <Episodes data={props.episodeData} seasonsObj={props.seasonsObj} />
    </Fragment>
  );
};

export default EpisodeList;
