import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRoot} from '../../configureStore';

interface FrontGroups {
  deliveryman: string;
}

export interface ProfileType {
  id?: number;
  name?: string;
  address?: string;
  surname?: string;
  username?: string;
  region_id?: number;
  region_name?: string;
  district_id?: number;
  district_name?: string;
  activated_at?: Date;
  last_login?: Date;
  created_at?: Date;
  last_seen?: any;
  gender?: string;
  balance?: number;
  deposit_balance?: number;
  is_deliveryman?: boolean;
  avatar_url?: string;
  front_groups?: FrontGroups;
  front_permissions?: any[];
  full_address?: string;
}

interface IUser {
  profile: ProfileType;
  message: string;
  data: string;
}

const initialState: IUser = {
  profile: {},
  message: '',
  data: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<IUser>) => {
      let newState = {...state, ...payload};
      let jsonUser = JSON.stringify(newState);
      //asyncstorage save token
      AsyncStorage.setItem('@user', jsonUser);
      return newState;
    },
    logoutUser: state => {
      state = initialState;
      //clean storage
      AsyncStorage.removeItem('@user');
      return state;
    },
    updateUser: (state, {payload}) => {
      let newState = {...state, ...payload};
      return newState;
    },
    updateProfile: (state, {payload}) => {
      let newState = {...state, profile: {...state.profile, ...payload}};
      return newState;
    },
  },
});

export const selectUser = (state: IRoot) => state.user.profile;
export const selectToken = (state: IRoot) => state.user.data;

export const {setUser, logoutUser, updateUser, updateProfile} =
  userSlice.actions;
export default userSlice.reducer;
