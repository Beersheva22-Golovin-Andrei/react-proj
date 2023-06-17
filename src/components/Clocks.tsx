import { useState, useEffect } from "react";
import Clock from "./Clock"
const city1:string = "Irkutsk"
const city2:string = "Baku"
const city3:string = "Vilnius"

const Clocks:React.FC = ()=>{
    const [time, setTime] = useState<Date>(new Date())
    
    useEffect(()=>{
        const intervalId = setInterval(()=>{
             setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])
    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <Clock time={time} city={city1}/>
        <Clock time={time} city={city2}/>
        <Clock time={time} city={city3}/>
    </div>
}

export default Clocks;