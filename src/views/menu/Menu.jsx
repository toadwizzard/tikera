import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/slices/userDataSlice";
import toast from "react-hot-toast";

export function Menu(){
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const loggedIn = userData.user.role !== "visitor";

    return (
        <nav className="flex gap-4 items-center">
            <NavLink to="" className="font-bold text-lime-500 text-2xl">TIKERA</NavLink>
            {loggedIn && <NavLink to="bookings" className={({isActive}) => (isActive ? "font-bold" : "")}>My bookings</NavLink>}
            {loggedIn && userData.user.role === "admin" &&
                (<>
                <NavLink to="addMovie" className={({isActive}) => (isActive ? "font-bold" : "")}>Add movie</NavLink>
                <NavLink to="addScreening" className={({isActive}) => (isActive ? "font-bold" : "")}>Add screening</NavLink>
                </>)
            }
            <div className="ml-auto flex gap-4">
                {loggedIn ? (
                    <>
                        <div>{userData.user.name}</div>
                        <NavLink to="" onClick={() => {
                            dispatch(logout());
                            toast.success("Successfully logged out");
                        }}>Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="login" className={({isActive}) => (isActive ? " font-bold" : "")}>Login</NavLink>
                        <NavLink to="register" className={({isActive}) => (isActive ? "font-bold" : "")}>Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}