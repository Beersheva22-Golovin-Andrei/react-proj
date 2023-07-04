import { Box } from "@mui/material"
import { useState, useEffect, Dispatch } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteForeverIcon, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { codeAction } from "../../redux/slices/codeSlice";
import CodeType from "../../model/CodeType";
import UserData from "../../model/UserData";
import { useSelectorAuth } from "../../redux/store";
import { AnyAction } from "redux";


function buildColumns(userData: UserData, dispatch: Dispatch<AnyAction>): GridColDef[] {
    const columns: GridColDef[] = [{ field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-headeer', align: 'center', headerAlign: 'center' }, { field: 'name', headerName: 'Name', flex: 0.7 },
    { field: 'birthDate', type: 'date', headerName: 'Date of birth', flex: 1 }, { field: 'department', headerName: 'Department', flex: 0.8 }, { field: 'salary', headerName: 'Salary, NIS', type: 'number', flex: 0.6 },
    { field: 'gender', headerName: 'Gender', flex: 0.6 }];
    if (userData && userData.role === 'admin') {
        columns.push({
            field: 'actions', type: 'actions',
            getActions: (params: GridRowParams) => {
                return [<GridActionsCellItem icon={<GridDeleteForeverIcon />} onClick={() => deleteFn(params.id, dispatch)} label="Delete" />]
            }
        })
    }
    return columns;
}

async function deleteFn(id: any, dispatch: Dispatch<AnyAction>) {
    try {
        const res = await employeesService.deleteEmployee(id);
    } catch (error: any) {
        if (typeof error == 'string') {
            if (error.includes('Authentication')) {
                authService.logout();
                dispatch(authActions.reset());
                dispatch(codeAction.set({ code: CodeType.AUTH_ERROR, message: error }))
            } else if (error.includes('Server is unavailable')) {
                dispatch(codeAction.set({ code: CodeType.SERVER_ERROR, message: error as string }))
            } else {
                dispatch(codeAction.set({ code: CodeType.UNKNOWN, message: error }))
            }
        }
    }
}



const Employees: React.FC = () => {
    const dispatch = useDispatch()
    const [employees, setEmployees] = useState<Employee[]>([]);
    useEffect(() => {
        const subscription = employeesService.getEmployees().subscribe({
            next(emplArr: Employee[] | string) {
                if (typeof emplArr == 'string') {
                    if (emplArr.includes('Authentication')) {
                        authService.logout();
                        dispatch(authActions.reset());
                        dispatch(codeAction.set({ code: CodeType.AUTH_ERROR, message: emplArr }))
                    } else {
                        dispatch(codeAction.set({ code: CodeType.SERVER_ERROR, message: emplArr }))
                    }
                } else {
                    setEmployees(emplArr.map(e => ({ ...e, birthDate: new Date(e.birthDate) })));
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [])
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: '50vh', width: '80vw' }}>
            <DataGrid columns={buildColumns(useSelectorAuth(), dispatch)} rows={employees} />
        </Box>
    </Box>
}
export default Employees;