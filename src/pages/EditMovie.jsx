import { useSelector } from "react-redux";
import { StyledButton } from "../components/StyledButton";
import { StyledForm } from "../components/StyledForm";
import { useUpdateMovieMutation } from "../store/slices/moviesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";

export function EditMovie({ formState, setFormState }){
    const [mutate, {isLoading}] = useUpdateMovieMutation();
    const {id : movieId} = useParams();
    const token = useSelector(state => state.userData.token);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await mutate({
                token: token,
                id: movieId,
                movieData: formState
            }).unwrap();
            toast.success("Successfully edited movie");
            navigate("/");
        } catch {
            toast.error("Could not edit movie (error in movie data)");
        }
    }

    return isLoading ? <Loader /> : (
        <StyledForm title="Edit movie">
            <label htmlFor="title">Movie title</label>
            <input type="text" name="title" id="title" value={formState.title}
                onChange={(e) => {
                    setFormState({...formState, title: e.target.value});
                }}/>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" value={formState.description}
                onChange={(e) => {
                    setFormState({...formState, description: e.target.value});
                }}></textarea>
            <label htmlFor="length">Length (in minutes)</label>
            <input type="number" name="length" id="length" value={formState.duration}
                onChange={(e) => {
                    setFormState({...formState, duration: e.target.value});
                }}/>
            <label htmlFor="genre">Genre</label>
            <input type="text" name="genre" id="genre" value={formState.genre}
                onChange={(e) => {
                    setFormState({...formState, genre: e.target.value});
                }}/>
            <label htmlFor="year">Release year</label>
            <input type="number" name="year" id="year" value={formState.release_year}
                onChange={(e) => {
                    setFormState({...formState, release_year: e.target.value});
                }}/>
            <label htmlFor="cover">Cover image URL</label>
            <input type="url" name="cover" id="cover" value={formState.image_path}
                onChange={(e) => {
                    setFormState({...formState, image_path: e.target.value});
                }}/>
            <StyledButton title="Edit movie" onClick={handleSubmit}/>
        </StyledForm>
    )
}