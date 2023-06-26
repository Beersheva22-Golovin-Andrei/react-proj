import {Outlet, useLocation, useNavigate } from "react-router-dom"
import rolesConfig from "../../config/roles-config.json";
import accesConfig from "../../config/acces-config.json";
import NavigatorItem from "./NavigatorItem";
import { useEffect } from "react";
import NotFound from "../pages/NotFound";


type Props = {role:string };

const Navigator: React.FC<Props> = ({role})=> {
    const navigate = useNavigate();
    const location = useLocation();
    const pages = rolesConfig.allPages;
    const accsessSet:number[] = accesConfig[role as 'signedInAdmin'|'signedOut'| 'signedInUser'];
    useEffect(()=>{
        if (!pages.find((page)=>page.to===location.pathname)){
            navigate('/notfound')
        } else navigate('/');

        // if (!accsessSet.map(index=>pages[index]).find((page)=>page.to===location.pathname) ){
        //     navigate(location.pathname)

        // } else if (!pages.find((page)=>page.to===location.pathname)){
        //     navigate('/notfound')
        // } 
        // navigate('/')
        
    }, [role]);
    


    return <div>
        <nav>
            <ul className="navigator-list">
                {accsessSet.map(index => <NavigatorItem to={pages[index].to} name={pages[index].name}/>)}
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>
}



export default Navigator;