import { StyledForm } from "../components/StyledForm";
import { StyledButton } from "../components/StyledButton"
import { useLoginMutation } from "../store/slices/moviesApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userDataSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";

export function Login(){
    const [mutate, {isLoading}] = useLoginMutation();
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const {data} = await mutate(formState).unwrap();
            dispatch(login(data));
            toast.success("Successfully logged in");
            navigate("/");
        } catch (error){
            toast.error("Login error: "+error.data.message);
        }
    }
    return isLoading ? (<Loader />) : (
        <StyledForm title="Login">
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" value={formState.email}
                onChange={(e) => {
                    setFormState({...formState, email: e.target.value})
                }}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formState.password}
                onChange={(e) => {
                    setFormState({...formState, password: e.target.value})
                }}/>
            <StyledButton title="Login" onClick={handleSubmit}/>
        </StyledForm>
    )
}