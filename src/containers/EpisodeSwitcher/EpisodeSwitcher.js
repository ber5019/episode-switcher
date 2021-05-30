import { useState, useEffect, useRef, Fragment } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import ShowHeader from '../../components/ShowHeader/ShowHeader';
import ModifierUI from '../../components/EpisodeList/ModifierUI/ModifierUI';
import EpisodeList from '../../components/EpisodeList/EpisodeList';
import classes from './EpisodeSwitcher.module.css';

let EpisodeSwitcher = (props) => {
  const [showDetails, setShowDetails] = useState({
    id: 0,
    name: '',
    premiered: '',
    episodes: [],
    genres: [],
    description: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [replaceError, setReplaceError] = useState('');
  const showSearchInputRef = useRef();
  const episodeReplaceInputRef = useRef();
  const seasonNumberDropdownRef = useRef();
  const episodeNumberDropdownRef = useRef();

  let GenerateRandomEpisodeId = () => {
    const min = 1;
    const max = 50000;
    return Math.floor(min + Math.random() * (max - min));
  };

  useEffect(() => {
    const fetchRandomShow = async () => {
      const queryURL = `https://api.tvmaze.com/shows/${GenerateRandomEpisodeId()}?embed=episodes`;
      try {
        const response = await fetch(queryURL);
        if (!response.ok) {
          throw new Error('Retrieving show failed');
        }
        const newData = await response.json();

        const newShowDetails = {
          id: newData.id,
          name: newData.name,
          premiered: newData.premiered,
          episodes: newData._embedded.episodes,
          genres: newData.genres,
          description: newData.summary,
          image: newData.image ? newData.image.medium : null,
        };
        setShowDetails(newShowDetails);
        setReplaceError('');
        if (newShowDetails.episodes.length > 0) {
          setCurrentSeason(newShowDetails.episodes[0].season);
          setCurrentEpisode(newShowDetails.episodes[0].number);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchRandomShow();
  }, []);

  let fetchShowDetails = async (queryURL) => {
    try {
      const response = await fetch(queryURL);
      if (!response.ok) {
        throw new Error('Retrieving show failed');
      }
      const newData = await response.json();
      const newShowDetails = {
        id: newData.id,
        name: newData.name,
        premiered: newData.premiered,
        episodes: newData._embedded.episodes,
        genres: newData.genres,
        description: newData.summary,
        image: newData.image ? newData.image.medium : null,
      };
      setShowDetails(newShowDetails);
      setReplaceError('');
      if (newShowDetails.episodes.length > 0) {
        setCurrentSeason(newShowDetails.episodes[0].season);
        setCurrentEpisode(newShowDetails.episodes[0].number);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleOnShowSearch = async () => {
    if (showSearchInputRef.current.value !== '') {
      const queryURL = `https://api.tvmaze.com/singlesearch/shows?q=${showSearchInputRef.current.value}&embed=episodes`;
      fetchShowDetails(queryURL);
    }
  };

  const handleSearchShowFormSubmit = (event) => {
    event.preventDefault();
    if (showSearchInputRef.current.value !== '') {
      const queryURL = `https://api.tvmaze.com/singlesearch/shows?q=${showSearchInputRef.current.value}&embed=episodes`;
      fetchShowDetails(queryURL);
    }
  };

  let handleSeasonChange = async () => {
    setCurrentSeason(seasonNumberDropdownRef.current.value);
    // make sure to reset the currentEpisode state
    let defaultEpisodeNumberIndex = showDetails.episodes.findIndex((episode) => {
      return episode.season === Number(seasonNumberDropdownRef.current.value);
    });
    setCurrentEpisode(showDetails.episodes[defaultEpisodeNumberIndex].number);
  };

  let handleEpisodeChange = async () => {
    setCurrentEpisode(episodeNumberDropdownRef.current.value);
  };

  let onReplaceHandler = async (event) => {
    event.preventDefault();
    try {
      //query for show id
      const showDataURL = `https://api.tvmaze.com/singlesearch/shows?q=${episodeReplaceInputRef.current.value}&embed=episodes`;
      const showResponse = await fetch(showDataURL);
      if (!showResponse.ok) {
        throw new Error(`There is no show matching "${episodeReplaceInputRef.current.value}"`);
      }
      const showData = await showResponse.json();
      // query for episode id
      const showID = showData.id;
      const season = currentSeason;
      const episode = currentEpisode;
      const episodeDataURL = `https://api.tvmaze.com/shows/${showID}/episodebynumber?season=${season}&number=${episode}`;
      const episodeResponse = await fetch(episodeDataURL);
      if (!episodeResponse.ok) {
        throw new Error('There is no matching episode for the season, episode and show provided.');
      }
      const episodeData = await episodeResponse.json();

      let newShowData = { ...showDetails };
      let replacementIndex = newShowData.episodes.findIndex(
        (episode) => episode.season === episodeData.season && episode.number === episodeData.number
      );
      newShowData.episodes[replacementIndex] = episodeData;
      setShowDetails(newShowData);
      setReplaceError('');
    } catch (error) {
      setReplaceError(error.message);
    }
  };

  let handleReplaceEpisodeFormSubmit = (event) => {
    event.preventDefault();
    if (episodeReplaceInputRef.current.value !== '') {
      onReplaceHandler(event);
    }
  };

  let errorMessage = replaceError === '' ? null : <Alert variant={'danger'}>{replaceError}</Alert>;

  let displayInfo = (
    <Container>
      <div className={classes.EpisodeSwitcher}>
        <ShowHeader
          title={showDetails.name}
          genres={showDetails.genres}
          premier={showDetails.premiered}
          summary={showDetails.description}
          thumbnail={showDetails.image}
        />
        {
          <ModifierUI
            replaceSubmit={handleReplaceEpisodeFormSubmit}
            seasonChange={handleSeasonChange}
            currentSeason={currentSeason}
            seasonRef={seasonNumberDropdownRef}
            episodeChange={handleEpisodeChange}
            currentEpisode={currentEpisode}
            episodeRef={episodeNumberDropdownRef}
            seasonsObj={showDetails.episodes
              .map(({ season, number }) => [season, number])
              .reduce((result, currentArray) => {
                const key = currentArray[0];
                const value = currentArray[1];
                result[key] = (result[key] || []).concat(value);
                return result;
              }, {})}
            inputReference={episodeReplaceInputRef}
            clickReplace={onReplaceHandler}
          />
        }
        {errorMessage}
        {
          <EpisodeList
            episodeData={showDetails.episodes}
            seasonsObj={showDetails.episodes
              .map(({ season, number }) => [season, number])
              .reduce((result, currentArray) => {
                const key = currentArray[0];
                const value = currentArray[1];
                result[key] = (result[key] || []).concat(value);
                return result;
              }, {})}
          />
        }
      </div>
    </Container>
  );

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Container>
          <Navbar.Brand href="#home">Episode Switcher</Navbar.Brand>
          <Form inline onSubmit={handleSearchShowFormSubmit}>
            <Form.Control type="text" placeholder="Enter a TV show" ref={showSearchInputRef} className="mr-sm-2" />
            <Button onClick={handleOnShowSearch} variant="secondary">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      {!isLoading && showDetails.episodes && displayInfo}
    </Fragment>
  );
};

export default EpisodeSwitcher;
