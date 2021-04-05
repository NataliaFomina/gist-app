import React, {createRef, useEffect} from 'react';
import './Search.scss';

const Search = ({handleClick, initialValue, ...props}) => {
  const inputRef = createRef();

  const pressEnter = (e) => {
    if (e.key === 'Enter') {
      handleClick(inputRef.current.value);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', pressEnter, false);
    return () => {
      document.removeEventListener('keydown', pressEnter, false);
    }
  });

  return (
    <div className='search'>
      <input ref={inputRef} className='input' defaultValue={initialValue} type='search' placeholder='Type user'/>
      <button className='btn' type='button' onClick={() => handleClick(inputRef.current.value)} {...props}>
        Search
      </button>
    </div>
  )
}

export default Search;