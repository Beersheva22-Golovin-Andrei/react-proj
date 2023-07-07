import { Box, Modal, Typography } from "@mui/material"
import { useState, useEffect, Dispatch, useRef } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { DataGrid, GridActionsCellItem, GridColDef, GridDeleteForeverIcon, GridDragIcon, GridLoadIcon, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { codeAction } from "../../redux/slices/codeSlice";
import CodeType from "../../model/CodeType";
import UserData from "../../model/UserData";
import { useSelectorAuth } from "../../redux/store";
import { AnyAction } from "redux";
import Confirm from "../common/Confirm";
import EmployeeFormAdding from "../forms/EmployeeFormAdding";


const Employees: React.FC = () => {
    const dispatch = useDispatch()
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const idForDeleting = useRef<any>(null);
    const firstCond = useRef<any>(null);

    async function deleteFn() {
        try {
            const res = await employeesService.deleteEmployee(idForDeleting.current);
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

    function acceptFn(decision: boolean) {
        if (decision) {
            deleteFn();
        }
        setOpenConfirm(false);
    }

    function deleteHandle(id: any): void {
        idForDeleting.current = id;
        setOpenConfirm(true);
    }

    function updateHandle(row: any): void {
        firstCond.current = row as Employee;
        setOpenUpdate(true);
    }

    function updateCloseHandle(): void {
        setOpenUpdate(false);
    }


    const userData = useSelectorAuth();
    function buildColumns(): GridColDef[] {
        const columns: GridColDef[] = [{ field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-headeer', align: 'center', headerAlign: 'center' }, { field: 'name', headerName: 'Name', flex: 0.7 },
        { field: 'birthDate', type: 'date', headerName: 'Date of birth', flex: 1 }, { field: 'department', headerName: 'Department', flex: 0.8 }, { field: 'salary', headerName: 'Salary, NIS', type: 'number', flex: 0.6 },
        { field: 'gender', headerName: 'Gender', flex: 0.6 }];
        if (userData && userData.role === 'admin') {
            columns.push({
                field: 'actions', type: 'actions',
                getActions: (params: GridRowParams) => {
                    return [<GridActionsCellItem icon={<GridDeleteForeverIcon />} onClick={() => deleteHandle(params.id)} label="Delete" />,
                    <GridActionsCellItem icon={<GridDragIcon />} onClick={() => updateHandle(params.row)} label="Update" />]
                }
            })
        }
        return columns;
    }

    async function submitFnForUpdate (empl:Employee){
        let res = null;
        const oldEmpl = firstCond.current;
        const oldEmplCor: Employee = {
            name: oldEmpl.name,
            birthDate: oldEmpl.birthDate,
            department: oldEmpl.department,
            salary: oldEmpl.salary,
            gender: oldEmpl.gender};
            empl.birthDate = oldEmplCor.birthDate;
        if (JSON.stringify(empl)!==JSON.stringify(oldEmplCor)){
            empl.id = oldEmpl.id;
            res= employeesService.updateEmployee(empl)
        }
        setOpenUpdate(false);
        return res;


    }

    useEffect(() => {
        const subscription = employeesService.getEmployees().subscribe( {
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
        } );
        return () => subscription.unsubscribe();
    }, [])
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ height: '50vh', width: '80vw' }}>
            <DataGrid columns={buildColumns()} rows={employees} />
        </Box>
        <Confirm header="Are you sure to delete?" message="You want to delete record " acceptFn={acceptFn} isOpen={openConfirm} />
        <Modal
            open={openUpdate}
            onClose={()=>updateCloseHandle()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{mt: 6}}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update employee
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <EmployeeFormAdding submitFn={submitFnForUpdate} firstCond={firstCond.current}/>
                </Typography>
            </Box>
        </Modal>
    </Box>
}
export default Employees;