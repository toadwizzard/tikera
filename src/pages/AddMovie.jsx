import { useState } from "react";
import { StyledButton } from "../components/StyledButton";
import { StyledForm } from "../components/StyledForm";
import { useAddMovieMutation } from "../store/slices/moviesApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";

export function AddMovie(){
    const [formState, setFormState] = useState({
        title: "",
        description: "",
        duration: 0,
        genre: "",
        release_year: 0,
        image_path: ""
    })
    const [mutate, {isLoading, isError, error}] = useAddMovieMutation();
    const navigate = useNavigate();
    const token = useSelector((state) => state.userData.token);

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await mutate({
                token: token,
                movieData: formState
            }).unwrap();
            toast.success("Successfully added movie");
            navigate("/");
        } catch {
            toast.error("Error while adding movie");
        }
    }
    return isLoading ? <Loader /> : (
        <StyledForm title="Add movie">
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
            {isError && (
                <ul className="text-red-400 mt-5 list-none">
                    <li>Error in movie data:</li>
                    {Object.values(error.data.errors)
                        .map(errorList => errorList.map((message, index) => (
                            <li key={index}>{message}</li>
                        )))
                    }
                </ul>
            )}
            <StyledButton title="Add movie" onClick={handleSubmit}/>
        </StyledForm>
    )
}