import {combineReducers} from 'redux';
import {reducer as InitialReducer} from './init';

const createRootReducer = (history: any) => combineReducers({
  InitialReducer,
})
  
export default createRootReducer