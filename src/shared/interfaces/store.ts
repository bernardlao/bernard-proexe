import { IUser } from "./user";

export interface IStoreState {
  users: IUserState
}

export interface IUserState {
  data: IUser[];
  nextId: number;
  hasInitialized: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

