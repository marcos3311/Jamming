import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import Login from '../components/Login';
import getAccessToken from '../utils/getAccessToken';
import fetchTracks from '../utils/fetchTracks';
import fetchUser from '../utils/fetchUser';
import fetchCreatePlaylist from '../utils/fetchCreatePlaylist';
import fetchGetPlaylists from '../utils/fetchGetPlaylists';
import Header from '../components/Header';
import fetchAddPlaylist from '../utils/fetchAddPlaylist';

const tracksContainerStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    gap: 50,
    padding: 20
}

const JammingContainer = () => {
    const [inputData, setInputData] = useState('');
    const [inputPlaylist, setInputPlaylist] = useState('');
    const [trackList, setTrackList] = useState([]);
    const [playList, setPlayList] = useState([]);
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

    const handlePlaylist = async (e) => {
        e.preventDefault();
        if(inputPlaylist.trim() === '') return

        const userId = await fetchUser(token).then(user => user.id);
        const userPlaylists = await fetchGetPlaylists(token, userId).then(playlists => playlists.items);
        const userPlaylistsNames = userPlaylists.map(playlist => playlist.name)

        const playlistName = inputPlaylist.trim();
        const alreadyExist = userPlaylistsNames.includes(playlistName);
        const playlistUris = playList.map(track => track.uri);

        if(!alreadyExist) {
            const playlistId = await fetchCreatePlaylist(token, userId, playlistName).then(res => res.id);
            fetchAddPlaylist(token, playlistId, playlistUris)
        } else {
            const playlistId = userPlaylists.find(playlist => playlist.name === playlistName).id;
            fetchAddPlaylist(token, playlistId, playlistUris);
        }

    }

    return !token ? 
                <Login />
            : (
                <>
                    <Header />
                    <SearchBar inputData={inputData} handleInputData={setInputData} handleSubmit={handleSubmit} />
                    <div style={tracksContainerStyle}>
                        <SearchResults trackList={trackList} handleAdd={handleAdd} />
                        <Playlist 
                            trackList={playList} 
                            handleDelete={handleDelete} 
                            handleSave={handleSave} 
                            inputPlaylist={inputPlaylist} 
                            handleInputPlaylist={setInputPlaylist} 
                            submitPlaylist={handlePlaylist} 
                        />
                    </div>
                </>
            )
        
}

export default JammingContainer;