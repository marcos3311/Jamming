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

const inputStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    padding: 5,
    color: 'gray',
    borderBottom: '1px solid rgb(30, 215, 96)',
    outline: 'none',
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    margin: '15px 0',
}

const buttonStyle = {
    border: 'none',
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgb(30, 215, 96)",
    color: '#fff',
    fontSize:  '.8rem',
    fontWeight: '100',
    cursor: 'pointer'
}

const Playlist = ({ trackList, handleDelete, handleSave, inputPlaylist, handleInputPlaylist, submitPlaylist }) => {
    return (
        <section style={tracksStyle}>
            <h2>Playlist</h2>
            <form onSubmit={submitPlaylist} style={formStyle}>
                <input type='text' value={inputPlaylist} onChange={({ target }) => handleInputPlaylist(target.value)} placeholder='Playlist name...' style={inputStyle} />
                {
                    inputPlaylist && <button type='submit' style={buttonStyle} disabled={trackList.length === 0}>Save Playlist to Spotify</button>
                }
            </form>

            <Tracklist trackList={trackList} handleFunction={handleDelete} isPlaylist={true} />
        </section>
    )
}

export default Playlist;