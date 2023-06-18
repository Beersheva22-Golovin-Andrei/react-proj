import { useState, useEffect } from "react";
import Clock from "./Clock"
import cityConfig from "../config/city-config.json"


const Clocks: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const cityArr: string[] = cityConfig.cities;
    return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {cityArr.map(city => <Clock time={time} city={city} />)}
    </div>
}

export default Clocks;