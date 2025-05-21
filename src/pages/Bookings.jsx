import { useSelector } from "react-redux";
import { BookingList } from "../components/BookingList";
import { Loader } from "../components/Loader";
import { useGetMyBookingsQuery } from "../store/slices/moviesApiSlice";

export function Bookings({ ticketPrices, movies }){
    const token = useSelector(state => state.userData.token);
    const {isLoading, data: bookings} = useGetMyBookingsQuery(token);

    const screenings = movies.map(movie => movie.screenings).flat();

    const orderedBookings = bookings ? bookings
        .map(booking => {
            const screening = screenings.find(screening => screening.id === booking.screening.id);
            const dateAndTime = new Date(screening.date + "T" + screening.start_time);
            
            const decodedTicketTypes = (typeof booking.ticket_types === "string" || booking.ticket_types instanceof String) ?
                JSON.parse(booking.ticket_types) : booking.ticket_types;
            const decodedSeats = (typeof booking.seats === "string" || booking.seats instanceof String) ?
                JSON.parse(booking.seats) : booking.seats;

            const adultTickets = decodedTicketTypes.find(ticketType => ticketType.type === "normal");
            const studentTickets = decodedTicketTypes.find(ticketType => ticketType.type === "student");
            const seniorTickets = decodedTicketTypes.find(ticketType => ticketType.type === "senior");
            return {
                id: booking.id,
                title: booking.screening.movie.title,
                dateAndTime,
                image: booking.screening.movie.image_path,
                ticketCounts: {
                    adult: adultTickets ? adultTickets.quantity : 0,
                    student: studentTickets ? studentTickets.quantity : 0,
                    senior: seniorTickets ? seniorTickets.quantity : 0
                },
                ticketPrices,
                seats: decodedSeats
            }
        })
        .toSorted((a,b) => a.dateAndTime>b.dateAndTime ? 1 : (a.dateAndTime<b.dateAndTime ? -1 : 0))
    : [];
    const firstFuture = orderedBookings.findIndex(booking => booking.dateAndTime > (new Date()));

    const pastBookings = firstFuture > -1 ? orderedBookings.slice(0,firstFuture) : orderedBookings;
    const futureBookings = firstFuture > -1 ? orderedBookings.slice(firstFuture) : [];

    return (
        <div>
            <h1 className="font-bold text-2xl mt-5">My bookings</h1>
            <h2 className="font-bold text-xl mt-5">Upcoming</h2>
            {isLoading ? <Loader /> : <BookingList bookings={futureBookings} ticketPrices={ticketPrices} />}
            <h2 className="font-bold text-xl mt-5">Past bookings</h2>
            {isLoading ? <Loader /> : <BookingList bookings={pastBookings} ticketPrices={ticketPrices} />}
        </div>
    )
}