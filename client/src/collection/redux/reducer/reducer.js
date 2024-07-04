import { combineReducers } from 'redux';
import userReducer from '../slice/slice';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
