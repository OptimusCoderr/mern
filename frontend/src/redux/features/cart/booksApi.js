import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'



const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =localStorage.getItem('token');
        if (token) {
            Headers.set("Authorization", `Bearer ${token}`);
        }
        return Headers;
    } 
})

const booksApi =  createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) =>({
        fetchAllBooks: builder.query({
            query: () => "/get-all-books",
            providesTags: ["Books"]
        }),
        fetchBookById:builder.query({
            query: (id) => `/get-book/${id}`,
            providesTags: (results, error, id) => [{type: 'Books', id}],
        }),
        addBook: builder.mutation({
            query: (newbook) => ({
                url: "/create-book",
                method : "POST",
                body: newbook,
            }),
            invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-book/${id}`,
                method : "PUT",
                body: rest,
                headers:{
                    'Content-Type': 'application/json'
                },
            }),
            InvalidatesTags: ["Books"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete-book/${id}`,
                method : "DELETE",
                }),
        })
    }),
})





export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi
export default booksApi;  // export the api instance