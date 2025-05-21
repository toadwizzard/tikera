import { dateTextFromDate, dayFromDate, timeTextFromDate } from "../utils/utils";

export function Booking({ title, dateAndTime, image,
    ticketCounts: {adult: adultCount, student: studentCount, senior: seniorCount},
    ticketPrices: {adult: adultPrice, student: studentPrice, senior: seniorPrice}, seats })
{
    const total = adultCount*adultPrice + studentCount*studentPrice + seniorCount*seniorPrice;
    
    return (
        <div className="border-1 rounded-2xl border-gray-700 w-1/1 lg:w-2/5 shrink-0 p-4 flex flex-wrap sm:flex-nowrap gap-4 self-center">
            <div className="w-1/1 sm:w-auto grow-1">
                <p className="text-xl font-bold">{title}</p>
                <p className="text-lg font-light mb-2">
                    {dateTextFromDate(dateAndTime)} {dayFromDate(dateAndTime)} - {timeTextFromDate(dateAndTime)}
                </p>
                <div className={"font-light flex justify-between " + (adultCount === 0 ? "hidden" : "")}>
                    <p>{adultCount}x Adult</p>
                    <p>{adultCount * adultPrice}Ft</p>
                </div>
                <div className={"font-light flex justify-between " + (studentCount === 0 ? "hidden" : "")}>
                    <p>{studentCount}x Student</p>
                    <p>{studentCount * studentPrice}Ft</p>
                </div>
                <div className={"font-light flex justify-between " + (seniorCount === 0 ? "hidden" : "")}>
                    <p>{seniorCount}x Senior</p>
                    <p>{seniorCount * seniorPrice}Ft</p>
                </div>
                <div className="font-bold flex justify-between">
                    <p>Total:</p>
                    <p>{total}Ft</p>
                </div>
                <hr className="my-2 text-gray-700"/>
                <p>Seats</p>
                <p className="font-light">
                    <span>{seats[0].row}. row <b className="font-bold">{seats[0].seat ?? seats[0].number}. seat</b></span>
                    {seats.slice(1).map((seat, index) => (
                        <span key={index}>
                            , {seat.row}. row <b className="font-bold">{seat.seat ?? seat.number}. seat</b>
                        </span>
                    ))}
                </p>
            </div>
            <div className="w-3/5 sm:w-8/24 shrink-0 p-2 rounded-xl bg-gray-800 self-center mx-auto">
                <img className="w-1/1 h-auto aspect-5/6 object-cover rounded-lg"
                    src={image}
                    alt={title} />
            </div>
        </div>
    )
}