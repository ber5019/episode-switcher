import classes from './ShowHeader.module.css';
import Image from 'react-bootstrap/Image';

const ShowHeader = (props) => {
  let thumbnail =
    props.thumbnail !== null ? (
      <Image alt="NA" src={props.thumbnail} />
    ) : (
      <div className={[classes.MissingImage, 'bg-secondary'].join(' ')}>
        <p>NA</p>
      </div>
    );

  let date = new Date(props.premier);
  date.setDate(date.getDate() + 1);

  const shortDate =
    'Premiered on ' +
    date.toLocaleString('default', { month: 'short' }) +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear();

  let subHeader = [];
  if (props.genres.length > 0) {
    subHeader.push(props.genres.join(', '));
  }
  if (!isNaN(date.getDate())) {
    subHeader.push(shortDate);
  }

  return (
    <div className={classes.ShowHeader}>
      <div className={classes.ImageContainer}>{thumbnail}</div>
      <div>
        <h1>{props.title}</h1>
        <div class="text-muted">{subHeader.join(' | ')}</div>
        <div className={classes.Description}>
          {props.summary !== null && props.summary.replace(/(<([^>]+)>)/gi, '').substr(0, 700)}
        </div>
      </div>
    </div>
  );
};

export default ShowHeader;
