import { useDispatch } from "react-redux";
import InputResult from "../../model/InputResult";
import { authActions } from "../../redux/slices/authSlice";
import LoginData from "../../model/LoginData";
import { authService } from "../../config/service-config";
import UserData from "../../model/UserData";
import SignInForm from "../forms/SignInForm";
const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    async function submitFn(loginData: LoginData): Promise<InputResult> {
        const res: UserData = await authService.login(loginData);
        res && dispatch(authActions.set(res));
        return {status: res ? 'success' : 'error',
         message: res ? '' : 'Incorrect Credentials'}
    }
    return <SignInForm submitFn={submitFn}/>
}
 export default SignIn;