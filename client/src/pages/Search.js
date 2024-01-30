import React from 'react';
import Layout from './../components/layout/Layout';
import { useSearch } from '../context/Search';
import { Link } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout>
        <div class="home" id="home">
            <h1 class="home_heading">Search <span>Result</span></h1>
            <h4 style={{"textAlign":"center"}}>
                {values?.results.length < 1
                    ? "No Products Found"
                    : `Found ${values?.results.length}`}
            </h4>
            <div className="product_container">
              {values?.results.map((p) => (
                <div className="product_card">
                  <Link key={p._id} to={``}>
                    <div className="product_img">
                      <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                    </div>
                  </Link>
                  <div className="homeProduct_detail">
                    <span>{p.name}</span>
                      <button>Add to Cart</button>
                    {/* <p>{p.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
        </div>
    </Layout>
  )
}

export default Search
