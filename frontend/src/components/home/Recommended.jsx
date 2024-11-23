import React, { useEffect, useState } from 'react'
import BookCard from '../../pages/books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import './TopSellers.css'; // Import the CSS file
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';


const Recommended = () => {

    const {data:books = []} = useFetchAllBooksQuery();
  return (
    <div className='py-16'>
        <h2 className='title text-3xl font-semibold mb-6'>Recommended For You</h2>
        <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {books.length > 0 && books.slice(8,18).map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
        </Swiper>
    </div>
  )
}

export default Recommended