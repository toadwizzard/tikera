export function Seat({ isBooked, isSelected, onClick}){
    return (
        <div className={"h-auto aspect-square grow "+(
            isBooked ? "bg-lime-500 opacity-30" : (
                    isSelected ? "bg-white" : "bg-lime-500 hover:bg-lime-300 cursor-pointer"
            ))}
            onClick={onClick}>
        </div>
    )
}