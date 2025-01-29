async function fetchCreatePlaylist(token, userId, name) {
    const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
    {
        method: "POST", 
        headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            public: false,
            description: `Created by Marcos`
        })
});

return await result.json();
}

export default fetchCreatePlaylist;