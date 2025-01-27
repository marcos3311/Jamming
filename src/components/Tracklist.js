import React from 'react';

const Tracklist = ({ trackList }) => {
    return (
        <ul>
            {trackList.map(track => 
                (<div style={{display: 'flex', justifyContent: 'space-between',border: '1px solid black', marginTop: 15}}>
                    <h3>{track.name}</h3>
                    <h4>{track.artist}</h4>
                    <p>{track.album}</p>
                </div>)) 
            }
        </ul>
    )
}

export default Tracklist;