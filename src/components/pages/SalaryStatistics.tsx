import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import employeeConfig from "../../config/employee-config.json";
import { useEffect, useState } from "react";
import { authService, employeesService } from "../../config/service-config";
import CodeType from "../../model/CodeType";
import Employee from "../../model/Employee";
import { authActions } from "../../redux/slices/authSlice";
import { codeAction } from "../../redux/slices/codeSlice";
import { useDispatch } from "react-redux";
import { count } from "../../util/number-functions";


const { minSalary, maxSalary, maxYear, minYear, departments, salaryStatisticIntervals } = employeeConfig;

type Props = {emplData: Employee[]}

const SalaryStatistics: React.FC<Props> = ({emplData}) => {
  const dispatch = useDispatch();

    const [interval, setInterval] = useState<number>(1000);

    function buildAgeStatisticColumns(): GridColDef[] {
        return [{ field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-headeer', align: 'center', headerAlign: 'center' }, 
        { field: 'Range', headerName: 'Range', flex: 3 },
        { field: 'Count',  headerName: 'Count', flex: 1, type: 'number'}];
    }

    function getRows(): {id:any, range:string, count:number}[] {

      let rows: {id:any, range:string, count:number}[] = [];  
      if (interval!=0) {
        const map = new Map();


        rows = Array.from({ length: Math.floor((maxSalary-minSalary)/interval)}).map((_,index)=>{return {id: '', range: `${minSalary+interval*index} - ${minSalary+interval*index+interval}`, count: 0}})
        }
        return rows;
    }

    

   
    
    return <Typography variant="h4" align="center">
        Salary Statistics
        <div>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={interval}
            onChange={(event)=>setInterval(+(event.target.value))}
            autoWidth
            label="Set interval"
          >
            <MenuItem value="">
              <em>1000</em>
            </MenuItem>
            {salaryStatisticIntervals.map(interval => <MenuItem value={interval}>{interval}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}/>
        <Box sx={{ height: '50vh', width: '80vw' }}>
            <DataGrid columns={buildAgeStatisticColumns()} rows={getRows()} />
        </Box>
    </Typography>
}

export function getStatistics(field:string, interval:number, employees:Employee[]): {min:number, max:number, count: number}[] {
  let array:Employee[] = employees 
  const currentYear = new Date().getFullYear();
  
  if (field == 'birthYear') {
    const updtEmpArr = employees.map(e => ({'age': currentYear - e.birthDate.getFullYear()}));
    field = 'age';
  }
  const statisticsObj:any = count(array, field, interval);
  return Object.entries(statisticsObj).map(e => {
      const min: number = +e[0] * interval;
      const max: number = min + interval - 1;
      return {min, max, count: e[1] as number};
  })
}

export default SalaryStatistics;
