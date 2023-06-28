import { useDispatch } from "react-redux";
import UserData from "../model/UserData";
import AuthService from "./AuthService";
import { authActions } from "../redux/slices/authSlice";

export default class AuthServiceJwt implements AuthService {

    constructor (private _url: string){
    }

    async login(data: { email: string; password: string; }): Promise<any> {
          const response = await fetch(this._url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const authResponse = await response.json();
    let result;
    if (response.status == 200) {
    const payloadJson =atob(authResponse.accessToken.split('.')[1]);
    const userData = JSON.parse(payloadJson);
    const email = userData.email;
    const role = userData.sub;
    result = {email, role};
    }
        return result;
    }

    async logOut(logOutFn: ()=>void): Promise<void> {
        logOutFn();
        return new Promise(()=>null);
    }
}