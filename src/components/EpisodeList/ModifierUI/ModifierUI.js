import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ModifierUI = (props) => {
  let seaonsObj = props.seasons.reduce((result, currentArray) => {
    const key = currentArray[0];
    const value = currentArray[1];
    result[key] = (result[key] || []).concat(value);
    return result;
  }, {});
  let seasonOptions = Object.keys(seaonsObj).map((season, seasonIndex) => {
    return (
      <option key={seasonIndex} value={season[0]}>
        {season[0]}
      </option>
    );
  });
  let episodeOptions = seaonsObj[props.currentSeason].map((episode, episodeIndex) => {
    return (
      <option key={episodeIndex} value={episode}>
        {episode}
      </option>
    );
  });
  return (
    <Form inline onSubmit={props.replaceSubmit}>
      <Form.Row className="align-items-center">
        <Col className="my-1">
          <Form.Control
            onChange={props.seasonChange}
            ref={props.seasonRef}
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            custom
          >
            <option value="0">Season</option>
            {seasonOptions}
          </Form.Control>
        </Col>
        <Col className="my-1">
          <Form.Control
            ref={props.episodeRef}
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            onChange={props.episodeChange}
            custom
          >
            <option value="0">Episode</option>
            {episodeOptions}
          </Form.Control>
        </Col>
        <Col className="my-1">
          <Form.Control type="text" placeholder="Search" ref={props.inputReference} className="mr-sm-2" />
        </Col>
        <Button onClick={props.clickReplace} variant="secondary">
          Replace
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ModifierUI;
