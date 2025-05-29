import { useNavigate, useParams } from "react-router-dom";
import { useUpdateScreeningMutation } from "../store/slices/moviesApiSlice";
import { useSelector } from "react-redux";
import { StyledForm } from "../components/StyledForm";
import { Loader } from "../components/Loader";
import { StyledButton } from "../components/StyledButton";
import toast from "react-hot-toast";

export function EditScreening({ movies, formState, setFormState }){
    const [mutate, {isLoading}] = useUpdateScreeningMutation();
    const {id : screeningId} = useParams();
    const token = useSelector(state => state.userData.token);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await mutate({
                token: token,
                id: screeningId,
                screeningData: formState
            }).unwrap();
            toast.success("Successfully edited screening");
            navigate("/");
        } catch {
            toast.error("Could not edit screening (error in screening data)");
        }
    }

    return isLoading ? <Loader /> : (
        <StyledForm title="Edit screening">
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
            <StyledButton title="Edit screening" onClick={handleSubmit}/>
        </StyledForm>
    )
}