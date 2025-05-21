import { SelectableElement } from "./SelectableElement";

export function FilmDetails({ image, title, releaseYear, genre, duration, description, screenings,
    selectedScreening, setSelectedScreening
}){
    return (
        <div className="flex flex-wrap gap-4 items-center justify-center sm:flex-nowrap sm:justify-start">
            <div className="w-3/5 sm:w-7/24 shrink-0 p-2 rounded-xl bg-gray-800">
                <img className="w-1/1 h-auto aspect-5/6 object-cover rounded-lg"
                    src={image}
                    alt={title} />
            </div>
            <div className="my-auto">
                <h2 className="text-4xl font-bold mb-2">{title}</h2>
                <h3 className="font-bold mb-3">{releaseYear} - {genre} - {duration} minutes</h3>
                <p>{description}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                    {screenings
                    .sort((a,b) => new Date("1970/01/01 "+a.start_time) - new Date("1970/01/01 "+b.start_time))
                    .map(screening => {
                        const hasAvailable = screening.room.rows * screening.room.seatsPerRow - screening.bookings.length > 0;
                        return (
                            <SelectableElement key={screening.id}
                                selected={selectedScreening !== undefined && selectedScreening.id === screening.id}
                                enabled={hasAvailable}
                                onClick={() => {
                                    setSelectedScreening(screening);
                                }}>
                                    <p className="px-2 py-1">{screening.start_time}</p>
                            </SelectableElement>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}