import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (build) => ({
        login: build.mutation({
            query: (loginData) => ({
                url: "login",
                method: "POST",
                body: loginData
            })
        }),
        register: build.mutation({
            query: (registerData) => ({
                url: "register",
                method: "POST",
                body: registerData
            })
        }),
        getMovies: build.query({
            query: () => "movies",
            providesTags: ["movies", "screenings", "bookings"]
        }),
        getMyBookings: build.query({
            query: (token) => ({
                url: "bookings",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["bookings"]
        }),
        addBooking: build.mutation({
            query: (postData) => ({
                url: "bookings",
                method: "POST",
                body: postData.bookingData,
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["bookings"]
        }),
        addMovie: build.mutation({
            query: (postData) => ({
                url: "movies",
                method: "POST",
                body: postData.movieData,
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["movies"]
        }),
        updateMovie: build.mutation({
            query: (postData) => ({
                url: `movies/${postData.id}`,
                method: "PUT",
                body: postData.movieData,
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["movies"]
        }),
        deleteMovie: build.mutation({
            query: (postData) => ({
                url: `movies/${postData.movieId}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["movies"]
        }),
        addScreening: build.mutation({
            query: (postData) => ({
                url: "screenings",
                method: "POST",
                body: postData.screeningData,
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["screenings"],
        }),
        updateScreening: build.mutation({
            query: (postData) => ({
                url: `screenings/${postData.id}`,
                method: "PUT",
                body: postData.screeningData,
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["screenings"]
        }),
        deleteScreening: build.mutation({
            query: (postData) => ({
                url: `screenings/${postData.screeningId}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${postData.token}`
                }
            }),
            invalidatesTags: ["screenings"]
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMoviesQuery,
    useGetMyBookingsQuery,
    useAddBookingMutation,
    useAddMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useAddScreeningMutation,
    useUpdateScreeningMutation,
    useDeleteScreeningMutation,
} = moviesApi;