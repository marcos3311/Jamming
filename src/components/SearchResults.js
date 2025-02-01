import React from 'react';
import Tracklist from './Tracklist';

const tracksStyle = {
    width: '100%',
    height: '460px',
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: '15px 0px 15px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const SearchResults = ({ trackList, handleAdd }) => {
    return (
        <section style={tracksStyle}>
            <h2>Results</h2>
            {
                trackList.length === 0 &&
                    <p style={{textAlign: 'center', color:'gray', marginTop: 10}}>Your songs results will be displayed here.</p>
            }
            <Tracklist trackList={trackList} handleFunction={handleAdd} isPlayList={false} />
        </section>
    )
}

export default SearchResults;