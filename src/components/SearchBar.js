import React from 'react';

const SearchBar = ({ inputData, handleInputData, handleSubmit }) => {
    const handleChange = ({target}) => {
        handleInputData(target.value);
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input 
                type='text' 
                name='search' 
                id='search' 
                value={inputData} 
                onChange={handleChange}
            />
            <button>Search</button>
        </form>
    )
}

export default SearchBar;