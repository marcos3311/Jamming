async function fetchGetPlaylists(token, userId, playList, name) {
    const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
    {
        method: "GET", 
        headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
});

return await result.json();
}

export default fetchGetPlaylists;