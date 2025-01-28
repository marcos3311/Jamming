import React from 'react';
import Track from './Track';

const Playlist = ({ trackList, handleDelete, handleSave }) => {
    return (
        <div>
            {trackList && trackList.map(track => 
                <Track track={track} handleFunction={handleDelete} isPlayList={true} />
                )
            }
            <button onClick={handleSave}>Save to Spotify</button>
        </div>
    )
}

export default Playlist;