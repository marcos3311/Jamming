import React from 'react';
import Track from './Track';

const tracksStyle = {
    width: '100%',
    height: '100%',
}

const Tracklist = ({ trackList, handleFunction }) => {
    return (
        trackList && 
            (<div style={tracksStyle}>
                {trackList.map(track => 
                    <Track track={track} handleFunction={handleFunction} />
                    ) 
                }
                {trackList.name}
            </div>)
    )
}

export default Tracklist;