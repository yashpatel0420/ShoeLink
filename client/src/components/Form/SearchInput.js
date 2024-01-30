import React from 'react'
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <div className="topnav">
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search.." 
                        name="search" 
                        value={values.keyword}
                        onChange={(e) => setValues({...values, keyword: e.target.value})}
                    />
                </form>
            </div>
        </div>
    </div>
  )
}

export default SearchInput
