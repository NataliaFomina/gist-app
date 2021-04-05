import React, {useEffect, useState} from 'react';
import './App.scss';
import axios from 'axios';
import Search from './components/search/Search';
import GistList from './components/gist-list/GistList';
import {headers} from "./auth";

function App() {
  const [gists, setGists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    //const urlParams = new URLSearchParams(window.location.search);
    //const queryParam = urlParams.get('q');
    // if (queryParam) {
    //   handleClick(queryParam);
    // }
    let hash = window.location.hash.substr(2);
    if (hash) {
      handleClick(hash);
    }
  }, []);

  const handleClick = (user) => {
    if (user) {
      setIsLoading(true);
      setError(null);
      axios.get(`https://api.github.com/users/${user}/gists`, {
        params: {
          per_page: 9,
        },
        headers: headers()
      }).then(result => {
        if (result.data.length === 0) {
          setGists([]);
          setError('No Gists found.');
        } else {
          setGists(result.data);
        }
        window.location.href = `/#/${user}`;
        setQuery(user);
      }).catch(error => {
        if (error.response.status === 404) {
          setError('GitHub user not found.');
        } else {
          setError('Oops :( An error occurred.');
        }
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setGists([]);
    }
  }

  const render = () => {
    if (error) {
      return (
        <p>{error}</p>
      )
    } else {
      if (isLoading) {
        return (
          <p>Loading Gists...</p>
        );
      } else {
        return (
          <GistList gists={gists}/>
        );
      }
    }
  }

  return (
    <div className='App'>
      <Search handleClick={handleClick} initialValue={query} disabled={isLoading}/>
      {render()}
    </div>
  );
}

export default App;
