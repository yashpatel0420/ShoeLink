import React,{useState, useEffect} from 'react';
import Layout from '../components/layout/Layout.js';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Checkbox, Radio } from 'antd';
// import { Prices } from '../components/Prices.js';

const HomePage = () => {
  // const navigate = useNavigate();
  // const [Products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [checked, setChecked] = useState([]);
  // const [radio, setRadio] = useState([]);
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  // //get all categories
  // const getAllCategory = async () =>{
  //   try{
  //     const {data} = await axios.get('/api/v1/category/get-category');
  //     if(data?.success){
  //       setCategories(data?.category);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(()=> {
  //   getAllCategory();
  //   getTotal();
  // }, []);

  // //Get All Products
  // const getAllProducts = async () => {
  //   try{
  //     setLoading(true);
  //     const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProducts(data.products);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  // //getTotal COunt
  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/product-count");
  //     setTotal(data?.total);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  // //load more
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProducts([...Products, ...data?.products]);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  // //filter by category
  // const handleFilter = (value,id) => {
  //   let all = [...checked]
  //   if(value) {
  //     all.push(id);
  //   } 
  //   else {
  //     all = all.filter((c) => c !== id);
  //   }
  //   setChecked(all);
  // }
  // useEffect(() => {
  //   if(!checked.length || !radio.length) getAllProducts();
  // }, [checked.length,radio.length]);

  // useEffect(() => {
  //   if(checked.length || radio.length) filterProduct();
  // },[checked,radio]);

  // //get filtered products
  // const filterProduct = async () => {
  //   try {
  //     const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
  //     setProducts(data?.products)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <Layout> 
      <h1>Home Page</h1>
    </Layout>
  )
}

export default HomePage;