import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";


const SignOut: React.FC = ()=>{
    const dispatch = useDispatch();
    dispatch(authActions.reset());
return <p className="component-logo">SignOut component</p>
}
export default SignOut;