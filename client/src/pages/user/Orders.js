import React, {useEffect, useState} from 'react'
import UserMenu from '../../components/layout/UserMenu';
import Layout from "../../components/layout/Layout";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className='adminGridContainer'>
          <div className='adminMenu'>
            <UserMenu />
          </div>
          <div className='adminContent'>
            <div class="admin" id="admin">
              <h1 class="admin_heading">Your <span>Orders</span></h1>
            </div>
                  <table class="content-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    {
                      orders?.map((o,i) => {
                        return(
                            <tbody>
                              <tr>
                                <td>{i+1}</td>
                                <td>{o?.status}</td>
                                <td>{o?.buyer?.name}</td>
                                <td>{moment(o?.createAt).fromNow()}</td>
                                <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                <td>{o?.products?.length}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td>
                                {
                                  o?.products?.map((p,i) => (
                                    <div className="cart_product_card" >
                                      <div className="cart_product_img">
                                        <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                      </div>
                                      <div className="cart_product_details"> 
                                        <h3>{p.name}</h3>
                                        <p>{p.description.substring(0,130)}...</p>
                                        <h5>${p.price}</h5>
                                      </div>
                                    </div>
                                  ))
                                }
                                </td>
                              </tr>
                            </tbody>
                        )
                      })
                    }
                  </table>
          </div>
      </div>
    </Layout>
  )
}

export default Orders
