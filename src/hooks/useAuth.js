import { useState, useEffect } from 'react';

function useAuth() {
    const [token, setToken] = useState(null);
    const [expireTime, setExpireTime] = useState(null);
    const [user, setUser] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    const generateCodeVerifier = (length) => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        console.log(`codeVerifier: ${text}`);
        return text;
    }

    const generateCodeChallenge = async (codeVerifier) => {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        const challenge = btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        console.log(`codeChallenge: ${challenge}`);
        return challenge;
    }

    // Redirects to Spotify auth, returns code in URL to get token & sets Verifier state
    useEffect(() => {
        const verifier = localStorage.getItem('verifier');
        if (verifier !== null) return; // Only run if verifier is not already in localStorage

        const codeVerifier = generateCodeVerifier(64);
        generateCodeChallenge(codeVerifier).then((challenge) => {
            const clientId = process.env.REACT_APP_CLIENT_ID;

            // Store the verifier in localStorage
            localStorage.setItem('verifier', codeVerifier);

            const params = new URLSearchParams();
            params.append("client_id", clientId);
            params.append("response_type", "code");
            params.append("redirect_uri", "https://spectacular-tanuki-76b813.netlify.app/");
            params.append("scope", "user-read-private user-read-email playlist-modify-public playlist-modify-private");
            params.append("code_challenge_method", "S256");
            params.append("code_challenge", challenge);

            document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
        });
    }, []);

    // Fetches Spotify access Token and sets Token state
    useEffect(() => {
        // auxToken checks if already exist a token and returns if so
        const auxToken = localStorage.getItem('token');
        if(auxToken) {
            setToken(auxToken);
            setExpireTime(localStorage.getItem('expire'));
            return
        }

        const code = new URLSearchParams(window.location.search).get('code');
        const verifier = localStorage.getItem('verifier');
        
        if (!code || !verifier) return;
        console.log('entro')

        const clientId = process.env.REACT_APP_CLIENT_ID;
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", "http://localhost:3000");
        params.append("code_verifier", verifier);

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
        })
        .then((response) => response.json()) 
        .then((data) => {
            if (data.access_token) {
                setToken(data.access_token);
                setExpireTime((new Date()).getTime() + 3_600_000);
                localStorage.setItem('token', data.access_token); 
                localStorage.setItem('expire', (new Date()).getTime() + 3_600_000);
                localStorage.setItem('refresh', data.refresh_token);
            } else {
                throw new Error('Error fetching token: ', data);
            }
        })
        .catch((error) => {
            console.error('Error in token fetch request: ', error);
        });
    }, []);

    // Fetch Spotify user
    useEffect(() => {
        if(!token) return;
        fetch(`https://api.spotify.com/v1/me/`, {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                setUser(data);
            } else {
                throw new Error('Error fetching user');
            }
        })
        .catch((error) => console.log(error));
    }, [token])

    // Fetch Spotify user playlists
    useEffect(() => {
        if(user === null) return;
        fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, 
            {
                method: "GET", 
                headers: { 
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                setPlaylists(data)
            } else {
                throw new Error('Error fetching playlists')
            }
        })
        .catch(error => console.log('Error in playlist fetch request: ', error))
    }, [token, user])

    // Refresh token
    useEffect(() => {
        const timeNow = new Date().getTime();
        const refreshToken = localStorage.getItem('refresh');
        if(!token) return;
        if(!refreshToken) {
            setToken(null);
        }
        if(expireTime - timeNow > 0) return;

        console.log('refreshing token...')

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: process.env.REACT_APP_CLIENT_ID,
            })
        })
        .then((response) => response.json()) 
        .then((data) => {
            if (data.access_token) {
                console.log('entro al refresh')
                setToken(data.access_token);
                setExpireTime((new Date()).getTime() + 3_600_000);
                localStorage.setItem('token', data.access_token); 
                localStorage.setItem('refresh', data.refresh_token);
                localStorage.setItem('expire', (new Date()).getTime() + 3_600_000);
            } else {
                throw new Error('Error fetching refresh token: ', data);
            }
        })
        .catch((error) => {
            console.error('Error in refresh token fetch request: ', error);
        });

    }, [expireTime, token])

    return [token, user, playlists];
}

export default useAuth;