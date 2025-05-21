import { TicketCounterButton } from "./TicketCounterButton";

export function TicketSelector({ ticketPrices: {adult: adultPrice, student: studentPrice, senior: seniorPrice},
    selectedScreening, selectedSeats, selectedTickets, setSelectedTickets
}){
    const freeSpaces = selectedScreening !== undefined ?
        selectedScreening.room.rows * selectedScreening.room.seatsPerRow - selectedScreening.bookings.length
        : 0;
    const ticketCount = Object.values(selectedTickets).reduce((acc, cur) => acc += cur, 0);
    const total = selectedTickets.adult*adultPrice + selectedTickets.student*studentPrice + selectedTickets.senior*seniorPrice

    return selectedScreening !== undefined && (
        <div className="w-1/1 sm:w-3/10 my-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">Adult</p>
                    <p className="text-sm">{adultPrice} Ft</p>
                </div>
                <div className="flex gap-2 items-center">
                    <TicketCounterButton text={"-"} onClick={() => {
                        if(selectedTickets.adult > 0){
                            const curCount = selectedTickets.adult;
                            setSelectedTickets({...selectedTickets, adult: curCount-1})
                        }
                    }} /> {selectedTickets.adult} <TicketCounterButton text={"+"} onClick={() => {
                        if(ticketCount < freeSpaces){
                            const curCount = selectedTickets.adult;
                            setSelectedTickets({...selectedTickets, adult: curCount+1})
                        }
                    }} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">Student</p>
                    <p className="text-sm">{studentPrice} Ft</p>
                </div>
                <div className="flex gap-2 items-center">
                    <TicketCounterButton text={"-"} onClick={() => {
                        if(selectedTickets.student > 0){
                            const curCount = selectedTickets.student;
                            setSelectedTickets({...selectedTickets, student: curCount-1})
                        }
                    }} /> {selectedTickets.student} <TicketCounterButton text={"+"} onClick={() => {
                        if(ticketCount < freeSpaces){
                            const curCount = selectedTickets.student;
                            setSelectedTickets({...selectedTickets, student: curCount+1})
                        }
                    }} />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">Senior</p>
                    <p className="text-sm">{seniorPrice} Ft</p>
                </div>
                <div className="flex gap-2 items-center">
                    <TicketCounterButton text={"-"} onClick={() => {
                        if(selectedTickets.senior > 0){
                            const curCount = selectedTickets.senior;
                            setSelectedTickets({...selectedTickets, senior: curCount-1})
                        }
                    }} /> {selectedTickets.senior} <TicketCounterButton text={"+"} onClick={() => {
                        if(ticketCount < freeSpaces){
                            const curCount = selectedTickets.senior;
                            setSelectedTickets({...selectedTickets, senior: curCount+1})
                        }
                    }} />
                </div>
            </div>
            <div className="mt-2">
                <div className="flex justify-between">
                    <p className="font-bold">Total:</p>
                    <p>{total} Ft</p>
                </div>
                <p className="text-center">{selectedSeats.length}/{ticketCount} selected</p>
            </div>
        </div>
    )
}