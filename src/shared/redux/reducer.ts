import { combineReducers } from 'redux'
import { EUserReducerType } from '../constants/enum'
import { IUserState, IAction } from '../interfaces/store'
import { IUser } from '../interfaces/user'

const DEFAULT_USERS_STATE: IUserState = {
  data: [],
  nextId: -1, // next id on add
  hasInitialized: false, // to prevent refetch when redirected back on Dashboard
}

const userReducer = (state = DEFAULT_USERS_STATE, action: IAction) => {
  switch(action.type) {
    case EUserReducerType.SetUsers:
      const ids: number[] = action.payload.map((item: IUser) => item.id);
      return {
        ...state,
        hasInitialized: true,
        data: action.payload,
        nextId: ids.length > 0 ? Math.max(...ids) + 1 : 1,
      }
    case EUserReducerType.AddUser:
      return {
        ...state,
        data: [...state.data, action.payload],
        nextId: state.nextId + 1
      }
    case EUserReducerType.DeleteUser:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload)
      }
    case EUserReducerType.UpdateUser:
      return {
        ...state,
        data: ([...state.data]).map(item => {
          if(item.id === action.payload.id) {
            return action.payload;
          } else return item;
        })
      }
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  users: userReducer
})

export default rootReducers
