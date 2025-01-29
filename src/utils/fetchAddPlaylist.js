async function fetchAddPlaylist(token, playlistId, playlist) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
    {
        method: "POST", 
        headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            position: 0,
            uris: playlist
        })
});

return await result.json();
}

export default fetchAddPlaylist;