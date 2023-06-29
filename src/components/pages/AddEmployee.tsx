import { Typography } from "@mui/material"
import { employeesService } from "../../config/service-config";
import EmployeeAddingForm from "../forms/EmployeeFormAdding";

const AddEmployee: React.FC = () => {
    return <Typography variant="h4" align="center">
            <EmployeeAddingForm submitFn={ async empl=>{
               return await employeesService.addEmployee(empl);
            }}/>
    </Typography>
}
export default AddEmployee;