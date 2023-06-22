import {createSlice} from '@reduxjs/toolkit'
import lifeConfig from '../../config/life-game-config.json'
const {dimension} = lifeConfig;
 function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / dimension - 2
}
const initialState: {size: number} = {
    size: getSize()
}
const slice = createSlice({
    initialState,
    name: 'sizeState',
    reducers: {
        setSize: (state) => {
            state.size = getSize();
        }

    }
})
export const sizeActions = slice.actions;
export const sizeReducer = slice.reducer;