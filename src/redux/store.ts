import { configureStore } from "@reduxjs/toolkit";
import { directionReducer } from "./slices/flexDirection";
import { countReducer } from "./slices/lifesCountSlice";
import { sizeReducer } from "./slices/cellSize";
import { useSelector } from "react-redux";
export const store = configureStore({
    reducer: {
        directionState: directionReducer,
        countState: countReducer,
        sizeState: sizeReducer
    }
});

export function useSelectorDirection() {
   return useSelector<any, 'row'|'column'>(state => state.directionState.direction) ;
}
export function useSelectorSize() {
    return useSelector<any, number>(state => state.sizeState.size) ;
 }
 export function useSelectorCount() {
    return useSelector<any, number>(state => state.countState.count) ;
 }