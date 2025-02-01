import React from 'react';

const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    margin: '20px 0px 40px 0px',
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 25,
    width: 'fit-content'
}

const pictureStyles = {
    width: 40,
    borderRadius: '50%',
}

const infoContainer = {
    display: 'flex',
    flexDirection:'column',
    gap: 5
}

function Profile({user}) {
    const {display_name = 'Username', email = 'E-mail', images = ['default']} = user;
    return(
        <div style={containerStyles}>
            <picture style={pictureStyles}>
                {images[0] ? 
                    <img src={images[0]} alt='User profile'/> :             
                    <svg viewBox="0 0 1024 1024">
                        <path 
                            fill='#fff'
                            d="M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"
                        />
                </svg>}  
            </picture>
            <div style={infoContainer}>
                <h3 style={{letterSpacing:.5}}>{display_name}</h3>
                <p style={{fontSize: 12, opacity: '.5'}}>{email}</p>
            </div>
        </div>
    )
}

export default Profile;