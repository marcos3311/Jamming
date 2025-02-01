import React from 'react';

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'black',
    gap: 15
}

const logoStyle = {
    width: '15rem'
}

const signatureStyle = {
    opacity: '0.8',
    fontSize: 12,
    color: 'white'
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