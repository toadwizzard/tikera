import { useNavigate } from "react-router-dom";
import { dateValueFromDate, dayFromDate } from "../utils/utils";
import { BookingSummary } from "./BookingSummary";
import { FilmDetails } from "./FilmDetails"
import { SeatSelector } from "./SeatSelector";
import { TicketSelector } from "./TicketSelector";
import { useSelector } from "react-redux";
import { useDeleteScreeningMutation } from "../store/slices/moviesApiSlice";
import { Loader } from "./Loader";
import toast from "react-hot-toast";

export function Booker({ selectedMovie, selectedDate,
    selectedScreening, setSelectedScreening, selectedTickets, setSelectedTickets, selectedSeats, setSelectedSeats,
    ticketPrices, setEditScreeningFormState }){

    const [mutate, {isLoading}] = useDeleteScreeningMutation();
    const userData = useSelector(state => state.userData)
    const navigate = useNavigate();

    async function handleDelete(){
        try {
            mutate({
                token: userData.token,
                screeningId: selectedScreening.id
            });
            setSelectedScreening(undefined);
            toast.success("Successfully deleted screening");
        } catch {
            toast.error("Error while deleting screening");
        }
    }
    
    return selectedMovie !== undefined && (isLoading ? <Loader /> : (
        <div className="border-1 border-gray-700 rounded-4xl p-6 lg:ml-10">
            <FilmDetails
                image={selectedMovie.image_path}
                title={selectedMovie.title}
                releaseYear={selectedMovie.release_year}
                genre={selectedMovie.genre}
                duration={selectedMovie.duration}
                description={selectedMovie.description}
                screenings={selectedMovie.screenings.filter(screening => screening.date === dateValueFromDate(selectedDate))}
                selectedScreening={selectedScreening}
                setSelectedScreening={setSelectedScreening}
            />
            {selectedScreening && (userData.user.role !== "visitor" ? (
                <>
                    <div className="mt-5">
                        {userData.user.role === "admin" && (<div className="ml-3 rounded-t-md border-1 border-gray-700 border-b-0 w-fit px-3 py-2">
                            <button className="rounded-md border border-lime-400 px-2 py-1 bg-lime-400/25 cursor-pointer mr-2"
                                onClick={() => {
                                    setEditScreeningFormState({
                                        movie_id: selectedMovie.id,
                                        room_id: selectedScreening.room.rows == 7 ? 2 : 1,
                                        start_time: selectedScreening.start_time,
                                        date: selectedScreening.date,
                                    });
                                    navigate(`editScreening/${selectedScreening.id}`)
                                }}
                            >Edit</button>
                            <button className="rounded-md border border-red-500 px-2 py-1 bg-red-500/25 cursor-pointer"
                                onClick={handleDelete}
                            >Delete</button>
                        </div>)}
                        <div className="flex flex-wrap justify-center items-center p-4 rounded-2xl border-1 border-gray-700 sm:justify-between">
                            <TicketSelector ticketPrices={ticketPrices}
                                selectedScreening={selectedScreening} selectedSeats={selectedSeats}
                                selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets}/>
                            <SeatSelector selectedScreening={selectedScreening} selectedTickets={selectedTickets}
                                selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
                        </div>
                    </div>
                    <BookingSummary selectedMovie={selectedMovie} day={dayFromDate(selectedDate)} ticketPrices={ticketPrices}
                        selectedScreening={selectedScreening} selectedTickets={selectedTickets} selectedSeats={selectedSeats}
                        setSelectedTickets={setSelectedTickets}/>
                </>
            ) : (
                <div className="mt-5 py-4 rounded-2xl border-1 border-gray-700 flex justify-center">You must be logged in to book tickets.</div>
            ))}
        </div>
    ))
}