import {combineReducers} from 'redux';
import {reducer as InitialReducer} from './init';
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history: any) => combineReducers({
  InitialReducer,
  router: connectRouter(history),
})
  
export default createRootReducer