import Image from 'react-bootstrap/Image';

import classes from './Episode.module.css';

const Episode = (props) => {
  let image =
    props.image !== null ? (
      <Image alt="NA" src={props.image} />
    ) : (
      <div className={[classes.MissingImage, 'bg-secondary'].join(' ')}>
        <p>NA</p>
      </div>
    );
  let date = new Date(props.airDate);
  date.setDate(date.getDate() + 1);

  let episodeSubHeader = [];
  episodeSubHeader.push(`Season ${props.season}`);
  episodeSubHeader.push(`Episode ${props.episode}`);
  if (!isNaN(date.getDate())) {
    let shortDate =
      date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
    episodeSubHeader.push(`${shortDate}`);
  }
  return (
    <div className={classes.Episode}>
      <div className={classes.ImageContainer}>{image}</div>
      <div>
        <h3>{props.title}</h3>
        <div className="text-muted">{episodeSubHeader.join(' | ')}</div>
        <div>{props.description !== null && props.description.replace(/(<([^>]+)>)/gi, '').substr(0, 270)}</div>
      </div>
    </div>
  );
};

export default Episode;
