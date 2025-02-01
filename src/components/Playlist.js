import React from 'react';
import Track from './Track';

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

const inputStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 5,
    color: '#fff',
    borderBottom: '1px solid gray',
    outline: 'none'
}

const Playlist = ({ trackList, handleDelete, handleSave, inputPlaylist, handleInputPlaylist, submitPlaylist }) => {
    return (
        <section style={tracksStyle}>
            <h2>Playlist</h2>
            <form onSubmit={submitPlaylist}>
                <input type='text' value={inputPlaylist} onChange={({ target }) => handleInputPlaylist(target.value)} style={inputStyle} />
            </form>
            {trackList && trackList.map(track => 
                <Track track={track} handleFunction={handleDelete} isPlayList={true} />
                )
            }
            {/* <button onClick={handleSave}>Save to Spotify</button> */}
        </section>
    )
}

export default Playlist;