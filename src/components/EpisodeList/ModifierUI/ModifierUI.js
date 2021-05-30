import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ModifierUI = (props) => {
  let seasonsObj = props.seasonsObj;
  let seasonOptions = Object.keys(seasonsObj).map((season, seasonIndex) => {
    return (
      <option key={seasonIndex} value={season}>
        Season {season}
      </option>
    );
  });
  if (!(props.currentSeason in seasonsObj)) {
    return null;
  }
  let episodeOptions = seasonsObj[props.currentSeason].map((episode, episodeIndex) => {
    return (
      <option key={episodeIndex} value={episode}>
        Episode {episode}
      </option>
    );
  });
  return (
    <Form inline onSubmit={props.replaceSubmit}>
      <Form.Row className="align-items-center">
        <Col>Replace</Col>
        <Col className="my-1">
          <Form.Control
            onChange={props.seasonChange}
            ref={props.seasonRef}
            as="select"
            className="mr-sm-2"
            id="inlineFormCustomSelect"
            custom
          >
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
            {episodeOptions}
          </Form.Control>
        </Col>
        <Col>with</Col>
        <Col className="my-1">
          <Form.Control type="text" placeholder="Search" ref={props.inputReference} className="mr-sm-2" />
        </Col>
        <Button onClick={props.clickReplace} variant="dark">
          Replace
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ModifierUI;
