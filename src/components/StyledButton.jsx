export function StyledButton({title, onClick}){
    return (
        <button
            className="p-4 cursor-pointer bg-lime-500 hover:bg-lime-300 text-black font-bold rounded-full"
            onClick={onClick}>{title}
        </button>
    )
}