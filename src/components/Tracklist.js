import React from 'react';
import Track from './Track';

const Tracklist = ({ trackList, handleFunction }) => {
    return (
        trackList && 
            (<div>
                {trackList.map(track => 
                    <Track track={track} handleFunction={handleFunction} />
                    ) 
                }
                {trackList.name}
            </div>)
    )
}

export default Tracklist;