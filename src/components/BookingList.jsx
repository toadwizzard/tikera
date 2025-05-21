import { Booking } from "./Booking"

export function BookingList({ bookings, ticketPrices }){
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-5">
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : bookings.map(booking => (
                    <Booking key={booking.id}
                        title={booking.title}
                        dateAndTime={booking.dateAndTime}
                        image={booking.image}
                        ticketCounts={booking.ticketCounts}
                        ticketPrices={ticketPrices}
                        seats={booking.seats} />
                )
            )}
        </div>
    )
}