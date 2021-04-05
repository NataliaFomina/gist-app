import React from 'react';
import './GistList.scss';
import Gist from '../gist/Gist';

const GistList = ({ gists }) => {
  return(
    <div className='gist-list'>
      {
        gists.map(gist => (
          <Gist key={gist.id} gist={gist} />
        ))
      }
    </div>
  )
}

export default GistList;