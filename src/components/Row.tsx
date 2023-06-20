import { ReactNode } from "react"
import lifeConfig from '../config/life-game-config.json';
const SIZE_COEF = 500;
const {dimension, tick} = lifeConfig;

const Row: React.FC<{row: number[]}> = ({row}) => {
    function getDivs(): ReactNode {
        return row.map((num, index) =>
         <div key={index} style={{width: SIZE_COEF/dimension, height: SIZE_COEF/dimension, backgroundColor: num ?
             'black' : 'white', border: 'solid 1px gray'}}></div>)
    }
    return <section style={{display:'flex'}}>
        {getDivs()}
    </section>
}
export default Row;