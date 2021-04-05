import React, {useState, useEffect} from 'react';
import './Gist.scss';
import axios from "axios";
import {headers} from "../../auth";

const Gist = ({gist}) => {
  const [forks, setForks] = useState([]);

  useEffect(() => {
    axios.get('https://api.github.com/gists/68f8d502be42d5cd4942/forks', {
      //axios.get(gist.forks_url, {
      headers: headers()
    }).then(result => {
      setForks(result.data.slice(1).slice(-3));
    });
  }, [])

  return (
    <section className='gist'>
      <h2 className='title'>{gist.description || `gist:${gist.id}}`}</h2>
      {Object.keys(gist.files).length > 0 ?
        <div className='languages'>
          {
            Object.entries(gist.files).map((value, index) => (
              <p className='language' key={index}>{value[1].language || value[1].type}</p>
            ))
          }
        </div> : null
      }
      {forks.length > 0 ?
        <div className='forks'>
          {
            forks.map((fork, index) => (
              <div className='fork' key={index}>
                <img className='fork-img' src={fork.owner.avatar_url} height={'30px'}/>
                <p className='fork-owner'>{fork.owner.login}</p>
              </div>
            ))
          }
        </div> : null
      }
    </section>
  )
}
export default Gist;