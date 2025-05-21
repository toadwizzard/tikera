import { FilmCard } from "./FilmCard";
import { dateValueFromDate } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDeleteMovieMutation } from "../store/slices/moviesApiSlice";
import { Loader } from "./Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export function FilmList({ movies, selectedDate, selectedMovie, setSelectedMovie, setEditMovieFormState }){
    const navigate = useNavigate();
    const [mutate, {isLoading}] = useDeleteMovieMutation();
    const token = useSelector(state => state.userData.token);

    async function handleDelete(movieId){
        try {
            await mutate({
                movieId,
                token
            }).unwrap();
            setSelectedMovie(undefined);
            toast.success("Successfully deleted movie");
        } catch {
            toast.error("Error while deleting movie");
        }

    }

    return isLoading ? <Loader /> : (
        <div className="flex gap-4 flex-wrap w-1/1 justify-center lg:w-1/2 lg:justify-start shrink-0">
            {movies ? movies
            .filter(movie => movie.screenings.some(screening => screening.date === dateValueFromDate(selectedDate)))
            .sort((a,b) => a.title>b.title ? 1 : (a.title < b.title ? -1 : 0))
            .map(movie => (
                <FilmCard key={movie.id}
                    isSelected={selectedMovie !== undefined && selectedMovie.id === movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    title={movie.title}
                    image={movie.image_path}
                    genre={movie.genre}
                    duration={movie.duration}
                    editButtonOnclick={() => {
                        setEditMovieFormState({
                            title: movie.title,
                            description: movie.description,
                            duration: movie.duration,
                            genre: movie.genre,
                            release_year: movie.release_year,
                            image_path: movie.image_path
                        });
                        navigate(`editMovie/${movie.id}`);
                    }}
                    deleteButtonOnclick={() => handleDelete(movie.id)}
                />
                )
            ) : "No movies found."}
        </div>
    );
}