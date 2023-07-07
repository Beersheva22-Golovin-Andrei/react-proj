import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";

const POLLER_INTERVAL = 2000;

class Cashe {
    cacheString: string = '';
    set(employees: Employee[]): void {
        this.cacheString = JSON.stringify(employees);
    }
    reset() {
        this.cacheString = ''
    }
    isEqual(employees: Employee[]): boolean {
        return this.cacheString === JSON.stringify(employees)
    }
    getCache(): Employee[] {
        return !this.isEmpty() ? JSON.parse(this.cacheString) : []
    }
    isEmpty(): boolean {
        return this.cacheString.length === 0;
    }
}


export default class EmployeesServiceRest implements EmployeesService{
    
    observable: Observable<Employee[]|string> | null  = null;
    private cashe: Cashe = new Cashe();
   
    
    constructor(private _url: string){}
    
    getEmployees(): Observable<Employee[] | string> {
        if (this.observable == null) {
        this.observable = new Observable((subscriber)=>{
            if (this.cashe.isEmpty()){
             this.getEmployeesByVarWays(subscriber);
            } else {
                subscriber.next(this.cashe.getCache());
            }
            const interval = setInterval(()=>this.getEmployeesByVarWays(subscriber), POLLER_INTERVAL);
            return () => clearInterval(interval);
    })
} 
return this.observable;
  
    }

    private async getEmployeesByVarWays (subscriber:Subscriber<Employee[] | string>):Promise<void> {
        try {
        const resp = await this.getEmployeesFromDb();
            if (resp.ok){
                const res: Employee[] = await resp.json()
                if (!this.cashe.isEqual(res)){
                    subscriber.next(res);
                    this.cashe.set(res);
                }
            } else {
                const res :string = await Promise.resolve(resp.status == 401 || resp.status == 403 ? 'Authentication' : resp.statusText);
                subscriber.next(res); 
            }

    } catch (error){
        subscriber.next('server is unavaleble')
    }
    }

     private async getEmployeesFromDb ():Promise<Response> {
        return fetch (this._url, {
            headers: {Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT)}`}
        });
    }



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

        
    }