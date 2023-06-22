import { useState } from "react";
import InputResult from "../../model/InputResult";
import Input from "../common/Input";


type Params = {
    logInFn: (login: string) => void;
}
const SignIn: React.FC<Params> = ({logInFn})=> {
return <p className="component-logo">
            <Input submitFn={function (login: string): InputResult {
                let resObj:InputResult = {status: "success", message: login};
                logInFn(login);
                return resObj;
            }} type="text" placeHolder={"Enter login"} buttonTitle="Sign In" />
</p>
}
export default SignIn;