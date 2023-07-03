import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { subscribe } from "diagnostics_channel";
import { resolve } from "path";

export default class EmployeesServiceRest implements EmployeesService{
    
    constructor(private _url: string){}

    async addEmployee(empl: Employee): Promise<Employee | null> {
        let res = null;
        try{
        const response = await fetch(this._url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization : `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`},
            body: JSON.stringify({...empl, userId:"admin"})                 
           })
           if (response.ok){
            res = await response.json();
           }
        } catch (error){          
        }
            return res;
        }

        getEmployees(): Observable<Employee[] | string> {
            const res: Observable<Employee[] | string>  = new Observable((subscriber)=>{
             fetch (this._url, {
                headers: {Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`}
            }).then(resp=>{
                let res: Promise <Employee[] | string>;
                if (resp.ok){
                    res =  resp.json()
                } else {
                    res = Promise.resolve(resp.status == 401 || resp.status == 403 ? 'Authentication' : resp.statusText) 
                }
               return res;}).then(data=>subscriber.next(data)).catch(error=>subscriber.next('server is unavaleble'));
            
     
        })
        return res;
        }
}