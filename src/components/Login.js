import React from 'react';
import auth from '../utils/auth';

const divStyle = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const Login = () => {
    const handleLogin = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        auth(clientId);
    }
    return (
        <div style={divStyle}>
            <button onClick={handleLogin}>Log In to Spotify</button>
        </div>
    )
}

export default Login;