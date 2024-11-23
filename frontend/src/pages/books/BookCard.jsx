import React from 'react';
import { BsCart4 } from "react-icons/bs";
import { getImgUrl } from '../../utils/getImgurl';
import { Link } from 'react-router-dom';
import './BookCard.css'; // Import the CSS file
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }


  return (
    <div className="book-card">
      <div className="book-card-container">
        <div className="book-card-img">
          <Link to={`/book/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book?._id}`}>
            <h3 className="book-card-title hover:text-blue-600">
              {book?.title}
            </h3>
          </Link>
          <p className="book-card-description">
            {book?.description.length > 80 ? `${book?.description.slice(0, 80)}...` : book?.description}
          </p>

          {/** BOOK PRICE */}
          <p className="book-card-price">
            ${book?.newPrice} <span className="old-price">${book?.oldPrice}</span>
          </p>
          <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary">
            <BsCart4 />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;