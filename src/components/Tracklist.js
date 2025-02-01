import React from 'react';
import Track from './Track';

const tracksStyle = {
    width: '100%',
    maxHeight: '400px',
    overflowY: 'scroll',
}

const Tracklist = ({ trackList, handleFunction, isPlaylist }) => {
    return (
        trackList && 
            (<div style={tracksStyle}>
                {trackList.map(track => 
                    <Track track={track} handleFunction={handleFunction} isPlaylist={isPlaylist} />
                    ) 
                }
                {trackList.name}
            </div>)
    )
}

export default Tracklist;