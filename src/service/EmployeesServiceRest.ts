import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";

export default class EmployeesServiceRest implements EmployeesService{
    
    constructor(private _url: string){}

    async addEmployee(empl: Employee): Promise<Employee | null> {
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`},
            body: JSON.stringify({...empl, userId:"admin"})                 
           })
           let res = null;
           if (response.ok){
            res = await response.json();
           }
            return res;
        }
}