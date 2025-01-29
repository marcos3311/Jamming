import React from 'react';

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 30,
    flexDirection: 'column',
}

const logoStyle = {
    width: '15rem'
}

const signatureStyle = {
    opacity: '0.8',
    fontSize: 12
}

const Header = () => {
    return (
        <header style={headerStyle}>
            <img style={logoStyle} src='assets/images/logo.png' alt='Spotify logo black' />
            <p style={signatureStyle}>Jamming project by Marcos for Codecademy</p>
        </header>
    )
}

export default Header