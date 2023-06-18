import { useMemo, useState } from "react"
import TimeZone from "../model/TimeZone"
import timeZones from "../time-zones"
import Input from "./common/Input"
import InputResult from "../model/InputResult"

type Props = { time: Date, city: string }
const Clock: React.FC<Props> = ({ time, city }) => {
    const style: React.CSSProperties = {
        display: "flex",
        flexDirection: "column"
    }
    
    const firstZone: TimeZone[] = useMemo(() => timeFromZone(city), [city]);
    const [newZone, setZone] = useState(firstZone[0]);
    return <div style={style}>
        <header>
            Time in {newZone.name.split('/')[1]}
        </header>
        <p>
            {time.toLocaleTimeString('en-US', { timeZone: newZone.name})}
        </p>
        <p>
            <Input submitFn={function (newCity: string): InputResult {
                const newTimeZones = timeFromZone(newCity);
                let resObj:InputResult = {status: "error", message: newCity};
                if (newTimeZones.length == 1){
                    resObj.status = "success";
                    setZone(newTimeZones[0]);
                } 
                if (newTimeZones.length > 1){
                    resObj.status =  "warning";
                    setZone(newTimeZones[0]);
                }
                
                return resObj;
            }} type="text" placeHolder={"enter new city"} buttonTitle="Set new time zone" />
        </p>
    </div>
}
export default Clock;


function timeFromZone(city: string): TimeZone[] {
    const array: TimeZone[] = timeZones;
    return array.filter(zone => zone.mainCities.includes(city));
}
