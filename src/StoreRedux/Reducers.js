import { combineReducers } from "redux";
import userReducer from "./UserSlice";
import adminReducer from './adminSlice';
import foodReducer from "./foodSlice"
import orderReducer from "./orderSlice"
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  food:foodReducer,
  order:orderReducer
});

export default rootReducer;