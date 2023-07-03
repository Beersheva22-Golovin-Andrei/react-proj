import { Box } from "@mui/material"
import { useState, useEffect} from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { codeAction } from "../../redux/slices/codeSlice";
import CodeType from "../../model/CodeType";

const columns: GridColDef[] = [{field: 'id', headerName:'ID', flex:0.5, headerClassName: 'data-grid-headeer', align: 'center', headerAlign:'center'}, {field: 'name', headerName:'Name', flex:0.7}, 
{field: 'birthDate', type: 'date', headerName:'Date of birth', flex:1}, {field: 'department', headerName:'Department', flex:0.8}, {field: 'salary', headerName:'Salary, NIS', type: 'number', flex:0.6},
{field:'gender', headerName:'Gender', flex:0.6}]

const Employees: React.FC = () => {
    const dispatch = useDispatch()
    const[employees, setEmployees] = useState<Employee[]>([]);
    useEffect(()=>{
       const subscription =  employeesService.getEmployees().subscribe({
        next(emplArr: Employee[]|string) {
            if (typeof emplArr == 'string'){
                if (emplArr.includes('Authentication')){
                authService.logout();
                dispatch(authActions.reset());
                dispatch(codeAction.set({code: CodeType.AUTH_ERROR, message: emplArr}))
                } else {
                    dispatch(codeAction.set({code: CodeType.SERVER_ERROR,  message: emplArr}))
                }
            } else {
                setEmployees(emplArr.map(e=>({...e, birthDate: new Date (e.birthDate)})));
            }
        }
       });
       return ()=>subscription.unsubscribe();
    }, [])
    return <Box sx={{display:'flex', justifyContent: 'center'}}>
        <Box sx={{height: '50vh', width:'80vw'}}>
        <DataGrid columns={columns} rows={employees}/>
        </Box>
    </Box>
}
export default Employees;