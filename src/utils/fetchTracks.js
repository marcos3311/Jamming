async function fetchTracks(token, string) {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(string)}&type=track`, {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export default fetchTracks;