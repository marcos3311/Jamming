import React from 'react';
import Track from './Track';

const Playlist = ({ trackList, handleDelete, handleSave, inputPlaylist, handleInputPlaylist, submitPlaylist }) => {
    return (
        <section style={{width: '100%'}}>
            <h2>Playlist</h2>
            <form onSubmit={submitPlaylist}>
                <input type='text' value={inputPlaylist} onChange={({ target }) => handleInputPlaylist(target.value)} />
                <button type='submit'>Add</button>
            </form>
            {trackList && trackList.map(track => 
                <Track track={track} handleFunction={handleDelete} isPlayList={true} />
                )
            }
            <button onClick={handleSave}>Save to Spotify</button>
        </section>
    )
}

export default Playlist;