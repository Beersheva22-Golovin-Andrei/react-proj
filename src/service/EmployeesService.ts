import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeesService{
    addEmployee(empl: Employee):Promise<Employee | null>;
    getEmployees(): Observable<Employee[] | string>;
    deleteEmployee(id:any): Promise<void>;
    updateEmployee(empl: Employee): Promise<Employee|null> 
}