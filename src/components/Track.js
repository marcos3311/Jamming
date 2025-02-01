import React from 'react';

const containerStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottom: '1px solid gray', 
    marginTop: 15,
    padding: 5
}

const infoContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
}

const buttonStyle = {
    border: 'none',
    backgroundColor: 'rgb(30, 215, 96)',
    fontSize: 20,
    fontWeight: 'bolder',
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    padding: 5,
    color: 'white',
    cursor: 'pointer'
}


const Track = ({ track, handleFunction, isPlayList }) => {
    console.log(track)
    return (
        <div style={containerStyle}>
            <div style={infoContainerStyle}>
                <h3 style={{marginBottom: 5}}>{track.name}</h3>
                <h4 style={{fontSize: '14px', opacity: .6}}>
                    {
                        track.artists[0].name ? 
                            track.artists.reduce((txt, art, i) => {
                                if(i < track.artists.length - 1 && track.artists.length > 1) {
                                    txt += `${art.name}, `;
                                } else {
                                    txt += art.name;
                                }
                                return txt;
                            }, '') : 
                            'N/A'
                    }    
                </h4>
                <p style={{fontSize:'12px', color:'gray'}}>{track.album?.name}</p>
            </div>
            <button style={buttonStyle} onClick={() => handleFunction(track)}>{isPlayList ? '-' : '+'}</button>
        </div>
    )
}

export default Track;