import { useEffect, useState } from "react";
import InputResult from "../../model/InputResult";
import Input from "../common/Input";
import AuthServiceJwt from "../../service/AuthServiceJwt";
import getSignInForm from "../forms/SignInForm";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
const URL_LOGIN = "http://localhost:3500/login";
const authService = new AuthServiceJwt(URL_LOGIN);


const SignIn: React.FC = ()=> {
    const dispatch = useDispatch();
return getSignInForm(async (data)=>{
    const newUserData = await authService.login(data);
    if (newUserData!=null){
        dispatch(authActions.set(newUserData));
    } else {
        alert("Login or password is incorrect")
    }
})
}

export default SignIn;