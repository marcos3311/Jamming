import React from 'react';

const trackStyle = {display: 'flex', justifyContent: 'space-between',border: '1px solid black', marginTop: 15}

const Track = ({ track, handleFunction, isPlayList }) => {
    return (
        <div style={trackStyle}>
            <h3>{track.name}</h3>
            <h4>{}</h4>
            <p>{track.album?.name}</p>
            <button onClick={() => handleFunction(track)}>{isPlayList ? '-' : '+'}</button>
        </div>
    )
}

export default Track;