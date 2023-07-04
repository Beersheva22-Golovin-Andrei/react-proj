import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";


export default class EmployeesServiceRest implements EmployeesService{
    
    constructor(private _url: string){}
    
    async updateEmployee(empl:Employee): Promise<Employee | null> {
        let responseText = '';
        try {
            const response = await fetch(`${this._url}/${empl.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                },
                body: JSON.stringify({ ...empl, userId: 'admin' })
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            return await response.json();
        } catch (error: any) {
            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }

    }

    async deleteEmployee(id: any): Promise<void> {
        let responseText = '';
        try {
            const response = await fetch(`${this._url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
                }
            });
            if (!response.ok) {
                const { status, statusText } = response;
                responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
                throw responseText;
            }
            } catch (error: any) {
            throw responseText ? responseText : "Server is unavailable. Repeat later on";
        }

    }

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