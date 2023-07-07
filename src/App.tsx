import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigatorDispatcher from "./components/navigators/NavigatorDispatcher";

import SignIn from "./components/pages/SignIn";
import SignOut from "./components/pages/SignOut";
import './App.css'
import { useSelectorAuth, useSelectorCode } from "./redux/store";
import { useMemo } from "react";
import routesConfig from './config/routes-config.json';
import NotFound from "./components/pages/NotFound";
import { RouteType } from "./components/navigators/Navigator";
import UserData from "./model/UserData";
import Employees from "./components/pages/Employees";
import AddEmployee from "./components/pages/AddEmployee";
import AgeStatistics from "./components/pages/AgeStatistics";
import SalaryStatistics from "./components/pages/SalaryStatistics";
import Generation from "./components/pages/Generation";
import { Box, Snackbar, Alert, AlertColor } from "@mui/material";
import CodePayload from "./model/CodePayload";
import CodeType from "./model/CodeType";
import { useDispatch } from "react-redux";
import { codeAction } from "./redux/slices/codeSlice";
const {always, authenticated, admin, noadmin, noauthenticated} = routesConfig;
type RouteTypeOrder = RouteType & {order?: number}
function getRoutes(userData: UserData): RouteType[] {
  const res: RouteTypeOrder[] = [];
  res.push(...always);
  if(userData) {
      res.push(...authenticated);
      if (userData.role === 'admin') {
        res.push(...admin)
      } else {
        res.push(...noadmin)
      }
  } else {
    res.push(...noauthenticated);
  }
  res.sort((r1, r2) => {
    let res = 0;
    if (r1.order && r2.order) {
      res = r1.order - r2.order;
    } 
    return res
  });
  if (userData) {
    res[res.length - 1].label = userData.email;
  }
  return res
}
const App: React.FC = () => {
  const dispatch = useDispatch();
  const code = useSelectorCode();
  const {alertMessage, severity} = useMemo(()=>getSnackBarData(code), [code])
  const userData = useSelectorAuth();
  const routes = useMemo(() => getRoutes(userData), [userData])
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<NavigatorDispatcher routes={routes}/>}>
        <Route index element={<Employees/>}/>
        <Route path="employees/add" element={<AddEmployee/>}/>
        <Route path="statistics/age" element={<AgeStatistics/>}/>
        <Route path="statistics/salary" element={<SalaryStatistics emplData={[]}/>}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signout" element={<SignOut/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/employees/gen" element={<Generation/>}/>
    </Route>
  </Routes>
 <Box>
<Snackbar open={!!alertMessage} autoHideDuration={20000}
onClose={() => dispatch(codeAction.reset())}>
   <Alert  onClose = {() => dispatch(codeAction.reset())} severity={severity as AlertColor} sx={{ width: '100%' }}>
       {alertMessage}
   </Alert>
</Snackbar>
</Box>
</BrowserRouter>
}

function getSnackBarData(code: CodePayload):{alertMessage: string, severity: string} {
  let severity: string='';
  switch(code.code){
    case 0:{
      severity = 'success'
      break;
    }
    case 1: {
      severity= 'error'
      break;
    }
    case 2: {
      severity= 'error'
      break;
    }
    case 3:{
      severity= 'warning'
      break;
    }
  }
  const alertMessage= code.message
  return {alertMessage, severity}
}

export default App;