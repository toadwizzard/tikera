import { useState } from "react";
import { FilmList } from "../components/FilmList";
import { Booker } from "../components/Booker";
import { Loader } from "../components/Loader";
import { DateNavigator } from "../components/DateNavigator";

export function TicketBooker({ movies, isGetMoviesLoading, setEditMovieFormState, setEditScreeningFormState, ticketPrices }){
    const currentDate = new Date();
    const defaultSelectedTickets = {
        adult: 0,
        student: 0,
        senior: 0
    };
    
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedMovieId, setSelectedMovieId] = useState();
    const [selectedScreeningId, setSelectedScreeningId] = useState();
    const [selectedTickets, setSelectedTickets] = useState(defaultSelectedTickets);
    const [selectedSeats, setSelectedSeats] = useState([]);

    function setScreening(screening){
        setSelectedTickets(defaultSelectedTickets);
        setSelectedSeats([]);
        setSelectedScreeningId(screening?.id);
    }

    function setMovie(movie){
        setScreening(undefined);
        setSelectedMovieId(movie?.id);
    }

    function setDate(date){
        setMovie(undefined);
        setSelectedDate(date);
    }

    function setTickets(tickets){
        if(!tickets){
            setSelectedTickets(defaultSelectedTickets);
            setSelectedSeats([]);
        } else {
            const ticketCount = Object.values(tickets).reduce((acc, cur) => acc += cur, 0);
            if(ticketCount < selectedSeats.length){
                setSelectedSeats(selectedSeats.slice(0, ticketCount));
            }
            setSelectedTickets(tickets);
        }
    }

    function getSelectedMovie(){
        if(selectedMovieId){
            return movies.find(movie => movie.id === selectedMovieId);
        } else return undefined;
    }

    function getSelectedScreening(){
        if(selectedScreeningId){
            return movies
            .map(movie => movie.screenings)
            .flat()
            .find(screening => screening.id === selectedScreeningId);
        } else return undefined;
    }

    return (
        <div>
            <DateNavigator selectedDate={selectedDate} setSelectedDate={setDate} />
            <div className="flex items-start justify-between flex-wrap gap-y-4 lg:flex-nowrap">
                {isGetMoviesLoading ? <Loader /> : (
                    <>
                        <FilmList movies={movies}
                            selectedDate={selectedDate}
                            selectedMovie={getSelectedMovie()}
                            setSelectedMovie={setMovie}
                            setEditMovieFormState={setEditMovieFormState}
                        />
                        <Booker selectedDate={selectedDate} selectedMovie={getSelectedMovie()}
                            selectedScreening={getSelectedScreening()} setSelectedScreening={setScreening}
                            selectedTickets={selectedTickets} setSelectedTickets={setTickets}
                            selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}
                            ticketPrices={ticketPrices}
                            setEditScreeningFormState={setEditScreeningFormState}
                        />
                    </>
                )}
            </div>
        </div>
    );
}