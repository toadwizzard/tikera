import { StyledForm } from "../components/StyledForm";
import { StyledButton } from "../components/StyledButton"
import { useState } from "react";
import { useRegisterMutation } from "../store/slices/moviesApiSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";

export function Register(){
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [mutate, {isLoading, isError, error}] = useRegisterMutation();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await mutate(formState).unwrap();
            toast.success("Successfully registered");
            navigate("/login");
        } catch {
            toast.error("Error while registering");
        }
    }

    return isLoading ? (<Loader />) : (
        <StyledForm title="Register">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}/>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formState.password}
                onChange={(e) => setFormState({...formState, password: e.target.value})}/>
            <label htmlFor="password2">Password again</label>
            <input type="password" name="password2" id="password2" value={formState.password_confirmation}
                onChange={(e) => setFormState({...formState, password_confirmation: e.target.value})}/>
            {isError && (
                <ul className="text-red-400 mt-5 list-none">
                    <li>Register error:</li>
                    {Object.values(error.data.errors).map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
            <StyledButton title="Register" onClick={handleSubmit}/>
        </StyledForm>
    )
}