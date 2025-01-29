import React from 'react';
import Tracklist from './Tracklist';

const SearchResults = ({ trackList, handleAdd }) => {
    return (
        <section style={{width: '100%'}}>
            <h2>Results</h2>
            <Tracklist trackList={trackList} handleFunction={handleAdd} isPlayList={false} />
        </section>
    )
}

export default SearchResults;