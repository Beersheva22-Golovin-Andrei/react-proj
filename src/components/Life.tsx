import { useEffect } from "react";
import { useSelectorCount, useSelectorDirection } from "../redux/store"
import { useDispatch } from "react-redux";
import { countActions } from "../redux/slices/lifesCountSlice";
import LifeGame from "./LifeGame";



const Life: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(countActions.setCount(1));
    }, [])
    const flexDirection = useSelectorDirection();
    const newCounts = useSelectorCount();
    return <section style={{display: 'flex', flexDirection,alignItems: 'center',
     justifyContent: 'space-around', height: '100vh'}}>
            {Array.from({length: newCounts}).map((_)=><LifeGame/>)}
       
            
    </section>
}
export default Life;