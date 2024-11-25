
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import './CheckoutPage.css'; // Import the CSS file

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser  } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
      const newOrder = {
          name: data.name,
          email: currentUser ?.email,
          address: {
              city: data.city,
              country: data.country,
              state: data.state,
              zipcode: data.zipcode
          },
          phone: data.phone,
          productIds: cartItems.map(item => item?._id),
          totalPrice: totalPrice,
      };
      
  
      // Show confirmation dialog
      Swal.fire({
          title: "Are you sure?",
          text: "You are about to place an order!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, place the order!"
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  await createOrder(newOrder).unwrap();
                  Swal.fire({
                      title: "Order Placed!",
                      text: "Your order has been placed successfully.",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "Okay"
                  });
                  navigate("/orders");
              } catch (error) {
                  console.error("Error placing an order", error);
                  Swal.fire({
                      title: "Error!",
                      text: "Failed to place an order.",
                      icon: "error",
                      confirmButtonColor: "#d33",
                      confirmButtonText: "Okay"
                  });
              }
          }
      });
  };
    if (isLoading) return <div>Loading....</div>;

    return (
        <section className="checkout-page">
            <div className="container">
                <h2 className="title">Cash On Delivery</h2>
                <p className="total-price">Total Price: ${totalPrice}</p>
                <p className="items-count">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="personal-details">
                            <p className="details-title">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="name">Full Name</label>
                            <input {...register("name", { required: true })} type="text" name="name" id="name" className="input" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="email">Email Address</label>
                            <input type="text" name="email" id="email" className="input" disabled defaultValue={currentUser ?.email} placeholder="email@domain.com" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="phone">Phone Number</label>
                            <input {...register("phone", { required: true })} type="number" name="phone" id="phone" className="input" placeholder="+123 456 7890" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="address">Address / Street</label>
                            <input {...register("address", { required: true })} type="text" name="address" id="address" className="input" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="city">City</label>
                            <input {...register("city", { required: true })} type="text" name="city" id="city" className="input" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="country">Country / region</label>
                            <input {...register("country", { required: true })} name="country" id="country" className="input" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="state">State / province</label>
                            <input {...register("state", { required: true })} name="state" id="state" className="input" />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="zipcode">Zipcode</label>
                            <input {...register("zipcode", { required: true })} type="text" name="zipcode" id="zipcode" className="input" />
                        </div>
                        <div className="agreement">
                            <input onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" name="billing_same" id="billing_same" className="checkbox" />
                            <label htmlFor="billing_same" className="agreement-label">I agree to the <Link className='terms-link'>Terms & Conditions</Link> and <Link className='policy-link'>Shopping Policy.</Link></label>
                        </div>
                        <div className="submit-button">
                            <button disabled={!isChecked} className="order-button">Place an Order</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Checkout;