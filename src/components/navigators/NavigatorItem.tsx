import { NavLink } from "react-router-dom"

type ItemParams = {to: string, name: string}
const NavigatorItem: React.FC<ItemParams> = ({to, name}) => {
    return <li className="navigator-item">
        <NavLink to={to}>{name}</NavLink>
    </li>
}

export default NavigatorItem;