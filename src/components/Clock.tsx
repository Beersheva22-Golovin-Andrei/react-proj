import TimeZone from "../types/TimeZone"
import timeZones from "../time-zones"

type Props = {time:Date, city:string}
const Clock: React.FC<Props> = ({time, city})=>{
    const style: React.CSSProperties = {
        display:"flex",
        flexDirection: "column"
    }
    return <div style={style}>
                <header>
                    Time in {city}
                </header>
                <p>
                    {timeFromZone(time, city)}
                </p>
    </div>
}
export default Clock;


function timeFromZone (time:Date, city: string):string {
    let res = true;
    let index : number = 0;
    const array: TimeZone[] = timeZones;
    while (res){
        if(array[index].mainCities.includes(city)){
            res= false;
        }
        index++;
    }
    return time.toLocaleTimeString('en-US', {timeZone: array[index].name});;
}
