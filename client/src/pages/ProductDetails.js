import React,{useState, useEffect} from 'react';
import Layout from './../components/layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const [product,setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([])

  //Initial Product details
  useEffect(() => {
    if(params?.slug) getProduct();
  }, [params?.slug])

  // Get product 
  const getProduct = async () => {
    try{
      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id)
    } catch (error) {
      console.log(error);
    }
  }

  // Similar Products
  const getSimilarProduct = async(pid,cid) => {
    try{
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="small-container single-product">
        <div className="row">
          <div className="col-2">
            <img src={`/api/v1/product/product-photo/${product._id}`} style={{"width":"100%"}} alt={product.name} />
          </div>
          <div className="col-2">
            <p>Home / {product.name}</p>
            <h1>{product.name}</h1>
            <h4>${product.price}</h4>
            <select>
              <option>UK 6</option>
              <option>UK 7</option>
              <option>UK 8</option>
              <option>UK 9</option>
              <option>UK 10</option>
            </select>
            <input type="number" defaultValue={1} />
            <a href className="btn">Add to cart</a>
            <h3>Product Details</h3>
            <br />
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div className='similarProducts'>
        <h2>Similar Products</h2>
        <div className="product_container">
          {relatedProducts?.map(p => (
            <div className="product_card" >
              <Link key={p._id} to={`/product-datils/${p.slug}`}>
                <div className="product_img">
                  <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
              </Link>
              <div className="homeProduct_detail">
                <span>{p.name}</span>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
