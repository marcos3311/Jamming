import React, { useState, useEffect } from 'react';
import Tracklist from '../components/Tracklist';

const JammingContainer = () => {
    const [trackList, setTrackList] = useState([
        {
            name: 'Yonaguni',
            artist: 'Bad Bunny',
        },
        {
            name: 'DtMf',
            artist: 'Bad Bunny',
            album: 'DtMf',
        },
        {
            name: 'You Could Be Mine',
            artist: 'Guns & Roses',
            album: 'Ni idea',
        }
    ]);

    return(
        <>
            <Tracklist trackList={trackList} />
        </>
    )
}

export default JammingContainer;