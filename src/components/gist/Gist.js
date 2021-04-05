import React, {useState, useEffect} from 'react';
import './Gist.scss';
import axios from "axios";
import {headers} from "../../auth";

const Gist = ({gist}) => {
  const [forks, setForks] = useState([]);

  useEffect(() => {
    axios.get(gist['forks_url'], {
      headers: headers()
    }).then(result => {
      setForks(result.data.slice(1).slice(-3));
    });
  }, [gist]);

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
            forks.map((fork, index) => {
              if (fork.owner) {
                return (
                  <div className='fork' key={index}>
                    <img className='fork-img' src={fork.owner.avatar_url} alt="User avatar"/> :
                    <p className='fork-owner'>{fork.owner.login}</p>
                  </div>
                )
              } else {
                return null;
              }
            })
          }
        </div> : null
      }
    </section>
  )
}

export default Gist;