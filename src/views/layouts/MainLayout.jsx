import { Outlet } from "react-router-dom";
import { Menu } from "../menu/Menu";

export function MainLayout(){
    return (
        <div className="p-5 text-white">
            <Menu />
            <Outlet />
        </div>
    )
}