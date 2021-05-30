const ShowHeader = (props) => {
  let thumbnail = <img alt="NA" src={props.thumbnail} />;
  let date = new Date(props.premier);
  date.setDate(date.getDate() + 1);

  const longDate = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
  let subHeader = [props.genres.join(', '), longDate];
  return (
    <div>
      <h1>{props.title}</h1>
      {thumbnail}
      <div>{subHeader.join(' | ')}</div>
      <div>{props.summary !== null && props.summary.replace(/(<([^>]+)>)/gi, '').substr(0, 700)}</div>
    </div>
  );
};

export default ShowHeader;
