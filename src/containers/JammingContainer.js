import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import Login from '../components/Login';
import getAccessToken from '../utils/getAccessToken';
import fetchTracks from '../utils/fetchTracks';
// import seAuth from '../utils/auth.js';

const JammingContainer = () => {
    const [inputData, setInputData] = useState('');
    const [trackList, setTrackList] = useState([]);
    const [playList, setPlayList] = useState([
        {
            name: 'Yonaguni',
            artist: 'Bad Bunny',
        },
    ]);
    const [token, setToken] = useState((localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'))?.expireDate - Date.now() > 0) ? 
        JSON.parse(localStorage.getItem('token')).token : 
        null
    );

    useEffect(() => {
        if(token) return;

        const params = new URLSearchParams(window.location.search).get('code')
        const clientId = process.env.REACT_APP_CLIENT_ID;
        getAccessToken(clientId, params).then(res => {
            console.log(res)
            setToken(res);
            localStorage.setItem('token', JSON.stringify({
                token: res,
                expireDate: Date.now() + (3600 * 1000),
            }))
        });
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputData.trim() === '') return;

        fetchTracks(token, inputData).then(res => {setTrackList(res.tracks.items)});

        setInputData('');
    }

    const handleAdd = (track) => {
        if(playList?.includes(track)) return;
        setPlayList(prev => [track, ...prev]);
    }

    const handleDelete = (track) => {
        setPlayList(prev => prev.filter(song => track !== song));
    }

    const handleSave = () => {
        setPlayList([]);
    }

    console.log(trackList)

    return !token ? 
                <Login />
            : (
                <>
                    <SearchBar inputData={inputData} handleInputData={setInputData} handleSubmit={handleSubmit} />
                    <SearchResults trackList={trackList} handleAdd={handleAdd} />
                    <Playlist trackList={playList} handleDelete={handleDelete} handleSave={handleSave} />
                </>
            )
        
}

export default JammingContainer;