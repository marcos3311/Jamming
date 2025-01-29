import React from 'react';

const formStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 10
}

const inputStyle = {
    borderRadius: 5,
    border: 'none',
    backgroundColor: 'gray',
    width: '20rem',
    padding: 10,
    color: '#fff'
}

const btnStyle = {
    border: 'none',
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#1DB954",
    color: '#fff',
    width: '8rem'
}

const SearchBar = ({ inputData, handleInputData, handleSubmit }) => {
    const handleChange = ({target}) => {
        handleInputData(target.value);
    }
    
    return(
        <form onSubmit={handleSubmit} style={formStyle}>
            <input 
                type='text' 
                name='search' 
                id='search' 
                value={inputData} 
                onChange={handleChange}
                style={inputStyle}
            />
            <button style={btnStyle}>Search</button>
        </form>
    )
}

export default SearchBar;