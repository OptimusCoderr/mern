// src/components/books/SingleBook.jsx
import React from 'react';
import { BsCart4 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { getImgUrl } from '../../utils/getImgurl';
import { useFetchBookByIdQuery } from '../../redux/features/cart/booksApi';
import './SingleBook.css'; // Import the CSS file

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error happened to load book info</div>;

    return (
        <div className="single-book">
            <h1>{book.title}</h1>
            <div>
                <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                    />
                </div>

                <div className='mb-5'>
                    <p><strong>Author:</strong> {book.author || 'admin'}</p>
                    <p>
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p><strong>Description:</strong> {book.description}</p>
                </div>

                <button onClick={() => handleAddToCart(book)} className="btn-primary">
                    <BsCart4 />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default SingleBook;