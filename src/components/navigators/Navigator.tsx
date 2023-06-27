import {Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import rolesConfig from "../../config/roles-config.json";
import accesConfig from "../../config/acces-config.json";
import NavigatorItem from "./NavigatorItem";
import { ReactNode, useEffect, useState } from "react";
import NotFound from "../pages/NotFound";
import { AppBar, Box, Tab, Tabs } from "@mui/material";


type Props = {role:string };

const Navigator: React.FC<Props> = ({role})=> {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);
    const pages = rolesConfig.allPages;
    const accsessSet:number[] = accesConfig[role as 'signedInAdmin'|'signedOut'| 'signedInUser'];
    const activePagesForRole: any[] = accsessSet.map(index=>pages[index]);
    useEffect(()=>{
        if (!pages.find((page)=>page.to===location.pathname)){
            navigate('/notfound');
            //setValue('/notfound')
        } else {
            navigate('/');
            setValue(0);
        }
        // if (!accsessSet.map(index=>pages[index]).find((page)=>page.to===location.pathname) ){
        //     navigate(location.pathname)

        // } else if (!pages.find((page)=>page.to===location.pathname)){
        //     navigate('/notfound')
        // } 
        // navigate('/')
        
    }, [role]);
    function onChangeFn (event: any, newValue: any) {
        setValue(newValue);
    }

    function getTabs(): ReactNode{
        return activePagesForRole.map(r=><Tab component={Link} to={r.to} label={r.name} key={r.name}/>);
    }


    return <Box mt={10}>
        <AppBar sx={{backgroundColor: "grey"}}>
            <Tabs value={value} onChange={onChangeFn}>
                {getTabs()}
            </Tabs>
        </AppBar>
        <Outlet></Outlet>
    </Box>
}



export default Navigator;