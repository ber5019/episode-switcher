import { Fragment } from 'react';

import Episodes from './Episodes/Episodes';

const EpisodeList = (props) => {
  return (
    <Fragment>
      <Episodes data={props.episodeData} />
    </Fragment>
  );
};

export default EpisodeList;
