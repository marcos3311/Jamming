import React from 'react';
import Tracklist from './Tracklist';

const tracksStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const SearchResults = ({ trackList, handleAdd }) => {
    return (
        <section style={tracksStyle}>
            <h2>Results</h2>
            <Tracklist trackList={trackList} handleFunction={handleAdd} isPlayList={false} />
        </section>
    )
}

export default SearchResults;