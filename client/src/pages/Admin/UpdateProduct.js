import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const {Option} = Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState("");
    const [id,setId] = useState("");

    //get single product
    const getSingleProduct = async() => {
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setName(data.products.name);
            setId(data.products._id);
            setDescription(data.products.description);
            setPrice(data.products.price);
            setCategory(data.products.category);
            setQuantity(data.products.quantity);
            setShipping(data.products.shipping);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single product');
        }
    };
    useEffect(() => {
        getSingleProduct();
    }, [])

    //get all categories
    const getAllCategory = async () =>{
        try{
        const {data} = await axios.get('/api/v1/category/get-category');
        if(data?.success){
            setCategories(data?.category);
        }
        } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting all categories');
        }
    };
    useEffect(()=> {
        getAllCategory();
    }, []);

    //Create Product
    const handleUpdate = async(e) => {
        e.preventDefault()
        try{
        const productData = new FormData()
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("category", category._id)
        productData.append("quantity", quantity)
        photo && productData.append("photo", photo)
        productData.append("shipping", shipping)
        const {data} = axios.put(`/api/v1/product/update-product/${id}`, productData)
        if(data?.success){
            toast.error(data?.message);
        }
        else {
            toast.success('Product Updated successfully');
            navigate('/dashboard/admin/products');
        }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    const handleDelete = async() => {
        try{
            let answer = window.prompt("Are you sure, You want to delete this Product?");
            if(!answer) return;
            const {data} = axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success('Product Deleted successfully');
            navigate('/dashboard/admin/products');
        } catch(error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <AdminMenu />
          </div>
          <div className='adminContent'>
            <div>
              <div class="admin" id="admin">
                <h1 class="admin_heading">Manage <span>Products</span></h1>
              </div>
              <div className='categoryForm'>
                <form>
                  <input 
                      style={{marginBottom:'15px'}}
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name of the Product.." 
                      required
                  />
                  <textarea 
                      type="text"
                      style={{marginBottom:'15px'}}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description of the Product.." 
                      required
                  />
                  <input 
                      type="text" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price of the Product.." 
                      required
                  />
                  <Select 
                    style={{width:'100%', backgroundColor:'white', margin:'15px 0px', borderBottom: '2px solid #ccc', borderRadius:'4px' }}
                    bordered={false}
                    placeholder = "Select a category"
                    size='large'
                    showSearch
                    value={category.name}
                    onChange={(value) => {setCategory(value)}} >
                      {categories?.map(c => (
                        <Option key={c._id} value={c._id}>{c.name}</Option>
                      ))}
                  </Select>
                  <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity of the Product.." 
                      required
                  />
                  <div style={{margin:'15px 0px'}}>
                    <label className='uploadPhoto' style={{}}>
                      {photo ? photo.name : "Upload Photo"}
                      <input 
                        type='file' 
                        name='photo' 
                        accept='image/*' 
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                    {photo ? (
                        <div>
                            <img className='uploadedPhoto' src={URL.createObjectURL(photo)} alt='product_photo' />
                        </div>
                    ) : (
                        <div>
                            <img className='uploadedPhoto' src={`/api/v1/product/product-photo/${id}`} alt='product_photo' />
                        </div>
                    )}
                  </div>
                  <Select 
                    style={{width:'100%', backgroundColor:'white', marginBottom:'15px', borderBottom: '2px solid #ccc', borderRadius:'4px' }}
                    bordered={false}
                    size='large'
                    showSearch
                    onChange={(value) => setShipping(value)}
                    placeholder="Shipping of the Product.." 
                    value={shipping? "1" : "0"}
                    required
                  > 
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                  <input type="submit" value="Update Product" onClick={handleUpdate}/>
                  <input type="submit" value="Delete Product" onClick={handleDelete}/>
                </form>
              </div>
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
