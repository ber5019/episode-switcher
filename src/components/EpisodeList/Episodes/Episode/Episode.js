const Episode = (props) => {
  let image = <img alt="NA" src={props.image} />;
  let date = new Date(props.airDate);
  date.setDate(date.getDate() + 1);
  return (
    <div>
      <h3>{props.title}</h3>
      {image}
      <div>
        Season {props.season} | Episode {props.episode} | {date.toLocaleString('default', { month: 'long' })}{' '}
        {date.getDate()}, {date.getFullYear()}
      </div>
      <div>{props.description !== null && props.description.replace(/(<([^>]+)>)/gi, '').substr(0, 270)}</div>
    </div>
  );
};

export default Episode;
