import UserData from "../model/UserData";

export default interface AuthService {
    login(data: {email: string, password: string}): Promise<UserData|null>;
    logOut(logOutFn: ()=>void) : Promise<void>;
}