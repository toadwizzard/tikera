import { StyledButton } from "./StyledButton";
import { useSelector } from "react-redux";
import { useAddBookingMutation } from "../store/slices/moviesApiSlice";
import { Loader } from "./Loader";
import toast from "react-hot-toast";

export function BookingSummary({ selectedMovie, day,
    ticketPrices: {adult: adultPrice, student: studentPrice, senior: seniorPrice},
    selectedScreening, selectedTickets, selectedSeats, setSelectedTickets
}){
    const ticketCount = Object.values(selectedTickets).reduce((acc, cur) => acc += cur, 0);
    const total = selectedTickets.adult*adultPrice + selectedTickets.student*studentPrice + selectedTickets.senior*seniorPrice;

    const token = useSelector((state) => state.userData.token);
    const [mutate, {isLoading}] = useAddBookingMutation();

    async function handleSubmit(){
        const ticket_types = [];
        if(selectedTickets.adult > 0){
            ticket_types.push({
                type: "normal",
                quantity: selectedTickets.adult
            });
        }
        if(selectedTickets.student > 0){
            ticket_types.push({
                type: "student",
                quantity: selectedTickets.student
            });
        }
        if(selectedTickets.senior > 0){
            ticket_types.push({
                type: "senior",
                quantity: selectedTickets.senior
            });
        }
        const bookingData = {
            screening_id: selectedScreening.id,
            seats: selectedSeats.map(seat => ({
                row: seat.row,
                number: seat.seat
            })),
            ticket_types: ticket_types
        }
        try {
            await mutate({
                bookingData,
                token
            }).unwrap();
            toast.success("Booking successful");
            setSelectedTickets(undefined);
        } catch (error){
            toast.error(`Booking unsuccessful: ${error.data.message}`);
        }
    }

    return (selectedScreening !== undefined && selectedSeats.length === ticketCount && ticketCount > 0) && (
        isLoading ? <Loader /> : (
        <div className="flex flex-wrap gap-y-4 justify-center sm:justify-between items-center mt-5 p-4 rounded-2xl border-1 border-gray-700">
            <div className="w-1/1 sm:w-3/5">
                <p className="text-xl font-bold">{selectedMovie.title}</p>
                <p className="text-lg font-light mb-2">{day} - {selectedScreening.start_time}</p>
                <div className={"font-light flex justify-between " + (selectedTickets.adult === 0 ? "hidden" : "")}>
                    <p>{selectedTickets.adult}x Adult</p>
                    <p>{selectedTickets.adult * adultPrice}Ft</p>
                </div>
                <div className={"font-light flex justify-between " + (selectedTickets.student === 0 ? "hidden" : "")}>
                    <p>{selectedTickets.student}x Student</p>
                    <p>{selectedTickets.student * studentPrice}Ft</p>
                </div>
                <div className={"font-light flex justify-between " + (selectedTickets.senior === 0 ? "hidden" : "")}>
                    <p>{selectedTickets.senior}x Senior</p>
                    <p>{selectedTickets.senior * seniorPrice}Ft</p>
                </div>
                <div className="font-bold flex justify-between">
                    <p>Total:</p>
                    <p>{total}Ft</p>
                </div>
                <hr className="my-2 text-gray-700"/>
                <p>Seats</p>
                <p className="font-light">
                    <span>{selectedSeats[0].row}. row <b className="font-bold">{selectedSeats[0].seat}. seat</b></span>
                    {selectedSeats.slice(1).map((seat, index) => (
                        <span key={index}>
                            , {seat.row}. row <b className="font-bold">{seat.seat}. seat</b>
                        </span>
                    ))}
                </p>
            </div>
            <StyledButton title={"Confirm booking"} onClick={handleSubmit} />
        </div>
    ))
}