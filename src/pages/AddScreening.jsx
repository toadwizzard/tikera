import { useState } from "react";
import { StyledButton } from "../components/StyledButton";
import { StyledForm } from "../components/StyledForm";
import { useAddScreeningMutation } from "../store/slices/moviesApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";

export function AddScreening({ movies }){
    const [formState, setFormState] = useState({
        movie_id: "",
        room_id: "",
        start_time: "",
        date: "",
    });
    const [mutate, {isLoading, isError, error}] = useAddScreeningMutation();
    const token = useSelector(state => state.userData.token);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await mutate({
                token: token,
                screeningData: formState
            }).unwrap();
            toast.success("Successfully added screening");
            navigate("/");
        } catch {
            toast.error("Error while adding screening");
        }
    }

    return isLoading ? <Loader /> : (
        <StyledForm title="Add screening">
            <label htmlFor="movie">Movie</label>
            <select name="movie" id="movie" value={formState.movie_id}
                onChange={(e) => setFormState({...formState, movie_id: e.target.value})}>
                <option value="">Select a movie</option>
                {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
            </select>
            <label htmlFor="room">Room</label>
            <select name="room" id="room" value={formState.room_id}
                onChange={(e) => setFormState({...formState, room_id: e.target.value})}>
                <option value="">Select a room</option>
                <option value="1">Room 1 (10x10)</option>
                <option value="2">Room 2 (7x8)</option>
            </select>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={formState.date}
                onChange={(e) => setFormState({...formState, date: e.target.value})}/>
            <label htmlFor="time">Start time</label>
            <input type="time" name="time" id="time" value={formState.start_time}
                onChange={(e) => setFormState({...formState, start_time: e.target.value})}/>
            {isError && (
                <ul className="text-red-400 mt-5 list-none">
                    <li>Error in screening data:</li>
                    {Object.values(error.data.errors)
                        .map(errorList => errorList.map((message, index) => (
                            <li key={index}>{message}</li>
                        )))
                    }
                </ul>
            )}
            <StyledButton title="Add screening" onClick={handleSubmit}/>
        </StyledForm>
    )
}