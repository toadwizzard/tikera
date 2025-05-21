import { SelectableElement } from "./SelectableElement";

export function NavItem({ title, isSelected, onClick }){
    return (
        <SelectableElement selected={isSelected} onClick={onClick} className="grow-0">
            <button className="px-4 py-2">{title}</button>
        </SelectableElement>
    )
}