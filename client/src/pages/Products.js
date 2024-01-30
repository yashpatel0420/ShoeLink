// import React,{useState, useEffect} from 'react';
// import Layout from '../components/layout/Layout.js';
// import { useAuth } from '../context/auth.js';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Checkbox, Radio } from 'antd';
// import { Prices } from '../components/Prices.js';


// const Products = () => {
//     const [Products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [checked, setChecked] = useState([]);
//     const [radio, setRadio] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);

//     //get all categories
//     const getAllCategory = async () =>{
//         try{
//         const {data} = await axios.get('/api/v1/category/get-category');
//         if(data?.success){
//             setCategories(data?.category);
//         }
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     useEffect(()=> {
//         getAllCategory();
//         getTotal();
//     }, []);

//     //Get All Products
//     const getAllProducts = async () => {
//         try{
//         setLoading(true);
//         const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
//         setLoading(false);
//         setProducts(data.products);
//         } catch (error) {
//         setLoading(false);
//         console.log(error);
//         }
//     };

//     //getTotal COunt
//     const getTotal = async () => {
//         try {
//         const { data } = await axios.get("/api/v1/product/product-count");
//         setTotal(data?.total);
//         } catch (error) {
//         console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (page === 1) return;
//         loadMore();
//     }, [page]);

//     //load more
//     const loadMore = async () => {
//         try {
//         setLoading(true);
//         const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//         setLoading(false);
//         setProducts([...Products, ...data?.products]);
//         } catch (error) {
//         console.log(error);
//         setLoading(false);
//         }
//     };

//     //filter by category
//     const handleFilter = (value,id) => {
//         let all = [...checked]
//         if(value) {
//         all.push(id);
//         } 
//         else {
//         all = all.filter((c) => c !== id);
//         }
//         setChecked(all);
//     }
//     useEffect(() => {
//         if(!checked.length || !radio.length) getAllProducts();
//     }, [checked.length,radio.length]);

//     useEffect(() => {
//         if(checked.length || radio.length) filterProduct();
//     },[checked,radio]);

//     //get filtered products
//     const filterProduct = async () => {
//         try {
//         const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
//         setProducts(data?.products)
//         } catch (error) {
//         console.log(error);
//         }
//     }
//   return (
//     <Layout> 
//         <div className='adminGridContainer'>
//             <div className='homeMenu'>
//             <div class="home" id="home">
//                 <h1 class="homeFilter_heading">Filter by <span>Categories</span></h1>
//             </div>
//             <div className='checkbox'>
//                 {categories?.map((c) => (
//                     <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} style={{fontSize:'18px', fontFamily: "Futura-Std-Heavy-Oblique"}}>
//                     {c.name} 
//                     </Checkbox>
//                 ))}
//             </div>
//             {/* Price Filter */}
//             <div class="home" id="home">
//                 <h1 class="homeFilter_heading">Filter by <span>Price</span></h1>
//             </div>
//             <div className='checkbox'>
//                 <Radio.Group onChange={e => setRadio(e.target.value)}>
//                 {Prices?.map(p => (
//                     <div key={p._id}>
//                     <Radio value={p.array} style={{fontSize:'18px', fontFamily: "Futura-Std-Heavy-Oblique"}}>{p.name}</Radio>
//                     </div>
//                 ))}
//                 </Radio.Group>
//             </div>
//             <div className='checkbox'>
//                 <button onClick={() => window.location.reload()}>Reset filters</button>
//             </div>
//             </div>
//             <div className='homeContent'>
//             <div>
//                 <div class="home" id="home">
//                 <h1 class="home_heading">All Products <span>List</span></h1>
//                 </div>
//             </div>
//             <div className="product_container">
//                 {Products?.map(p => (
//                 <div className="product_card">
//                     <Link key={p._id} to={``}>
//                     <div className="product_img">
//                         <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
//                     </div>
//                     </Link>
//                     <div className="homeProduct_detail">
//                     <span>{p.name}</span>
//                         <button>Add to Cart</button>
//                     {/* <p>{p.description}</p> */}
//                     </div>
//                 </div>
//                 ))}
//             </div>
//             <div>
//                 {Products && Products.length <total && (
//                 <button
//                     className='LoadMore'
//                     onClick={(e) => {
//                     e.preventDefault();
//                     setPage(page + 1);
//                 }}>
//                     {loading ? "Loading..." : "Show more"}
//                 </button>
//                 )}
//             </div>
//             </div>
//         </div>
//     </Layout>
//   )
// }

// export default Products
