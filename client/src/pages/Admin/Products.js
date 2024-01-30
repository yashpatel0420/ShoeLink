import React,{useEffect,useState} from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products,setProducts] = useState([]);

    //Get All Products
    const getAllProducts = async () => {
        try{
            const {data} = await axios.get("/api/v1/product/get-product");
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
  return (
    <Layout> 
        <div className='adminGridContainer'>
            <div className='adminMenu'>
                <AdminMenu />
            </div>
            <div className='adminContent'>
                <div>
                    <div class="admin" id="admin">
                        <h1 class="admin_heading">All Products <span>List</span></h1>
                    </div>
                </div>
                <div className="product_container">
                    {products?.map(p => (
                        <div className="product_card">
                            <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                                <div className="product_img">
                                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                </div>
                            </Link>
                            <div className="adminProduct_detail">
                                <span>{p.name}</span>
                                {/* <p>{p.description}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products
