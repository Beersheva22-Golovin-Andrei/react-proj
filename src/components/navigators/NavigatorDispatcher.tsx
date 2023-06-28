import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";

type Props = {role:string | null };

const NavigatorDispatcher: React.FC<Props>= ({role}) => {
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('sm'));
    return isPortrait ? <NavigatorPortrait role={role}/>: <Navigator role={role}/>
}
export default NavigatorDispatcher;