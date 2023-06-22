import {Outlet } from "react-router-dom"
import rolesConfig from "../../config/roles-config.json";
import accesConfig from "../../config/acces-config.json";
import NavigatorItem from "./NavigatorItem";


type Props = {role:string };
const Navigator: React.FC<Props> = ({role})=> {
const pages = rolesConfig.allPages;
const accsessSet:number[] = accesConfig[role as 'signedInAdmin'|'signedOut'| 'signedInUser'];
    
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