import { Typography } from "@mui/material";
import Input from "../common/Input";
import { getRandomEmployee } from "../../util/random";
import { employeesService } from "../../config/service-config";
import Employee from "../../model/Employee";
import emplConfig from "../../config/employee-config.json"
import { StatusType } from "../../model/StatusType";

const { minSalary, maxSalary, maxYear, minYear, departments } = emplConfig;

const Generation: React.FC = () => {
    return <Typography variant="h4" align="center">
        Adding random employees
        <Input submitFn={async inputText => {
            let counter: number = 0;
            const emplArr = Array.from({ length: +inputText }).map(() => getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments) as Employee)
            for (let i = 0; i < emplArr.length; i++) {
                const res = await employeesService.addEmployee(emplArr[i]);
                if (res != null) {
                    counter++;
                }
            }
            const message: string = counter == 0 ? 'server is unavaleble' : `${counter} records have been added`
            const status: StatusType = counter == 0 ? 'error' : "success";

            return { status, message };
        }} placeholder={'enter count of employee'} buttonTitle={'generate and add'} type={'number'} />
    </Typography>
}
export default Generation;