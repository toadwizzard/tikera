import { useSelector } from "react-redux";
import { SelectableElement } from "./SelectableElement";

export function FilmCard({ isSelected, onClick, title, image, genre, duration, editButtonOnclick, deleteButtonOnclick }){
    const userRole = useSelector((state) => state.userData.user.role)

    return (
        <div className="w-9/20 md:w-3/10 flex flex-col">
            <SelectableElement selected={isSelected} onClick={onClick} className="grow-1">
                <div className="p-3">
                    <img className="w-1/1 h-auto aspect-5/6 object-cover rounded-lg"
                        src={image}
                        alt={title} />
                    <p className="inline-block font-bold">{title}</p>
                    <p className="font-light text-sm">{genre} - {duration} minutes</p>
                </div>
            </SelectableElement>
            {userRole === "admin" && (
                <div className="flex flex-wrap justify-center gap-2 w-fit mx-auto rounded-b-md border border-gray-400 border-t-0 p-2 pt-4">
                    <button
                        className="rounded-md border border-lime-400 px-2 py-1 bg-lime-400/25 cursor-pointer"
                        onClick={editButtonOnclick}
                    >Edit</button>
                    <button
                        className="rounded-md border border-red-500 px-2 py-1 bg-red-500/25 cursor-pointer"
                        onClick={deleteButtonOnclick}
                    >Delete</button>
                </div>
            )}
        </div>
    )
}