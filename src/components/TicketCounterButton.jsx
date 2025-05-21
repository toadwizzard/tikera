import { SelectableElement } from "./SelectableElement";

export function TicketCounterButton({ text, onClick }){
    return (
        <SelectableElement selected={false} onClick={onClick}>
            <p className="w-7 h-7 text-center font-bold select-none">{text}</p>
        </SelectableElement>
    )
}