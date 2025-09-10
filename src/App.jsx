import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './views/layouts/MainLayout'
import { TicketBooker } from './pages/TicketBooker'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { AddScreening } from './pages/AddScreening'
import { AddMovie } from './pages/AddMovie'
import { useState } from 'react'
import { EditMovie } from './pages/EditMovie'
import { useGetMoviesQuery } from './store/slices/moviesApiSlice'
import { EditScreening } from './pages/EditScreening'
import { Bookings } from './pages/Bookings'
import { Toaster } from 'react-hot-toast'

function App() {
  const [editMovieFormState, setEditMovieFormState] = useState({
    title: "",
    description: "",
    duration: 0,
    genre: "",
    release_year: 0,
    image_path: ""
  })
  const [editScreeningFormState, setEditScreeningFormState] = useState({
    movie_id: "",
    room_id: "",
    start_time: "",
    date: "",
  })
  const {isLoading: isGetMoviesLoading, data: movies} = useGetMoviesQuery();

  const ticketPrices = {
    adult: 2500,
    student: 2000,
    senior: 1800
  }

  return (
    <>
      <Toaster position='bottom-center' toastOptions={{
        style: {
          background: '#1e2939',
          color: '#fff'
        }
      }}/>
      <BrowserRouter>
        <Routes>
          <Route path="/tikera/" element={<MainLayout/>}>
            <Route index element={
              <TicketBooker movies={movies?.data}
                isGetMoviesLoading={isGetMoviesLoading}
                setEditMovieFormState={setEditMovieFormState}
                setEditScreeningFormState={setEditScreeningFormState}
                ticketPrices={ticketPrices} />} />
            <Route path="bookings" element={<Bookings ticketPrices={ticketPrices} movies={movies?.data} />} />
            <Route path="addMovie" element={<AddMovie />} />
            <Route path="addScreening" element={<AddScreening movies={movies?.data} />} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="editMovie/:id" element={<EditMovie formState={editMovieFormState} setFormState={setEditMovieFormState} />} />
            <Route path="editScreening/:id" element={<EditScreening movies={movies?.data} formState={editScreeningFormState} setFormState={setEditScreeningFormState} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
