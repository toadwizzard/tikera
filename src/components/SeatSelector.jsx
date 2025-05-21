import { Seat } from "./Seat";

export function SeatSelector({ selectedScreening, selectedTickets, selectedSeats, setSelectedSeats }){
    const ticketCount = Object.values(selectedTickets).reduce((acc, cur) => acc += cur, 0);

    function render(){
        const rows = [];
        for(let row = 1; row <= selectedScreening.room.rows; row++){
            const seats = [];
            for(let col = 1; col <= selectedScreening.room.seatsPerRow; col++){
                const isBooked = selectedScreening.bookings.some(booking => booking.row === row && booking.seat === col);
                const isSelected = selectedSeats.some(booking => booking.row === row && booking.seat === col);
                seats.push(<Seat key={col} isSelected={isSelected} isBooked={isBooked}
                    onClick={() => {
                        if(isSelected){
                            setSelectedSeats(selectedSeats.filter(seat => seat.row !== row || seat.seat !== col))
                        } else if(selectedSeats.length < ticketCount && !isBooked) {
                            setSelectedSeats([...selectedSeats, {row: row, seat: col}])
                        }
                    }} />);
            }
            rows.push(
                <div className={"flex gap-2 items-center w-1/1"} key={row}>
                    {seats}
                </div>
            );
        }
        return rows;
    }

    return selectedScreening !== undefined && (
        <div className="w-1/1 sm:w-3/5 flex flex-col gap-2">
            {render()}
        </div>
    )
}