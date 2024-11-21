import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { getImgUrl } from '../../utils/getImgurl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    
    //SUBTOTAL price in cart
    const totalPrice = cartItems.reduce((acc,item) => acc + item.newPrice, 0).toFixed(2);

    //REMOVE FROM CART HANDLER
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }
    // CLEAR CART
    const handleClearCart = () => {
        dispatch(clearCart())
    }
        
  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-title">Shopping cart</div>
        <div className="clear-cart-button">
          <button
          onClick={(handleClearCart)}
            type="button"
            //onClick={handleClearCart}
            className="clear-cart">
            <span>Clear Cart</span>
          </button>
        </div>
      </div>



      <div className="cart-items">
        {
            cartItems.length > 0 ? (<ul role="list" className="cart-list">

                {/**Defining the list for the cart */}
                {
                    cartItems.map((product) => (
                <li ikey={product._id} className="cart-item">
                  <div className="item-image">
                    <img
                      alt=""
                      src={`${getImgUrl(product?.coverImage)}`}
                      className="image"
                    />
                  </div>
      
                  <div className="item-details">
                    <div className="item-info">
                      <h3>
                        <Link to='/'>{product?.title}</Link>
                      </h3>
                      <p className="item-price">${product?.newPrice}</p>
                    </div>
                    <p className="item-category"><strong>Category: </strong> {product?.category}</p>
                    <div className="item-quantity">
                      <p><strong>Qty:</strong>1</p>
                      <button 
                      onClick = {() => handleRemoveFromCart(product)}
                      type="button" className="remove-button">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
                    ))
                }
               
              </ul>
              ) : (<p> No Products Found</p>)
        }


        
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <p>Subtotal</p>
          <p>${totalPrice ? totalPrice : 0}</p>
        </div>
        <p className="shipping-info">Shipping and taxes calculated at checkout.</p>
        <div className="checkout-button">
          <Link
            to="/checkout"
            className="checkout-link"
          >
            Checkout
          </Link>
        </div>
        <div className="continue-shopping">
          <Link to="/">
            or
            <button type="button" className="continue-button">
             Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;