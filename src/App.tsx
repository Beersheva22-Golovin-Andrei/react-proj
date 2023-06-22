import { ReactNode, useEffect, useState } from "react";
import LifeGame from "./components/LifeGame";
import { useDispatch } from "react-redux";
import { sizeActions } from "./redux/slices/cellSize";
import { directionActions } from "./redux/slices/flexDirection";
import Life from "./components/Life";
import Input from "./components/common/Input";
import InputResult from "./model/InputResult";
import { countActions } from "./redux/slices/lifesCountSlice";



const App: React.FC = () => {
  const [matrixLifes, setMatrixLifes] = useState<ReactNode>()
const dispatch = useDispatch<any>();

useEffect(() => {
    window.addEventListener('resize', () => {
    dispatch (sizeActions.setSize());
    dispatch(directionActions.setDirection()); 
    });
  
}, []);

return <div> 
             <Input submitFn={function (countLifes: string): InputResult {
              
                let resObj:InputResult = {status: "error", message: countLifes};
                if (+countLifes>0 || +countLifes<=5){
                  setMatrixLifes(<Life/>);
                  resObj.status='success';
                  dispatch(countActions.setCount(+countLifes));
                }
                return resObj;
            }} type="number" placeHolder={"enter count of lifes"} buttonTitle="Go" />
  {matrixLifes}
  </div>
    

}

export default App;