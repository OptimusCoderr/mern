import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import './CheckoutPage.css'; // Import the CSS file

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const currentUser  = true; // TODO: GET USER FROM AUTH
  const [isChecked, setIsChecked] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice,
    }
    console.log(newOrder)
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div>
          <div>
            <h2 className="title">Cash On Delivery</h2>
            <p className="total-price">Total Price: ${totalPrice}</p>
            <p className="items-count">Items: {cartItems.length}</p>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="personal-details">
                <p className="details-title">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="form-fields">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" name="name" id="name" className="input" />
                </div>

                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input type="text" name="email" id="email" className="input" 
                    disabled defaultValue={currentUser ?.email} placeholder="email@domain.com" />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="number" name="phone" id="phone" className="input" placeholder="+123 456 7890" />
                </div>

                <div className="field">
                  <label htmlFor="address">Address / Street</label>
                  <input type="text" name="address" id="address" className="input" />
                </div>

                <div className="field">
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" id="city" className="input" />
                </div>

                <div className="field">
                  <label htmlFor="country">Country / region</label>
                  <input name="country" id="country" placeholder="Country" className="input" />
                </div>

                <div className="field">
                  <label htmlFor="state">State / province</label>
                  <input name="state" id="state" placeholder="State" className="input" />
                </div>

                <div className="field">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input type="text" name="zipcode" id="zipcode" className="input" />
                </div>

                <div className="agreement">
                  <input type="checkbox" name="billing_same" id="billing_same" className="checkbox" onChange={() => setIsChecked(!isChecked)} />
                  <label htmlFor="billing_same" className="agreement-label">
                    I agree to the <Link className='terms-link'>Terms & Conditions</Link> and <Link className='policy-link'>Shopping Policy.</Link>
                  </label>
                </div>

                <div className="submit-button">
                  <button disabled={!isChecked} className="order-button">Place an Order</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;