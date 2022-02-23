import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  taxi: [],
  commonTaxi: [],
  seenTaxi: [],
};

const taxiSlice = createSlice({
  name: 'taxi',
  initialState,
  reducers: {
    setTaxi: (state, {payload}) => {
      state = {...state, taxi: payload};
      //asyncstorage save token
      return state;
    },
    setCommonTaxi: (state, {payload}) => {
      state = {...state, commonTaxi: payload};
      return state;
    },
    setSeenTaxi: (state, {payload}) => {
      state = {...state, seenTaxi: payload};
      return state;
    },
    update: (state, {payload}) => {
      state = {...state, ...payload};
      return state;
    },
  },
});

export const selectCommonTaxi = store => store.taxi.commonTaxi;
export const selectTaxi = store => store.taxi.taxi;
export const selectSeenTaxi = store => store.taxi.seenTaxi;

export const {setTaxi, update, setCommonTaxi, setSeenTaxi} = taxiSlice.actions;
export default taxiSlice.reducer;
