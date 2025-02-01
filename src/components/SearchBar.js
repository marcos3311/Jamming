import React from 'react';

const formStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 10
}

const inputStyle = {
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#1f1f1f',
    width: '20rem',
    padding: 10,
    color: 'gray',
    outline: 'none'
}

const btnStyle = {
    border: 'none',
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgb(30, 215, 96)",
    color: '#fff',
    width: '8rem',
    fontSize:  '1rem',
    fontWeight: 'bold',
    cursor: 'pointer'
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
                placeholder='Search...'
                value={inputData} 
                onChange={handleChange}
                style={inputStyle}
            />
            <button style={btnStyle}>Search</button>
        </form>
    )
}

export default SearchBar;