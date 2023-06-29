import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Select, SelectChangeEvent, Button, Typography } from '@mui/material';
import employeeConfig from "../../config/employee-config.json"
import Employee from '../../model/Employee';
import Alert from '../common/Alert';
import { StatusType } from '../../model/StatusType';
import { useEffect, useRef } from 'react';


const { minSalary, maxSalary, maxYear, minYear, departments } = employeeConfig;


type Params = { submitFn: (empl: Employee) => Promise<Employee | null> };

const EmployeeAddingForm: React.FC<Params> = ({ submitFn }) => {
  const [department, setDepart] = React.useState('');
  const [statusResult, setStatus] = React.useState<StatusType>();
  const [message, setMessage] = React.useState<string>();
  const inputElementRef = useRef<any>(null);

  function convertToString(str: string | null): number {
    let res: number = 0;
    if (str) {
      res = +str;
    }
    return res;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setDepart(event.target.value)
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    inputElementRef.current = event.target as any
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: string = data.get('name') as string;
    const salary: number = convertToString(data.get('salary') as string | null);
    const birthDate: Date = new Date(data.get('birthDate') as string);
    const gender: 'male' | 'female' = data.get('gender') as 'male' | 'female';
    const res: Employee | null = await submitFn({ name, birthDate, department, salary, gender })
    if (res == null) {
      setStatus("error")
      setMessage("Employee can not be added!")
    } else {
      setStatus("success");
      setMessage(`New empolyee has been added with id= ${res.id}`)
    }
    inputElementRef.current.reset();
    setDepart('');

   ;
  };

  return <Typography>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="name-fieled"
          label="Name"
          name="name"
        />
        <TextField
          required
          id="salary-fieled"
          label="Salary"
          name="salary"
          type='number'
        />
        <TextField
          required
          id="date-birth-fieled"
          label="Date of birth"
          type="date"
          name="birthDate"
        />

      </div>
      <div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" name="gender" />
            <FormControlLabel value="male" control={<Radio />} label="Male" name="gender" />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={department}
            onChange={handleChange}
            autoWidth
            label="Department"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <Button type="submit" variant="contained">submit</Button>
    </Box>
    <Alert status={statusResult as StatusType} message={message as string} />
  </Typography>
}
export default EmployeeAddingForm;