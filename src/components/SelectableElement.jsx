export function SelectableElement({ selected, enabled = true, onClick, className = "", children }){
    return (
        <div className={"border-1 rounded-xl " + className + (
            enabled ? (
                selected ? " text-lime-100 border-lime-500 bg-lime-950" :
                " border-gray-400 bg-gray-800 cursor-pointer *:cursor-pointer hover:bg-gray-500"
            ) : " text-gray-400 border-gray-600 bg-gray-900"
        )}
        onClick={() => {
            if(enabled && !selected) onClick();
        }}>
            {children}
        </div>
    )
}