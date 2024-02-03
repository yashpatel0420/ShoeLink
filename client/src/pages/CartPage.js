import React, {useState, useEffect} from 'react';
import Layout from './../components/layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const CartPage = () => {

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Total Price
  const totalPrice = () => {
    try {
      let hst = 0.13;
      let total1 = 0;
      let total2 = 0;
      let finalTotal = 0
      cart?.forEach(item => { 
        total1 += parseFloat(item.price) || 0;
        total2 = total1 * hst;
        finalTotal = total1 + total2
      });
      return finalTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Item
  const removeCartItem = (pid) => {
    try{
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1)
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle Payments
  const handlePayment = async() => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-text-box">
        <h3>{`Hello ${auth?.token && auth?.user?.name}`}</h3>
      </div>
      <div className='cartContent'>
        <div class="cart" id="home">
          <h1 class="cart_heading">{cart?.length >  0 ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : "Please login to checkout"}` : "Your Cart is empty!"}</h1>
        </div>
      </div> 
      <div className="cart_product_container">
        <div style={{'width':'50%'}}>
          {
            cart?.map(p => (
                <div className="cart_product_card" >
                  <div className="cart_product_img">
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                  </div>
                  <div className="cart_product_details"> 
                    <h3>{p.name}</h3>
                    <p>{p.description.substring(0,130)}...</p>
                    <h5>${p.price}</h5>
                    <button className='cartRemove' onClick={() => removeCartItem(p._id)}>remove</button>
                  </div>
                </div>
            ))
          }
        </div>
          <div className='cart_payment'>
            <h5>Cart Summry</h5>
            <h4>Total : {totalPrice()}</h4>
            <p style={{"fontSize":"10px"}}>*please note that above price is including HST.</p>
            {auth?.user?.address ? (
              <>
                <div className='deliveryAddress'>
                  <h3>Current Address</h3>
                  <h6>{auth?.user?.address}</h6>
                  <button 
                    onClick={() => navigate('/dashboard/user/profile')}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='deliveryAddress'>
                  {
                    auth?.token ? (
                      <button onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                    ) : (
                      <>
                        <button onClick={() => navigate('/login', {state:"/cart"})}>Please Login yourself</button>
                      </>
                    )
                  }
                </div>
              </>
            )}
            <div style={{"marginTop":"20px"}}>
            {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className='makePayment'
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
            </div>
          </div>
      </div>  
    </Layout>
  )
}

export default CartPage
