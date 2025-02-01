import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Playlist from '../components/Playlist';
import fetchTracks from '../utils/fetchTracks';
import fetchUser from '../utils/fetchUser';
import fetchCreatePlaylist from '../utils/fetchCreatePlaylist';
import fetchGetPlaylists from '../utils/fetchGetPlaylists';
import Header from '../components/Header';
import fetchAddPlaylist from '../utils/fetchAddPlaylist';
import useAuth from '../hooks/useAuth';
import Profile from '../components/Profile';

const tracksContainerStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    gap: 50,
    padding: 20,
    margin: 20
}

const JamContainer = () => {
    const [inputData, setInputData] = useState('');
    const [inputPlaylist, setInputPlaylist] = useState('');
    const [trackList, setTrackList] = useState([]);
    const [playList, setPlayList] = useState([]);
    const [token, user, playlists, updatePlaylists] = useAuth();

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

        const userId = user.id;
        const userPlaylists = playlists.items;
        const userPlaylistsNames = userPlaylists.map(playlist => playlist.name);

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

        setPlayList([]);
    }

    return (
                <>
                    <Header />
                    {user && <Profile user={user}/>}
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

export default JamContainer;